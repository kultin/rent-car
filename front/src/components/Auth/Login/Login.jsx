import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {logInThunk} from '../../../store/userActions'
import "./login.modules.scss";


export default function LogIn()  {
  const navigate = useNavigate();
  const initState = {
    email: '',
    password: '',
  }
  const [values, setValues] = useState(initState);
  const [response, setResponse] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  
  const inputHandler = (e) => {
    setValues((prevState) => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }
  
  const submitHandler = (e) => {
    e.preventDefault();
    const resp = dispatch(logInThunk(values))
    navigate('/')
  }

  return (
    <>
        <div className="login">
        
        {/* <div classNamename={response ? "alert alert-danger" : "none"} role="alert">
          Неверное имя или пароль!
          </div> */}
        {/* <p id={response ? "block" : "none"}>Неверное имя или пароль!</p> */}
            <form onSubmit={submitHandler} className="login__form">
            <h1 className='login__form-title'>Войти</h1>
                <div className="login__form-box">
                    <label className='login__form-label'>Email</label>
                    <input className="login__form-input" type="text" name="email" value={values.email} required pattern='^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$' onChange={inputHandler} />
                </div>
                <div className="login__form-box">
                    <label className='login__form-label'>Пароль</label>
                    <input className="login__form-input" type="password" name="password" value={values.password} required onChange={inputHandler}  />
                </div>
                <button type="submit" className="login__form-btn">Войти</button>
                <p className='login__form-accept'>Нажимая кнопку “Войти” Вы даете согласие на обработку своих персональных данных</p>
            </form>
        
        </div>
        </>
        )
}
