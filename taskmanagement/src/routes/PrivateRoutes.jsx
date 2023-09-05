import React from 'react'
import { useNavigate } from 'react-router-dom';
import Home from '../component/Home';

const PrivateRoutes = ({children}) => {

    let isLogin = false;
    let Navigate  = useNavigate()
    if(!isLogin) {
        console.log("login render");
        return Navigate(<Home/>);
    }else{
        console.log("children render");
        
        return children
    }
}

export default PrivateRoutes