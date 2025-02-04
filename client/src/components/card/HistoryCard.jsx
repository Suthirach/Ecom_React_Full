// rafce

import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { dateformat } from "../../utils/dateformat";

const HistoryCard = () => {
    const token = useEcomStore((state) => state.token);
    const [orders, setOrders] = useState([]);

    console.log(token);
    useEffect(() => {
        // code
        hdlGetOrder(token);
    }, []);
    const hdlGetOrder = (token) => {
        getOrders(token)
            .then((res) => {
                console.log(res);
                setOrders(res.data.ooo);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // console.log("orders" ,orders);

    const getStatusColor = (status) => {
        switch (status) {
            case "Not Process":
                return "bg-yellow-500 ";
            case "Processing":
                return "bg-blue-500 ";
            case "Completed":
                return "bg-green-500 ";
            case "Cancelled":
                return "bg-red-500 ";
        }
    };

    return (
        <div className="space-y-6 px-60 py-14 bg-orange-50 min-h-screen">
            <h1 className="text-3xl font-bold text-orange-700">
                Purchase order
            </h1>
            {/* คลุม */}
            <div className="space-y-6">
                {/* Card Loop Order */}
                {orders.slice().reverse().map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg border border-orange-200"
                        >
                            {/* Header */}
                            <div className="flex justify-between mb-4 ">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Order date
                                    </p>
                                    <p className="font-bold text-gray-800">
                                        {dateformat(item.updatedAt)}
                                    </p>
                                </div>
                                <div>
                                    <span
                                        className={`${getStatusColor(
                                            item.orderStatus
                                        )} px-3 py-1 rounded-full text-sm text-white font-semibold shadow-md`}
                                    >
                                        {item.orderStatus}
                                    </span>
                                </div>
                            </div>
                            {/* Table for Products */}
                            <div>
                                <table className="w-full border-collapse  text-left text-sm ">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-orange-500 to-yellow-500  text-white">
                                            <th className="p-2 border border-orange-200">
                                                Products
                                            </th>
                                            <th className="p-2 border border-orange-200">
                                                Price
                                            </th>
                                            <th className="p-2 border border-orange-200">
                                                Quantity
                                            </th>
                                            <th className="p-2 border border-orange-200">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {item.products?.map(
                                            (product, index) => (
                                                <tr
                                                    key={index}
                                                    className="hover:bg-orange-50"
                                                >
                                                    <td className="p-2 border border-orange-200">
                                                        {product.product.title}
                                                    </td>
                                                    <td className="p-2 border border-orange-200">
                                                        {numberFormat(
                                                            product.product
                                                                .price
                                                        )}
                                                    </td>
                                                    <td className="p-2 border border-orange-200">
                                                        {product.count}
                                                    </td>
                                                    <td className="p-2 border border-orange-200">
                                                        {numberFormat(
                                                            product.count *
                                                                product.product
                                                                    .price
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {/* Total */}
                            <div className="mt-4">
                                <div className="text-right">
                                    <p className="text-gray-600">Net Income</p>
                                    <p className="text-lg font-bold text-orange-700">
                                        {numberFormat(item.cartTotal)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HistoryCard;
