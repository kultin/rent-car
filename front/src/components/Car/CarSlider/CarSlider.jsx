import React, { Component } from "react";
import Slider from "react-slick";
import carslider from "./carslider.modules.scss";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
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
    <div
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

export default class CustomArrows extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <div className="carslider">
        <div className="carslider__inner">
          <Slider {...settings}>
            <div>
              <img src={'../carslider/car_slide.jpg'} alt="slider-img" />
            </div>
            <div>
              <img src={'../carslider/car_slide.jpg'} alt="slider-img" />
            </div>
            <div>
              <img src={'../carslider/car_slide.jpg'} alt="slider-img" />
            </div>
            <div>
              <img src={'../carslider/car_slide.jpg'} alt="slider-img" />
            </div>
            <div>
              <img src={'../carslider/car_slide.jpg'} alt="slider-img" />
            </div>
            <div>
              <img src={'../carslider/car_slide.jpg'} alt="slider-img" />
            </div>
          </Slider>
        </div>
        
      </div>
    );
  }
}
