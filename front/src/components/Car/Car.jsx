import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import  "./car.modules.scss";
import  "./CarSlider/carslider.modules.scss";
import  "./CarContent/carcontent.modules.scss";
import CarSlider from './CarSlider/CarSlider';
import CarContent from './CarContent/CarContent';
import CarForm from './CarForm/CarForm';
import MapCar from '../MapCar/MapCar'

import axios from 'axios';


// import "../morecar.modules.scss";
// import MoreCar from './MoreCar/MoreCar';
import CarCalendar from '../Calendar/CarCalendar';


export default function Car() {

  const { cars } = useSelector((store) => store.cars)
  const { id } = useParams();
  const car = cars.filter(car => car.id == id)[0]


  return (
    <>
      <div className="container">
        <div className='car__inner'>
          <CarSlider car={car}/>
          <CarContent car={car} />
        </div>
        <CarForm/>
        {/* <MoreCar/> */}

        <h2 className='mapcar__title'>Местонахождение вашего автомобиля</h2>

        <div className="carslider__content">
          <p className="carslider__content-text">Информация о машине</p>
          <p className="carslider__content-text">Форма брони с календарем</p>
          <p className="carslider__content-text">Отзывы</p>
          <p className="carslider__content-text">Возможность добавить в избранное</p>
          <p className="carslider__content-text">Карта где находиться авто</p>
        </div>
        <CarCalendar car={car}/>

      </div>
      <MapCar car={car}/>
    </>
  )
}

{/* 
<p className="carslider__content-text">Отзывы</p>
<p className="carslider__content-text">Возможность добавить в избранное</p>
*/}
