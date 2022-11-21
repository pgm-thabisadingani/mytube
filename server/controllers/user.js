import { createError } from '../error.js';
import User from './../models/User.js';
import Video from '../models/Video.js';

/* 
We are making Api request thus use async function 
*/

// UPDATE UER FUNCTION
export const update = async (req, res, next) => {
  // compaer the userId to the jwtId verify you are the user of the account
  if (req.params.id === req.user.id) {
    try {
      // find user by id using params and update
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          // use Set Method
          $set: req.body,
        },
        // newest version of our user
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, 'You can update only your own account!'));
  }
};

// DELETE USER FUNCTION
export const deleteUser = async (req, res, next) => {
  // compare the userId to the jwtId verify you are the user of the account
  if (req.params.id === req.user.id) {
    try {
      // find user by id using params and delete
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been deleted successfully');
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, 'You can update only your own account!'));
  }
};

// GET USER FUNCTION
export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
  try {
  } catch (err) {
    next(err);
  }
};

// SUBSCRIBE FUNCTION (CHANNEL)
export const subscribe = async (req, res, next) => {
  try {
    //jwt user id
    await User.findByIdAndUpdate(req.user.id, {
      // channel id use a push method to at the user id to subscribedUsers array on the user model
      $push: { subscribedUsers: req.params.id },
    });
    // find this channel and increase its subscriber nummber
    await User.findByIdAndUpdate(req.params.id, {
      // increase method { increase subscribers by 1}
      $inc: { subscribers: 1 },
    });
    res.status(200).json(' Subscribed successfully');
  } catch (err) {
    next(err);
  }
};

// UNSUBSCRIBE FUNCTION (CHANNEL)
export const unsubscribe = async (req, res, next) => {
  try {
    //jwt user id
    await User.findByIdAndUpdate(req.user.id, {
      // channel id use a pull method to at the user id to subscribedUsers array on the user model
      $pull: { subscribedUsers: req.params.id },
    });
    // find this channel and increase its subscriber nummber
    await User.findByIdAndUpdate(req.params.id, {
      // increase method { decrease subscribers by 1}
      $inc: { subscribers: -1 },
    });
    res.status(200).json('Unsubscribed successfully ');
  } catch (err) {
    next(err);
  }
};

// LIKE FUNCTION (VIDEO)
export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      // $addToSet : makes sure that your id is on the array only once, prevents duplication
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json('The video has been liked.');
  } catch (err) {
    next(err);
  }
};

// DISLIKE FUNCTION (VIDEO)
export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      //  $pull : removes your id from likes and  $addToSet: add to dislike
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json('The video has been liked.');
  } catch (err) {
    next(err);
  }
};
