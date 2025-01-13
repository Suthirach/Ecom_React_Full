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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Register
        </h1>
  
        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="border border-gray-300 rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={handleOnChange}
              name="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
  
          {/* Password Field */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="border border-gray-300 rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={handleOnChange}
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
  
          {/* Confirm Password Field */}
          <div className="flex flex-col">
            <label
              className="text-gray-700 font-medium mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              className="border border-gray-300 rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={handleOnChange}
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
            />
          </div>
  
          {/* Submit Button */}
          <button
            className="w-full bg-purple-500 text-white font-bold py-3 text-lg rounded-lg hover:bg-purple-600 transition-all duration-200"
            type="submit"
          >
            Register
          </button>
        </form>
  
        {/* Additional Links */}
        <div className="text-center mt-8 text-gray-600">
          <p>
            Already have an account?{" "}
            <a href="login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
  
  // return (
  //   <div>
  //     Register
  //     <form onSubmit={handleSubmit}>
        
  //       Email
  //       <input 
  //       className="border" 
  //       onChange={handleOnChange}
  //       name="email" 
  //       type="email"
  //       />

  //       Password 
  //       <input 
  //       className="border" 
  //       onChange={handleOnChange}
  //       name="password" 
  //       type="text"
  //       />

  //       Confirm Password 
  //       <input 
  //       className="border" 
  //       onChange={handleOnChange}
  //       name="confirmPassword" 
  //       type="text"
  //       />

  //       <button className="bg-blue-500  rounded-sm">Register</button>


  //     </form>
  //   </div>
  // );
};

export default Register;
