import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../assets/banner-1.jpg";
import bannerImg2 from "../../assets/banner-2.jpg";
import bannerImg3 from "../../assets/banner-3.jpg";

const Banner = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      interval={3000}
      showThumbs={false} 
      showStatus={false}
      swipeable
      emulateTouch
    >
      {[bannerImg1, bannerImg2, bannerImg3].map((img, index) => (
        <div
          key={index}
          className="h-[220px] sm:h-80 md:h-[420px] lg:h-[550px]"
        >
          <img
            src={img}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
