import React, { Component } from "react";
import Slider from "react-slick";
import "./carslider.modules.scss";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#262626",
        right: '25px',
        zIndex: 100,
        width: '48px',
        height: '48px',
        boxShadow: '0px 0px 8px rgba(182, 182, 182, 0.25)',
        borderRadius: '6px',
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#262626",
        left: '25px',
        zIndex: 100,
        width: '48px',
        height: '48px',
        boxShadow: '0px 0px 8px rgba(182, 182, 182, 0.25)',
        borderRadius: '6px',
      }}
      onClick={onClick}
    />
  );
}

export default function CarSlider({car}) {

    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
            arrows: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            // centerMode: true,
            arrows: false
  
          }
        }
      ]
    };

    return (
      <div className="carslider">
        <div className="carslider__inner">
          <Slider {...settings}>
            <div>
              <img className="carslider__img" src={'../carslider/car_slide.jpg'} alt="slider-img" />
            </div>
            <div>
              <img className="carslider__img"  src={'../carslider/car_slide.jpg'} alt="slider-img" />
            </div>
            <div>
              <img className="carslider__img"  src={'../carslider/car_slide.jpg'} alt="slider-img" />
            </div>
            <div>
              <img className="carslider__img"  src={'../carslider/car_slide.jpg'} alt="slider-img" />
            </div>
            <div>
              <img className="carslider__img"  src={'../carslider/car_slide.jpg'} alt="slider-img" />
            </div>
            <div>
              <img className="carslider__img"  src={'../carslider/car_slide.jpg'} alt="slider-img" />
            </div>
          </Slider>
        </div>
        
      </div>
    );
  
}
