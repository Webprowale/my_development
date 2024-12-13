import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../FirebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore"

const auth = getAuth(app);

export const register = async(email, password)=>{
  try{
    var response = createUserWithEmailAndPassword(auth, email, password)
    return response;
  }
  catch(error){
    return error;
  }
}

export const login = async(email, password)=>{
    try{
        var response = signInWithEmailAndPassword(auth, email, password)
        return response;
    }
    catch(error){
        return error;
    }
}