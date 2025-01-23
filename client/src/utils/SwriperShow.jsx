import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

import { useEffect, useState } from "react";
import axios from "axios";

const SwriperShow = ({ children }) => {
    return (
        <div>
            <div className="pl-10 items-center">
                <Swiper
                    className="pl-10 w-full h-auto"
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={7}
                    spaceBetween={2}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        900: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 15,
                        },
                    }}
                >
                    {children}
                </Swiper>
            </div>
        </div>
    );
};

export default SwriperShow;
