import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "./carslider.modules.scss";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#262626",
        right: '25px',
        zIndex: 100,
        width: '48px',
        height: '48px',
        boxShadow: '0px 0px 8px rgba(182, 182, 182, 0.25)',
        borderRadius: '6px',
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#262626",
        left: '25px',
        zIndex: 100,
        width: '48px',
        height: '48px',
        boxShadow: '0px 0px 8px rgba(182, 182, 182, 0.25)',
        borderRadius: '6px',
      }}
      onClick={onClick}
    />
  );
}

export default function CarSlider({ car }) {

  const user = useSelector((store) => (store.user.user))
  console.log('user: ', user);
  const like = car.Likes.filter((like) => like.user_id == user.id)[0]
  // console.log('isLike: ', like);

  const [checked, setChecked] = useState(false);

  const likeHandler = (e) => {
    e.preventDefault();
    if (!checked) {
      setChecked(true)
      axios.patch(`http://localhost:3005/likes/${car.id}`, { withCredentials: true })
        .then((res) => console.log(res.data))
    }
    if (checked) {
      axios.delete(`http://localhost:3005/likes/${car.id}`, { withCredentials: true })
        .then((res) => console.log(res.data))
      setChecked(false)
    }
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // adaptiveHeight: true,
    // variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          // adaptiveHeight: true,
          // variableWidth: true,
          // centerMode: true,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          // adaptiveHeight: true,
          // variableWidth: true,
          // centerMode: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true
        }
      }
    ]
  };



  return (
    <div className="carslider">

      <Slider {...settings}>
        {car.Images.length ? (
          car.Images.map((carImg) => (
            <div key={car.id}>
              <img className="carslider__img" src={carImg.img_url} alt="slider-img" />
              <button className="carslider__heart" onClick={likeHandler}></button>
            </div>
          ))
        ) : (
          <div key={car.id}>
            <img className="carslider__img" src={"/img.png"} alt="slider-img" />
            <button className={checked ? "carslider__heart active" : "carslider__heart"} onClick={likeHandler}></button>
          </div>
        )
        }
      </Slider >
    </div >

  );

}

