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
        {bookings.map((booking) => {
          return <div className="booking" key={booking.id}>
            <p>{booking.id}</p>
          </div>
        })}
      </div>
    </>
  )
}
