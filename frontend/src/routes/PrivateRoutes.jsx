import React , {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Home from '../component/Home';
import { Appcontext } from '../ContextProvider/AppcontextProvider';
import AuthenticationLayoutPage from '../AuthenticationPages/AuthenticationLayoutPage';
const PrivateRoutes = ({children}) => {
    let { isauth } = useContext(Appcontext);
    // let isLogin = true;
    console.log(isauth, "auth");
    let Navigate  = useNavigate()
    if(!isauth) {
        console.log("login render");
        return Navigate("/");
    }else{
        console.log("children render");
        
        return children
    }
}

export default PrivateRoutes