import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard,Wrench,NotebookText,Box,LogOut } from 'lucide-react';

const SidebarAdmin = () => {
  return (
    <div className='bg-gray-800 w-64 text-gray-50 flex flex-col h-screen'>

        <div className='h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold'>
            Admin Panal
        </div>

        <nav className='flex-1 px-4 py-4 space-y-2'>
            <NavLink to={'/admin'} end className={({ isActive })=>
                isActive 
                ? 'bg-gray-900 text-white  px-4 py-2 flex  hover:text-white items-center rounded-md' 
                : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center ' 
                 }>
                <LayoutDashboard className='mr-2'/> 
                Dashboard 
            </NavLink>   

            <NavLink to={'Manage'} className={({ isActive })=>
                isActive 
                ? 'bg-gray-900 text-white  px-4 py-2 flex  hover:text-white items-center rounded-md' 
                : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center ' 
                 }>
                <Wrench className='mr-2' /> 
                Manage
            </NavLink>        

            <NavLink to={'Category'} className={({ isActive })=>
                isActive 
                ? 'bg-gray-900 text-white  px-4 py-2 flex  hover:text-white items-center rounded-md' 
                : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center ' 
                 }>
                <NotebookText className='mr-2' /> 
                Category
            </NavLink> 
                   
            <NavLink to={'Product'} className={({ isActive })=>
                isActive 
                ? 'bg-gray-900 text-white  px-4 py-2 flex  hover:text-white items-center rounded-md' 
                : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center ' 
                 }>
                <Box className='mr-2' /> 
                Product
            </NavLink> 

        
        </nav>

        <div>
            <NavLink  className={({ isActive })=>
                isActive 
                ? 'bg-gray-900 text-white  px-4 py-2 flex  hover:text-white items-center rounded-md' 
                : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center ' 
                 }>
                
                <LogOut className='mr-2'/>
               Logout
            </NavLink>
        </div>
    </div>
  )
}

export default SidebarAdmin