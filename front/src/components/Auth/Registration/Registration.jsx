import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registrationThunk } from '../../../store/userActions'
import "./registration.modules.scss";


export default function Registration() {
  const initState = {
    name: '',
    email: '',
    password: '',
    role: '',
    tel: '',
  }
  const [values, setValues] = useState(initState);
  const [response, setResponse] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);

  const inputHandler = (e) => {
    setValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registrationThunk(values))
    navigate('/')
  }

  return (
    <>
      <div className="registration">
          {/* <div className={response ? "alert alert-danger" : "none"} role="alert">
            Такой пользователь уже существует!
          </div> */}
          {/* <p id={response ? "block" : "none"}>Такой пользователь уже существует!</p> */}
          <form onSubmit={submitHandler} className="registration__form">
            <h1 className='registration__form-title'>Регистрация</h1>
            <div className="registration__form-box">
              <label for="staticEmail" className="registration__form-label">Вы хотите</label>
              <select name='role' onChange={inputHandler} className="registration__form-select">
                <option value='lessee'>Арендовать</option>
                <option value='lessor'>Сдать в аренду</option>
              </select>
            </div>
            <div className="registration__form-box">
              <label for="staticEmail" className="registration__form-label">Имя</label>
              <input type="text" className="registration__form-input" name="name" id="staticEmail" value={values.name} required onChange={inputHandler} />
            </div>
            <div className="registration__form-box">
              <label for="staticEmail" className="registration__form-label">Email</label>
              <input type="text" className="registration__form-input" name="email" id="staticEmail" value={values.email} required pattern='^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$' onChange={inputHandler} />
            </div>
            <div className="registration__form-box">
              <label for="staticEmail" className="registration__form-label">Телефон</label>
              <input type="text" className="registration__form-input" name="tel" id="staticEmail" value={values.tel} required onChange={inputHandler} />
            </div>
            <div className="registration__form-box">
              <label for="inputPassword" className="registration__form-label">Придумайте пароль</label>
              <input type="password" className="registration__form-input" name="password" id="inputPassword" value={values.password} required onChange={inputHandler} />
            </div>
            <button className="registration__form-btn" type="registration__form" >Зарегистрироваться</button>
          </form>
      </div>
    </>
  )
}

