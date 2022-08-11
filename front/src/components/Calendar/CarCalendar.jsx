import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import { addDays, subDays, format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';

export default function CarCalendar({car}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  //при выборе 2 дат формируется массив из 2 элементов - этих дат
  const onChange = (dates) => {    
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end); 
  };
  //по клику "Забронировать" создаем новый букинг формата  ['2022-08-24', '2022-08-29']
  const onClick = () => {
    const start=format(startDate, "yyyy-MM-dd")
    const finish=format(endDate, "yyyy-MM-dd")
    //const newBooking=[start,finish];
    
    const newBooking={
      start:start,
      finish: finish,
      location: car.location,
      carId: car.id,      
    }
    console.log(newBooking )
    axios.post('http://localhost:3005/bookings',newBooking)
    
  }
  //получаем из базы или стейта все брони на машину, добавляем в массив интервалов и в функцию excludeDateIntervals
  //которая делает даты недопустимыми к бронированию
  const bookings= [["2022-08-12","2022-08-15"],["2022-08-17","2022-08-21"], ["2022-08-27","2022-08-29"]]  
  let intervals =[{ start: subDays(new Date(), 150), end: subDays(new Date(), 1)}]
  for (let i=0; i<bookings.length; i++) {
    intervals.push({start: subDays(new Date(bookings[i][0]),1), end: (new Date(bookings[i][1]))})   
  }  

  return (
    <div>
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        //excludeDateIntervals={[{ start: subDays(new Date("2022-08-12"),1), end: (new Date("2022-08-15")) }]}
        excludeDateIntervals={ intervals }
        selectsRange
        selectsDisabledDaysInRange
        inline
      />
      <button onClick={onClick}> Забронировать </button>
    </div>

  );
}

