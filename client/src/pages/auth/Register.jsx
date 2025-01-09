import React,{ useState } from "react";
import axios from "axios"
import { toast } from 'react-toastify';

const Register = () => {

  const [ form,setForm ] = useState({
    email:" ",
    password:" ",
    confirmPassword:" "
  })

  const handleOnChange =(e)=>{
    //code 
    // console.log(e.target.name , e.target.value)
    setForm({
      ...form,
      [e.target.name]:e.target.value  
    })
  }
  //Password is not Macth!! 
  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(form.password !== form.confirmPassword){
      return toast.error('Password is not Macth!!')
    }
    console.log(form)
    // Send to Backj
    try {
      // code ยังไม่แน่ใจ กลับมาดู มันErr แต่ไม่ Res. ที่ส่งกลับมาจากหลัวบ้าน (เปิดเซอร์แล้วมีRes.กลับมา)
      const res = await axios.post('http://localhost:5000/api/register', form)
      toast.success(res.data)  
      console.log(res)


    }
    catch(err){
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(errMsg)
      console.log(err)
      
    }
  }

  return (
    <div>
      Register
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

        Confirm Password 
        <input 
        className="border" 
        onChange={handleOnChange}
        name="confirmPassword" 
        type="text"
        />

        <button className="bg-blue-500  rounded-sm">Register</button>


      </form>
    </div>
  );
};

export default Register;
