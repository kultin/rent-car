import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import ImgMediaCard from '../../components/CardCar/CardCar'
import Filter from '../../components/Filter/Filter'
import style from "./style.module.css"
import {setFilterAC } from '../../store/action';

export default function Catalogue() {
  const { cars } = useSelector((store) => store.cars)
  console.log(cars)
  const filteredCars = useSelector((store) => store.cars.filteredCars)
  const filter = useSelector((store) => store.cars.filter)
  console.log(filteredCars)
  console.log(filter)
  const dispatch =useDispatch();

  // useEffect(()=>{
  //   dispatch(setFilterAC(false))
  //   console.log(filter)
  // },[])
  //console.log(filter)
  //const [filter, setFilter] = useState(false)
 

  return (
    <section className={style.cars}>
      <Filter />
      <br />
      <br />
      <div className={style.inner}>        
        {!filter ?
         cars.map((car) => < ImgMediaCard key={car.id} car={car} />)          
          :
          filteredCars.map((car) => < ImgMediaCard key={car.id} car={car} />)
        }
      </div>
    </section>
  )
}
