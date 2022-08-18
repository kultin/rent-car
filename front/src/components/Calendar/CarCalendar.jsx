import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker"
import { subDays, format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./calendar.modules.scss";
import { registerLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import { construct } from 'ramda';
import { addBookingAC, setCarsAC} from '../../store/action';

registerLocale('ru', ru)

export default function CarCalendar({ car }) {

  const dispatch = useDispatch()

  useEffect(()=>{
    axios.get('http://localhost:3005/cars')
      .then((res)=> dispatch(setCarsAC(res.data)))
  }, [dispatch])

  const navigate = useNavigate();
  const user = useSelector((store) => (store.user.user))
  const { bookings } = useSelector((store) => (store.bookings))
  const carBookings = bookings.filter((booking) => booking.CarId == car.id)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  const [days, setDays] = useState(0);
  const [price, setPrice] = useState(0);
  const [mountTent, setMountTent] = useState(false);
  const [tent, setTent] = useState({});


  useEffect(() => {
    if (endDate) {
      let differenceTime = endDate.getTime() - startDate.getTime();
      let differenceDays = differenceTime / (1000 * 3600 * 24);
      let totalPrice;
      tent.price ? totalPrice = differenceDays * (car.price + tent.price) : totalPrice = differenceDays * car.price
      setDays(differenceDays);
      setPrice(totalPrice);
    }
  }, [endDate, tent])


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
      return navigate('/login')
    }

    const start = format(startDate, "yyyy-MM-dd")
    const finish = format(endDate, "yyyy-MM-dd")

    // расчет количества дней и суммы поездки
    const newBooking = {
      start: start,
      finish: finish,
      location: car.location,
      carId: car.id,
      days: days,
      price: price,
      tentId: tent.id
    }
    axios.post('http://localhost:3005/bookings', newBooking, { withCredentials: true })
      .then((res) => dispatch(addBookingAC(res.data)))
    navigate('/private')
  }

  const bookingsDates = []
  if (carBookings.length) {
    for (let i = 0; i < carBookings.length; i++) {
      bookingsDates.push([carBookings[i].date_start, carBookings[i].date_end])
    }
  }
  // console.log('bookingsDates: ', bookingsDates);
  //получаем из базы или стейта все брони на машину, добавляем в массив интервалов и в функцию excludeDateIntervals
  //которая делает даты недопустимыми к бронированию
  // const bookingsDates= [["2022-08-12","2022-08-15"],["2022-08-17","2022-08-21"], ["2022-08-27","2022-08-29"]]  
  let intervals = [{ start: subDays(new Date(), 150), end: subDays(new Date(), 1) }]
  for (let i = 0; i < bookingsDates.length; i++) {
    intervals.push({ start: subDays(new Date(bookingsDates[i][0]), 1), end: (new Date(bookingsDates[i][1])) })
  }

  const selectHandler = (e) => {
    e.preventDefault();
    const tent = car.Tents.filter((tent) => tent.name === e.target.value)[0];
    setTent({ id: tent.id, price: tent.price, capacity: tent.capacity, photo: tent.img_url })
    setMountTent(true);
  }
  

  return (

    <div className="carform">
      <div className='calendar'>
        <DatePicker
          locale="ru"
          dateFormat="yyyy/MM/dd"
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          excludeDateIntervals={intervals}
          selectsRange
          selectsDisabledDaysInRange
          inline
        />
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
      <div className='carform__tent'>
        <p className="carform__content-tent-label">Выбрать палатку</p>
        <select className="carform__tent-select" name="tent" id="tent" onChange={selectHandler}>
          {car?.Tents?.length &&
            car.Tents.map((tent) => (<option className="carform__tent-option" value={tent.name} key={tent.id}>{tent.name}</option>)
            )}
        </select>
        {mountTent &&
          <>
            <div className='carform__tent-box'>
              <p className='carform__tent-capacity'>Вместимость:</p>
              <span>{tent.capacity} чел.</span>
            </div>
            <div className='carform__tent-box'>
              <p className='carform__tent-price'>Цена за сутки:</p>
              <span>{tent.price} р.</span>
            </div>
            <img className='carform__tent-img' src={tent.photo} alt='img' />
          </>
        }
      </div>
    </div>
  );
}

