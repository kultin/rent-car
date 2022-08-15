import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Slider from "react-slick";
import './slider.modules.scss';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
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
    <button
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#fff",
        top: '-60px',
        left: 'auto',
        right: '80px',
        height: '48px',
        width: '48px',
        boxShadow: '0px 0px 8px rgba(182, 182, 182, 0.25)',
        borderRadius: '6px',
      }}
      onClick={onClick}
    />
  );
}

export default function HomeSlider() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: true,
    adaptiveHeight: true,
    // centerMode: true,
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
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false,
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

  const { cars } = useSelector((store) => store.cars)
  console.log(cars)

  return (
    <div className="slider">
      <div className="container">
        <div className="slider__inner">
          <h2 className="slider__title"> Наши авто </h2>
          <Link className="slider__btn" to="/cars">Все авто</Link>
        </div>
        <Slider {...settings}>
          {cars &&
            cars.map((car) =>
              car?.Images?.length ? (
                <div className="slider__item" key={car.id}>
                  <div className="slider__item-box">
                    <img className="slider__item-img" src={car.Images[0].img_url} alt="slider-img" />
                  </div>
                  <h3 className="slider__item-title">{car.brand}</h3>
                  <h4 className="slider__item-title2">{car.model}</h4>
                  <p className="slider__item-text">Палатка рассчитана для комфортной ночёвки двух взрослых и маленького ребёнка.</p>
                  {/* <ul className="slider__item-list">
                    <li className='slider__item-param'>
                      <p className='slider__item-param-text'>Год выпуска:</p>
                      <p className='slider__item-param-value'>{car.year}</p>
                    </li>
                    <li className='slider__item-param'>
                      <p className='slider__item-param-text'>Мощность:</p>
                      <p className='slider__item-param-value'>{car.power}</p>
                    </li>
                    <li className='slider__item-param'>
                      <p className='slider__item-param-text'>КПП:</p>
                      <p className='slider__item-param-value'>{car.gear}</p>
                    </li>
                    <li className='slider__item-param'>
                      <p className='slider__item-param-text'>ОбЪем двигателя:</p>
                      <p className='slider__item-param-value'>{car.engine}</p>
                    </li>
                    <li className='slider__item-param'>
                      <p className='slider__item-param-text'>Салон:</p>
                      <p className='slider__item-param-value'>{car.seats}</p>
                    </li>
                  </ul> */}
                  <div className="slider__item-block">
                    <p className="slider__item-price">{car.price} р./сутки</p>
                    <Link className="slider__item-btn" to={`/car/${car.id}`}>Подробнее</Link>
                  </div>
                </div>
              ) : (
                <div className="slider__item" key={car.id}>
                  <img className="slider__item-img" src={'http://localhost:3005/cars/toyota.jpg'} alt="slider-img" />
                  <h4 className="slider__item-title3">💔 Что-то пошло не так...</h4>
                </div>
              )
            )
          }
        </Slider>
      </div>
    </div>
  );
}

