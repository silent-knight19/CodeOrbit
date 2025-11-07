import React,{ createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth=()=>{
return useContext(AuthContext);
};

export const AuthProvider=({children})=>{
    const [currentUser,setcurrentUser]=useState(null);
    useEffect(()=>{
        const storedUserId=localStorage.getItem("userId");
        if(storedUserId){
            setcurrentUser(storedUserId);
        }
    },[]);
    const value={currentUser,setcurrentUser};
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};