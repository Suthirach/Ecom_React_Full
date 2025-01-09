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
    <div>
      login
      <form onSubmit={handleSubmit}>
        
        Email
        <input 
        className="border" 
        onChange={handleOnChange}
        name="email" 
        type="email"
        />

        Password 
        <input 
        className="border" 
        onChange={handleOnChange}
        name="password" 
        type="text"
        />

        <button className="bg-green-500 rounded-sm">login</button>


      </form>
    </div>
  );
};

export default Login;
