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
          <div className="footer__desc">
            <div className="footer__desc-copy">
              <h4 className="footer__desc-title">© 2022 Прокат авто "Авто с палаткой".</h4>
            </div>
            <p className="footer__desc-urid">Обращаем Ваше внимание на то, что данный интернет-сайт носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями Статьи 437 Гражданского кодекса Российской Федерации.</p>
          </div>
        </div>
    </nav>
  )
}
