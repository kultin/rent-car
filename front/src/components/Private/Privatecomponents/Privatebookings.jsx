import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import { getBookingsThunk } from '../../../store/userActions'
import '../private.modules.scss';



export default function Privatebookings() {

  const dispatch = useDispatch()

  const user = useSelector((store) => (store.user.user))

  const bookings = useSelector((store) => store.user.bookings);

  React.useEffect(() => {
    dispatch(getBookingsThunk())
  }, [])

  return (
    <>
      <div className="allBookings">
        {bookings.map((booking) => <p key={booking.id}>{booking.date_start}</p> )}
      </div>
    </>


  )
}
