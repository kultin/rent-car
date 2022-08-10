import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import carstyle from "./car.modules.scss";
// import morecar from "../morecar.modules.scss";
import carslider from "./CarSlider/carslider.modules.scss";
import carcontent from "./CarContent/carcontent.modules.scss";
import CarSlider from './CarSlider/CarSlider';
import CarContent from './CarContent/CarContent';
// import MoreCar from './MoreCar/MoreCar';
import MyMap from '../Map/Map'
import CarCalendar from '../Calendar/CarCalendar';

export default function Car() {
  const { cars } = useSelector((store) => store.cars)
  const { id } = useParams();
  const car = cars.filter(car => car.id == id)[0] ;
  return (
    <>
      <div className="container">
        <div className='car__inner'>
          <CarSlider />
          <CarContent car={car} />
        </div>
        {/* <MoreCar/> */}
        <div className="carslider__content">
          <p className="carslider__content-text">Информация о машине</p>
          <p className="carslider__content-text">Форма брони с календарем</p>
          <p className="carslider__content-text">Отзывы</p>
          <p className="carslider__content-text">Возможность добавить в избранное</p>
          <p className="carslider__content-text">Карта где находиться авто</p>
        </div>
        <CarCalendar car={car}/>
      </div>
      <MyMap />
    </>
  )
}
