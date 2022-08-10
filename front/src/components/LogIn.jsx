import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ACTypes from '../store/types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {logInThunk} from '../store/userActions'


const LogIn = () => {
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
    console.log(resp);
    navigate('/')
  }

  return (
    <>
        <div class="parent">
        <div class="block">
        <div class={response ? "alert alert-danger" : "none"} role="alert">
          Неверное имя или пароль!
          </div>
        {/* <p id={response ? "block" : "none"}>Неверное имя или пароль!</p> */}
            <form onSubmit={submitHandler}>
                <div class="mb-3">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                    <input type="text" name="email" class="form-control" id="staticEmail" value={values.email} required pattern='^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$' onChange={inputHandler} />
                </div>
                <div class="mb-3">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Пароль</label>
                    <input type="password" name="password" class="form-control" id="inputPassword" value={values.password} required onChange={inputHandler}  />
                </div>
                <button type="submit" className="btn btn-outline-dark">Войти</button>
            </form>
        </div>
        </div>
    </>
  )
}

export default LogIn;
