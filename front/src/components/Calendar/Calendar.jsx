import Calendar from 'react-calendar'
import { useState } from 'react'
import React from 'react'
import 'react-calendar/dist/Calendar.css';

export default function CalendarComponent() {
  const [calValue, setCalValue] =useState(new Date())
  return (
    <div>
      Calendar
      <Calendar value ={calValue} onChange={setCalValue}
      next2Label={null} prev2Label={null}/>
      </div>
  )
}
