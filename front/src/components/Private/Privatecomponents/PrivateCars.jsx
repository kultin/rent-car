import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CarCard from '../../carCard/CarCard';
import '../private.modules.scss';
import axios from 'axios';

import { setCarsAC } from '../../../store/action';

export default function PrivateCars({setTabIndex}) {

  const dispatch = useDispatch()

  useEffect(()=>{
    axios.get('http://localhost:3005/cars')
      .then((res)=> dispatch(setCarsAC(res.data)))
  }, [dispatch])

  const { user } = useSelector((store) => (store.user))
  const { cars } = useSelector((store) => store.cars)

  const userCars = cars.filter(car => car.user_id === user.id)
  const edit = true

  return (
    <>
      <h2 className="title privatecars__title">Мои машины</h2>

      <div className="privatecars__inner">
        {userCars.map((car) => < CarCard key={car.id} car={car} edit={edit} setTabIndex={setTabIndex} />)}
      </div>

    </>
  )
}
