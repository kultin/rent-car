import React from "react";
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
                <a className="home__content-btn" href="/cars">Забранировать авто</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
