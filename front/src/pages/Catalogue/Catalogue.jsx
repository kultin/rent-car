import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import Filter from '../../components/Filter/Filter'
import style from "./style.module.css"
import { setFilterAC } from '../../store/action';
import Pagination from '../../components/Pagination/Pagination';
import CarCard from '../../components/carCard/CarCard';
import CalendarComponent from '../../components/Calendar/Calendar';


export default function Catalogue() {
  const { cars } = useSelector((store) => store.cars)
  const filteredCars = useSelector((store) => store.cars.filteredCars)
  const filter = useSelector((store) => store.cars.filter)
  const currentPage=useSelector((store)=>store.cars.currentPage)

  const [carsPerPage] = useState(9);
  const lastCarIndex = currentPage * carsPerPage;
  const firstCarIndex = lastCarIndex - carsPerPage;
  const currentCars = cars.slice(firstCarIndex, lastCarIndex);
  const currentFilteredCars = filteredCars.slice(firstCarIndex, lastCarIndex);
  
  return (
    <section className={style.cars}>
      <Filter />
      <br />      
      <CalendarComponent/>
      <br />
      <div className={style.inner}>
        {!filter ?
          currentCars.map((car) => < CarCard key={car.id} car={car} />)
          :
          currentFilteredCars.map((car) => < CarCard key={car.id} car={car} />)
        }

      </div>
      {!filter ?
          <Pagination carsPerPage={carsPerPage} totalCars={cars.length}  />
          :
          <Pagination carsPerPage={carsPerPage} totalCars={filteredCars.length}  />
        }     
    </section>
  )
}
