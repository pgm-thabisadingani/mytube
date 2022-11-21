import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

console.log(process.env.API_KEY);

const firebaseConfig = {
  // apiKey: process.env.GOOGLE_KEY,
  apiKey: 'AIzaSyDo8ffc553431WKskyciV1CvCbqBOd4Fqg',
  authDomain: 'video-c4319.firebaseapp.com',
  projectId: 'video-c4319',
  storageBucket: 'video-c4319.appspot.com',
  messagingSenderId: '984190821294',
  appId: '1:984190821294:web:8833a9fce8d76f90bd9e3f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
