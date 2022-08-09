import React, { Component } from "react";
import Slider from "react-slick";
import './slider.modules.scss';

export default class SimpleSlider extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0,
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
          <a className="slider__btn" href="/cars">Все авто</a>
        </div>
        <Slider {...settings}>
          <div>
            <img src={'../'} alt="slider-img" />
            <h3>Название авто</h3>
            <p>Описание</p>
            <p>цена</p>
            <a href="/car/:id">Подробнее</a>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>7</h3>
          </div>
          <div>
            <h3>8</h3>
          </div>
        </Slider>
      </div>
    );
  }
}
