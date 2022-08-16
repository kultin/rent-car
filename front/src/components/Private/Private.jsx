import React from "react";
import './private.modules.scss';
import Privateinfo from './Privatecomponents/Privateinfo'
import Privatebookings from './Privatecomponents/Privatebookings'
import Privatefavorites from './Privatecomponents/Privatefavorites'
import { getBookingsThunk, getUserThunk } from '../../store/userActions'
import { useDispatch, useSelector } from 'react-redux';
import AddCArForm from "./Privatecomponents/AddCarForm";
import PrivateCars from "./Privatecomponents/PrivateCars";


export default function Private() {

  const dispatch = useDispatch()

  const { user } = useSelector((store) => (store.user))

  React.useEffect(() => {
    dispatch(getBookingsThunk())
  }, [])

  return ((user.role == 'lessor') ? (
    <div className="container">
      <div className="user__box">
        <Privateinfo />
        <div className="user__box-value">
          <Privatebookings title="Мои заказы" />
          <AddCArForm />
          <PrivateCars />
        </div>
      </div>
    </div>
  ) : (
    <div className="container">
      <div className="user__box">
        <Privateinfo />
        <div className="user__box-value">
          <Privatebookings title="Мои бронирования" />
          <Privatefavorites />
        </div>
      </div>
    </div>
  )
  )
}