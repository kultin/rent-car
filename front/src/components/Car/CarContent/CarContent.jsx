import React from 'react';
import "./carcontent.modules.scss";

export default function CarContent({ car }) {

  return (
    <>
      {car &&
        <div className="car__desc">
          <h2 className="car__desc-title">{car.brand}<span>{car.model}</span></h2>
          <ul className="car__desc-list">
            <li className="car__desc-item item__price">Цена: <span>{car.price} р/сутки</span></li>
            <li className="car__desc-item item__param"><span>Информация о машине</span></li>
            <li className="car__desc-item">Год выпуска: <span>{car.year} год</span></li>
            <li className="car__desc-item">Мощность: <span>{car.power} л.с</span></li>
            <li className="car__desc-item">КПП: <span>{car.gear}</span></li>
            <li className="car__desc-item">Объем двигателя: <span>{car.engine} л.</span></li>
            <li className="car__desc-item">Салон: <span>{car.seats}</span></li>
            <li className="car__desc-item">Тип кузова: <span>{car.body}</span></li>
            <li className="car__desc-item">Мощность: <span>{car.power}</span></li>
          </ul>
        </div>
      }
    </>
  )
}
