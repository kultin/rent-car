import React from "react";
import './mapcar.modules.scss';
import { YMaps, Map, Placemark, ZoomControl, TrafficControl } from "react-yandex-maps";

export default function MapCar({ car }) {
  const locationCar = car.location?.split(',').map((el) => Number(el))
  return (
    <>
      {car &&
        <YMaps> 
          <div className="mapcar__box">
            <Map defaultState={{ center: locationCar, zoom: 9 }} width="100%" height="100%">
              <Placemark
                geometry={(car.location != null) ? (car.location.split(',')) : (null)}
                options={{ preset: 'islands#redAutoIcon' }}
              />
              <ZoomControl />
              <TrafficControl />
            </Map>
          </div>
        </YMaps>
      }
    </>
  )
}
