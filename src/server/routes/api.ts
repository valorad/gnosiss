import { Router, Request, Response } from 'express';

//import { wcnConstr, mgInstance } from './dataAccess';

// import schemas

// import child routes


const router = Router();

// Set child routes

/* GET api listing. */
router.get('/', (req: Request, res: Response) => {
  res.send('api works');
});

export const api = router;