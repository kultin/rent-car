import React from "react";
import HomeBanner from "../Home/HomeComponent/HomeBanner";
import SimpleSlider from "../Slider/Slider";
import './home.modules.scss';

export default function Home() {
  return (
    <>
      <HomeBanner />
      <SimpleSlider />
    </>
  )
}
