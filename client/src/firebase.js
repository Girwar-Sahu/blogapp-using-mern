
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-d1c6e.firebaseapp.com",
  projectId: "mern-blog-d1c6e",
  storageBucket: "mern-blog-d1c6e.appspot.com",
  messagingSenderId: "115596090",
  appId: "1:115596090:web:7abeeea4f349e5c8064e03",
};

export const app = initializeApp(firebaseConfig);
