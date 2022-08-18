import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { editAvatar } from '../../../store/userActions'
import '../private.modules.scss';




const ImgLoader = () => {
  const dispatch = useDispatch()

  const [img, setImg] = React.useState(null)

  const [conditionLoader, setConditionLoader] = React.useState(false)

  const sendFile = React.useCallback(async () => {
    try {
      const data = new FormData()
      data.append('avatar', img)
      await axios.post('/editUser/upload-avatar', data, {
        withCredentials: true,
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(res => dispatch(editAvatar(res.data.path)))
    } catch (error) {
      console.log(error.message)
    }
  }, [dispatch, img])


  return (
    (conditionLoader) ? (
      <div className="info__loader">
        <button hidden id='acceptBtn' onClick={() => { 
          setConditionLoader(false) 
          sendFile()}
          }></button>
        <label htmlFor="acceptBtn">✅</label>
        <button hidden id='cancelBtn' onClick={() => setConditionLoader(false)}></button>
        <label htmlFor="cancelBtn">❌</label>
      </div>
    ) : (
      <div className="info__loader">
        <input hidden type="file" id='inputFile' onChange={e => {
          setConditionLoader(true)
          setImg(e.target.files[0])
        }} />
        <label htmlFor="inputFile">🔃</label>
      </div>
    )

  )
}

export default ImgLoader
