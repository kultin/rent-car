import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './layout.modules.scss';
import { getUserThunk } from '../../store/userActions'
import { logoutThunk } from '../../store/userActions'
import Error from '../Error/Error'
import AppLoader from '../Loader/Loader.jsx'
import Footer from '../Footer/Footer'

// import { CSSTransition } from 'react-transition-group';


function Layout() {

  const [inProp, setInProp] = useState(false);
  const [burger, setBurger] = useState(false);
  const [menu, setMenu] = useState(false);

  const isLoading = useSelector((state) => state.user.isLoading);

  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutThunk());
    navigate('/');
  }

  const burgerHandler = (e) => {
    e.preventDefault();
    if (burger) setBurger(false)  
    if (menu) setMenu(false)
    if (!burger) setBurger(true)
    if (!menu) setMenu(true)
    console.log('click')
  }

  useEffect(() => {
    dispatch(getUserThunk())
  }, [])

  return (
    <>
      <Error />
      <nav className="navbar">
        <div className="container">
          <div className='navbar__inner'>
            <Link to="/"><img className="navbar__logo" src={'/logo.svg'} alt="logo" /></Link>
            <ul className={menu ? "navbar__list active" : "navbar__list"}>
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
                    <Link className="navbar__list-link" onClick={logoutHandler} to="/">Выйти</Link>
                  </li>
                </>}
            </ul>
            <button className={burger ? "navbar__burger active" : "navbar__burger"} onClick={burgerHandler}>
              <span></span>
              <span></span>
              <span></span>
            </button>
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
