import express from 'express';
import {
  addVideo,
  addView,
  getByTag,
  getVideo,
  random,
  search,
  sub,
  trend,
} from '../controllers/video.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

/* 
This verifyToken function will act as a middlewre for our CRUD operation 
*/

//create a video as a verified user
router.post('/', verifyToken, addVideo);

//update a verified user (update an existing video)
router.put('/:id', verifyToken, addVideo);

//delete a video as a verified user
router.delete('/:id', verifyToken, addVideo);

//get a video with a speciafic endpoint eg: videos/find/12366
router.get('/find/:id', getVideo);

// get video views
router.put('/view/:id', addView);

// get trending video
router.get('/trend', trend);

// rget random video on the home page
router.get('/random', random);

// get video from a subscribe channel
router.get('/sub', verifyToken, sub);

// get video by a tag
router.get('/tags', getByTag);

// get video by title
router.get('/search', search);

export default router;
