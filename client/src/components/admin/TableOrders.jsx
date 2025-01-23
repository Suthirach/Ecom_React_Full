// rafce
import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { listOrdersAdmin,changeOrderStatus } from "../../api/admin2";
import { toast } from "react-toastify";
import { dateformat } from "../../utils/dateformat";
import { numberFormat } from "../../utils/number";


const TableOrders = () => {
  const token = useEcomStore((state=>state.token));
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // code body
    handleGetOrder(token);
  }, []);
  
  const handleGetOrder = (token) => {
    listOrdersAdmin(token)
    .then((res) => {
      setOrders(res.data);
      // console.log(res)
    })
    .catch((err) => {
      console.log(err);
    })
    console.log("orders",orders)
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    // code
    console.log(orderId, orderStatus);
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        console.log(res);
        toast.success("Update Status Success!!!");
        handleGetOrder(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-500";
      case "Processing":
        return "bg-blue-500";
      case "Completed":
        return "bg-green-500";
      case "Cancelled":
        return "bg-red-500";
    }
  };

  return (
    <div className="w-full pl-64 flex flex-col min-h-screen bg-gray-900 text-gray-200">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mx-8 mt-6">
            <h1 className="text-2xl font-bold text-gray-100 mb-6">
                Order Management
            </h1>
            <div>
                <table className="w-full border-collapse text-left text-sm">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="p-3 border border-gray-600 text-gray-300">
                                Index
                            </th>
                            <th className="p-3 border border-gray-600 text-gray-300">
                                User
                            </th>
                            <th className="p-3 border border-gray-600 text-gray-300">
                                Date
                            </th>
                            <th className="p-3 border border-gray-600 text-gray-300">
                                Product
                            </th>
                            <th className="p-3 border border-gray-600 text-gray-300">
                                Total
                            </th>
                            <th className="p-3 border border-gray-600 text-gray-300">
                                Status
                            </th>
                            <th className="p-3 border border-gray-600 text-gray-300">
                                Manage
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((item, index) => (
                            <tr
                                key={index}
                                className={`border ${
                                    index % 2 === 0
                                        ? "bg-gray-800"
                                        : "bg-gray-700"
                                } hover:bg-gray-600`}
                            >
                                <td className="text-center p-3 border border-gray-600">
                                    {index + 1}
                                </td>
                                <td className="p-3 border border-gray-600">
                                    <p className="text-gray-300">
                                        {item.orderedBy.email}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {item.orderedBy.address}
                                    </p>
                                </td>
                                <td className="p-3 border border-gray-600">
                                    {dateformat(item.createdAt)}
                                </td>
                                <td className="p-3 border border-gray-600">
                                    {item.products?.map((product, idx) => (
                                        <li
                                            key={idx}
                                            className="text-gray-300"
                                        >
                                            {product.product.title}{" "}
                                            <span className="text-sm text-gray-400">
                                                {product.count} x{" "}
                                                {numberFormat(
                                                    product.product.price
                                                )}
                                            </span>
                                        </li>
                                    ))}
                                </td>
                                <td className="p-3 border border-gray-600 text-gray-200 font-bold">
                                    {numberFormat(item.cartTotal)}
                                </td>
                                <td className="p-3 border border-gray-600">
                                    <span
                                        className={`${getStatusColor(
                                            item.orderStatus
                                        )} px-3 py-1 rounded-full text-sm font-semibold shadow-md`}
                                    >
                                        {item.orderStatus}
                                    </span>
                                </td>
                                <td className="p-3 border border-gray-600">
                                    <select
                                        value={item.orderStatus}
                                        onChange={(e) =>
                                            handleChangeOrderStatus(
                                                token,
                                                item.id,
                                                e.target.value
                                            )
                                        }
                                        className="px-2 py-1 rounded-md border border-gray-600 text-gray-200 bg-gray-800 focus:outline-none focus:ring focus:ring-gray-400"
                                    >
                                        <option>Not Process</option>
                                        <option>Processing</option>
                                        <option>Completed</option>
                                        <option>Cancelled</option>
                                    </select>
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

export default TableOrders;