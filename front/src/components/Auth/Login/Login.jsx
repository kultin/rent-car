import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logInThunk } from '../../../store/userActions'
import "./login.modules.scss";

export default function LogIn() {

  const initState = {
    email: '',
    password: '',
  }

  const [values, setValues] = useState(initState);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(logInThunk(values))
  }

  React.useEffect(() => {
    if (user.name != undefined) {
      navigate('/')
    }
  }, [user])

  return (
    <div className="login">
      <form onSubmit={submitHandler} className="login__form">
        <h1 className='login__form-title'>Войти</h1>
        <div className="login__form-box">
          <label className='login__form-label'>Email</label>
          <input className="login__form-input" type="text" name="email" value={values.email} required pattern='^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$' onChange={inputHandler} />
        </div>
        <div className="login__form-box">
          <label className='login__form-label'>Пароль</label>
          <input className="login__form-input" type="password" name="password" value={values.password} required onChange={inputHandler} />
        </div>
        <button type="submit" className="login__form-btn">Войти</button>
        <p className='login__form-accept'>Нажимая кнопку “Войти” Вы даете согласие на обработку своих персональных данных</p>
      </form>
    </div>
  )
}
