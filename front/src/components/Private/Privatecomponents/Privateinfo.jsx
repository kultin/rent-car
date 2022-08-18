import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { editUserThunk, getUserThunk } from '../../../store/userActions'
import '../private.modules.scss';

import AvatarLoader from './AvatarLoader';
import Avatar from '@mui/material/Avatar';
import AddCarModal from "../../carCard/EditCarModal";
import { Navigate } from "react-router-dom";



export default function Privateinfo() {

  const dispatch = useDispatch()

  const user = useSelector((store) => (store.user.user))

  const [condition, setCondition] = React.useState(false)

  const [changes, setChanges] = React.useState(user)

  let role = ''

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

  const roleDisplay = () => {
    if (user.role == 'lessor') {
      role = 'Арендодатель'
    } else if (user.role == 'lessee') {
      role = 'Арендатор'
    }
  }

  roleDisplay()

  return (
    <>
      <div className="info">
        <div className="info__inner">
          {user.img_url ?

            <div className="info__box-foto">
              <img className="info__photo" src={user.img_url} />
              <AvatarLoader />
            </div>

            : <div className="info__box-foto">
              <img className="info__photo-icon" src={'http://localhost:3005/images/default-avatar.png'} />
              <AvatarLoader />
            </div>

          }
          <div className="info__content">
            {(condition) ? (
              <input className="info__content-info" type='text' name='name' value={changes.name} onChange={inputHandler} />
            ) : (
              <p className="info__content-name">{user.name}</p>
            )}
            <p className="info__content-role">{role}</p>
            <p className="info__content-email">{user.email}</p>
            {(condition) ? (
              <input className="info__content-info content__phone" type='text' name='tel' value={changes.tel} onChange={inputHandler} />
            ) : (
              <p className="info__content-tel">{user.tel}</p>
            )}
            {(condition) ? (
              <>

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


