// import React from "react";
import { Link } from "react-router-dom";

// const MainNav = () => {
//   return (
//     <nav className="bg-green-300">
//       <div className="mx-auto px-4">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center gap-4">
//             <Link to={"/"} className="text-2xl font-bold">LOGO</Link>
//             <Link to={"/"}>Home</Link>
//             <Link to={"shop"}>Shop</Link>
//             <Link to={"cart"}>Cart</Link>
//           </div>

//           <div className="flex items-center gap-4">
//             <Link to={"register"}>Register</Link>
//             <Link to={"login"}>Login</Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default MainNav;

import React, { useState } from "react";

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a  className="hover:text-gray-300">
          <Link to={"/"} className="text-2xl font-bold">LOGO</Link>
          </a>
        </div>

        {/* Links - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-gray-300 transition"><Link to={"/"}>Home</Link></a>
          <a href="#" className="hover:text-gray-300 transition"><Link to={"shop"}>Shop</Link></a>

          {/* Dropdown Menu */}
          {/* <div className="relative group">
            <button className="hover:text-gray-300 transition">
              Categories
            </button>
            <div className="absolute hidden group-hover:block bg-white text-gray-800 shadow-lg rounded mt-2 w-40">
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Electronics
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Clothing
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Accessories
              </a>
            </div>
          </div> */}

          <a href="#" className="hover:text-gray-300 transition">
            <Link to={"cart"}>Cart</Link>
          </a>
        </div>

        {/* Search Box */}
        <div className="hidden md:flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-l border-none focus:outline-none text-gray-800"
          />
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r text-white">
            Search
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
       <a
            
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
          >
            <Link to={"register"}>Register</Link>
          </a>   
          <a
            href="#"
            className="border border-white hover:bg-white hover:text-blue-500 px-4 py-2 rounded transition"
          >
            <Link to={"login"}>Login</Link>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white text-gray-800 shadow-lg">
          <a className="block px-4 py-2 hover:bg-gray-100">
              <Link to={"/"}>Home</Link>
          </a>
          <a className="block px-4 py-2 hover:bg-gray-100">
              <Link to={"shop"}>Shop</Link>
          </a>
          <a className="block px-4 py-2 hover:bg-gray-100">
              <Link to={"cart"}>Cart</Link>
          </a>


          <a className="block px-4 py-2 hover:bg-gray-100">
              <Link to={"register"}>Register</Link>
          </a>
          <a className="block px-4 py-2 hover:bg-gray-100">
              <Link to={"login"}>Login</Link>
          </a>
        </div>
      )}
    </nav>
  );
};


export default MainNav;
