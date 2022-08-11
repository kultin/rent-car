import React from 'react';
import { useParams } from 'react-router-dom';
import carcontent from "./carcontent.modules.scss";

export default function CarContent({ cars }) {
  const { id } = useParams();
  const car = cars.filter(car => car.id == id)[0];

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

// const initCars = [
//   {id:1, brand: "Volkswagen", model: "Polo", body: "sedan", year:2018, engine: "1,6 ", gear: "Автомат", power: "110", seats: "ткань", photo:"", price: 2500, class: "econom"},
//   {id:2, brand: "Volkswagen", model: "Passat B8", body: "sedan", year:2018, engine: "1,6 ", gear: "Автомат", power: "110", seats: "ткань", photo:"", price: 4200, class: "business"},
//   {id:3, brand: "Skoda", model: "Rapid", body: "sedan", year:2020, engine: "1,6 ", gear: "Автомат", power: "110", seats: "ткань", photo:"", price: 2500, class: "econom"},
//   {id:4, brand: "Nissan", model: "Quashqai", body: "sedan", year:2020, engine: "1,6 ", gear: "Автомат", power: "144",seats: "экокожа", photo:"", price: 3500, class: "comfort"},
//   {id:5, brand: "Renault", model: "Arkana", body: "crossover", year:2022, engine: "2 ", gear: "Автомат", power: "184",seats: "кожа", photo:"", price: 3500, class: "econom"},
//   {id:6, brand: "Renault", model: "Kaptur", body: "crossover", year:2021, engine: "2 ", gear: "Автомат", power: "150",seats: "кожа",photo:"", price: 2900, class: "econom"},
//   {id:7, brand: "Toyota", model: "Camry V55", body: "crossover", year:2021, engine: "2 ", gear: "Автомат", power: "150",seats: "кожа",photo:"", price: 8500, class: "business"},
//   {id:8, brand: "Audi", model: "A3", body: "crossover", year:2019, engine: "2 ", gear: "Автомат", power: "150",seats: "кожа",photo:"", price: 3500, class: "comfort"}
// ]
