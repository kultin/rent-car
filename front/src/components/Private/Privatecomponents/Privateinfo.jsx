import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { editUserThunk } from '../../../store/userActions'
import '../private.modules.scss';

import AvatarLoader from '../../AvatarLoader/AvatarLoader';
import Avatar from '@mui/material/Avatar';
import AddCarModal from "./AddCarModal";
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
            <p className="info__content-name">{user.name}</p>
            <p className="info__content-role">{user.role}</p>
            <p className="info__content-email">{user.email}</p>
            <p className="info__content-tel">{user.tel}</p>
            <button className="btn info__content-btn" onClick={editHandler}>Редактировать</button>
          </div>
          {/* <ImgLoader />
          <UseAutocomplete />
          <YandexSuggester />
          {condition ?
            (
              <>
                <div className='info__text'>
                  <input type='text' name='name' value={changes.name} onChange={inputHandler} />
                  <input type='text' name='email' value={changes.email} onChange={inputHandler} />
                  <button onClick={applyHandler}>Применить</button>
                </div>
              </>
            ) : (
              <>
                <div className='info__text'>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <button onClick={editHandler}>Редактировать</button>
                </div>
              </>
            )
          } */}
        </div>
      </div>
    </>
  )
}


