import React from 'react'
import style from "./style.module.css"

export default function Pagination({ carsPerPage, totalCars,paginate }) {
  const pageNums = []
  for (let i = 1; i <= Math.ceil(totalCars/carsPerPage); i++) {
    pageNums.push(i)
  }
  return (
    <div >
      <ul className={style.pagination}>
        {
        pageNums.map((num)=>(
          <li key={num} className={style.page}>
          <a href="#"className={style.link} onClick ={()=>paginate(num)}>
            {num}
          </a>
        </li>
        ))
        
        
        }
      </ul>
    </div>
  )
}
