import React from "react";
import './private.modules.scss';
import Privateinfo from './Privatecomponents/Privateinfo'
import Privatebookings from './Privatecomponents/Privatebookings'
import Privatefavorites from './Privatecomponents/Privatefavorites'




export default function Home() {
  return (
    <>
     <Privateinfo />

     <Privatebookings />

     <Privatefavorites/>
    </>
  )
}
