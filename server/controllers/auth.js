import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';

// api resquest are async functions

/*SIGN UP*/
export const signup = async (req, res, next) => {
  try {
    // use the User model ( schema )
    // take everything from body and encrypt password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    //save to mongodb
    await newUser.save();
    res.status(200).send('user have been created');
  } catch (err) {
    next(err);
  }
};

/*SIGN IN*/
export const signin = async (req, res, next) => {
  try {
    // find the user using mongo db method findOne()
    const user = await User.findOne({
      name: req.body.name,
    });
    if (!user) return next(createError(404, 'User not found'));

    // compare user usning findOne to te DB user
    const isCorrent = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrent) return next(createError(404, 'Wrong Credetails'));

    //user _id coz mongo db (id) is given _id
    // creating a hash token to send to a user
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);

    // separate/hide the password from the rest of the object before sending it to a userId
    const { password, ...rest } = user._doc;

    //httpOnly: secures our application, 3rd party script wont be use use our cookie
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};

/*GOOGLE SIGN IN*/
export const googleAuth = async (req, res, next) => {
  try {
    // find/check the user using mongo db method findOne(email adress) if the user alredy has an account
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        //user model/schema key: value
        fromGoogle: true,
      });
      //save the user
      const savedUser = await newUser.save();
      // create a token and send the user
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        // nother ...rest but _doc
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
