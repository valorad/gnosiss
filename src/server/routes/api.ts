import { Router, Request, Response } from 'express';
import * as multer from 'multer';

//import { mgInstance } from '../dataAccess';


// import schemas
import { rsImgs } from '../schemas/rsImg';
import { thumbnails } from '../schemas/thumbnail';

// import child routes

// activate mongo connection
const dA = require('../dataAccess');
import { imgStorage, thumbnailStorage, gfs } from '../dataAccess';

// define router
const router = Router();

// Set child routes

// upload settings
const uploadImg = multer({ //multer settings for single upload
    storage: imgStorage
}).single('file');

const uploadThumbnail = multer({ //multer settings for single upload
    storage: thumbnailStorage
}).single('file');

/* GET api listing. */
router.get('/', (req: Request, res: Response) => {
  res.send('api works');
});

router.get('/img/q', async (req: Request, res: Response) => {

  console.log(req.query);

  let mQuery:any = {};
  // if Value is specified, then query is activated.
  //satellite
  if (req.query.satellite && req.query.satellite.length > 0) {
     //Object.prototype.toString.call(mQuery.basicInfo)==='[object Object]' ?null:mQuery.basicInfo={}
    mQuery["basicInfo.satellite"] = req.query.satellite;
  }
  // place
  if (req.query.place && req.query.place.length > 0) {
    mQuery.place = req.query.place;
  }
  // fromDate
  if (req.query.fromDate && req.query.fromDate.length > 0) {
    let timeAcqFrom: Date = new Date(parseInt(req.query.fromDate));
    mQuery["dateInfo.timeAcquired"] = {};
    mQuery["dateInfo.timeAcquired"].$gte = timeAcqFrom;
  }

  // toDate
  if (!req.query.toDate && req.query.toDate.length > 0) {
      mQuery["dateInfo.timeAcquired"].$lt = new Date(parseInt(req.query.toDate));
  }

  let metImgs = await rsImgs.find(mQuery);

  res.send(metImgs);
});

router.get('/img/name/:name', async (req: Request, res: Response) => {
  let img = await rsImgs.find({"name": req.params.name});
  res.send(img);
});

router.get('/file/img/:imgname', (req: Request, res: Response) => {
    gfs.collection('imgFiles'); //set collection name to lookup into
    let reg = new RegExp(`${req.params.imgname}.*`);
    /** First check if file exists */

    gfs.files.find({'metadata.originalname': { $regex: reg }}).toArray((err, files) => {
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 404,
                responseMessage: "error file not found"
            });
        }
        /** create read stream */
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "imgFiles"
        });
        /** set the proper content type */
        res.set('Content-Type', files[0].contentType)
        /** return response */
        return readstream.pipe(res);
    });
});

router.get('/file/thumbnail/:imgname', async (req: Request, res: Response) => {

    let reg = new RegExp(`${req.params.imgname}.*`);

    // step 1: read thumbnail collection
    let thumbnailInfo = await thumbnails.find({'name': {$regex: reg }});

    if(!thumbnailInfo || thumbnailInfo.length === 0){
        return res.status(404).json({
            responseCode: 404.0,
            responseMessage: "error thumbnail not found"
        });
    }
    let thumbnailFile = thumbnailInfo[0].thumbnail[0];

    // step 2: fetch file in thumbnailFiles collection
    gfs.collection('thumbnailFiles'); //set collection name to lookup into

    /** First check if file exists */
    gfs.files.find({'metadata.originalname': `${thumbnailFile}`}).toArray((err, files) => {
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 404.1,
                responseMessage: "error file not found"
            });
        }
        /** create read stream */
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "thumbnailFiles"
        });
        /** set the proper content type */
        res.set('Content-Type', files[0].contentType)
        /** return response */
        return readstream.pipe(res);
    });
});


/** API path that will upload the files */
router.post('/upload/img', (req: Request, res: Response) => {
    uploadImg(req, res, (err) => {
      if (err) {
            res.json({error_code:1,err_desc:err});
            return;
      }
      res.json({error_code:0,err_desc:null});
    });
});

router.post('/upload/thumb', (req: Request, res: Response) => {
    uploadThumbnail(req, res, (err) => {
      if (err) {
            res.json({error_code:1,err_desc:err});
            return;
      }
      res.json({error_code:0,err_desc:null});
    });
});

router.post('/upload/imgInfo', (req: Request, res: Response) => {

    console.log(req.body);

        // let TESV = new SDK({
        //     name: "Elder Scroll v",
        //     price: "￥21",
        //     platform: "Steam",
        //     receiver: "Billy",
        //     steveAttitude: "Desired"
        // });
    
    res.json({error_code:1,err_desc:"imgInfo Post"});



});

router.post('/upload/thumbnailInfo', (req: Request, res: Response) => {
    console.log(req.body);
    let reqbb = JSON.parse(req.body);
    console.log(reqbb.name);

    res.json({error_code:2,err_desc:"thumbnailInfo Post"});
});


export const api: Router = router;