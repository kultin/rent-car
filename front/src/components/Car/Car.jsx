import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./car.modules.scss";
import "./CarSlider/carslider.modules.scss";
import "./CarContent/carcontent.modules.scss";
import CarSlider from './CarSlider/CarSlider';
import CarContent from './CarContent/CarContent';
import MapCar from '../MapCar/MapCar'
import CarCalendar from '../Calendar/CarCalendar';


export default function Car() {

  const { id } = useParams();
  const { cars } = useSelector((store) => store.cars)
  console.log(cars)
  const car = cars.filter(car => car.id == id)[0];

  return (
    <>
      {car &&
      <>
      <div className="container">
        <div className='car__inner'>
          <CarSlider car={car} />
          <CarContent car={car} />
        </div>
        <h2 className='carform__title'>Расчет аренды автомобиля</h2>
        <CarCalendar car={car} />
        <h2 className='mapcar__title'>Местонахождение вашего автомобиля</h2>
        {/* <MoreCar/> */}
      </div>
        <MapCar car={car} />
      </>
      }
    </>
  )
}

