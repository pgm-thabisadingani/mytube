import jwt from 'jsonwebtoken';
import { createError } from './error.js';

// This verifyToken function will act as a middlewre for our CRUD
export const verifyToken = (req, res, next) => {
  // get the access token from aftr log in
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, 'You are not authenticated'));

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return next(createError(403, 'Token not valid'));

    // assigning the jwt object to req.user
    req.user = user;
    // after varification continue where we left
    next();
  });
};
