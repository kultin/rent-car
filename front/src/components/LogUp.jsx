import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ACTypes from '../store/types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {registrationThunk} from '../store/userActions'



const LogUp = () => {
  const initState = {
    name: '',
    email: '',
    password: '',
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
    // const res = await axios.post("http://localhost:3005/auth/reg", values);
    // const response = await res.json();
    // console.log(response);
  //   axios.post("http://localhost:3005/auth/reg", values)
  //     .then((res) => {
  //       if (res.data === 'Такой пользовательь уже существует!') {
  //         setResponse(true);
  //         setValues(initState);
  //       } else {
  //         setResponse(false);
  //         dispatch({type:ACTypes.LOGIN, payload: values});
  //         navigate('/game')
  //       }
  //     });
  dispatch(registrationThunk(values))
  }
  
  
  return (
    <>
      <div class="parent">
        <div class="block">
          <div class={response ? "alert alert-danger" : "none"} role="alert">
            Такой пользователь уже существует!
          </div>
            {/* <p id={response ? "block" : "none"}>Такой пользователь уже существует!</p> */}
            <form onSubmit={submitHandler}>
                <div class="mb-3">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Имя</label>
                    <input type="text" class="form-control" name="name" id="staticEmail" value={values.name} required onChange={inputHandler}/>
                </div>
                <div class="mb-3">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                    <input type="text" class="form-control" name="email" id="staticEmail" value={values.email} required pattern='^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$' onChange={inputHandler} />
                </div>
                <div class="mb-3">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Пароль</label>
                    <input type="password" class="form-control" name="password" id="inputPassword" value={values.password} required onChange={inputHandler} />
                </div>
                <button type="submit" class="btn btn-outline-dark">Login</button>
            </form>
            </div>
        </div>
    </>
  )
}

export default LogUp;
