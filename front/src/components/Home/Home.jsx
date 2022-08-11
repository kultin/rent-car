import React from "react";
import './home.modules.scss';
import HomeBanner from "../Home/HomeComponent/HomeBanner";
import SimpleSlider from "../Slider/Slider";
import MyMap from '../Map/Map'

export default function Home() {
  return (
    <>
      <HomeBanner />
      <SimpleSlider />
      <div className="container">
        <h2 className='mapcar__title'>Наши автомобили на карте</h2>
      </div>
      <MyMap />
    </>
  )
}
