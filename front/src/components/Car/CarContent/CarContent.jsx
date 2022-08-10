import React from 'react';
import carcontent from "./carcontent.modules.scss";

export default function CarContent({ car }) {
  console.log(car)    
  return (
    <>
      <div className="car__desc">
        <h2 className="car__desc-title">{car.brand}<span>{car.model}</span></h2>
        <ul className="car__desc-list">
          <li className="car__desc-item">Год выпуска: <span>{car.year}</span></li>
          <li className="car__desc-item">Мощность: <span>{car.power}</span></li>
          <li className="car__desc-item">КПП: <span>{car.gear}</span></li>
          <li className="car__desc-item">ОбЪем двигателя: <span>{car.engine}</span></li>
          <li className="car__desc-item">Салон: <span>{car.seats}</span></li>
        </ul>
        <button className='car__desc-btn'>Забронировать онлайн</button>
      </div>
    </>

  )
}
