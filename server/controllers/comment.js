import { createError } from '../error.js';
import Comment from '../models/Comment.js';
import Video from '../models/Video.js';

// ADD COMMENT FUNCTION
export const addComment = async (req, res, next) => {
  // assigning the req.user.id to the userId  of the comment schema
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    //save to mongodb
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    next(err);
  }
};

// DELETE COMMENT FUNCTION
export const deleteComment = async (req, res, next) => {
  try {
    // identify our user by ID
    const comment = await Comment.findById(res.params.id);
    // findi the video by id
    const video = await Video.findById(res.params.id);
    // You can delete A comment if either you are the owner of the COMMENT or the owner of the VIDEO
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json('The comment has been deleted successfully.');
    } else {
      return next(createError(403, 'You can only delete your comment!'));
    }
  } catch (err) {
    next(err);
  }
};

// GET ALL VIDEO COMMENTS FUNCTION
export const getComments = async (req, res, next) => {
  try {
    // find all comment of a video by videoId parameters
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
