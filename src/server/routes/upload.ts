import { Router, Request, Response } from 'express';
import * as multer from 'multer';
import { Collection } from "mongoose";

import { imgStorage, thumbnailStorage, gfs, config } from '../dataAccess';

// import schemas
import { rsImgs } from '../schemas/rsImg';
import { thumbnails } from '../schemas/thumbnail';


// authentication
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const router = Router();

// auth0 middleware
// const authCheck = jwt({
//   secret: Buffer.from(config.auth0.secret, "base64"),
//   audience: config.auth0.client
// });

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${config.auth0.domain}/.well-known/jwks.json`
    }),
    // This is the identifier we set when we created the API
    audience: `${config.auth0.identifier}`,
    issuer: `https://${config.auth0.domain}/`,
    algorithms: ['RS256']
});


// upload settings
const uploadImg = multer({ //multer settings for single upload
    storage: imgStorage
}).single('file');

const uploadThumbnail = multer({ //multer settings for single upload
    storage: thumbnailStorage
}).single('file');

// const has2d: (list: [any])=>boolean = (list: [any]) => {
//     for (let index of list) {
//         if (index.key.location === '2d') {
//             return true
//         }
//     }
//     return false;
// };

const createIndex: (collection: Collection)=>void = async (collection: Collection) => {
    let indexes: [any] = await collection.getIndexes();
        collection.createIndex({'location': "2d"}).then(()=>{
            console.log(` --> 2D Index created in ${collection.name}`);// create spatial index for future query
        });
};

/** API path that will upload the files */

// router.use(authCheck);

router.use(function (err, req, res, next) {
    console.log(err.message, req.originalUrl);
    console.log(`https://${config.auth0.domain}/.well-known/jwks.json`);
    console.log(`${config.auth0.identifier}`);
    console.log(`https://${config.auth0.domain}/`);
});

router.post('/img', (req: Request, res: Response) => {
    uploadImg(req, res, (err) => {
      if (err) {
            res.json({error_code:1,err_desc:err});
            return;
      }
      res.json({error_code:0,err_desc:null});
    });
});

router.post('/thumb', (req: Request, res: Response) => {
    uploadThumbnail(req, res, (err) => {
      if (err) {
            res.json({error_code:1,err_desc:err});
            return;
      }
      res.json({error_code:0,err_desc:null});
    });
});

router.post('/imgInfo', (req: Request, res: Response) => {

  let newImg = req.body;

  let timeAcquiredS: string = newImg.dateInfo.timeAcquired;
  let timeAcquiredD: Date = new Date("1980-01-01T00:00:00");

  let timeEndS: string = newImg.dateInfo.timeEnd;
  let timeEndD: Date = new Date("1980-01-01T00:00:00");

  if (timeAcquiredS && timeAcquiredS.replace(/\s/g,'').length > 0) {
    timeAcquiredD = new Date(timeAcquiredS);
  }

  if (timeEndS && timeEndS.replace(/\s/g,'').length > 0) {
    timeEndD = new Date(timeEndS);
  }

  newImg.dateInfo.timeAcquired = timeAcquiredD;
  newImg.dateInfo.timeEnd = timeEndD;

  // location parse int
  let latitude = parseFloat(req.body.location[1]);
  let longitude = parseFloat(req.body.location[0]);

  newImg.location = [longitude, latitude];

  let collection = rsImgs.collection;
  let rsimg = new rsImgs(newImg);
  console.log(rsimg);
  rsimg.save();
  createIndex(collection);
  res.json({error_code:1,err_desc:"imgInfo Post"});

});

router.post('/thumbnailInfo', (req: Request, res: Response) => {
    let newThumbnail = req.body;
    let thumbnail = new thumbnails(newThumbnail);
    thumbnail.save();
    res.json({error_code:2,err_desc:"thumbnailInfo Post"});
});

export const uploadAPI = router;