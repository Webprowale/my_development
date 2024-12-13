import { createContext, useContext, useState, useEffect } from "react";
import { account } from "../Appwrite";

const userContext = createContext();

export function useUser(){
    return useContext(userContext);

}

export function UserProvider(props){
    const [user, setUser] = useState(null);

    async function login(email, password){
      const LoggedIn = await account.createEmailSession(email, password);
      setUser(LoggedIn);
    }

    async function logout(){
        await account.deleteSession("current");
        setUser(null);
    }
    async function register(email, password){
        await account.create(email,password);
         await login(email, password);
    }

    async function init(){

        try{
            const loggedIn = await account.get();
            setUser(loggedIn);
        }
        catch(err){
            setUser(null);
        }
    }

    useEffect(()=>{
        init();
    }, []);

    return(
        <userContext.Provider value={{current: user, login, logout, register}}>
          {props.children}
        </userContext.Provider>
    );
    
    
}