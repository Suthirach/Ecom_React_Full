import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import './styles.css';
import { EffectCards } from "swiper/modules";

const SwripSingle = ({ children }) => {
    return (
        <div className="w-1/4 pl-24">
            <>
                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper  items-center justify-center"
                >
                    {children}
                </Swiper>
            </>
        </div>
    );
};

export default SwripSingle;
