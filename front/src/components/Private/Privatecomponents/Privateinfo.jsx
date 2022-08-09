import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {editUserThunk} from '../../../store/userActions'
import '../private.modules.scss';



export default function Privateinfo() {

  const dispatch = useDispatch()

  const user = useSelector((store) => (store.user.user))

  const [condition, setCondotion] = React.useState(false)

  const [changes, setChanges] = React.useState(user)


  const editHandler = () => {
    setCondotion(true);
  }

  const applyHandler = () => {
    setCondotion(false);
    dispatch(editUserThunk(user.id, changes))
  }

  const inputHandler = (e) => {
    setChanges((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  }

  return (condition) ? (
    <>
      <div className="info">
        <img className='info_photo' src={`./imagesPrivate/${user.img_url}`} alt="av" />
        <div className='info_text'>
          <input type='text' name='name' value={changes.name} onChange={inputHandler} />
          <input type='text' name='email' value={changes.email} onChange={inputHandler} />
          <button onClick={applyHandler}>Применить</button>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="info">
        <img className='info_photo' src={`./imagesPrivate/${user.img_url}`} alt="av" />
        <div className='info_text'>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <button onClick={editHandler}>Редактировать</button>
        </div>
      </div>
    </>
  )

}
