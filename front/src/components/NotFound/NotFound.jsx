import React from "react";
import '../NotFound/notfound.modules.scss';

export default function NotFound() {
  return (
    <div className="NotFound">
      <nav className="NotFound__nav"> 
        <ul className="NotFound__nav-list">
          <li className="NotFound__nav-link"><a href="/cars">Каталог</a></li>
          <li className="NotFound__nav-link"><a href="/private">Личный кабинет</a></li>
          <li className="NotFound__nav-link"><a href="/contacts">Контакты</a></li>
        </ul>
      </nav>
      <div className="NotFound__block">
        <h1 className="NotFound__block-title">404</h1>
        <p className="NotFound__block-text">Страница не найдена!</p>
        <p className="NotFound__block-desc">«Мы запустили новый сайт, сделав его удобным и информативным.
          Возможно, запрашиваемая Вами страница была перенесена или удалена.
          Вы можете позвонить нам и получить квалифицированную помощь наших специалистов»
        </p>
        <a className="NotFound__block-btn" href="/">На главную</a>
      </div>
    </div>
  )
}
