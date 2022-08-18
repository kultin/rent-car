import React from "react";
import './map.modules.scss';
import { YMaps, Map, Placemark, ZoomControl, TrafficControl } from "react-yandex-maps";
import { useSelector } from 'react-redux';

export default function MyMap() {

  const { cars } = useSelector((store) => store.cars)

  return (
    <>
      <YMaps>
        <div className="map__box">
          <Map defaultState={{ center: [55.75, 37.57], zoom: 8 }} width="100%" height='570px'>
            {cars.map((car) => {
              return <Placemark
                key={car.id}
                geometry={(car.location != null) ? (car.location.split(',')) : (null)}
                options={{ preset: 'islands#redAutoIcon' }}
              />
            })}
            <ZoomControl />
            <TrafficControl />
          </Map>
        </div>
      </YMaps>
    </>
  )
}

// const styles = {
//   size: {maxWidth: '100%', height: 'auto'},
// }
