import React from "react";
import CarCard from "../../carCard/CarCard";
import '../private.modules.scss';

export default function Privatefavorites() {

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
