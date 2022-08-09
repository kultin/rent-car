import React from "react";
import './map.modules.scss';
import { YMaps, Map } from "react-yandex-maps";

export default function MyMap() {
  return (
    <>
      <YMaps>
        <div className="map__box">
          <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} width="100%" height="100%"/>
        </div>
      </YMaps>
    </>
  )
}
