import React from 'react';
import car from "./car.modules.scss";
// import morecar from "../morecar.modules.scss";
import carslider from "./CarSlider/carslider.modules.scss";
import carcontent from "./CarContent/carcontent.modules.scss";
import CarSlider from './CarSlider/CarSlider';
import CarContent from './CarContent/CarContent';
// import MoreCar from './MoreCar/MoreCar';

export default function Car({car}) {
  return (
    <div className="container">
      <CarSlider/>
      {/* <CarContent/> */}
      {/* <MoreCar/> */}

    </div>
  )
}
