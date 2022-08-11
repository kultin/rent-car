import './home.modules.scss';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import HomeBanner from "../Home/HomeComponent/HomeBanner";
import SimpleSlider from "../Slider/Slider";
import MyMap from '../Map/Map'
import axios from 'axios';
import { setCarsAC } from '../../store/action';
import Footer from '../Footer/Footer'

export default function Home() {

  const dispatch = useDispatch()

  useEffect(()=>{
    axios.get('http://localhost:3005/cars')
      .then((res)=> dispatch(setCarsAC(res.data)))
  }, [])

  return (
    <>
      <HomeBanner />
      <SimpleSlider />
      <div className="container">
        <h2 className='mapcar__title'>Наши автомобили на карте</h2>
      </div>
      <MyMap />
      <Footer/>
    </>
  )
}
