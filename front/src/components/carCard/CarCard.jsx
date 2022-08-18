import * as React from 'react';
import { Link } from 'react-router-dom';
import "./carcard.modules.scss"
// import "../Slider/slider.modules.scss"
import EditCarModal from './EditCarModal';


export default function CarCard({ car, edit = false, delCar = false }) {

  return (
    <div className="slider__item" key={car.id}>
      {edit ? <div><EditCarModal car={car} /></div> : <></>}

      <img className="slider__item-img" src={car.Images.length ? car.Images[0].img_url : "/img.png"} alt="slider-img" />
      <div className='catalog__box'>
        <h3 className="slider__item-title">{car.brand}</h3>
        <h3 className="slider__item-title2">{car.model}</h3>
      </div>
      <ul className="slider__item-list">
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
          <p className='slider__item-param-text'>Объем двигателя:</p>
          <p className='slider__item-param-value'>{car.engine}</p>
        </li>
        <li className='slider__item-param'>
          <p className='slider__item-param-text'>Салон:</p>
          <p className='slider__item-param-value'>{car.seats}</p>
        </li>
      </ul>
      <div className="slider__item-block">
        <p className="slider__item-price">{car.price} р./сутки</p>
        <Link className="slider__item-btn" to={`/car/${car.id}`}>Подробнее</Link>

      </div>
    </div>
  );
}

