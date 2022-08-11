import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {logInThunk} from '../../../store/userActions'


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
    navigate('/')
  }

  return (
    <>
        <div class="parent">
        
        {/* <div class={response ? "alert alert-danger" : "none"} role="alert">
          Неверное имя или пароль!
          </div> */}
        {/* <p id={response ? "block" : "none"}>Неверное имя или пароль!</p> */}
            <form onSubmit={submitHandler}>
                <div class="mb-3">
                    <label>Email</label>
                    <input type="text" name="email" value={values.email} required pattern='^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$' onChange={inputHandler} />
                </div>
                <div class="mb-3">
                    <label>Пароль</label>
                    <input type="password" name="password" value={values.password} required onChange={inputHandler}  />
                </div>
                <button type="submit" className="btn">Войти</button>
            </form>
        
        </div>
        </>
        )
}