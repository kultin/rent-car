import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import { addDays, subDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css'
export default function Calendar() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    console.log(dates)
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);    
  };
  const onClick = () => {
    console.log([startDate.toDateString(), endDate])
  }
  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}        
        excludeDateIntervals={[{ start: subDays(new Date(), 150), end: subDays(new Date(), 1)}]}        
        selectsRange
        selectsDisabledDaysInRange
        inline
      />
      <button onClick={onClick}> Проверить даты </button>
    </div>

  );
}

//Подходящий формат данных для postgres 1999-01-08 (04:05:06) типов timestamp 
