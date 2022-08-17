import * as React from 'react';
import * as R from 'ramda';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import AddCarImage from './CarImgLoader';
import YandexSuggester from "./YandexSuggester";
import { FormControl, FormControlLabel, FormLabel, RadioGroup } from '@mui/material';
import useLocalStorage from './CarForm/localStoragefuncs';
import MyDropzone from './CarForm/DropZone'
import Completer from './CarForm/Completer';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const inputStyles = {
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
  power: '',
  seats: '',
  photo: '',
  price: '',
  capacity: '',
  coordinates: null,
  user_id: null,
  file: null,
}

export default function AddCArForm() {

  const { cars } = useSelector((store) => store.cars)
  console.log('Cars', cars)

  const [values, setValues] = useLocalStorage('cars', initialValues)
  console.log('VALUES', values)

  const brands = R.uniq(cars.map((item) => item.brand))
  console.log('BRANDS', brands)
  const getModels = () => {
    const filterdCars = cars.filter((item) => item.brand === values.brand)
    return R.uniq(filterdCars.map((item) => item.model))
  }
  // const body = R.uniq(cars.map((item) => item.body))
  const years = R.uniq(cars.map((item) => String(item.year)).sort((a, b) => b - a))
  const engines = R.uniq(cars.map((item) => item.engine))

  const [files, setFiles] = useState([])

  const selectFiles = (e) => {
    setFiles(e.target.files)
  }

 
  console.log('FILE ADD CAR FORM',files)
  const [coordinates, setCoordinates] = useState(null)
  console.log('CORDINATES MODAL', coordinates)
  
// =======
  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    const items = files.slice()
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setFiles(items)
  }

  const [errors, setErrors] = useState({})
  console.log('Errors', errors)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const validate = () => {
    let temp = {}
    temp.brand = values.brand ? ('') : ('Введите бренд')
    temp.model = values.model ? ('') : ('Введите модель')
    temp.year = values.year ? ('') : ('Введите год')
    temp.engine = values.engine ? ('') : ('Введите двигатель')
    temp.power = values.power ? ('') : ('Введите мощность')
    temp.capacity = values.capacity ? ('') : ('Введите вместимость')
    temp.price = values.price ? ('') : ('введите цену')

    setErrors({ ...temp })

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
    formData.append('price', values.price)
    formData.append('capacity', values.capacity)
    formData.append('coordinates', coordinates)
    if (files) {
      for (let el of files) {
        formData.append('file', el)
      }
    }

    try {
      await axios.post('cars/new-car', formData, {
        withCredentials: true,
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then(res => {
        if (res.status == 200) {
          window.alert('загружено успешно')
          console.log('AXIOS DATA', res)
        } else {
          window.alert('Ошибка загрузки')
          console.log('AXIOS DATA', res)
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
              <Completer 
                value={values.brand}
                options={brands}
                id={'brand'} 
                values={values}
                setValues={setValues}
                error={errors.brand}
                helperText={'Введите бренд'}
                name={'brand'} 
                handleInputChange={handleInputChange}
                label={"Выберите марку"}/>
              

            {/* <Completer 
                value={values.model}
                options={getModels}
                id={'model'} 
                values={values}
                setValues={setValues}
                error={errors.brand}
                helperText={'Введите модель'}
                name={'model'} 
                handleInputChange={handleInputChange}
                label={"Выберите модель"}/> */}

                <Autocomplete
                  className="addcar__item-input"
                  value={values.model}
                  required
                  id="model"
                  freeSolo
                  options={getModels(values.brand)}
                  onChange={(event, newValue) => {
                    setValues({ ...values, model: newValue })
                  }}
                  renderInput={(params) => <TextField
                    sx={inputStyles}
                    {...params}
                    error={errors.model ? true : false}
                    helperText={errors.model ? "Введите модель" : ''}
                    name='model'
                    value={values.model}
                    InputLabelProps={{ required: true }}
                    onChange={handleInputChange}
                    label="Выберите модель" />}/>
          </div>
          <div className='addcar__item'>

            <Completer
              value={values.year}
              options={years}
              id={'year'}
              values={values}
              setValues={setValues}
              error={errors.year}
              helperText={'Введите год'}
              name={'year'}
              handleInputChange={handleInputChange}
              label={"Выберите год"} />

            <Completer
              value={values.engine}
              options={engines}
              id={'engine'}
              values={values}
              setValues={setValues}
              error={errors.engine}
              helperText={'Введите двигатель'}
              name={'engine'}
              handleInputChange={handleInputChange}
              label={"Выберите двигатель"} />
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
              error={errors.power ? true : false}
              helperText={errors.power ? "Введите мощность" : ''}
              name='power'
              value={values.power}
              InputLabelProps={{ required: true }}
              onChange={handleInputChange}
              label="Введите мощность" />
            <TextField
              sx={inputStyles}
              error={errors.capacity ? true : false}
              helperText={errors.capacity ? "Введите вместимость" : ''}
              name='capacity'
              value={values.capacity}
              InputLabelProps={{ required: true }}
              onChange={handleInputChange}
              label="Введите вместимость" />          
          </div> 

          

          {/* <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={selectFiles}
          /> */}
          {/* <label htmlFor="raised-button-file">
            <Button variant="raised" component="span">
              Upload photos
            </Button>
          </label> */}
          <div className='addcar__item-address'>
            <YandexSuggester setCoordinates={setCoordinates} />
          </div>

          <div className='addcar__item-dropzone'>
            <MyDropzone files={files} setFiles={setFiles} />
          </div>

          <div className='addcar__item'>
                      <TextField
                        sx={inputStyles}
                        // {...params}
                        error={errors.price ? true : false}
                        helperText={errors.price ? "Введите цену" : ''}
                        name='price'
                        value={values.price}
                        InputLabelProps={{ required: true }}
                        onChange={handleInputChange}
                        label="Какая цена?" />
                    </div>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='characters'>
              {(provided) => (
                <ul className='addcar__item-list'{...provided.droppableProps} ref={provided.innerRef}>
                  {files &&
                    files.map((file, index) => {
                      return (
                        <Draggable key={file.name} draggableId={file.name} index={index}>
                          {(provided) => (
                            <li className='addcar__item-list-item'{...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                              <img className="addcar__item-list-img" key={file.name} src={file.preview} alt='car' style={{ width: '70px', height: '70px' }} />
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
    // </div>
  );
}

