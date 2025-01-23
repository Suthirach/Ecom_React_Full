import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";

const MainNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // ใช้เพื่อดึงเส้นทางปัจจุบัน

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    // เช็คว่าเส้นทางปัจจุบันคือ "/shop" หรือไม่
    const isShopPage = location.pathname === "/shop";
    const isloginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/register";

    const carts = useEcomStore((state) => state.carts);
    const user = useEcomStore((state) => state.user);
    const logOut = useEcomStore((state) => state.logout);
    // console.log(Boolean(user))

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
                <div className="items-center space-x-4 ">
                    <NavLink
                        to={"/"}
                        className={({ isActive }) =>
                            isActive
                                ? "hover:border-white transition p-4  rounded-lg text-orange-500 w-full bg-white py-2"
                                : "hover:decoration-slate-100 hover:scale-125  p-4  py-2  "
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to={"/shop"}
                        className={({ isActive }) =>
                            isActive
                                ? "hover:border-white transition p-4  rounded-lg text-orange-500 w-full bg-white py-2"
                                : "  hover:decoration-slate-100 hover:scale-125  p-4  py-2 "
                        }
                    >
                        Shop
                    </NavLink>

                    {/* Badge */}
                    <NavLink
                        to={"/cart"}
                        className={({ isActive }) =>
                            isActive
                                ? `hover:border-white transition p-4  rounded-lg text-orange-500 w-full bg-white py-2 `
                                : "hover:decoration-slate-100 hover:scale-125  p-4  py-2 "
                        }
                    >
                        Cart
                        {carts.length > 0 && (
                            <span className="text-white w-5 text-center absolute top-4 right-300 bg-red-500  text-sm rounded-full hover:decoration-slate-100 hover:scale-125 ">
                                {carts.length}
                            </span>
                        )}
                    </NavLink>
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

                {user ? (
                    <div className="h-11 bg-orange-400 md:flex space-x-4 shadow-2xl rounded-full ">
                        <button
                            onClick={toggleDropDown}
                            className="  flex items-center gap-1 px-1"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 61.8 61.8"
                                id="Avatar"
                                className="w-12 h-12 hover:transform hover:scale-110"
                            >
                                <g
                                    fill="#ff9804"
                                    className="color000000 svgShape"
                                >
                                    <g
                                        fill="#ff9804"
                                        className="color000000 svgShape"
                                    >
                                        <circle
                                            cx="30.9"
                                            cy="30.9"
                                            r="30.9"
                                            fill="#e0d358"
                                            className="color58b0e0 svgShape"
                                        ></circle>
                                        <path
                                            fill="#ff6b06"
                                            fill-rule="evenodd"
                                            d="m23.255 38.68 15.907.146v15.602l-15.907-.147V38.68z"
                                            className="color302e33 svgShape"
                                        ></path>
                                        <path
                                            fill="#857c6e"
                                            fill-rule="evenodd"
                                            d="M53.478 51.993A30.813 30.813 0 0 1 30.9 61.8a31.225 31.225 0 0 1-3.837-.237A34.072 34.072 0 0 1 15.9 57.919a31.036 31.036 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 4.535 1.31 10.02 7.439 10.113 7.57.113 8.47-5.475 8.47-10.15l12.79 6.282z"
                                            className="color857a6e svgShape"
                                        ></path>
                                        <path
                                            fill="#ff6b06"
                                            fill-rule="evenodd"
                                            d="M31.462 52.495c-3.342-5.472-9.388-6.287-11.359-6.6-5.42-.86-14.56-4.28-8.564-9.72 10.765-9.764 6.898-22.032 19.513-22.032 13.47 0 8.873 12.268 19.638 22.032 5.997 5.44-3.143 8.86-8.565 9.72a14.292 14.292 0 0 0-10.663 6.6z"
                                            className="color302e33 svgShape"
                                        ></path>
                                        <path
                                            fill-rule="evenodd"
                                            d="M39.964 42.252c-1.125 4.01-4.008 6.397-8.598 6.207-3.94-.163-7.297-2.397-8.11-6.204z"
                                            opacity=".18"
                                            fill="#ff9804"
                                            className="color000000 svgShape"
                                        ></path>
                                        <path
                                            fill="#ffffff"
                                            fill-rule="evenodd"
                                            d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z"
                                            className="colorffe8be svgShape"
                                        ></path>
                                        <path
                                            fill="#fff066"
                                            fill-rule="evenodd"
                                            d="M18.365 24.045c-3.07 1.34-.46 7.687 1.472 7.658a31.973 31.973 0 0 1-1.472-7.658zM44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.993 31.993 0 0 0 1.471-7.658z"
                                            className="colorf9dca4 svgShape"
                                        ></path>
                                        <path
                                            fill="#ffaf3c"
                                            fill-rule="evenodd"
                                            d="M19.113 25.706c-2.83-4.958-2.783-9.375-1.362-11.817 2.048-3.52 4.922-3.688 5.315-4.517 4.025-8.479 24.839-2.048 23.97 11.09a14.798 14.798 0 0 0-1.522-2.486s-.075 4.991-1.437 6.957c-1.64.464-15.061.239-20.053-9.948-4.006 2.268-5.06 7.015-4.91 10.72z"
                                            className="color969696 svgShape"
                                        ></path>
                                        <path
                                            fill="#ffaf3c"
                                            fill-rule="evenodd"
                                            d="M31.15 46.543c-2.66.022-15.617-4.022-12.61-26.045 0 0 .65 9.916 2.775 12.788 1.382 1.868 2.625 2.57 3.82.746 1.248-1.9 3.946-3.473 6.038-1.677 1.737-1.85 4.848-.212 6.084 1.677 1.195 1.823 2.44 1.123 3.822-.746 2.125-2.872 2.586-12.456 2.586-12.456 3.456 23.6-9.855 25.735-12.515 25.713z"
                                            className="color969696 svgShape"
                                        ></path>
                                        <path
                                            fill="#ffffff"
                                            fill-rule="evenodd"
                                            d="M26.527 36.802a7.118 7.118 0 0 1 4.568-2.096 7.29 7.29 0 0 1 4.503 2.099c-.788.525-5.874 1.737-9.071-.003z"
                                            className="colorffe8be svgShape"
                                        ></path>
                                        <path
                                            fill="#7d7262"
                                            fill-rule="evenodd"
                                            d="M26.611 51.297a29.35 29.35 0 0 0-8.171-3.501c-4.778-.758-13.423-1.518-11.271-10.086C12.023 18.38 18.85 3.688 31.457 3.87c12.836.184 19.09 15.8 23.84 33.865 1.904 7.238-6.79 9.313-11.508 10.06A21.129 21.129 0 0 0 36 51.14c-6.963 4.765-1.812 4.7-9.389.158zm4.851 1.198a14.292 14.292 0 0 1 10.663-6.6c5.422-.86 14.562-4.28 8.565-9.72-10.765-9.764-6.167-22.032-19.638-22.032-12.615 0-8.748 12.268-19.513 22.032-5.997 5.44 3.143 8.86 8.564 9.72 1.97.313 8.017 1.127 11.36 6.6z"
                                            className="color7d7062 svgShape"
                                        ></path>
                                        <path
                                            fill="#ff6b06"
                                            fill-rule="evenodd"
                                            d="M24.202 50.213s5.988 3.256 7.588 7.992c1.61-5.121 7.627-8.327 7.627-8.327S33.07 52.33 31.7 55.534c-.973-1.722-2.707-3.4-7.497-5.321z"
                                            className="color302e33 svgShape"
                                        ></path>
                                    </g>
                                </g>
                            </svg>
                            <ChevronDown className="hover:transform hover:scale-125" />
                        </button>

                        {isOpen && (
                            <div className="z-50 absolute mt-4 top-12 bg-white text-orange-500">
                                <Link
                                    to={"/user/history"}
                                    className="block px-2 py-1 hover:bg-gray-200 "
                                >
                                    History
                                </Link>
                                <Link to={"/login"}>
                                    <button
                                        onClick={() => logOut()}
                                        className="block px-2 py-1 hover:bg-gray-200 "
                                    >
                                        Logout
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className=" md:flex space-x-4">
                        {!isRegisterPage && (
                            <Link
                                to={"/register"}
                                className="shadow-lg bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
                            >
                                Register
                            </Link>
                        )}

                        {!isloginPage && (
                            <Link
                                to={"/login"}
                                className="border shadow-lg border-white hover:bg-white hover:text-orange-500 px-4 py-2 rounded-lg transition"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                )}

                {/* Auth Buttons */}
                {/* <div className=" md:flex space-x-4">
                    {!isRegisterPage && (
                        <Link
                            to={"/register"}
                            className="shadow-lg bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
                        >
                            Register
                        </Link>
                    )}

                    {!isloginPage && (
                        <Link
                            to={"/login"}
                            className="border shadow-lg border-white hover:bg-white hover:text-orange-500 px-4 py-2 rounded-lg transition"
                        >
                            Login
                        </Link>
                    )}
                </div> */}

                {/* proflie */}
                {/* <div className="h-11 bg-orange-400 md:flex space-x-4 shadow-2xl rounded-full ">
                    <button
                        onClick={toggleDropDown}
                        className="  flex items-center gap-1 px-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 61.8 61.8"
                            id="Avatar"
                            className="w-12 h-12 hover:transform hover:scale-110"
                        >
                            <g fill="#ff9804" class="color000000 svgShape">
                                <g fill="#ff9804" class="color000000 svgShape">
                                    <circle
                                        cx="30.9"
                                        cy="30.9"
                                        r="30.9"
                                        fill="#e0d358"
                                        class="color58b0e0 svgShape"
                                    ></circle>
                                    <path
                                        fill="#ff6b06"
                                        fill-rule="evenodd"
                                        d="m23.255 38.68 15.907.146v15.602l-15.907-.147V38.68z"
                                        class="color302e33 svgShape"
                                    ></path>
                                    <path
                                        fill="#857c6e"
                                        fill-rule="evenodd"
                                        d="M53.478 51.993A30.813 30.813 0 0 1 30.9 61.8a31.225 31.225 0 0 1-3.837-.237A34.072 34.072 0 0 1 15.9 57.919a31.036 31.036 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 4.535 1.31 10.02 7.439 10.113 7.57.113 8.47-5.475 8.47-10.15l12.79 6.282z"
                                        class="color857a6e svgShape"
                                    ></path>
                                    <path
                                        fill="#ff6b06"
                                        fill-rule="evenodd"
                                        d="M31.462 52.495c-3.342-5.472-9.388-6.287-11.359-6.6-5.42-.86-14.56-4.28-8.564-9.72 10.765-9.764 6.898-22.032 19.513-22.032 13.47 0 8.873 12.268 19.638 22.032 5.997 5.44-3.143 8.86-8.565 9.72a14.292 14.292 0 0 0-10.663 6.6z"
                                        class="color302e33 svgShape"
                                    ></path>
                                    <path
                                        fill-rule="evenodd"
                                        d="M39.964 42.252c-1.125 4.01-4.008 6.397-8.598 6.207-3.94-.163-7.297-2.397-8.11-6.204z"
                                        opacity=".18"
                                        fill="#ff9804"
                                        class="color000000 svgShape"
                                    ></path>
                                    <path
                                        fill="#ffffff"
                                        fill-rule="evenodd"
                                        d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z"
                                        class="colorffe8be svgShape"
                                    ></path>
                                    <path
                                        fill="#fff066"
                                        fill-rule="evenodd"
                                        d="M18.365 24.045c-3.07 1.34-.46 7.687 1.472 7.658a31.973 31.973 0 0 1-1.472-7.658zM44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.993 31.993 0 0 0 1.471-7.658z"
                                        class="colorf9dca4 svgShape"
                                    ></path>
                                    <path
                                        fill="#ffaf3c"
                                        fill-rule="evenodd"
                                        d="M19.113 25.706c-2.83-4.958-2.783-9.375-1.362-11.817 2.048-3.52 4.922-3.688 5.315-4.517 4.025-8.479 24.839-2.048 23.97 11.09a14.798 14.798 0 0 0-1.522-2.486s-.075 4.991-1.437 6.957c-1.64.464-15.061.239-20.053-9.948-4.006 2.268-5.06 7.015-4.91 10.72z"
                                        class="color969696 svgShape"
                                    ></path>
                                    <path
                                        fill="#ffaf3c"
                                        fill-rule="evenodd"
                                        d="M31.15 46.543c-2.66.022-15.617-4.022-12.61-26.045 0 0 .65 9.916 2.775 12.788 1.382 1.868 2.625 2.57 3.82.746 1.248-1.9 3.946-3.473 6.038-1.677 1.737-1.85 4.848-.212 6.084 1.677 1.195 1.823 2.44 1.123 3.822-.746 2.125-2.872 2.586-12.456 2.586-12.456 3.456 23.6-9.855 25.735-12.515 25.713z"
                                        class="color969696 svgShape"
                                    ></path>
                                    <path
                                        fill="#ffffff"
                                        fill-rule="evenodd"
                                        d="M26.527 36.802a7.118 7.118 0 0 1 4.568-2.096 7.29 7.29 0 0 1 4.503 2.099c-.788.525-5.874 1.737-9.071-.003z"
                                        class="colorffe8be svgShape"
                                    ></path>
                                    <path
                                        fill="#7d7262"
                                        fill-rule="evenodd"
                                        d="M26.611 51.297a29.35 29.35 0 0 0-8.171-3.501c-4.778-.758-13.423-1.518-11.271-10.086C12.023 18.38 18.85 3.688 31.457 3.87c12.836.184 19.09 15.8 23.84 33.865 1.904 7.238-6.79 9.313-11.508 10.06A21.129 21.129 0 0 0 36 51.14c-6.963 4.765-1.812 4.7-9.389.158zm4.851 1.198a14.292 14.292 0 0 1 10.663-6.6c5.422-.86 14.562-4.28 8.565-9.72-10.765-9.764-6.167-22.032-19.638-22.032-12.615 0-8.748 12.268-19.513 22.032-5.997 5.44 3.143 8.86 8.564 9.72 1.97.313 8.017 1.127 11.36 6.6z"
                                        class="color7d7062 svgShape"
                                    ></path>
                                    <path
                                        fill="#ff6b06"
                                        fill-rule="evenodd"
                                        d="M24.202 50.213s5.988 3.256 7.588 7.992c1.61-5.121 7.627-8.327 7.627-8.327S33.07 52.33 31.7 55.534c-.973-1.722-2.707-3.4-7.497-5.321z"
                                        class="color302e33 svgShape"
                                    ></path>
                                </g>
                            </g>
                        </svg>
                        <ChevronDown className="hover:transform hover:scale-125" />
                    </button>

                    {isOpen && (
                        <div className="absolute mt-4 top-12 bg-white text-orange-500">
                            <Link
                                to={"/user/history"} 
                                className="block px-2 py-1 hover:bg-gray-200 ">
                                History
                            </Link>
                            <button 
                                onClick={()=>logOut()}
                                className="block px-2 py-1 hover:bg-gray-200 ">
                                Logout
                            </button>
                        </div>
                    )}
                </div> */}
            </div>
        </nav>
    );
};

export default MainNav;
