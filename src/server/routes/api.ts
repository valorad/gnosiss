import { Router, Request, Response } from 'express';

//import { mgInstance } from '../dataAccess';


// import schemas
import { rsImgs } from '../schemas/rsImg';

// import child routes

// activate mongo connection
const mgInstance = require('../dataAccess');

// define router
const router = Router();

// Set child routes

/* GET api listing. */
router.get('/', (req: Request, res: Response) => {
  res.send('api works');
});

router.get('/test', (req: Request, res: Response) => {
  rsImgs.find().then((result) => {
    res.send(result);
  });
});

export const api = router;