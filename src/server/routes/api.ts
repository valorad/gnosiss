import { Router, Request, Response } from 'express';

//import { mgInstance } from '../dataAccess';


// import schemas
import { rsImgs } from '../schemas/rsImg';
import { thumbnails } from '../schemas/thumbnail';

// import child routes
import { uploadAPI } from './upload';

// activate mongo connection
const dA = require('../dataAccess');
import { gfs, config } from '../dataAccess';

// define router
const router = Router();

// Set child routes
router.use('/upload', uploadAPI);


/* GET api listing. */
router.get('/', (req: Request, res: Response) => {
  res.send('api works');
});

router.get('/img/q', async (req: Request, res: Response) => {

  console.log(req.query);

  let mQuery: any = {};
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
  if (req.query.toDate && req.query.toDate.length > 0) {
      mQuery["dateInfo.timeAcquired"].$lt = new Date(parseInt(req.query.toDate));
  }

  // location and polygon
  if(req.query.location) {
    let locationStr = req.query.location.split(',');
    if (locationStr && locationStr.length >= 2) {
        let location: [number] = [parseFloat(locationStr[0]), parseFloat(locationStr[1])];
        let hWidth = parseFloat(req.query.hWidth);
        let hHeight = parseFloat(req.query.hHeight);
        let polygon = {
            $geometry: {
                type: "Polygon",
                coordinates: [
                [
                    [location[0] - hWidth, location[1] + hHeight], //left upper
                    [location[0] + hWidth, location[1] + hHeight], //right upper
                    [location[0] + hWidth, location[1] - hHeight], //right bottom
                    [location[0] - hWidth, location[1] - hHeight], //left bottom
                    [location[0] - hWidth, location[1] + hHeight] //left upper
                ]
                ]
            }
        };
        console.log(location[0] - hWidth);
        console.log(location[1] + hHeight);
        console.log(location[0] + hWidth);
        console.log(location[1] + hHeight);
        console.log(location[0] + hWidth);
        console.log(location[1] - hHeight);
        console.log(location[0] - hWidth);
        console.log(location[1] - hHeight);

        mQuery.location = {
        $geoWithin: polygon
        };
    }
  }


  console.log(mQuery);
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
        let readstream = gfs.createReadStream({
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
        let readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "thumbnailFiles"
        });
        /** set the proper content type */
        res.set('Content-Type', files[0].contentType)
        /** return response */
        return readstream.pipe(res);
    });
});




export const api: Router = router;