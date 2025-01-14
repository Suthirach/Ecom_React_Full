import React, { useEffect } from "react";
import ProductCard from "../components/card/ProductCard";
import Product from "./admin/Product";
import useEcomStore from "../store/ecom-store";
import SearchCard from "../components/card/SearchCard";

const Shop = () => {
    const getProduct = useEcomStore((state) => state.getProduct);
    const products = useEcomStore((state) => state.Products);
    

    useEffect(() => {
        getProduct(100)
    },[])



    
    return (
        <div className="flex">
            {/* SearchBar */}
            <div className=" w-1/5 p-4 bg-gray-100 h-screen justify-center ">
                <SearchCard/>   
            </div>

            {/* Product */}
            <div className="w-2/3 p-4  overflow-y-auto  bg-gray-100 h-screen justify-center  rounded-lg   mx-auto">
                <p className="text-2xl p-4 font-bold mb-4">All Products</p>
                <div className="flex flex-wrap gap-4  justify-center">
                    {/* Product Card */}
                    {
                        products.map((item,index)=>
                            <ProductCard key={index} item={item}/>
                        )
                    }
                    {/* <ProductCard /> */}
                  
 
                </div>
            </div>

            {/* Cart */}
            <div className="w-1/4 p-4 bg-gray-100 h-screen ">
                {/* <CartCard /> */}
            </div>
        </div>
    );
};

export default Shop;
