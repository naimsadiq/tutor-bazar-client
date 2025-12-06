import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../assets/banner-1.jpg";
import bannerImg2 from "../../assets/banner-2.jpg";
import bannerImg3 from "../../assets/banner-3.jpg";

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} interval={2000}>
      <div className="h-[550px]">
        <img src={bannerImg1} />
      </div>
      <div className="h-[550px]">
        <img src={bannerImg2} />
      </div>
      <div className="h-[550px]">
        <img src={bannerImg3} />
      </div>
    </Carousel>
  );
};

export default Banner;
