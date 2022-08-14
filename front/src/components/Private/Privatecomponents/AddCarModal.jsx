import * as React from 'react';
import * as R from 'ramda';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import AddCarImage from './CarImgLoader';
import YandexSuggester from "./YandexSuggester";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddCarModal() {

  const { cars } = useSelector((store) => store.cars)

  const brands = R.uniq(cars.map((item) => item.brand))
  const models = R.uniq(cars.map((item) => item.model))
  const body = R.uniq(cars.map((item) => item.body))

  const [open, setOpen] = React.useState(false);

  // const [info, setInfo] = useState([])
  
  const [brandChoice, setBrandChoice] = useState('')
  const [modelChoice, setModelChoice] = useState('')
  const [bodyChoice, setBodyChoice] = useState('')
  const [file, setFile] = useState(null)
  const [coordinates, setCoordinates] = useState(null)

  console.log('CORDINATES MODAL', coordinates)

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const changeInfo = (key, value) => {
    // setInfo(info.map(car => ({...car, [key]: value})))
  }
  
  const selectFile = (e) => {
    setFile(e.target.files)
  }
  
  const addCarToDb = async () => {
    const formData = new FormData()

    formData.append('brand', brandChoice)
    formData.append('model', modelChoice)
    formData.append('body', bodyChoice)
    formData.append('coordinates', coordinates)
    if (file) {
      for ( let el of file) {
        formData.append('file', el)
      }
    }
    // console.log(brandChoice, modelChoice, bodyChoice, file, coordinates)
    try {
      await axios.post('cars/upload-photos', formData, {
        withCredentials: true,
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then(res => console.log('AXIOS DATA',res))
      // .then(res => dispatch(editAvatar(res.data.path)))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>Добавить авто</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Autocomplete
            required
            id="brands"
            freeSolo
            options={brands}
            onChange={(event, newValue) => {
              setBrandChoice(newValue);
            }}
            renderInput={(params) => <TextField 
              {...params} 
              InputLabelProps={ { required: true }}
              label="Выберите марку" />}
          />
          <Autocomplete
            required
            id="models"
            freeSolo
            options={models}
            onChange={(event, newValue) => {
              setModelChoice(newValue);
            }}
            renderInput={(params) => <TextField 
              {...params} 
              InputLabelProps={ { required: true }}
              label="Выберите модель" />}
          />
          <Autocomplete
            required
            id="body"
            freeSolo
            options={body}
            onChange={(event, newValue) => {
              setBodyChoice(newValue);
            }}
            renderInput={(params) => <TextField 
              {...params} 
              InputLabelProps={ { required: true }}
              label="Выберите кузов" />}
          />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={selectFile}
            />
            <label htmlFor="raised-button-file">
              <Button variant="raised" component="span">
                Upload
              </Button>
            </label> 

            <YandexSuggester setCoordinates={setCoordinates}/>

            <Button onClick={addCarToDb}>Загрузить в базу</Button>
        </Box>
      </Modal>
    </div>
  );
}
