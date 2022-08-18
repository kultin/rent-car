import React from "react";
import { Link } from 'react-router-dom';
import AppLoader from "../../Loader/Loader";
import '../home.modules.scss';

export default function HomeBanner() {
  return (
    <>
      <div className="home">
        <div className="home__banner">
          <div className="container">
            <div className="home__inner">
              <div className="home__content">
                <h1 className="home__content-title">Прокат авто с палаткой на крыше</h1>
                <Link className="home__content-btn" to="/cars">Забронировать авто</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
