import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useEcomStore from "../store/ecom-store";

const MainNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // ใช้เพื่อดึงเส้นทางปัจจุบัน

    // เช็คว่าเส้นทางปัจจุบันคือ "/shop" หรือไม่
    const isShopPage = location.pathname === "/shop";
    const isloginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/register";

    const carts = useEcomStore((state) => state.carts);

    return (
        <nav className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <Link
                        to={"/"}
                        className="text-2xl font-bold hover:text-gray-300 hover:transition"
                    >
                        <div className="flex items-center space-x-2  hover:transform hover:scale-110">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="50"
                                height="50"
                                viewBox="0 0 100 100"
                            >
                                <path
                                    d="M15.994,95.953c-4.411,0-8-3.589-8-8V49.39 c0-5.022,2.641-9.162,6.989-11.348V23.143c0-9.586,6.698-17.096,15.249-17.096c4.773,0,9.102,2.365,11.938,6.359 c3.211-0.268,6.503-0.403,9.825-0.403c3.325,0,6.603,0.136,9.781,0.405c2.83-3.996,7.162-6.361,11.951-6.361 c8.551,0,15.249,7.51,15.249,17.096v14.879c4.373,2.18,7.028,6.326,7.028,11.368v38.563c0,4.411-3.589,8-8,8H15.994z"
                                    opacity=".35"
                                ></path>
                                <path
                                    fill="#f2f2f2"
                                    d="M13.994,93.953c-4.411,0-8-3.589-8-8V47.39c0-5.022,2.641-9.162,6.989-11.348V21.143 c0-9.586,6.698-17.096,15.249-17.096c4.773,0,9.102,2.365,11.938,6.359c3.211-0.268,6.503-0.403,9.825-0.403 c3.325,0,6.603,0.136,9.781,0.405c2.83-3.996,7.162-6.361,11.951-6.361c8.551,0,15.249,7.51,15.249,17.096v14.879 c4.373,2.18,7.028,6.326,7.028,11.368v38.563c0,4.411-3.589,8-8,8H13.994z"
                                ></path>
                                <path
                                    fill="#2785bd"
                                    d="M86.006,74.583c0,0,0-14.452,0-18.876c0-1.806,2.796-6.82,1.795-7.777 c-1.127-1.077-6.094,2.018-6.667,2.018c-2.681,0-6.498,4.512-6.498,7.681v16.955H86.006z M13.994,74.583c0,0,0-14.452,0-18.876 c0-2.796-1.803-6.157-0.292-6.917c0.564-0.283,4.87,1.158,5.164,1.158c2.681,0,6.498,4.512,6.498,7.681v16.955H13.994z"
                                ></path>
                                <path
                                    fill="#96c362"
                                    d="M20.604,39.865c-3.582,0-6.61,4.17-6.61,7.524c0,3.146,0.322,5.931,0.815,8.395H14.79 c0.114,0.606,0.246,1.175,0.398,1.743c2.104,8.262,6.31,12.45,7.466,13.341c3.259,2.52,6.5,1.687,6.5,1.687s0-8.243,0-10.063 v-4.965v-8.452C29.155,46.309,24.167,39.865,20.604,39.865z"
                                ></path>
                                <path
                                    fill="#96c362"
                                    d="M86.006,47.389c0-3.354-2.621-8.434-6.202-8.434c-3.563,0-8.958,7.354-8.958,10.121v8.452v4.965 c0,1.819,0,10.063,0,10.063s3.241,0.834,6.5-1.687c1.156-0.891,5.363-5.079,7.466-13.341c0.152-0.569,0.284-1.137,0.398-1.743 h-0.019C85.683,53.321,86.006,50.535,86.006,47.389z"
                                ></path>
                                <path
                                    fill="#d9eeff"
                                    d="M78.978,21.143v36.385H20.983V21.143c0-5.094,3.19-9.096,7.249-9.096c3.48,0,6.562,1.181,7.329,5.2 c9.333-1.311,18.575-0.622,27.978,0.742c0.744-4.038,4.709-5.942,8.189-5.942C75.788,12.047,78.978,16.049,78.978,21.143z"
                                ></path>
                                <path
                                    fill="#ffc7a3"
                                    d="M72.74,37.63c0,7.978-9.985,14.213-22.74,14.213S27.26,45.608,27.26,37.63S37.245,23.417,50,23.417 S72.74,29.652,72.74,37.63z M13.994,74.583h7.58v11.37h-7.58V74.583z M78.425,74.583h7.58v11.37h-7.58V74.583z"
                                ></path>
                                <circle
                                    cx="63.265"
                                    cy="32.892"
                                    r="1.895"
                                    fill="#40396e"
                                ></circle>
                                <circle
                                    cx="36.735"
                                    cy="32.892"
                                    r="1.895"
                                    fill="#40396e"
                                ></circle>
                                <path
                                    fill="#40396e"
                                    d="M50.002,40.472c-3.29,0-6.343-0.775-8.588-2.185c-0.887-0.555-1.154-1.724-0.599-2.611 c0.559-0.887,1.728-1.152,2.613-0.599c1.626,1.02,4.023,1.605,6.574,1.605c2.549,0,4.942-0.586,6.574-1.605 c0.885-0.555,2.056-0.288,2.611,0.601c0.555,0.887,0.286,2.056-0.601,2.611C56.339,39.697,53.288,40.472,50.002,40.472z"
                                ></path>
                                <path
                                    fill="#fce602"
                                    d="M78.978,51.843v34.111H20.983V51.843l2.977,1.145c6.669,2.53,16.161,3.997,26.02,3.997 S69.331,55.517,76,52.987L78.978,51.843z"
                                ></path>
                                <path
                                    fill="#40396e"
                                    d="M71.728,12.047c4.06,0,7.249,4.002,7.249,9.096l0,19.486c0,0.954,0.661,1.795,1.597,1.981 c2.075,0.413,5.431,1.589,5.431,4.779c0,2.239,0,7.518,0,8.317c0,4.425,0,18.876,0,18.876v10.37c0,0.552-0.448,1-1,1h-6.028h-0.552 H21.575h-0.591h-5.989c-0.552,0-1-0.448-1-1v-10.37c0,0,0-14.452,0-18.876c0-0.799,0-6.079,0-8.317c0-3.375,3.29-4.476,5.356-4.829 c0.95-0.162,1.633-1.001,1.633-1.965l0-19.452c0-5.094,3.19-9.096,7.249-9.096c3.03,0,5.558,2.222,6.667,5.45 c0.301,0.876,1.2,1.385,2.119,1.273c4.176-0.508,8.574-0.768,12.978-0.768c4.376,0,8.758,0.256,12.933,0.778 c0.925,0.116,1.83-0.397,2.13-1.28C66.159,14.265,68.701,12.047,71.728,12.047 M71.728,9.047c-4.015,0-7.518,2.632-9.198,6.663 c-4.014-0.47-8.218-0.707-12.534-0.707c-4.296,0-8.514,0.235-12.574,0.699c-1.695-4.025-5.196-6.655-9.19-6.655 c-5.747,0-10.249,5.313-10.249,12.096v18.453c-4.267,0.814-6.989,3.743-6.989,7.794c0,1.985,0,7.476,0,8.317v18.876v11.37 c0,1.657,1.343,3,3,3h72.011c1.657,0,3-1.343,3-3v-11.37V55.706c0-0.841,0-6.332,0-8.317c0-4.063-2.738-6.998-7.028-7.801V21.143 C81.978,14.36,77.475,9.047,71.728,9.047L71.728,9.047z"
                                ></path>
                            </svg>
                            <h1>FinnShop</h1>
                        </div>
                    </Link>
                </div>

                {/* Links - Desktop */}

                {/* {!isRegisterPage && ( */}
                    <div className="  items-center ">
                        <Link
                            to={"/"}
                            className="hover:text-gray-300 transition p-4"
                        >
                            Home
                        </Link>
                        <Link
                            to={"shop"}
                            className="hover:text-gray-300 transition p-4"
                        >
                            Shop
                        </Link>

                        {/* Badge */}
                        <Link
                            to={"cart"}
                            className="hover:text-gray-300 transition  p-4"
                        >
                            Cart
                            {
                                carts.length > 0 && (
                                    <span className=" w-5 text-center absolute top-6 right-300 bg-red-500  text-sm rounded-full hover:decoration-slate-100 hover:scale-125 ">{carts.length}</span>
                                )
                            }
                            
                        </Link>
                    </div>
                {/* )} */}

                {/* Search Box - Hide on Shop Page */}
                {/* {!isShopPage && (
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
                    )} */}

                {/* Auth Buttons */}
                <div className=" md:flex space-x-4">
                    {!isRegisterPage && (
                        <Link
                            to={"register"}
                            className="shadow-lg bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
                        >
                            Register
                        </Link>
                    )}

                    {!isloginPage && (
                        <Link
                            to={"login"}
                            className="border shadow-lg border-white hover:bg-white hover:text-orange-500 px-4 py-2 rounded-lg transition"
                        >
                            Login
                        </Link>
                    )} 
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
                                d={
                                    isOpen
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M4 6h16M4 12h16M4 18h16"
                                }
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white text-gray-800 shadow-lg">
                    <Link
                        to={"/"}
                        className="block px-4 py-2 hover:bg-gray-100"
                    >
                        Home
                    </Link>
                    <Link
                        to={"shop"}
                        className="block px-4 py-2 hover:bg-gray-100"
                    >
                        Shop
                    </Link>
                    <Link
                        to={"cart"}
                        className="block px-4 py-2 hover:bg-gray-100"
                    >
                        Cart
                    </Link>
                    <Link
                        to={"register"}
                        className="block px-4 py-2 hover:bg-gray-100"
                    >
                        Register
                    </Link>
                    <Link
                        to={"login"}
                        className="block px-4 py-2 hover:bg-gray-100"
                    >
                        Login
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default MainNav;
