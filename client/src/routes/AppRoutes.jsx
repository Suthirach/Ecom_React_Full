// rafce 
import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import  Home  from '../pages/Home'
import  Shop  from '../pages/Shop'
import  Cart  from '../pages/Cart'
import  History  from '../pages/History'
import  HomeUser  from '../pages/user/HomeUser'
import  Login  from '../pages/auth/Login'
import  Register from '../pages/auth/Register'
import  Category  from '../pages/admin/Category'
import  DashBoard  from '../pages/admin/DashBoard'
import  Product  from '../pages/admin/Product'
import Checkout from '../pages/Checkout'
import Layout from '../layouts.jsx/Layout'
import LayoutAdmin from '../layouts.jsx/LayoutAdmin'
import LayoutUser from '../layouts.jsx/LayoutUser'
import Manage from '../pages/admin/Manage'
import ProtectRouterUser from './ProtectRouterUser'
import ProtectRouterAdmin from './ProtectRouterAdmin'



const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
          { index: true, element: <Home />},
          { path: 'shop', element: <Shop /> },
          { path: 'cart', element: <Cart />},
          { path: 'history', element: <History />},
          { path: 'checkout', element: <Checkout />},
          { path: 'login', element: <Login />},
          { path: 'register', element: <Register/>},
        ]
      },
      {
        path: '/admin',
        element: <ProtectRouterAdmin element={<LayoutAdmin/>}/>,
        children:[
            { index: true, element: <DashBoard />},
            { path: 'category', element: <Category />},
            { path: 'product', element: <Product />}, 
            { path: 'manage', element: <Manage />} 
            
          ]
        },
      {
        path: '/user',
        // element:<LayoutUser/>,
         element: <ProtectRouterUser element={<LayoutUser/>}/>,
        children:[ 
          { index:true, element: <HomeUser />},

        ]

      }, 

])  

console.log
const AppRoutes = () => {
  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes