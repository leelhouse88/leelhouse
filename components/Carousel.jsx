import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Slider from "react-slick";

const PreviousArrow = (props) => {
  return (
    <button
      {...props}
      type="button"
      className="w-9 h-9 p-2 bg-primary text-white absolute top-1/2 -translate-y-1/2 left-5 z-10"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );
};

const NextArrow = (props) => {
  return (
    <button
      {...props}
      type="button"
      className="w-9 h-9 p-2 bg-primary text-white absolute top-1/2 -translate-y-1/2 right-5 z-10"
    >
      <ArrowRight className="w-5 h-5" />
    </button>
  );
};

export const Carousel = ({ details, propertyname }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const Images = details || [];

  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    if (sliderRef1.current && sliderRef2.current) {
      setNav1(sliderRef1.current);
      setNav2(sliderRef2.current);
    }
  }, []);

  const settings = {
    asNavFor: nav2,
    ref: sliderRef1,
    dots: true,
    infinite: Images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: Images.length > 1,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
    appendDots: (dots) => (
      <ul className="flex justify-center space-x-2 mt-5"> {dots} </ul>
    ),
    customPaging: () => (
      <button className=" mt-[-30px]">

        <span className="block w-[25px] opacity-65 h-[2px] rounded-full bg-white mx-auto"></span>
      </button>
    ),
  };

  return (
    <div className="relative w-full">
      {/* Main image slider with gradient */}
      <div className="w-full relative overflow-hidden">
        <Slider {...settings}>
          {Images.map((imageUrl, index) => (
            <div key={index} className="relative lg:h-screen h-[250px] w-full border">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              <Image
                src={imageUrl}
                alt={`Image ${index + 1}`}
                fill
                loading="lazy"
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-5 left-5 z-20 text-white md:text-2xl font-serif">
                {propertyname}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
