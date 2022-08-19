import React from 'react'
import { useDispatch } from 'react-redux'
import style from "./style.module.css"
import { paginateAC } from '../../store/action';

export default function Pagination({ carsPerPage, totalCars,paginate }) {
  const dispatch= useDispatch();
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
          <a href="#"className={style.link} onClick ={()=>dispatch(paginateAC(num))}>
            {num}
          </a>
        </li>
        ))              
        }
      </ul>
    </div>
  )
}
