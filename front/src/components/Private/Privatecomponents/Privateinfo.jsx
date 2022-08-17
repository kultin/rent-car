import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { editUserThunk, getUserThunk } from '../../../store/userActions'
import '../private.modules.scss';

import AvatarLoader from '../../AvatarLoader/AvatarLoader';
import Avatar from '@mui/material/Avatar';
import AddCarModal from "./AddCarModal";
import { Navigate } from "react-router-dom";
// import YandexSuggester from "./YandexSuggester";



export default function Privateinfo() {

  const dispatch = useDispatch()

  const user = useSelector((store) => (store.user.user))

  const [condition, setCondition] = React.useState(false)

  const [changes, setChanges] = React.useState(user)

  const editHandler = () => {
    setCondition(true);
  }

  const applyHandler = () => {
    setCondition(false);
    dispatch(editUserThunk(user.id, changes))
    window.location.reload();
  }

  const inputHandler = (e) => {
    setChanges((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  }

  return (
    <>
      <div className="info">
        <div className="info__inner">
          {user.img_url ?
            <img className="info__photo" src={user.img_url} />
            : <img className="info__photo" src={'http://localhost:3005/images/user-avatar/avatar.jpg'} />
          }
          <div className="info__content">
            {(condition) ? (
              <input type='text' name='name' value={changes.name} onChange={inputHandler} />
            ) : (
              <p className="info__content-name">{user.name}</p>
            )}
            <p className="info__content-role">{user.role}</p>
            <p className="info__content-email">{user.email}</p>
            {(condition) ? (
              <input type='text' name='tel' value={changes.tel} onChange={inputHandler} />
            ) : (
              <p className="info__content-tel">{user.tel}</p>
            )}
            {(condition) ? (
              <>
                <AvatarLoader />
                <button className="btn info__content-btn" onClick={applyHandler}>Применить</button>
              </>
            ) : (
              <button className="btn info__content-btn" onClick={editHandler}>Редактировать</button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}


