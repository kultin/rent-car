import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ACTypes from '../../../store/types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {registrationThunk} from '../../../store/userActions'



const Registration = () => {
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
  const {user} = useSelector((store) => store.user);
  
  const inputHandler = (e) => {
    setValues((prevState) => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }
  
  const submitHandler = (e) => {
    e.preventDefault();
  dispatch(registrationThunk(values))
  navigate('/')
  }
  
  
  return (
    <>
      <div class="parent">
        <div class="block">
          {/* <div class={response ? "alert alert-danger" : "none"} role="alert">
            Такой пользователь уже существует!
          </div> */}
            {/* <p id={response ? "block" : "none"}>Такой пользователь уже существует!</p> */}
            <form onSubmit={submitHandler}>
            <div class="mb-3">
            <label for="staticEmail" class="col-sm-2 col-form-label">Вы хотите</label>
            <select name='role' onChange={inputHandler}>
              <option value='lessee'>Арендовать</option>
              <option value='lessor'>Сдать в аренду</option>
            </select>
            </div>
                <div class="mb-3">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Имя</label>
                    <input type="text" class="form-control" name="name" id="staticEmail" value={values.name} required onChange={inputHandler}/>
                </div>
                <div class="mb-3">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                    <input type="text" class="form-control" name="email" id="staticEmail" value={values.email} required pattern='^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$' onChange={inputHandler} />
                </div>
                <div class="mb-3">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Телефон</label>
                    <input type="text" class="form-control" name="tel" id="staticEmail" value={values.tel} required onChange={inputHandler}/>
                </div>
                <div class="mb-3">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Пароль</label>
                    <input type="password" class="form-control" name="password" id="inputPassword" value={values.password} required onChange={inputHandler} />
                </div>
                <button type="submit" class="btn btn-outline-dark">Зарегистрироваться</button>
            </form>
            </div>
        </div>
    </>
  )
}

export default Registration;
