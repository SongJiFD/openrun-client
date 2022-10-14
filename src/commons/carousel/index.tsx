import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState } from "react";
import Slider from "react-slick";
import * as s from "./carousel.styles";
import { ICarouselProps } from "./carousel.types";
import { CustomSlider } from "./slicCustom.styles";
import { useRouter } from "next/router";

export default function MainSlider(props: ICarouselProps) {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  const onHover = () => {
    // console.log(isHover);
    setIsHover(!isHover);
  };
  const onLeave = () => {
    setIsHover(false);
  };
  const onClickGoHome = () => {
    router.push("/Main");
  };

  const onClickGoToList = (url: string) => {
    router.push(url);
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 2500,
    cssEase: "cubic-bezier(0.535, 0.600, 0.340, 0.785)",
    appendDots: (dots: any) => <ul> {dots} </ul>,
    customPaging: (i: any) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  };
  //
  return (
    <CustomSlider {...settings}>
      <s.AdCarousel
        src={`https://storage.googleapis.com/openrun-sub/${props.Src[0]}`}
        color="#5358D6"
        onClick={() => onClickGoToList("/board/fashion/")}
      />
      <s.AdCarousel
        src={`https://storage.googleapis.com/openrun-sub/${props.Src[1]}`}
        color="#fff"
        onClick={() => onClickGoToList("/board/toy/")}
      />
      <s.AdCarousel
        src={`https://storage.googleapis.com/openrun-sub/${props.Src[2]}`}
        color="#111"
        onClick={() => onClickGoToList("/board/digital/")}
      />
      <s.AdCarousel
        src={`https://storage.googleapis.com/openrun-sub/${props.Src[3]}`}
        color="#fff"
        onClick={() => onClickGoToList("/board/acc/")}
      />
      <s.AdCarousel
        src={`https://storage.googleapis.com/openrun-sub/${props.Src[4]}`}
        color="#fff"
        onClick={() => onClickGoToList("/board/food/")}
      />
    </CustomSlider>
  );
}
