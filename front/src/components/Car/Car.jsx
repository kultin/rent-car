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
import { setCarsAC } from '../../store/action';
import axios from 'axios';


// import "../morecar.modules.scss";
// import MoreCar from './MoreCar/MoreCar';
import CarCalendar from '../Calendar/CarCalendar';


export default function Car() {
  const [car, setCar] = React.useState({})
  const { cars } = useSelector((store) => store.cars)
  const { id } = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('http://localhost:3005/cars')
      .then((res) => dispatch(setCarsAC(res.data)))
      if (cars.length) {
        setCar(cars.filter(car => car.id == id)[0])
      }
  }, [])


 

  console.log(id);
  console.log(cars);
  console.log(car);

  return (
    <>
      <div className="container">
        <div className='car__inner'>
          <CarSlider cars={cars} />
          <CarContent car={car} />
        </div>
        <CarForm />
        {/* <MoreCar/> */}

        <h2 className='mapcar__title'>Местонахождение вашего автомобиля</h2>

        <div className="carslider__content">
          <p className="carslider__content-text">Информация о машине</p>
          <p className="carslider__content-text">Форма брони с календарем</p>
          <p className="carslider__content-text">Отзывы</p>
          <p className="carslider__content-text">Возможность добавить в избранное</p>
          <p className="carslider__content-text">Карта где находиться авто</p>
        </div>
        <CarCalendar car={car} />

      </div>
      <MapCar car={car} />
    </>
  )
}

{/* 
<p className="carslider__content-text">Отзывы</p>
<p className="carslider__content-text">Возможность добавить в избранное</p>
*/}
