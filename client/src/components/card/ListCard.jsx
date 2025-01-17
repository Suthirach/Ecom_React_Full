import React from "react";
import { Trash, CirclePlus, CircleMinus, ListCheck } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";

const ListCard = () => {
    const cart = useEcomStore((state) => state.carts);
    const user = useEcomStore((state) => state.user);
    const token = useEcomStore((state) => state.token);
    const navigate = useNavigate();
    // const createUserCart = useEcomStore((state) => state.createUserCart);

    console.log(cart) 

    const handleSaveCart = async()=>{
        await createUserCart(token,{cart})
        .then((res)=>{
            console.log(res)
            toast.success('Add to Cart Success.')
            navigate('/checkout')
        })
        .catch((err)=>{
            console.log(err)
            toast.error('Add to cart failed.!!!')
        })
    }

    const getetTotolPrice = useEcomStore((state) => state.getetTotolPrice);
    // console.log(cart);

    return (
        <div>
            <div className=" bg-gray-100 rounded-md p-4 ">
                <div className="flex gap-4">
                    <ListCheck size={24} />
                    <p>Product list</p>
                </div>
            </div>

            <div className=" grid grid-cols-5 md:grid-cols-2 px-36 bg-gray-200 ">
                {/*  */}

                {/* // card cart  */}
                <div>
                    <div className="border-2 border-gray-200 rounded-lg py-4 overflow-y-auto">
                        {cart.map((item, index) => (
                            <div
                                key={index}
                                className=" bg-white rounded-lg p-2 mb-2 shadow-md"
                            >
                                <div className="flex justify-between">
                                    <div className="flex  pl-4">
                                        {item.images &&
                                        item.images.length > 0 ? (
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
                                        {/* text  */}
                                        <div className="flex flex-col p-5">
                                            <p className="font-bold">
                                                {item.title}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {item.description}
                                            </p>

                                            {/* จำนวน */}
                                            <div className="">
                                                <div className="  p-2 bg-white rounded-sm ">
                                                    <span className=" text-center">
                                                        {item.price} x{" "}
                                                        {item.count}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-between">
                                        {/* ราคา */}
                                        <div className="p-4 flex flex-row  font-bold text-orange-700 ">
                                            <span className="pt-2 items-center text-base">
                                                {item.price * item.count} บาท
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* total  */}
                <div className="px-40  py-4">
                    <div className="bg-white rounded-md p-6 ">
                        <div className="rounded-md">
                            <div className="flex ">
                                <p className="text-2xl font-bold">Total</p>
                                {/* <ListCheck size={24} /> */}
                            </div>
                        </div>

                        <div className="mt-3">
                            <div className="flex justify-between px-2">
                                <span>net amount</span>
                                <span className=" text-orange-500 font-bold text-xl">
                                    {getetTotolPrice()} : บาท
                                </span>
                            </div>
                        </div>

                        {user ? (
                            <Link 
                                
                                to="/cart">
                                <button
                                    onClick={handleSaveCart} 
                                    className=" w-full mt-4 bg-orange-400 text-white  py-2 rounded-md shadow-md hover:bg-orange-500 hover:scale-105">
                                    Payment
                                </button>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <button className=" w-full mt-2 border bg-orange-400 py-2 text-white rounded-md  hover:bg-orange-600 hover:scale-105">
                                    Login
                                </button>
                            </Link>
                        )}



                        <Link to="/shop">
                            <button className=" w-full mt-2 border py-2 rounded-md  hover:yellow-600 hover:scale-105">
                                Edit Order
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListCard;
