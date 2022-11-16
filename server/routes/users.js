import express from 'express';
import {
  deleteUser,
  dislike,
  getUser,
  like,
  subscribe,
  unsubscribe,
  update,
} from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

/* 
This verifyToken function will act as a middlewre for our CRUD operation 
*/

//update a verified user (update an existing user)
router.put('/:id', verifyToken, update);

//delete as a verified user
router.delete('/:id', verifyToken, deleteUser);

//get a user with a speciafic endpoint eg: users/find/12366
router.get('/find/:id', getUser);

//subscribe as a verified user to a channel
router.put('/sub/:id', verifyToken, subscribe);

//unsubscribe as a verified user from a channel
router.put('/unsub/:id', verifyToken, unsubscribe);

//like a video as a verified
router.put('/like/:videoId', verifyToken, like);

//dislike a video as a verified
router.put('/dislike/:videoId', verifyToken, dislike);

export default router;
