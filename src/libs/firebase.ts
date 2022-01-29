import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBRKYFRl_0f1a5HwHgsAmj1Acx8mPoGHpw",
//   authDomain: "d5reactgallery-68060.firebaseapp.com",
//   projectId: "d5reactgallery-68060",
//   storageBucket: "d5reactgallery-68060.appspot.com",
//   messagingSenderId: "361451390156",
//   appId: "1:361451390156:web:4e0075aac17612cc7c6e69",
// };

const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
