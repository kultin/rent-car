import React from "react";
import './mapcar.modules.scss';
import { YMaps, Map, Placemark, ZoomControl, TrafficControl } from "react-yandex-maps";

export default function MapCar({car}) {

  return (
    <>
      <YMaps>
        <div className="map__box">
          <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} width="100%" height="100%">
            <Placemark
                geometry={car.location.split(',')}
                options={{ preset: 'islands#redAutoIcon' }}
              />
            <ZoomControl />
            <TrafficControl />
          </Map>
        </div>
      </YMaps>
    </>
  )
}
