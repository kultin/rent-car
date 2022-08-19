import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import { addLikeAC, deleteLikeAC } from "../../../store/action";
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

  const { likes } = useSelector((store) => (store.likes))
  const [checked, setChecked] = useState(false);

  console.log('front likes: ', likes);

  const dispatch = useDispatch();

  const user = useSelector((store) => (store.user.user))
  const like = car.Likes.filter((like) => like.user_id == user.id)[0]

  // console.log('front like: ', like);


  useEffect(() => {
    if (like?.user_id == user.id && like?.car_id == car.id) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [])


  const likeHandler = async (e) => {
    e.preventDefault();
    if (!checked) {
      setChecked(true)
      const response = await fetch(`http://localhost:3005/likes/${car.id}`, {
        method: "post",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(addLikeAC({ carId: car.id, userId: user.id }))
    }
    if (checked) {
      axios.delete(`http://localhost:3005/likes/${car.id}`, { withCredentials: true })
        .then((res) => dispatch(deleteLikeAC({ carID: car.id, userID: user.id })))
      setChecked(false)
    }
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
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
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
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

  console.log('front', user)

  return (
    <div className="carslider">

      <Slider {...settings}>
        {car.Images.length ? (
          car.Images.map((carImg) => (
            <div className="carslider__img-box" key={car.id}>
              <img className="carslider__img" src={carImg.img_url} alt="slider-img" />
              {user?.name &&
                // <button className="carslider__heart" onClick={likeHandler}></button>
                <button className={checked ? "carslider__heart active" : "carslider__heart"} onClick={likeHandler}></button>
              }
            </div>
          ))
        ) : (
          <div className="carslider__img-box" key={car.id}>
            <img className="carslider__img" src={"/img.png"} alt="slider-img" />
            {user?.name && 
              <button className={checked ? "carslider__heart active" : "carslider__heart"} onClick={likeHandler}></button>
            } 
          </div>
        )
        }
      </Slider >
    </div >

  );

}

