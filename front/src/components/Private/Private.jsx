import React from "react";
import './private.modules.scss';
import Privateinfo from './Privatecomponents/Privateinfo'
import Privatebookings from './Privatecomponents/Privatebookings'
import Privatefavorites from './Privatecomponents/Privatefavorites'
import { getBookingsThunk } from '../../store/userActions'

import { useDispatch } from 'react-redux'



export default function Private() {

  const dispatch = useDispatch()


  React.useEffect(() => {
    dispatch(getBookingsThunk())
  }, [])


  return (
    <>
      <Privateinfo />

      <Privatebookings />

      <Privatefavorites />
    </>
  )
}
