import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';

import first from '../../assets/images/Landing/first.png';
import second from '../../assets/images/Landing/second.png';
import third from '../../assets/images/Landing/third.png';
import fourth from '../../assets/images/Landing/fourth.png';

export default function Slider() {
  return (
    <Swiper
      spaceBetween={30}
      effect={'fade'}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[EffectFade, Navigation, Pagination, Autoplay]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img src={first} alt="swiper img" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={second} alt="swiper img" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={third} alt="swiper img" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={fourth} alt="swiper img" />
      </SwiperSlide>
    </Swiper>
  )
}
