import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Layout/layout.modules.scss';
import { getUserThunk } from '../../store/userActions'
import { logoutThunk } from '../../store/userActions'
import Error from '../Error/Error'
import AppLoader from '../Loader/Loader.jsx'

function Layout() {
  
  const isLoading = useSelector((state) => state.user.isLoading);

  const {user} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutThunk());
    navigate('/');
  }

useEffect(() => {
  dispatch(getUserThunk())
},[])

  return (
    <>
    <Error />
      <nav className="navbar">
        <div className="container">
          <div className='navbar__inner'>
            <Link to="/"><img className="navbar__logo" src={'/logo.svg'} alt="logo" /><p className='navbar__logo-text'>на крыше</p></Link>
            <ul className="navbar__list">
              {!user.name &&
                <>
                  <li className="navbar__list-item">
                    <NavLink className="navbar__list-link" to="/">Главная</NavLink>
                  </li>
                  <li className="navbar__list-item">
                    <NavLink className="navbar__list-link" to="/cars">Каталог</NavLink>
                  </li>
                  <li className="navbar__list-item">
                    <NavLink className="navbar__list-link" to="/login">Войти</NavLink>
                  </li>
                  <li className="navbar__list-item">
                    <NavLink className="navbar__list-link" to="/registration">Регистрация</NavLink>
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
      {(isLoading) ? (
            <AppLoader />
        ) : (
      <Outlet />
        )}
    </>
  );
}

export default Layout;
