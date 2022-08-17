import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarCard from "../../carCard/CarCard";
import '../private.modules.scss';

export default function Privatefavorites() {

  const [likes, setLikes] = useState([]);

  const dispatch = useDispatch()

  const { cars } = useSelector((store) => store.cars)

  let likedCars = [];

  useEffect(() => {
    axios.get(`http://localhost:3005/likes/fav`, { withCredentials: true })
      .then((res) => setLikes(res.data))
  }, [])

  for (let i = 0; i < likes.length; i++) {
    let car = cars.filter((car) => car.id == likes[i].car_id)[0]
    likedCars.push(car);
  }

  return (
    <>
      <div className="favorites">
        <h2 className="title favorites__title">Избранное</h2>
        <div className="favorites__inner">
          {likedCars.map((car) => (< CarCard key={car.id} car={car}/>))}
        </div>
      </div>
    </>
  )
}
