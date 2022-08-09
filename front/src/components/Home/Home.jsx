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
      <MyMap/>
    </>
  )
}
