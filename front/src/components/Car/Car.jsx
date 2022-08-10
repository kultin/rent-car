import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import  "./car.modules.scss";
import  "./CarSlider/carslider.modules.scss";
import  "./CarContent/carcontent.modules.scss";
// import "../morecar.modules.scss";
import CarSlider from './CarSlider/CarSlider';
import CarContent from './CarContent/CarContent';
import CarForm from './CarForm/CarForm';
import MyMap from '../Map/Map'
// import MoreCar from './MoreCar/MoreCar';

export default function Car() {

  const { cars } = useSelector((store) => store.cars)
  const { id } = useParams();
  const car = cars.filter(car => car.id == id)[0] ;
  console.log(car)
  return (
    <>
      <div className="container">
        <div className='car__inner'>
          <CarSlider />
          <CarContent car={car} />
        </div>
        <CarForm/>
        {/* <MoreCar/> */}
        <h2 className='mapcar__title'>Местонахождение вашего автомобиля</h2>
      </div>
      <MyMap />
    </>
  )
}

{/* 
<p className="carslider__content-text">Отзывы</p>
<p className="carslider__content-text">Возможность добавить в избранное</p>
*/}
