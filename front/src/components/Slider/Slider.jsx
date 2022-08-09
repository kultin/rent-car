import React, { Component } from "react";
import { Link } from 'react-router-dom';

import Slider from "react-slick";
import './slider.modules.scss';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#CA0100",
        top: '-60px',
        right: '20px',
        height: '48px',
        width: '48px',
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
        background: "#fff",
        top: '-60px',
        left: '1270px',
        height: '48px',
        width: '48px',
        boxShadow: '0px 0px 8px rgba(182, 182, 182, 0.25)',
        borderRadius: '6px',
      }}
      onClick={onClick}
    />
  );
}

export default class SimpleSlider extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      variableWidth: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="slider">
        <div className="slider__inner">
          <h2 className="slider__title"> Наши авто </h2>
          <Link className="slider__btn" to="/cars">Все авто</Link>
        </div>
        <Slider {...settings}>
          <div className="slider__item">
            <img className="slider__item-img" src={'slider/slider_img.png'} alt="slider-img" />
            <h3 className="slider__item-title">Название авто</h3>
            <p className="slider__item-text">Палатка рассчитана для комфортной ночёвки двух взрослых и маленького ребёнка.</p>
            <div className="slider__item-block">
              <p className="slider__item-price">5000 р/сутки</p>
              <Link className="slider__item-btn" to="/car/:id">Подробнее</Link>
            </div>
          </div>
          <div className="slider__item">
            <img className="slider__item-img" src={'slider/slider_img.png'} alt="slider-img" />
            <h3 className="slider__item-title">Название авто</h3>
            <p className="slider__item-text">Палатка рассчитана для комфортной ночёвки двух взрослых и маленького ребёнка.</p>
            <div className="slider__item-block">
              <p className="slider__item-price">5000 р/сутки</p>
              <Link className="slider__item-btn" to="/car/:id">Подробнее</Link>
            </div>
          </div>
          <div className="slider__item">
            <img className="slider__item-img" src={'slider/slider_img.png'} alt="slider-img" />
            <h3 className="slider__item-title">Название авто</h3>
            <p className="slider__item-text">Палатка рассчитана для комфортной ночёвки двух взрослых и маленького ребёнка.</p>
            <div className="slider__item-block">
              <p className="slider__item-price">5000 р/сутки</p>
              <Link className="slider__item-btn" to="/car/:id">Подробнее</Link>
            </div>
          </div>
          <div className="slider__item">
            <img className="slider__item-img" src={'slider/slider_img.png'} alt="slider-img" />
            <h3 className="slider__item-title">Название авто</h3>
            <p className="slider__item-text">Палатка рассчитана для комфортной ночёвки двух взрослых и маленького ребёнка.</p>
            <div className="slider__item-block">
              <p className="slider__item-price">5000 р/сутки</p>
              <Link className="slider__item-btn" to="/car/:id">Подробнее</Link>
            </div>
          </div>
          <div className="slider__item">
            <img className="slider__item-img" src={'slider/slider_img.png'} alt="slider-img" />
            <h3 className="slider__item-title">Название авто</h3>
            <p className="slider__item-text">Палатка рассчитана для комфортной ночёвки двух взрослых и маленького ребёнка.</p>
            <div className="slider__item-block">
              <p className="slider__item-price">5000 р/сутки</p>
              <Link className="slider__item-btn" to="/car/:id">Подробнее</Link>
            </div>
          </div>
          <div className="slider__item">
            <img className="slider__item-img" src={'slider/slider_img.png'} alt="slider-img" />
            <h3 className="slider__item-title">Название авто</h3>
            <p className="slider__item-text">Палатка рассчитана для комфортной ночёвки двух взрослых и маленького ребёнка.</p>
            <div className="slider__item-block">
              <p className="slider__item-price">5000 р/сутки</p>
              <Link className="slider__item-btn" to="/car/:id">Подробнее</Link>
            </div>
          </div>
          <div className="slider__item">
            <img className="slider__item-img" src={'slider/slider_img.png'} alt="slider-img" />
            <h3 className="slider__item-title">Название авто</h3>
            <p className="slider__item-text">Палатка рассчитана для комфортной ночёвки двух взрослых и маленького ребёнка.</p>
            <div className="slider__item-block">
              <p className="slider__item-price">5000 р/сутки</p>
              <Link className="slider__item-btn" to="/car/:id">Подробнее</Link>
            </div>
          </div>
          <div className="slider__item">
            <img className="slider__item-img" src={'slider/slider_img.png'} alt="slider-img" />
            <h3 className="slider__item-title">Название авто</h3>
            <p className="slider__item-text">Палатка рассчитана для комфортной ночёвки двух взрослых и маленького ребёнка.</p>
            <div className="slider__item-block">
              <p className="slider__item-price">5000 р/сутки</p>
              <Link className="slider__item-btn" to="/car/:id">Подробнее</Link>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
