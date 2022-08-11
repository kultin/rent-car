import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import { addDays, subDays, format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css'

export default function Calendar() {
  //при выборе 2 дат формируется массив из 2 элементов - этих дат
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    console.log(dates)
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);    
  };

  //по клику "Забронировать" получаем желаемые даты брони ['2022-08-24', '2022-08-29']
  const onClick = () => {
    const start=format(startDate, "yyyy-MM-dd")
    const finish=format(endDate, "yyyy-MM-dd")
    console.log( [start,finish])
  }
  return (
    <div>

      <Calendar value ={date} onChange={setDate}
      next2Label={null} prev2Label={null}/>
      </div>
  )

      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}     
        //исключаем последние 150 дней из поиска вплоть до сегодня   
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
