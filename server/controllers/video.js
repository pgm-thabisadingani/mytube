import { createError } from '../error.js';
import User from '../models/User.js';
import Video from './../models/Video.js';

// CREATE A VIDEO FUNCTION
export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.params.id, ...req.body });
  try {
    const saveVideo = await newVideo.save();
    res.status(200).json(saveVideo);
  } catch (err) {
    next(err);
  }
};

// GET VIDEO FUNCTION
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

// UPDATE FUNCTION (VIDEO)
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, 'Video not found'));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        }, // newest version of our user
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, 'You can update only your own video!'));
    }
  } catch (err) {
    next(err);
  }
};

// DELETE A VIDEO FUNCTION
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, 'Video not found!'));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json('Video has been deleted successfully');
    } else {
      return next(createError(403, 'You can update only your own video!'));
    }
  } catch (err) {
    next(err);
  }
};

// VIDEO VIEWS FUNCTION
export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      // increase by 1 using property (views)
      $inc: { views: 1 },
    });
    res.status(200).json('The view has been increased.');
  } catch (err) {
    next(err);
  }
};

// TRENDING VIDEO FUNCTION (VIDEO)
export const trend = async (req, res, next) => {
  try {
    // this will bring the most viewed video (-1) while (1) is the less viewed videos
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// RADOM VIDEO FUNCTION
export const random = async (req, res, next) => {
  try {
    // aggregate is a mongo db method, this will return 40 random videos
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// SUBSCRIBED FUNCTION
export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    // fint subscribed channels
    const subscribedChannels = user.subscribedUsers;

    // promise return not only one channel but all channels
    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        // if userId equals to channelId
        return await Video.find({ userId: channelId });
      })
    );

    // javaScript (flat) method is to prevent getting an nested array from [[{}]] to [{}]
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

// VIDEO-BY-ID  FUNCTION
export const getByTag = async (req, res, next) => {
  // use the express tag and separate them using Js split method
  const tags = req.query.tags.split(',');
  try {
    // look tag array, then using ($in method) you check if a certain tag is there of not (tags)
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// VIDE SEARCH FUNCTION
export const search = async (req, res, next) => {
  // query: videos/search?q=TH
  const query = req.query.q;
  try {
    //$regex: is for any key letter of words that match the title,
    //$options: 'i': prevent string case sensitivity (upper or lower case)
    const videos = await Video.find({
      title: { $regex: query, $options: 'i' },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
