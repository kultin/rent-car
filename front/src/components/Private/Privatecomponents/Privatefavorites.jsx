import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CarCard from "../../carCard/CarCard";
import '../private.modules.scss';

export default function Privatefavorites() {

  const dispatch = useDispatch()

  useEffect(() => {
      axios.get(`http://localhost:3005/likes/fav`, { withCredentials: true })
        .then((res) => console.log(res.data))
  }, [])

  return (
    <>
      <div className="favorites">
        <h2 className="title favorites__title">Избранное</h2>
        <div className="favorites__inner">
          {/* <CarCard /> */}
        </div>
      </div>
    </>
  )
}
