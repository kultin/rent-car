import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import { addDays, subDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css'
export default function CarCalendar() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    console.log(dates)
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    // console.log(startDate)
    // console.log(endDate)  
  };
  const onClick = () => {
    console.log([startDate.toString(), endDate])
  }
  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        //excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
        //excludeDateIntervals={[{ start: subDays(new Date(), 5), end: addDays(new Date(), 5) }]}
        excludeDateIntervals={[{ start: subDays(new Date("2022-08-12"),1), end: (new Date("2022-08-15")) }]}
        selectsRange
        selectsDisabledDaysInRange
        inline
      />
      <button onClick={onClick}> Проверить даты </button>
    </div>

  );
}

