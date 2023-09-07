import React, { createContext, useEffect, useState } from 'react'
export let Appcontext=createContext();

const AppcontextProvider = ({children}) => {

let [isauth,setisauth]=useState(false);
useEffect(()=>{
    if (localStorage.getItem("token")){
        setisauth(true)
        }else{
        setisauth(false);
        }
},[])
return(
    <Appcontext.Provider value={{isauth,setisauth}}>
        {children}
    </Appcontext.Provider>
)

}

export default AppcontextProvider