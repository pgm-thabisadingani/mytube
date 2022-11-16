// avoid error => package.jsoc add type: "module"
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

//routes
import userRoutes from './routes/users.js';
import commentRoutes from './routes/comments.js';
import videoRoutes from './routes/videos.js';
import authRoutes from './routes/auth.js';

// to enable cookies
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_KEY)
    .then(() => {
      console.log('connected to db');
    })
    .catch((err) => {
      throw err;
    });
};

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/videos', videoRoutes);

// Error handling in Express middlewre for the entire app
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// port to listen to
app.listen(8800, () => {
  connect();
  console.log('conected to server');
});
