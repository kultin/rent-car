import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ACTypes from '../../store/types';
import axios from 'axios';
import '../Layout/layout.modules.scss';


function Layout() {
  
  const {user} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');

  useEffect(() => {
    // axios.get("http://localhost:3005/auth/name")
    //   .then((res) => {
    //     if (res.data) {
    //       console.log(res.data);
    //       // setName(res.data);
    //     }
    //   })
    axios.get("http://localhost:3005/auth/name", { withCredentials: true })
      .then((res) => {
        dispatch({ type: ACTypes.SET_USER, payload: res.data });
      })
  }, [])

  const logoutHandler = (e) => {
    e.preventDefault();
    axios.get("http://localhost:3005/auth/quit", { withCredentials: true });
    dispatch({ type: ACTypes.LOGOUT });
    navigate('/');
  }

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className='navbar__inner'>
            <img className="navbar__logo" src={'./logo.svg'} alt="logo" />
            <ul className="navbar__list">
              {!user.name &&
                <>
                  <li className="navbar__list-item">
                    <NavLink className="navbar__list-link" to="/home">Главная</NavLink>
                  </li>
                  <li className="navbar__list-item">
                    <NavLink className="navbar__list-link" to="/cars">Каталог</NavLink>
                  </li>
                  <li className="navbar__list-item">
                    <NavLink className="navbar__list-link" to="/logup">Войти</NavLink>
                  </li>
                  <li className="navbar__list-item">
                    <NavLink className="navbar__list-link" to="/login">Регистрация</NavLink>
                  </li>
                </>}
              {user.name &&
                <>
                  <li className="navbar__list-item">
                    <NavLink className="navbar__list-link" to="/">Главная</NavLink>
                  </li>
                  <li className="navbar__list-item">
                    <NavLink className="navbar__list-link" to="/cars">Каталог</NavLink>
                  </li>
                  <li className="navbar__list-item">
                    <NavLink className="navbar__list-link" to="/private">Привет, {user.name}</NavLink>
                  </li>
                  <li className="navbar__list-item">
                    <NavLink className="nav-link" onClick={logoutHandler} to="/">Выйти</NavLink>
                  </li>
                </>}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
