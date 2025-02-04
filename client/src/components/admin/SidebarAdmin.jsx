import React from "react";
import { NavLink } from "react-router-dom";
import useEcomStore from "../../store/ecom-store";
import {
    LayoutDashboard,
    Wrench,
    NotebookText,
    Box,
    LogOut,
    Boxes,
} from "lucide-react";

const SidebarAdmin = () => {
    const logOut = useEcomStore((state) => state.logout);

    return (
        <div className="bg-gray-800 w-64 text-gray-50 flex flex-col h-screen  fixed ">
            <div className="h-24 bg-gray-700 flex items-center justify-center text-2xl font-bold">
                Admin Panal
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                <NavLink
                    to={"/admin"}
                    end
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-900 text-white  px-4 py-2 flex  hover:text-white items-center rounded-md"
                            : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center "
                    }
                >
                    <LayoutDashboard className="mr-2" />
                    Dashboard
                </NavLink>

                <NavLink
                    to={"Manage"}
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-900 text-white  px-4 py-2 flex  hover:text-white items-center rounded-md"
                            : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center "
                    }
                >
                    <Wrench className="mr-2" />
                    Manage
                </NavLink>

                <NavLink
                    to={"Category"}
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-900 text-white  px-4 py-2 flex  hover:text-white items-center rounded-md"
                            : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center "
                    }
                >
                    <NotebookText className="mr-2" />
                    Category
                </NavLink>

                <NavLink
                    to={"Product"}
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-900 text-white  px-4 py-2 flex  hover:text-white items-center rounded-md"
                            : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center "
                    }
                >
                    <Box className="mr-2" />
                    Product
                </NavLink>

                <NavLink
                    to={"orders"}
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-900 text-white  px-4 py-2 flex  hover:text-white items-center rounded-md"
                            : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center "
                    }
                >
                    <Boxes className="mr-2" />
                    Oders
                </NavLink>
            </nav>

            <div className="p-4 ">
                <div className="my-3">

                <NavLink
                    to={"/"}
                    className="mt-3"
                    >
                    <button
                      
                        className="w-full flex items-center px-4 py-3  text-white rounded-lg  bg-yellow-500   hover:bg-yellow-600 transition-all duration-200"
                    >
                        <LogOut className="mr-3" />
                        View Page
                    </button>
                </NavLink >
                </div>

                <NavLink
                    to={"/login"}
                 
                >
                    <button
                        onClick={() => logOut()}
                        className="w-full flex items-center px-4 py-3 text-white rounded-lg  bg-red-600  hover:bg-red-500 transition-all duration-200"
                    >
                        <LogOut className="mr-3" />
                        Logout
                    </button>
                </NavLink>
                

                {/* <Link to={"/login"}>
                    <button
                        onClick={() => logOut()}
                        className="block px-2 py-1 hover:bg-gray-200 "
                    >
                        Logout
                    </button>
                </Link> */}
            </div>
        </div>
    );
    // return (
    //     <div className="bg-gray-800 w-full sm:w-64 text-gray-50 flex flex-col h-screen fixed top-0 left-0">
    //       {/* Header */}
    //       <div className="h-20 sm:h-24 bg-gray-900 flex items-center justify-center text-xl sm:text-2xl font-bold">
    //         Admin Panel
    //       </div>

    //       {/* Navigation */}
    //       <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
    //         <NavLink
    //           to={"/admin"}
    //           end
    //           className={({ isActive }) =>
    //             isActive
    //               ? "bg-gray-900 text-white px-4 py-2 flex items-center rounded-md"
    //               : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded-md flex items-center"
    //           }
    //         >
    //           <LayoutDashboard className="mr-2" />
    //           <span className="hidden sm:inline">Dashboard</span>
    //         </NavLink>

    //         <NavLink
    //           to={"Manage"}
    //           className={({ isActive }) =>
    //             isActive
    //               ? "bg-gray-900 text-white px-4 py-2 flex items-center rounded-md"
    //               : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded-md flex items-center"
    //           }
    //         >
    //           <Wrench className="mr-2" />
    //           <span className="hidden sm:inline">Manage</span>
    //         </NavLink>

    //         <NavLink
    //           to={"Category"}
    //           className={({ isActive }) =>
    //             isActive
    //               ? "bg-gray-900 text-white px-4 py-2 flex items-center rounded-md"
    //               : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded-md flex items-center"
    //           }
    //         >
    //           <NotebookText className="mr-2" />
    //           <span className="hidden sm:inline">Category</span>
    //         </NavLink>

    //         <NavLink
    //           to={"Product"}
    //           className={({ isActive }) =>
    //             isActive
    //               ? "bg-gray-900 text-white px-4 py-2 flex items-center rounded-md"
    //               : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded-md flex items-center"
    //           }
    //         >
    //           <Box className="mr-2" />
    //           <span className="hidden sm:inline">Product</span>
    //         </NavLink>
    //       </nav>

    //       {/* Logout Button */}
    //       <div className="p-4">
    //         <NavLink
    //           to={"/"}
    //           className="flex items-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all duration-200"
    //         >
    //           <LogOut className="mr-3" />
    //           <span className="font-medium hidden sm:inline">
    //             Logout
    //         </span>
    //         </NavLink>
    //       </div>
    //     </div>
    //   );
};

export default SidebarAdmin;
