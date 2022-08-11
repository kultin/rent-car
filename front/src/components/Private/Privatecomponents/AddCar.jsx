import React from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';

const AddCar = () => {
  const dispatch = useDispatch()

  const [images, setImages] = React.useState(null)
  console.log('IMAGES =>', images)

  const sendFile = React.useCallback(async () => {
    try {
      await axios.post('cars/upload-photos', images, {
        withCredentials: true,
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then(res => console.log('AXIOS DATA',res))
      // .then(res => dispatch(editAvatar(res.data.path)))
    } catch (error) {
      console.log(error.message)
    }
  },[images])


  return (
    <div>
      <input type="file" multiple onChange={e => setImages(e.target.files)} />
      <button className='btn' onClick={sendFile}>Загрузить фото машины</button>
    </div>
  )
}

export default AddCar
