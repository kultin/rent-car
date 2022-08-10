import Calendar from 'react-calendar'
import { useState } from 'react'
import React from 'react'
import 'react-calendar/dist/Calendar.css';

export default function CalendarComponent() {
  const [date, setDate] =useState(new Date())
  console.log(date.toString())
  return (
   
    <div>
      Calendar
      <Calendar value ={date} onChange={setDate}
      next2Label={null} prev2Label={null}/>
      <button></button>
      </div>
  )
}
