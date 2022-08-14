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
    role: 'lessee',
    tel: '',
  }

  const [values, setValues] = useState(initState);
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
  }

  React.useEffect(() => {
    if (user.name != undefined) {
      navigate('/')
    }
  }, [user])

  return (
    <div className="registration">
      <form onSubmit={submitHandler} className="registration__form">
        <h1 className='registration__form-title'>Регистрация</h1>
        <div className="registration__form-box">
          <label htmlFor="staticEmail" className="registration__form-label">Вы хотите</label>
          <select name='role' onChange={inputHandler} className="registration__form-select">
            <option value='lessee'>Арендовать</option>
            <option value='lessor'>Сдать в аренду</option>
          </select>
        </div>
        <div className="registration__form-box">
          <label htmlFor="staticEmail" className="registration__form-label">Имя</label>
          <input type="text" className="registration__form-input" name="name" value={values.name} required onChange={inputHandler} />
        </div>
        <div className="registration__form-box">
          <label htmlFor="staticEmail" className="registration__form-label">Email</label>
          <input type="text" className="registration__form-input" name="email" value={values.email} required pattern='^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$' onChange={inputHandler} />
        </div>
        <div className="registration__form-box">
          <label htmlFor="staticEmail" className="registration__form-label">Телефон</label>
          <input type="text" className="registration__form-input" name="tel" value={values.tel} required onChange={inputHandler} />
        </div>
        <div className="registration__form-box">
          <label htmlFor="inputPassword" className="registration__form-label">Придумайте пароль</label>
          <input type="password" className="registration__form-input" name="password" id="inputPassword" value={values.password} required onChange={inputHandler} />
        </div>
        <button className="registration__form-btn" type="registration__form" >Зарегистрироваться</button>
      </form>
    </div>
  );
}