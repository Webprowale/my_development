import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCNNee5LQAyS5qsSmYCZziYlcq7A0y-5cw",
  authDomain: "linkedin-clone-e33d3.firebaseapp.com",
  projectId: "linkedin-clone-e33d3",
  storageBucket: "linkedin-clone-e33d3.appspot.com",
  messagingSenderId: "474660937736",
  appId: "1:474660937736:web:77f4e10dffb54f6dd0f1bd",
  measurementId: "G-4ZVJZJLE3N"
};


 const app = initializeApp(firebaseConfig);
 const  auth = getAuth(app);
 export { auth, app};

// const analytics = getAnalytics(app);