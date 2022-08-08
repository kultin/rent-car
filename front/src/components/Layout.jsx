import {Outlet, Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ACTypes from '../store/types';
import axios from 'axios';

function Layout() {
    const [user, setUser] = useState({name: 'test'})
    // const {user} = useSelector((store) => store.user);
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
      axios.get("http://localhost:3005/auth/name", {withCredentials: true})
        .then((res) => {
          dispatch({type:ACTypes.SET_USER, payload: res.data});
        })
    }, [])
  // console.log(user);

  const logoutHandler = (e) => {
    e.preventDefault();
    axios.get("http://localhost:3005/auth/quit", {withCredentials: true});
    dispatch({type:ACTypes.LOGOUT});
    navigate('/');
  }

  return (
      <>
        <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!user.name && 
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/logup">Войти</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Зарегистрироваться</Link>
                </li>
              </>}
              {user.name  && 
              <>
              <li className="nav-item">
                  <div className="nav-link active">Привет, {user.name}!</div>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/private">Личный кабинет</Link>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link" to="/game">Игра</Link>
                </li>
                <li className="nav-item">
                  {/* <a className="nav-link" onClick={logoutHandler}>Выйти</a> */}
                  <button className="logout" onClick={logoutHandler}>Выйти</button>
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
