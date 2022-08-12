import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { editUserThunk } from '../../../store/userActions'
import '../private.modules.scss';

import ImgLoader from '../../ImgLoader/ImgLoader';
import AddCar from './CarImgLoader';
import Avatar from '@mui/material/Avatar';
import UseAutocomplete from './AutocompleteMui';
import YandexSuggester from "./YandexSuggester";



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

  console.log(user.img_url)

  return (
    <>
      <div className="info">
        {user.img_url ? 
          <Avatar sx={{ width: 56, height: 56 }} src={user.img_url} />
          : <Avatar sx={{ width: 56, height: 56 }} />
        }

        <ImgLoader />
        <UseAutocomplete />
        <YandexSuggester />

      {condition ? 
        (
          <>
            <div className='info_text'>
              <input type='text' name='name' value={changes.name} onChange={inputHandler} />
              <input type='text' name='email' value={changes.email} onChange={inputHandler} />
              <button onClick={applyHandler}>Применить</button>
            </div>
          </>
        ) : (
          <>
            <div className='info_text'>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <button onClick={editHandler}>Редактировать</button>
            </div>
          </>
        )
      }  
      </div>

      <AddCar />
    </>
  )  
}


