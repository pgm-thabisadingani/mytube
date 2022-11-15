// avoid error => package.jsoc add type: "module"
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_KEY)
    .then(() => {
      console.log('connected to db');
    })
    .catch((err) => {
      throw err;
    });
};

// port to listen to
app.listen(8800, () => {
  connect();
  console.log('conected to server');
});
