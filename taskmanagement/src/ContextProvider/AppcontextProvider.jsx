import React, { createContext, useState } from 'react'
export let Appcontext=createContext();

const AppcontextProvider = ({children}) => {

let [isauth,setisauth]=useState(false);

return(
    <Appcontext.Provider value={{isauth,setisauth}}>
        {children}
    </Appcontext.Provider>
)

}

export default AppcontextProvider