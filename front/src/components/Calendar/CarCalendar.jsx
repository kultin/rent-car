import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import { addDays, subDays, format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userReducer } from '../../store/userReducer';
import "./calendar.modules.scss";

export default function CarCalendar({ car }) {

  const navigate = useNavigate();

  const user = useSelector((store) => (store.user.user))
  const bookings = useSelector((store) => store.user.bookings);
  const carBookings = bookings.filter((booking) => booking.car_id == car.id)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [days, setDays] = useState(0);
  const [price, setPrice] = useState(0);

  //при выборе 2 дат формируется массив из 2 элементов - этих дат
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  //по клику "Забронировать" создаем новый букинг формата  ['2022-08-24', '2022-08-29']
  const onClick = () => {
    // console.log(user)
    if (user.name == undefined) {
      navigate('/login')
    }

    const start = format(startDate, "yyyy-MM-dd")
    const finish = format(endDate, "yyyy-MM-dd")

    // расчет количества дней и суммы поездки
    let differenceTime = endDate.getTime() - startDate.getTime();
    let differenceDays = differenceTime / (1000 * 3600 * 24);
    let totalPrice = differenceDays * car.price;
    console.log(differenceDays)
    setDays(differenceDays);
    setPrice(totalPrice);


    const newBooking = {
      start: start,
      finish: finish,
      location: car.location,
      carId: car.id,
      days: differenceDays,
      price: totalPrice,
    }
    axios.post('http://localhost:3005/bookings', newBooking, { withCredentials: true })
      .then((res) => console.log(res.data))
  }


  const bookingsDates = []

  for (let i = 0; i < carBookings.length; i++) {
    bookingsDates.push([carBookings[i].date_start, carBookings[i].date_end])
  }

  //получаем из базы или стейта все брони на машину, добавляем в массив интервалов и в функцию excludeDateIntervals
  //которая делает даты недопустимыми к бронированию
  // const bookingsDates= [["2022-08-12","2022-08-15"],["2022-08-17","2022-08-21"], ["2022-08-27","2022-08-29"]]  
  let intervals = [{ start: subDays(new Date(), 150), end: subDays(new Date(), 1) }]
  for (let i = 0; i < bookingsDates.length; i++) {
    intervals.push({ start: subDays(new Date(bookingsDates[i][0]), 1), end: (new Date(bookingsDates[i][1])) })
  }

  return (
    <div className="carform">
      <h1 className="carform__title">Форма брони автомобиля</h1>
      <div className="carform__box">
        <div className='calendar'>
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            //excludeDateIntervals={[{ start: subDays(new Date("2022-08-12"),1), end: (new Date("2022-08-15")) }]}
            excludeDateIntervals={intervals}
            selectsRange
            selectsDisabledDaysInRange
            inline
          />
          {/* <button onClick={onClick}> Забронировать </button> */}
        </div>
        <div className="carform__content">
          <div className="carform__content-price">
            <p className="carform__content-price-label">Cтоимость вашей поездки</p>
            <div className="carform__content-price-output">{price} р.</div>
          </div>
          <div className="carform__content-days">
            <p className="carform__content-days-label">Время поездки</p>
            <div className="carform__content-days-output">{days} дней</div>
          </div>
          <button className='car__desc-btn' onClick={onClick}>Забронировать</button>
        </div>
      </div>
    </div>

  );
}

