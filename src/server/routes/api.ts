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

router.get('/test', (req: Request, res: Response) => {
  rsImgs.find().then((result) => {
    res.send(result);
  });
});

router.get('/thumb', (req: Request, res: Response) => {
  thumbnails.find().then((result) => {
    res.send(result);
  });
});

router.get('/file/:filename', (req: Request, res: Response) => {
    gfs.collection('ctFiles'); //set collection name to lookup into

    /** First check if file exists */
    gfs.files.find({filename: req.params.filename}).toArray((err, files) => {
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error file not found"
            });
        }
        /** create read stream */
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "ctFiles"
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


export const api: Router = router;