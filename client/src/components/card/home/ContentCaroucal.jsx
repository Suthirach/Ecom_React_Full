import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

import { useEffect, useState } from "react";
import axios from "axios";

import { PartyPopper } from "lucide-react";

const ContentCaroucal = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        hdlGetImage();
    }, []);

    const hdlGetImage = async () => {
        await axios
            .get("https://picsum.photos/v2/list?page=1&limit=15")
            .then((res) => {
                console.log(res);
                setData(res.data);
            })

            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="flex flex-col gap-8 p-4 bg-gray-100 rounded-lg shadow-lg">
            {/* Swiper 1: Main Carousel */}
            <Swiper
                className="w-full h-full"
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination, Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                {/* {data.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        className="flex items-center justify-center"
                    >
                        <img
                            src={item.download_url}
                            alt={`Slide ${index + 1}`}
                            className="object-cover w-full h-full rounded-md"
                        />
                    </SwiperSlide>
                ))} */}
                <SwiperSlide className="flex items-center justify-center">
                    <img
                        className="object-cover w-auto h-auto rounded-md"
                        src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/categories/1731384680.jpg"
                        alt=""
                    />
                </SwiperSlide>

                <SwiperSlide className="flex items-center justify-center">
                    <img
                        className="object-cover w-full h-full rounded-md"
                        src="https://ihavecpu.com/_next/image?url=https%3A%2F%2Fihcupload.s3.ap-southeast-1.amazonaws.com%2Fimg%2Fslidebanner%2F173077579067298aeec6d0e.&w=1200&q=75"
                        alt=""
                    />
                </SwiperSlide>

                <SwiperSlide className="flex items-center justify-center">
                    <img
                        className="object-cover w-full h-full rounded-md"
                        src="https://ihavecpu.com/_next/image?url=https%3A%2F%2Fihcupload.s3.ap-southeast-1.amazonaws.com%2Fimg%2Fslidebanner%2F173077579067298aeec6d0e.&w=1200&q=75"
                        alt=""
                    />
                </SwiperSlide>

                <SwiperSlide className="flex items-center justify-center">
                    <img
                        className="object-cover w-full h-full rounded-md"
                        src="https://ihavecpu.com/_next/image?url=https%3A%2F%2Fihcupload.s3.ap-southeast-1.amazonaws.com%2Fimg%2Fslidebanner%2F17349367356769089fe73e8.&w=1200&q=75"
                        alt=""
                    />
                </SwiperSlide>
            </Swiper>

            {/* Swiper 2: Thumbnail Carousel */}
            <div className="px-10 ">
                <Swiper
                    className="w-auto h-auto py-4"
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={5}
                    spaceBetween={30}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 25,
                        },
                        1024: {
                            slidesPerView: 7,
                            spaceBetween: 40,
                        },
                    }}
                >
                    {/* {data.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            className=" flex items-center justify-center"
                        >
                            <img
                                src={item.download_url}
                                alt={`Slide ${index + 1}`}
                                className=" shadow-xl object-cover w-full h-full rounded-md"
                            />
                        </SwiperSlide>
                    ))} */}
                    <SwiperSlide className="flex items-center justify-center ">

                        <img src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/slidebanner/171091217765fa72b14d3ba." alt="" />
                    </SwiperSlide>

                    <SwiperSlide className="w-20 flex items-center justify-center ">

                        <img src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/slidebanner/173070528767287787086b5." alt="" />
                    </SwiperSlide>

                    <SwiperSlide className="w-20 flex items-center justify-center">

                        <img src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/slidebanner/17314061736733295d1121c." alt="" />
                    </SwiperSlide>

                    <SwiperSlide className="w-20 flex items-center justify-center">

                        <img src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/slidebanner/171091218865fa72bc2f80a." alt="" />
                    </SwiperSlide>

                    <SwiperSlide className="w-20 flex items-center justify-center">

                        <img src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/slidebanner/171091219365fa72c13de76." alt="" />
                    </SwiperSlide>

                    <SwiperSlide className="w-20 flex items-center justify-center">

                        <img src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/slidebanner/171091219865fa72c66f4db." alt="" />
                    </SwiperSlide>

                    <SwiperSlide className="w-20 flex items-center justify-center">

                        <img src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/slidebanner/171091220165fa72c959a0e." alt="" />
                    </SwiperSlide>

                    <SwiperSlide className="w-20 flex items-center justify-center">

                        <img src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/slidebanner/171091220465fa72cc741a6." alt="" />
                    </SwiperSlide>

                    
                </Swiper>
            </div>
        </div>
    );
};

export default ContentCaroucal;
