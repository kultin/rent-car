import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { editAvatar } from '../../store/userActions'




const ImgLoader = () => {
  const dispatch = useDispatch()

  const [img, setImg] = React.useState(null)

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
    <>
      <input type='file' onChange={e => setImg(e.target.files[0])} />
      <button className='btn' onClick={sendFile}>Change photo</button>
    </>
  )
}

export default ImgLoader
