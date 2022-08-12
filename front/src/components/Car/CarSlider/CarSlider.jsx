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

export default function CarSlider({ car }) {

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
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true
        }
      }
    ]
  };

  return (
    <div className="carslider">
      <div className="carslider__inner">
        <Slider {...settings}>
          {car &&
            car.Images.map((carImg) =>
              car.Images.length ? (
                <div>
                  <img className="carslider__img" src={carImg.img_url} alt="slider-img" />
                </div>
              ) : (
                <div>
                  <h4 className="carslider__item-title3">💔 Что-то пошло не так...</h4>
                </div>
              )
            )
          }
        </Slider>
      </div>
    </div>
  );

}
