import React from "react";
import '../NotFound/notfound.modules.scss';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="NotFound">
      <nav className="NotFound__nav"> 
        <ul className="NotFound__nav-list">
          <li className="NotFound__nav-link"><Link to="/cars">Каталог</Link></li>
          <li className="NotFound__nav-link"><Link to="/private">Личный кабинет</Link></li>
          <li className="NotFound__nav-link"><Link to="/contacts">Контакты</Link></li>
        </ul>
      </nav>
      <div className="NotFound__block">
        <img className="NotFound__block-img" src={'../notfound/404.png'} alt="404" />
        <p className="NotFound__block-text">Страница не найдена!</p>
        <p className="NotFound__block-desc">«Мы запустили новый сайт, сделав его удобным и информативным.
          Возможно, запрашиваемая Вами страница была перенесена или удалена.
          Вы можете позвонить нам и получить квалифицированную помощь наших специалистов»
        </p>
        <Link className="NotFound__block-btn" to="/">На главную</Link>
      </div>
    </div>
  )
}
