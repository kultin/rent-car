import * as React from 'react';
import * as R from 'ramda';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import AddCarImage from '../Private/Privatecomponents/CarImgLoader';
import YandexSuggester from "../Private/Privatecomponents/YandexSuggester";
import { FormControl, FormControlLabel, FormLabel, RadioGroup } from '@mui/material';
import useLocalStorage from '../Private/Privatecomponents/CarForm/localStoragefuncs';
import MyDropzone from '../Private/Privatecomponents/CarForm/DropZone'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddCArForm from '../Private/Privatecomponents/AddCarForm';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  brand: '',
  model: '',
  body: '',
  year: '',
  engine: '',
  gear: '',
  power: null,
  seats: '',
  photo: '',
  price: null,
  capacity: null,
  coordinates: null,
  user_id: null,
  file: null,
}

export default function EditCarModal({car}) {

  const { cars } = useSelector((store) => store.cars)
  
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  
  
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => setOpen(false);
  
  const [file, setFile] = useState(null)
  const selectFile = (e) => {
    console.log('file old version', file)
    setFile(e.target.files)
  }

  const [files, setFiles] = useState([])

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    const items = files.slice()
    const [reorderedItem] =items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setFiles(items)
  }

  console.log('FILE FROM MODAL',files)

  const [coordinates, setCoordinates] = useState(null)
  
  console.log('CORDINATES MODAL', coordinates)
  
  const [values, setValues] = useLocalStorage('cars', initialValues)
  
  console.log('VALUES', values)
  
  const [errors, setErrors] = useState({})
  
  console.log('Errors', errors)
  
  
  const handleInputChange = (e) => {
    const {name, value } = e.target
    setValues({ ...values, [name]:value })
  }
  
  const validate = () => {
    let temp = {}
    temp.brand = values.brand ? ('') : ('Введите бренд')
    temp.model = values.model ? ('') : ('Введите модель')
    temp.year = values.year ? ('') : ('Введите год')
    temp.engine = values.engine ? ('') : ('Введите двигатель')
    
    setErrors({...temp})
    
    return Object.values(temp).every(el => el == '')
  }
  
  const handleSubmit = () => {
    if (validate()) {
      console.log('SUBMIT')
    }
  }

  const handleReset = () => {
    setValues(initialValues)
    setErrors({})
  }


  const changeInfo = (key, value) => {
    // setInfo(info.map(car => ({...car, [key]: value})))
  }
  
  
  const addCarToDb = async () => {
    const formData = new FormData()

    formData.append('brand', values.brand)
    formData.append('model', values.model)
    formData.append('body', values.body)
    formData.append('year', values.year)
    formData.append('engine', values.engine)
    formData.append('gear', values.gear)
    formData.append('power', values.power)
    formData.append('seats', values.seats)
    // formData.append('photo',)  Добавить добавление главного фото, по индексу массива
    // или вытащить его на бэке
    formData.append('price', values.price)
    formData.append('capacity', values.capacity)
    formData.append('coordinates', coordinates)
    if (files) {
      for ( let el of files) {
        formData.append('file', el)
      }
    }

    try {
      await axios.post('cars/upload-photos', formData, {
        withCredentials: true,
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then(res => {
          if (res.status == 200) {
            window.alert('загружено успешно')
            console.log('AXIOS DATA',res)
          } else {
            window.alert('Ошибка загрузки')
            console.log('AXIOS DATA',res)
          }
        })
        // .then(res => console.log('AXIOS DATA',res.status))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Редактировать авто</Button> */}
      <Button onClick={handleClickOpen('paper')}>Редактировать</Button>
      {/* <Modal
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={scroll === 'paper'}>
          <AddCArForm car={car}/> 
        </DialogContent>
      </Dialog>  
    </div>
  );
}
