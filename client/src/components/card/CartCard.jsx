import React from "react";
import { Trash, CirclePlus, CircleMinus } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link, Links } from "react-router-dom";
import { numberFormat } from "../../utils/number";

const CartCard = () => {
    const carts = useEcomStore((state) => state.carts);
    const actionUpdateQuantity = useEcomStore(
        (state) => state.actionUpdateQuantity
    );
    const actionRemoveProduct = useEcomStore(
        (state) => state.actionRemoveProduct
    );
    const getetTotolPrice = useEcomStore((state) => state.getetTotolPrice);
    // console.log(carts);

    return (
        <div className="">
            {/* <h1 className="text-2xl font-bold">Producet Cart</h1> */}

            {/* // total  */}
            <div className="mt-3">
                <div className="flex justify-between px-2">
                    <span>Total</span>
                    <span className=" text-orange-700">
                        {numberFormat(getetTotolPrice())} : บาท
                    </span>
                </div>
            </div>
            <Link to="/cart">
                <button className=" w-full mt-4 bg-yellow-500 text-white  py-2 rounded-md shadow-md hover:bg-orange-500 hover:scale-105">
                    Payment
                </button>
            </Link>

            <div className="border-2 border-gray-200 rounded-lg p-2 mt-4">
                {/* // card cart  */}
                {carts.map((item, index) => (
                    <div
                        key={index}
                        className=" bg-white rounded-lg p-2 mb-2 shadow-md"
                    >
                        <div className="flex justify-between">
                            <div className="flex pl-4">
                                {item.images && item.images.length > 0 ? (
                                    <div className=" w-40 rounded-md flex text-center items-center hover:scale-105">
                                        <img
                                            src={item.images[0].url}
                                            alt={item.title}
                                            className="w-full object-cover rounded-md p-4"
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <div className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center hover:scale-105">
                                            <p>No Image</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-wrap p-5">
                                    <p className="font-bold">{item.title}</p>
                                    <p className="text-sm text-gray-500">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div
                                    onClick={() => actionRemoveProduct(item.id)}
                                    className=" rounded-md text-red-300 hover:text-red-600 hover:scale-110"
                                >
                                    <Trash className="w-5 " />
                                </div>
                            </div>
                        </div>
                        {/* count */}
                        <div className="flex  justify-between p-2">
                            <div className=" flex flex-row border border-gray-100 rounded-sm px-2 py-1">
                                <button
                                    onClick={() =>
                                        actionUpdateQuantity(
                                            item.id,
                                            item.count - 1
                                        )
                                    }
                                    className=" px-2 py-1 bg-yellow-200 rounded-sm hover:bg-yellow-400 hover:scale-105"
                                >
                                    <CircleMinus size={16} />
                                </button>
                                <div className=" text-center px-2 py-1 bg-white rounded-sm ">
                                    <span className=" text-center">
                                        {item.count}
                                    </span>
                                </div>
                                <button
                                    onClick={() =>
                                        actionUpdateQuantity(
                                            item.id,
                                            item.count + 1
                                        )
                                    }
                                    className=" px-2 py-1 bg-orange-400 rounded-sm hover:bg-orange-500 hover:scale-105"
                                >
                                    <CirclePlus size={16} />
                                </button>
                            </div>
                            <div className="flex flex-row  font-bold text-orange-500 ">
                                <span className="pt-2 items-center">
                                    {numberFormat(item.price * item.count)} บาท
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* // total  */}
                {/* <div className="mt-3">
                    <div className="flex justify-between px-2">
                        <span>Total</span>
                        <span>{getetTotolPrice()}</span>
                    </div>
                </div>

                <button className=" w-full mt-4 bg-green-400 text-white  py-2 rounded-md shadow-md hover:bg-green-600 hover:scale-105">
                    Payment
                </button> */}
            </div>
        </div>
    );
};

export default CartCard;
