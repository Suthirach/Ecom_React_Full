import React,{ useState } from "react";
import axios from "axios"
import { toast } from 'react-toastify';
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate( )
  const actionLognin = useEcomStore((state)=>state.actionLognin)
  const user = useEcomStore((state)=>state.user)
  console.log( 'user form zutand',user)

  const [ form,setForm ] = useState({
    email:" ",
    password:" ",
  })

  const handleOnChange =(e)=>{
    //code 
    // console.log(e.target.name , e.target.value)
    setForm({
      ...form,
      [e.target.name]:e.target.value  
    })
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    try{
      const res = await actionLognin(form)
      const role = res.data.payload.role
      // console.log( 'role',role)
      roleRedirect(role)
      toast.success( 'Welcome Back')
    }catch(err){
      console.log(err)
      const errMsg = err.response?.data?.massage
      toast.error(errMsg)
    }
  }

  const roleRedirect = (role)=> { 
    if(role === 'admin'){
      navigate('/admin')
    } else {
      navigate('/user')
    }
  }

  return (
    <div className="m-2" >
      <p className="p-2 text-2xl">login </p>
      <form  className="flex space-x-4 p-5" onSubmit={handleSubmit}>
        
        <h1 className="items-center flex flex-row ">Email</h1>
        <input 
        className="border rounded" 
        onChange={handleOnChange}
        name="email" 
        type="email"
        />

        <h2 className="items-center flex flex-row">Password</h2> 
        <input 
        className="border rounded "
        onChange={handleOnChange}
        name="password" 
        type="text"
        />

        <button className="flex flex-row m-1 text-teal-900 bg-teal-300 rounded-md items-center p-1">login</button>


      </form>
    </div>
  );
};

export default Login;
