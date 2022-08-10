import React from "react";
import './map.modules.scss';
import { YMaps, Map, Placemark, ZoomControl, TrafficControl } from "react-yandex-maps";


export default function MyMap() {
  return (
    <>
      <YMaps>
        <div className="map__box">
          <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} width="100%" height="100%">
            <Placemark
              geometry={[55.684758, 37.738521]}
              options={{ preset: 'islands#redAutoIcon' }}
            />
            <Placemark
              geometry={[55.714103, 37.598069]}
              options={{ preset: 'islands#redAutoIcon' }}
            />
            <Placemark
              geometry={[55.762080, 37.614186]}
              options={{ preset: 'islands#redAutoIcon' }}
            />
            <Placemark
              geometry={[55.887563, 37.431049]}
              // options={{ preset: 'islands#redStretchyIcon', iconContent: "Машина" }}
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
