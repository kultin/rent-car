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

import AddCarImage from './CarImgLoader';
import YandexSuggester from "./YandexSuggester";
import { FormControl, FormControlLabel, FormLabel, RadioGroup } from '@mui/material';
import useLocalStorage from './AddCarModal/localStoragefuncs';
import MyDropzone from './AddCarModal/DropZone'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const inputStyles ={
  width: '380px',
  backgroundColor: '#fff',
  borderRadius: '3px'
}

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

export default function AddCArForm() {

  const { cars } = useSelector((store) => store.cars)

  const brands = R.uniq(cars.map((item) => item.brand))
  const getModels = (brand) => {
    const filterdCars = cars.filter((item) => item.brand === brand)
    return R.uniq(filterdCars.map((item) => item.model))
  }
  // const body = R.uniq(cars.map((item) => item.body))
  const years = R.uniq(cars.map((item) => String(item.year)))
  const engines = R.uniq(cars.map((item) => item.engine))
  
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
    temp.power = values.power ? ('') : ('Введите мощность')
    temp.capacity = values.capacity ? ('') : ('Введите вместимость')
    
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
      <div className='addcar'>
        <h2 className="title addcar__title">Загрузить новое авто</h2>
        <div className='addcar__inner'>
          <div className='addcar__item'>
                <Autocomplete
                className="addcar__item-input"
                value={values.brand}
                required
                id="brand"
                freeSolo
                options={brands}
                onChange={(e, newValue) => {
                  setValues({...values, brand: newValue })
                }}
                renderInput={(params) => <TextField 
                  sx={inputStyles}
                  {...params} 
                  error={errors.brand ? true : false}
                  helperText={errors.brand ? "Введите марку" : ''}
                  name='brand'
                  value={values.brand}
                  InputLabelProps={ { required: true }}
                  onChange={(e, value) => {
                    handleInputChange(e, value)
                  }}
                  label="Выберите марку" />}
              />
              <Autocomplete
                className="addcar__item-input"  
                value={values.model}
                required
                id="model"
                freeSolo
                options={getModels(values.brand)}
                onChange={(event, newValue) => {
                  setValues({...values, model: newValue })
                }}
                renderInput={(params) => <TextField 
                  sx={inputStyles}
                  {...params} 
                  error={errors.model ? true : false}
                  helperText={errors.model ? "Введите модель" : ''}
                  name='model'
                  value={values.model}
                  InputLabelProps={ { required: true }}
                  onChange={handleInputChange}
                  label="Выберите модель" />}
              />

        </div>
        <div className='addcar__item'>
          <Autocomplete
            className="addcar__item-input"
            value={values.year}
            required
            id="year"
            freeSolo
            options={years}
            onChange={(event, newValue) => {
              setValues({...values, year: newValue })
            }}
            renderInput={(params) => <TextField 
              sx={inputStyles}
              {...params}
              error={errors.year ? true : false}
              helperText={errors.year ? "Введите год" : ''}
              name='year'
              value={values.year}
              InputLabelProps={ { required: true }}
              onChange={handleInputChange}
              label="Выберите год" />}
          />
          <Autocomplete
            className="addcar__item-input"
            value={values.engine}
            required
            id="engine"
            freeSolo
            options={engines}
            onChange={(event, newValue) => {
              setValues({...values, engine: newValue })
            }}
            renderInput={(params) => <TextField 
              sx={inputStyles}
              {...params}
              error={errors.engine ? true : false}
              helperText={errors.engine ? "Введите двигатель" : ''}
              name='engine'
              value={values.engine}
              InputLabelProps={ { required: true }}
              onChange={handleInputChange}
              label="Выберите двигатель" />}
          />
        </div>  
        <div className='addcar__item'>
          <FormControl>
              <FormLabel>Кузов</FormLabel>
              <RadioGroup row
                name='body'
                value={values.body}
                onChange={handleInputChange}>
                <FormControlLabel value='sedan' control={<Radio />} label="sedan" />
                <FormControlLabel value='SUV' control={<Radio />} label="SUV" />
              </RadioGroup>
            </FormControl>
          
            <FormControl>
              <FormLabel>КПП</FormLabel>
              <RadioGroup row
                name='gear'
                value={values.gear}
                onChange={handleInputChange}>
                <FormControlLabel value='A/T' control={<Radio />} label="A/T" />
                <FormControlLabel value='M/T' control={<Radio />} label="M/T" />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Салон</FormLabel>
              <RadioGroup row
                name='seats'
                value={values.seats}
                onChange={handleInputChange}>
                <FormControlLabel value='кожа' control={<Radio />} label="кожа" />
                <FormControlLabel value='ткань' control={<Radio />} label="ткань" />
                <FormControlLabel value='экокожа' control={<Radio />} label="экокожа" />
              </RadioGroup>
            </FormControl>
          </div>  
          <div className='addcar__item'>
            <TextField 
              sx={inputStyles}
              // {...params}
              error={errors.power ? true : false}
              helperText={errors.power ? "Введите мощность" : ''}
              name='power'
              value={values.power}
              InputLabelProps={ { required: true }}
              onChange={handleInputChange}
              label="Введите мощность" />
            <TextField 
              sx={inputStyles}
              // {...params}
              error={errors.capacity ? true : false}
              helperText={errors.capacity ? "Введите вместимость" : ''}
              name='capacity'
              value={values.capacity}
              InputLabelProps={ { required: true }}
              onChange={handleInputChange}
              label="Введите вместимость" />  
              
          </div> 

            {/* <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={selectFile}
            />
            <label htmlFor="raised-button-file">
              <Button variant="raised" component="span">
                Upload photos
              </Button>
            </label>  */}
          <div className='addcar__item-address'>
            <YandexSuggester setCoordinates={setCoordinates}/>
          </div>
          
          <div className='addcar__item-dropzone'>
            <MyDropzone files={files} setFiles={setFiles} />
          </div>

            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId='characters'>
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {files && 
                      files.map((file, index) => {
                        return (
                          <Draggable key={file.name} draggableId={file.name} index={index}>
                            {(provided) => (
                              <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                <img key={file.name} src={file.preview} alt='car' style={{width: '50px', height: '50px'}}/>
                              </li>
                            )}
                          </Draggable>
                        )
                      }
                      )
                    }
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>

            <Button 
              type='submit' 
              onClick={handleSubmit}
              >Тест проверка</Button>
          <div className='addcar__item-buttons'>
            <Button 
              type='submit' 
              onClick={addCarToDb}>Загрузить в базу</Button>
            
            <Button 
              onClick={handleReset}
              >Сбросить</Button>
          </div>  

         </div>
      </div>  
    </div>
  );
}

