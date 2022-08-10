import React from 'react';
import carcontent from "./carcontent.modules.scss";

export default function CarContent({car}) {
  return (  
    <>
          <div className="car__content">
        <h2 className="car__content-title">Описание Toyota Camry 2013 2.0 AT Стандарт</h2>
        <p className="car__content-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et lorem elit. Nam nisi nulla, fringilla vel pharetra ac, luctus in est. Pellentesque faucibus interdum arcu, non molestie leo malesuada in. Donec quam turpis, hendrerit nec ante id, tincidunt convallis sapien. In molestie dignissim elit non mollis. Donec at dapibus nisl, sed aliquam ipsum. Mauris mi libero, congue ut feugiat sit amet, cursus eget orci. Aenean vel fermentum dui. Aenean dictum diam in augue porttitor luctus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et lorem elit. Nam nisi nulla, fringilla vel pharetra ac, luctus in est. Pellentesque faucibus interdum arcu, non molestie leo malesuada in. Donec quam turpis, hendrerit nec ante id, tincidunt convallis sapien. In molestie dignissim elit non mollis. </p>
      </div>
      <div className="car__desc">
        <h2 className="car__desc-title">Комплектация Toyota Camry 2013 2.0 AT Стандарт</h2>
        <ul className="car__desc-list">
            <li className="car__desc-item"> Год выпуска: { car.year }</li>
            <li className="car__desc-item">Мощность: { car.power }</li>
            <li className="car__desc-item">КПП: { car.gear }</li>
            <li className="car__desc-item">ОбЪем двигателя: { car.engine }</li>
            <li className="car__desc-item">Салон: { car.seats }</li>
          </ul>
      </div>
    </>
    
  )
}
