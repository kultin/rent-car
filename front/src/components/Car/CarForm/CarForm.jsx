import React from "react";
import CarCalendar from '../../Calendar/CarCalendar';
import "./carform.modules.scss";

export default function CarForm({car}) {
  return (
    <>
      <div className="carform">
        <h1 className="carform__title">Форма брони автомобиля</h1>
        <div className="carform__box">
          <CarCalendar car={car}/>
          <div className="carform__content">
            <div className="carform__content-price">
              <p className="carform__content-price-label">Cтоимость вашей поездки</p>
              <div className="carform__content-price-output">20000 р.</div>
            </div>
            <div className="carform__content-days">
              <p className="carform__content-days-label">Время поездки</p>
              <div className="carform__content-days-output">10 дней</div>
            </div>
            <button className='car__desc-btn'>Забронировать</button>
          </div>
        </div>
      </div>
    </>
  )
}
