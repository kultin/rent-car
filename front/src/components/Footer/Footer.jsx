import React from "react";
import { NavLink, Link } from 'react-router-dom';
import './footer.modules.scss';


export default function Footer() {
  return (
    <nav className="footer">
      <div className="container">
        <div className='footer__inner'>
          <img className="footer__logo" src={'/logo-footer-white.png'} alt="footer-logo" />
          <ul className="footer__list">
            <li className="footer__list-item">
              <NavLink className="footer__list-link" to="/">Главная</NavLink>
            </li>
            <li className="footer__list-item">
              <NavLink className="footer__list-link" to="/cars">Каталог</NavLink>
            </li>
            <li className="footer__list-item">
              <NavLink className="footer__list-link" to="/about">О нас</NavLink>
            </li>
            <li className="footer__list-item">
              <NavLink className="footer__list-link" to="/contact">Контакты</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
