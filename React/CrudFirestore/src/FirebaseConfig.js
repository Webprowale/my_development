import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyD35cqGRCaCU7rKBOynQlchoYhH8LAeZXk",
  authDomain: "crudfirestore-75e11.firebaseapp.com",
  projectId: "crudfirestore-75e11",
  storageBucket: "crudfirestore-75e11.appspot.com",
  messagingSenderId: "856613721870",
  appId: "1:856613721870:web:e5a008e15ff55237efe95f"
};

 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app)
 export const storage = getStorage(app)