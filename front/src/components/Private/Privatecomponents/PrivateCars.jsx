import React from 'react'
import { useSelector } from 'react-redux';
import CarCard from '../../carCard/CarCard';
import '../private.modules.scss';

export default function PrivateCars() {
  const { user } = useSelector((store) => (store.user))
  const { cars } = useSelector((store) => store.cars)

  const userCars = cars.filter(car => car.user_id === user.id)
  const edit = true
  const delCar = true

  return (
    <>
      <h2 className="title privatecars__title">Мои машины</h2>
      <div className="privatecars__inner">
        {userCars.map((car) => < CarCard key={car.id} car={car} edit={edit} delCar={delCar} />)}
      </div>
    </>
  )
}
