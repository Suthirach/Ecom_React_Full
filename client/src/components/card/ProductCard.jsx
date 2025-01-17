import React from "react";
import { ShoppingBasket } from 'lucide-react';
import useEcomStore from "../../store/ecom-store";

const ProductCard = ({item}) => {
    const actionAddCart = useEcomStore((state)=>state.actionAddCart)
    const getetTotolPrice = useEcomStore((state) => state.getetTotolPrice);
    // text-white p-4 bg-green-500 rounded-md w-full hover:bg-green-300 hover:scale-105 disabled:bg-slate-700  disabled:scale-100   hover:duration-200
    // border rounded-lg shadow-lg p-4 w-60 bg-white hover:shadow-xl transition-shadow  hover:duration-200 flex flex-col hover:scale-105
   
    return (
        <div className="   border rounded-lg shadow-lg p-4 w-60 bg-white    hover:duration-500 flex flex-col hover:scale-105 ">
            {/* Image Section */}
            <div className="mb-4">
                {item.images && item.images.length > 0 ? (
                    <div className="w-full h-40 object-cover rounded-md">
                        <img
                        src={item.images[0].url}
                        alt={item.title}
                        className="w-full h-50 object-cover rounded-md p-4"
                        />
                    </div>
                ) : (
                    <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                        No Image
                    </div>
                )}
            </div>
    
            {/* Title and Description */}
            <div className="flex-grow mt-auto pt-4 ">
                <p className="text-lg font-semibold text-gray-800 truncate">{item.title}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
            </div>
    
            {/* Price and Button */}
            <div className="flex justify-between items-center mt-auto pt-4">
                <span className="text-lg font-bold text-orange-600">{item.price} บาท</span>
                <button 
                    onClick={()=>actionAddCart(item)}
                    className="bg-orange-400 text-white px-4 py-1 rounded-md hover:bg-orange-600 transition-colors duration-200 shadow-md flex items-center gap-2">
                    <ShoppingBasket />
                    {/* <span></span> */}
                </button>
            </div>
        </div>
    );
    
    
};

export default ProductCard;
