import React from "react";
import {
    getListAllUsers,
    changeUserStatus,
    changeUserRole,
} from "../../api/admin2";
import useEcomStore from "../../store/ecom-store";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "motion/react"

export const TableUser = () => {
    const token = useEcomStore((state) => state.token);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        hdlGetUsers(token);
        // hdlchangeUserStatus()
    }, []);

    const hdlGetUsers = (token) => {
        getListAllUsers(token)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        };
        
        const hdlchangeUserStatus = (userId, userStatus) => {
            console.log(userId, userStatus);
            const value = {
                id: userId,
                enabled: !userStatus,
            };
            
            changeUserStatus(token, value)
            .then((res) => {
                // console.log(res);
                hdlGetUsers(token);
                toast.success('Update Status Success ')
            })
            .catch((err) => {
                console.log(err);
                toast.error('Update Status Fail ')
            });
        };
        
        const hdlchangeUserRole = (userId, userRole) => {
            console.log(userId, userRole);
            const value = {
                id: userId,
                role: userRole,
            };
            
            changeUserRole(token, value)
            .then((res) => {
                // console.log(res);
                hdlGetUsers(token);
                toast.success('Update Permission Success ')
            })
            .catch((err) => {
                console.log(err);
                toast.error('Update Permission Fail ')
            });
    };

    console.log("user", users);

    return (
        <div>
            TableUser
            <div className="w-full pl-64 flex flex-col min-h-screen bg-gray-900 text-gray-200">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mx-8 mt-6">
                    <h1 className="text-2xl font-bold text-gray-100 mb-6">
                        Users Management
                    </h1>

                    <table className="w-full border-collapse text-left text-sm">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="text-center p-3 border border-gray-600 text-gray-300">
                                    Index
                                </th>
                                <th className="p-3 border border-gray-600 text-gray-300">
                                    Email
                                </th>
                                {/* <th className="p-3 border border-gray-600 text-gray-300">
                                Permission
                                </th> */}
                                <th className="p-3 border border-gray-600 text-gray-300">
                                    Permission
                                </th>
                                <th className="p-3 border border-gray-600 text-gray-300">
                                    Status
                                </th>
                                <th className="p-3 border border-gray-600 text-gray-300">
                                    Manage
                                </th>
                            </tr>
                        </thead>
                        {/* // el = element || i = index  */}
                        <tbody>
                            {users?.map((el, index) => (
                                <tr
                                    key={el.id}
                                    className={`border ${
                                        index % 2 === 0
                                            ? "bg-gray-800"
                                            : "bg-gray-700"
                                    } hover:bg-gray-600`}
                                >
                                    <td className="text-center p-3 border border-gray-600">
                                        {index + 1}
                                    </td>
                                    <td className=" p-3 border border-gray-600">
                                        {el.email}
                                    </td>
                                    {/* <td>{el.eamil}</td> */}
                                    <td className=" p-3 border border-gray-600">
                                        {/* {el.role} */}
                                        <select
                                            onChange={(e) =>
                                                hdlchangeUserRole(
                                                    el.id,
                                                    e.target.value
                                                )
                                            }
                                            className="px-2 py-1 rounded-md border border-gray-600 text-gray-200 bg-gray-800 focus:outline-none focus:ring focus:ring-gray-400"
                                            value={el.role}
                                        >
                                            <option>user</option>
                                            <option>admin</option>
                                        </select>


                                    </td>
                                    <td className=" p-3 border border-gray-600">
                                        <div className="w-5">
                                            {el.enabled ? "Active" : "Inactive"}
                                        </div>
                                    </td>
                                    <td className=" p-3 border border-gray-600">
                                        <button
                                            onClick={() =>
                                                hdlchangeUserStatus(
                                                    el.id,
                                                    el.enabled
                                                )
                                            }
                                            className=" px-3 py-1 rounded-full text-sm font-semibold shadow-md"
                                        >
                                            {el.enabled ? "Disable" : "Enable"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
