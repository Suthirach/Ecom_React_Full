import React, { useEffect, useState } from "react";
import { showProducts } from "../../../api/product";
import ProductCard from "../ProductCard";
import SwriperShow from "../../../utils/SwriperShow";
import { SwiperSlide } from "swiper/react";
import { PartyPopper } from "lucide-react";
const Bestseller = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        showProducts("sold", "desc", 8)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    };

    console.log(data);
    return (
        <div>
            <div className="pl-16 gap-4 flex  mt-2 items-center py-2 rounded-lg  text-yellow-500 text-2xl font-bold ">
                <div className="">
                    <PartyPopper />
                </div>
                <div>Popular Item</div>
            </div>
            <SwriperShow>
                {data?.map((item, index) => (
                    <SwiperSlide className="p-3">
                        <ProductCard key={index} item={item} />
                    </SwiperSlide>
                ))}
            </SwriperShow>
        </div>
    );
};

export default Bestseller;
