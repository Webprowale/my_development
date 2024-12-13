import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyClc5lCdeLbBCqkgXpul_h7R6jfZCgxxRQ",
  authDomain: "playground-90a11.firebaseapp.com",
  databaseURL: "https://playground-90a11-default-rtdb.firebaseio.com",
  projectId: "playground-90a11",
  storageBucket: "playground-90a11.appspot.com",
  messagingSenderId: "234301451825",
  appId: "1:234301451825:web:c7a32b4ccfbde60668ef10"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);