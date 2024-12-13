import React from "react";
import { app } from "../../FirebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

const auth = getAuth(app);

export const loginAuth= async(email, password)=>{
    try{
     var response = await signInWithEmailAndPassword(auth, email, password)
     return response;
    }catch(error){
        return error;
    }
    
}

export const registerAuth = async(email, password)=>{
    try{
        var response = await createUserWithEmailAndPassword(auth, email, password)
        return response;
    }
    catch(error){
        return error;
    }
}

