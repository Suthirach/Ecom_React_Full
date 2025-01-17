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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Login</h1>
  
        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="border border-gray-300 rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
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
              className="border border-gray-300 rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              onChange={handleOnChange}
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
  
          {/* Submit Button */}
          <button
            className="w-full bg-orange-400 text-white font-bold py-3 text-lg rounded-lg hover:bg-orange-500 transition-all duration-200"
            type="submit"
          >
            Login
          </button>
        </form>
  
        {/* Additional Links */}
        <div className="text-center mt-8 text-gray-600">
          <p>
            Don't have an account?{" "}
            <a href='register' className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
  
  
  


  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
  //     <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
  //       {/* Header */}
  //       <h2 className="text-2xl font-bold text-gray-800 text-center">
  //         Welcome Back!
  //       </h2>
  //       <p className="text-gray-500 text-center mb-6">
  //         Please login to your account
  //       </p>

  //       {/* Form */}
  //       <form className="space-y-6">
  //         {/* Email Input */}
  //         <div className="relative">
  //           <input
  //             type="email"
  //             id="email"
  //             className="peer w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-800 placeholder-transparent"
  //             placeholder="Email Address"
  //             required
  //           />
  //           <label
  //             htmlFor="email"
  //             className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-200 peer-focus:top-1 peer-focus:text-sm peer-focus:text-indigo-500"
  //           >
  //             Email Address
  //           </label>
  //         </div>

  //         {/* Password Input */}
  //         <div className="relative">
  //           <input
  //             type="password"
  //             id="password"
  //             className="peer w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-800 placeholder-transparent"
  //             placeholder="Password"
  //             required
  //           />
  //           <label
  //             htmlFor="password"
  //             className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-200 peer-focus:top-1 peer-focus:text-sm peer-focus:text-indigo-500"
  //           >
  //             Password
  //           </label>
  //         </div>

  //         {/* Remember Me & Forgot Password */}
  //         <div className="flex items-center justify-between">
  //           <label className="flex items-center text-gray-600">
  //             <input
  //               type="checkbox"
  //               className="text-indigo-500 focus:ring-2 focus:ring-indigo-400 rounded"
  //             />
  //             <span className="ml-2 text-sm">Remember Me</span>
  //           </label>
  //           <a href="#" className="text-sm text-indigo-500 hover:underline">
  //             Forgot Password?
  //           </a>
  //         </div>

  //         {/* Login Button */}
  //         <button
  //           type="submit"
  //           className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded shadow-lg transition"
  //         >
  //           Login
  //         </button>
  //       </form>

  //       {/* Divider */}
  //       <div className="flex items-center my-6">
  //         <div className="flex-grow border-t border-gray-300"></div>
  //         <span className="px-4 text-gray-400 text-sm">OR</span>
  //         <div className="flex-grow border-t border-gray-300"></div>
  //       </div>

  //       {/* Social Login Buttons */}
  //       <div className="flex space-x-4">
  //         <button
  //           className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded flex items-center justify-center shadow-lg transition"
  //         >
  //           <svg
  //             className="w-5 h-5 mr-2"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="currentColor"
  //             viewBox="0 0 24 24"
  //           >
  //             <path d="M22.675 0h-21.35C.573 0 0 .573 0 1.278v21.445C0 23.428.573 24 1.278 24H12.82v-9.294H9.692V11.07h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.465.098 2.797.143v3.24H17.42c-1.515 0-1.808.72-1.808 1.776v2.33h3.617l-.47 3.636h-3.147V24h6.168c.704 0 1.277-.572 1.277-1.277V1.278C24 .573 23.428 0 22.675 0z" />
  //           </svg>
  //           Facebook
  //         </button>
  //         <button
  //           className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded flex items-center justify-center shadow-lg transition"
  //         >
  //           <svg
  //             className="w-5 h-5 mr-2"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="currentColor"
  //             viewBox="0 0 24 24"
  //           >
  //             <path d="M24 12.275c0-.851-.075-1.675-.214-2.475H12v4.698h6.624c-.288 1.5-1.184 2.775-2.518 3.625v3.013h4.065c2.376-2.188 3.742-5.412 3.742-9.861zM12 24c3.24 0 5.96-1.076 7.948-2.906l-4.065-3.012c-1.125.75-2.57 1.194-3.883 1.194-2.98 0-5.507-2.012-6.41-4.712H1.402v2.963C3.399 21.674 7.375 24 12 24zM5.59 14.563A7.457 7.457 0 014.992 12c0-.875.15-1.725.418-2.563V6.474H1.402A11.967 11.967 0 000 12c0 1.975.474 3.837 1.402 5.525l4.188-2.962zm6.41-10.95c1.314 0 2.5.45 3.428 1.338l2.571-2.576C15.65 1.402 13.93.725 12 .725 7.375.725 3.399 3.05 1.402 6.474l4.188 3.037C6.493 6.837 9.02 4.825 12 4.825z" />
  //           </svg>
  //           Google
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // )
};










export default Login;
