import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "./car.modules.scss";
import "./CarSlider/carslider.modules.scss";
import "./CarContent/carcontent.modules.scss";
import CarSlider from './CarSlider/CarSlider';
import CarContent from './CarContent/CarContent';
import CarForm from './CarForm/CarForm';
import MapCar from '../MapCar/MapCar'
import CarCalendar from '../Calendar/CarCalendar';


export default function Car() {

  const { id } = useParams();
  const { cars } = useSelector((store) => store.cars)
  const car = cars.filter(car => car.id == id)[0];

  return (
    <>
      {car &&
        <>
          <div className="container">
            <div className='car__inner'>
              <CarSlider car={car} />
              <CarContent  car={car}/>
            </div>
            <CarForm car={car} />
            {/* <MoreCar/> */}
            <h2 className='mapcar__title'>Местонахождение вашего автомобиля</h2>
          </div>
          <MapCar car={car} />
        </>
      }
    </>
  )
}

