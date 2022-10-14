import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCreative,
  Autoplay,
  Pagination,
  EffectFade,
  EffectCoverflow,
} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";

import * as s from "./swiper.styles";
import { useRouter } from "next/router";
import mediaQueryStandardForMain from "../mediaQuery/mediaQueryStandardForMain";

// import required modules

export default function SwiperCustom() {
  const router = useRouter();
  const isMobileForMain = mediaQueryStandardForMain();
  const onClickGoToList = (url: string) => {
    router.push(url);
  };
  return (
    <s.CustomSwiper
      loop={true}
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={isMobileForMain ? 1 : 3}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      coverflowEffect={{
        rotate: 50,
        stretch: 1,
        depth: 100,
        modifier: 1,
        slideShadows: true,
        scale: 1,
      }}
      pagination={true}
      modules={[EffectCoverflow, Autoplay]}
      className="mySwiper"
    >
      <s.CustomSwiperSlide>
        <s.CustomSwiperSlideImg
          src={`https://storage.googleapis.com/openrun-sub/carousel/2022-09-21/261348d0-cf61-44c1-abf4-84150dab1a89/origin/mainCarousel1.jpeg`}
          onClick={() => onClickGoToList("/board/fashion/")}
        />
      </s.CustomSwiperSlide>

      <s.CustomSwiperSlide>
        <s.CustomSwiperSlideImg
          src={`https://storage.googleapis.com/openrun-sub/carousel/2022-09-21/12b8fe77-f80a-434d-8f6d-4c9ff41b59b0/origin/mainCarousel2.jpeg`}
          onClick={() => onClickGoToList("/board/toy/")}
        />
      </s.CustomSwiperSlide>

      <s.CustomSwiperSlide>
        <s.CustomSwiperSlideImg
          src={`https://storage.googleapis.com/openrun-sub/carousel/2022-09-21/02eae44f-bd6f-4a7e-b2c4-4823de79ca13/origin/mainCarousel3.jpeg`}
          onClick={() => onClickGoToList("/board/digital/")}
        />
      </s.CustomSwiperSlide>

      <s.CustomSwiperSlide>
        <s.CustomSwiperSlideImg
          src={`https://storage.googleapis.com/openrun-sub/carousel/2022-09-21/455ca891-970e-47a3-9ebf-c3d8ada7f3b3/origin/mainCarousel4.jpeg`}
          onClick={() => onClickGoToList("/board/acc/")}
        />
      </s.CustomSwiperSlide>

      <s.CustomSwiperSlide>
        <s.CustomSwiperSlideImg
          src={`https://storage.googleapis.com/openrun-sub/carousel/2022-09-21/d4db7a86-3cb4-4eee-900c-3b91b1e3f98e/origin/mainCarousel5.jpeg`}
          onClick={() => onClickGoToList("/board/food/")}
        />
      </s.CustomSwiperSlide>

      <s.CustomSwiperSlide>
        <s.CustomSwiperSlideImg
          src={`https://storage.googleapis.com/openrun-sub/carousel/2022-09-21/2400faef-adb5-43bb-b5e3-9395c522ef8e/origin/mainCarousel6.jpeg`}
          onClick={() => onClickGoToList("/board/fashion/")}
        />
      </s.CustomSwiperSlide>

      <s.CustomSwiperSlide>
        <s.CustomSwiperSlideImg
          src={`https://storage.googleapis.com/openrun-sub/carousel/2022-09-21/7e647049-a934-4abf-8215-75a7f07850c3/origin/mainCarousel7.jpeg`}
          onClick={() => onClickGoToList("/board/toy/")}
        />
      </s.CustomSwiperSlide>

      <s.CustomSwiperSlide>
        <s.CustomSwiperSlideImg
          src={`https://storage.googleapis.com/openrun-sub/carousel/2022-09-21/0dce69f7-103c-469d-a7d2-65a6e6abfda6/origin/mainCarousel8.jpeg`}
          onClick={() => onClickGoToList("/board/digital/")}
        />
      </s.CustomSwiperSlide>

      <s.CustomSwiperSlide>
        <s.CustomSwiperSlideImg
          src={`https://storage.googleapis.com/openrun-sub/carousel/2022-09-21/3f3cc598-da17-4ec9-84e9-32511a3ceb1b/origin/mainCarousel9.jpeg`}
          onClick={() => onClickGoToList("/board/acc/")}
        />
      </s.CustomSwiperSlide>

      <s.CustomSwiperSlide>
        <s.CustomSwiperSlideImg
          src={`https://storage.googleapis.com/openrun-sub/carousel/2022-09-21/fc500628-6d21-4e20-ac2e-d254f952dd7c/origin/mainCarousel10.jpeg`}
          onClick={() => onClickGoToList("/board/food/")}
        />
      </s.CustomSwiperSlide>
    </s.CustomSwiper>
  );
}
