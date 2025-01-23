import React, { useEffect, useState } from "react";
import { showProducts } from "../../../api/product";
import ProductCard from "../ProductCard";
import SwripSingle from "../../../utils/SwripSingle";
import { SwiperSlide } from "swiper/react";
import SwriperShow from "../../../utils/SwriperShow";
import { Flame } from "lucide-react";

const NewProduct = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        showProducts("updateAt", "desc", 7)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    };

    console.log(data);
    return (
        <div>
            <div className="pl-16 gap-4 flex  mt-2 items-center py-2 rounded-lg  text-orange-500 text-2xl font-bold ">
                <div className="">
                    <Flame />
                </div>
                <div>New Item</div>
            </div>

            <SwriperShow>
                {data?.map((item, index) => (
                    <SwiperSlide className="p-3">
                        <ProductCard
                            calssName="size-24 object-left-top px-10  p-2"
                            key={index}
                            item={item}
                        />
                    </SwiperSlide>
                ))}
            </SwriperShow>
        </div>
    );
};

export default NewProduct;
