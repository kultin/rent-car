import './home.modules.scss';
import React from 'react'
import HomeBanner from "../Home/HomeComponent/HomeBanner";
import HomeSlider from "../Slider/Slider";
import MyMap from '../Map/Map'

export default function Home() {
  return (
    <>
      <HomeBanner />
      <HomeSlider />
      <div className="container">
        <h2 className='mapcar__title'>Наши автомобили на карте</h2>
      </div>
      <MyMap />
    </>
  )
}