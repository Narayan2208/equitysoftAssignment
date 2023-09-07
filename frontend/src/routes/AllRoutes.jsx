import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import Home from '../component/Home'
import AuthenticationLayoutPage from '../AuthenticationPages/AuthenticationLayoutPage'
const AllRoutes = () => {
    let routes = [
        { path: '/home',
        
        element:( 
        <PrivateRoutes>
         <Home/>
        </PrivateRoutes>)
    },
    { path: '/', element: <AuthenticationLayoutPage/>},
    ]
  return (
    <Routes>
        {routes.map((e, id)=>{
            return <Route path={e.path} key={id}  element={e.element} />
        })}
    </Routes>
  )
}

export default AllRoutes