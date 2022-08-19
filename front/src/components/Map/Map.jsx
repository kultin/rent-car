import React from "react";
import './map.modules.scss';
import { YMaps, Map, Placemark, ZoomControl, TrafficControl } from "react-yandex-maps";
import { useSelector } from 'react-redux';
import CarCard from "../carCard/CarCard";

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
                properties={{
                  hintContent: car.brand,
                  item: car.id,
                    balloonContentHeader: car.brand,
                    balloonContentBody: `
                    <div>
                      <img src="http://localhost:3005${car.photo}" />
                    </div>  `,
                }}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                // onClick={() => console.log('ddddd')}
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
