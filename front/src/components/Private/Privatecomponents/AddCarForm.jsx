import * as React from 'react';
import * as R from 'ramda';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import YandexSuggester from "./YandexSuggester";
import { FormControl, FormControlLabel, FormLabel, RadioGroup } from '@mui/material';
import useLocalStorage from './CarForm/localStoragefuncs';
import MyDropzone from './CarForm/DropZone'
import Completer from './CarForm/Completer';

import { DraggableImages } from './CarForm/DraggableImages';

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

export default function AddCArForm({ car, edit, setTabIndex, setOpen }) {

  const dispatch = useDispatch()

  console.log('CAR FROM ADDCAR FORM', car)

  const { cars } = useSelector((store) => store.cars)

  const [values, setValues] = useLocalStorage('cars', initialValues)

  const [coordinates, setCoordinates] = useState(null)

  // console.log('CORDINATES ADD CAR FORM', coordinates)
  const [enableAddressInput, setEnableAddressInput] = useState(false)


  useEffect(() => {
    if (car) {
      setValues(car)
      setFiles(car.Images)
      setCoordinates(car.location)
    }
  }, [])

  const brands = R.uniq(cars.map((item) => item.brand))

  const getModels = () => {
    const filterdCars = cars.filter((item) => item.brand === values.brand)
    return R.uniq(filterdCars.map((item) => item.model))
  }

  const years = R.uniq(cars.map((item) => String(item.year)).sort((a, b) => b - a))
  const engines = R.uniq(cars.map((item) => item.engine))

  const [files, setFiles] = useState([])

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const validate = () => {
    let temp = {}
    temp.brand = values.brand ? ('') : ('?????????????? ??????????')
    temp.model = values.model ? ('') : ('?????????????? ????????????')
    temp.year = values.year ? ('') : ('?????????????? ??????')
    temp.engine = values.engine ? ('') : ('?????????????? ??????????????????')
    temp.power = values.power ? ('') : ('?????????????? ????????????????')
    temp.capacity = values.capacity ? ('') : ('?????????????? ??????????????????????')
    temp.price = values.price ? ('') : ('?????????????? ????????')

    setErrors({ ...temp })

    return Object.values(temp).every(el => el == '')
  }

  const handleSubmit = () => {
    if (validate()) {
      console.log('SUBMIT')
      editCarToDb()
      handleReset()
    }
  }

  const handleReset = () => {
    setEnableAddressInput(true)
    setValues(initialValues)
    setErrors({})
    setFiles([])
  }

  const addCarToDb = async () => {

    if(validate()) {
      setEnableAddressInput(false)
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
            window.alert('?????????????????? ??????????????')
            console.log('AXIOS DATA', res)  
            // window.location.reload();          
            setTabIndex(2)
          } else {
            window.alert('???????????? ????????????????')
            console.log('AXIOS DATA', res)
          }
        })
      } catch (error) {
        console.log(error.message)
        window.alert(`???????????? ????????????????: ${error.message}`)
      }
    }
  }

  const editCarToDb = async () => {
    if (validate()) {
      setEnableAddressInput(false)
      const formData = new FormData()

      formData.append('id', values.id)
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
        // const filteredArray = files.map((el) => {
          
        // })
        for (let el of files) {
          formData.append('file', el)
        }
      }

      try {
        await axios.post('cars/mycars/edit/', formData, {
          withCredentials: true,
          headers: {
            'content-type': 'multipart/form-data'
          }
        }).then(res => {
          if (res.status == 200) {
            window.alert('???????????????? ??????????????')
            console.log('AXIOS DATA', res)
            window.location.reload();
            setOpen(false)
          } else {
            window.alert('???????????? ????????????????')
            console.log('AXIOS DATA', res)
          }
        })
        // .then(res => console.log('AXIOS DATA',res.status))
      } catch (error) {
        console.log(error.message)
        window.alert(`???????????? ????????????????: ${error.message}`)
      }
    }
  }


  return (
    <div>
      <div className='addcar'>
        {edit ? <h2 className="title addcar__title">???????????????? ????????</h2>
        : <h2 className="title addcar__title">?????????????????? ?????????? ????????</h2>}
        <div className='addcar__inner'>
          <div className='addcar__item'>
            <Completer
              value={values.brand}
              options={brands}
              id={'brand'}
              values={values}
              setValues={setValues}
              error={errors.brand}
              helperText={'?????????????? ??????????'}
              name={'brand'}
              handleInputChange={handleInputChange}
              label={"???????????????? ??????????"} />
            <Autocomplete
              value={values.model}
              required
              id="model"
              freeSolo
              options={getModels(values.brand)}
              onChange={(event, newValue) => {
                setValues({ ...values, model: newValue })
              }}
              renderInput={(params) => <TextField
                {...params}
                error={errors.model ? true : false}
                helperText={errors.model ? "?????????????? ????????????" : ''}
                name='model'
                value={values.model}
                InputLabelProps={{ required: true }}
                onChange={handleInputChange}
                label="???????????????? ????????????" />} />
          </div>
          <div className='addcar__item'>
            <Completer
              value={values.year}
              options={years}
              id={'year'}
              values={values}
              setValues={setValues}
              error={errors.year}
              helperText={'?????????????? ??????'}
              name={'year'}
              handleInputChange={handleInputChange}
              label={"???????????????? ??????"} />
            <Completer
              value={values.engine}
              options={engines}
              id={'engine'}
              values={values}
              setValues={setValues}
              error={errors.engine}
              helperText={'?????????????? ??????????????????'}
              name={'engine'}
              handleInputChange={handleInputChange}
              label={"???????????????? ??????????????????"} />
          </div>
          <div className='addcar__item addcar__item-radio'>
            <FormControl>
              <FormLabel>??????????</FormLabel>
              <RadioGroup row
                name='body'
                value={values.body}
                onChange={handleInputChange}>
                <FormControlLabel value='sedan' control={<Radio />} label="sedan" />
                <FormControlLabel value='SUV' control={<Radio />} label="SUV" />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel>??????</FormLabel>
              <RadioGroup row
                name='gear'
                value={values.gear}
                onChange={handleInputChange}>
                <FormControlLabel value='A/T' control={<Radio />} label="A/T" />
                <FormControlLabel value='M/T' control={<Radio />} label="M/T" />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel>??????????</FormLabel>
              <RadioGroup row
                name='seats'
                value={values.seats}
                onChange={handleInputChange}>
                <FormControlLabel value='????????' control={<Radio />} label="????????" />
                <FormControlLabel value='??????????' control={<Radio />} label="??????????" />
                <FormControlLabel value='??????????????' control={<Radio />} label="??????????????" />
              </RadioGroup>
            </FormControl>
          </div>

          <div className='addcar__item'>
            <TextField
              error={errors.power ? true : false}
              helperText={errors.power ? "?????????????? ????????????????" : ''}
              name='power'
              value={values.power}
              InputLabelProps={{ required: true }}
              onChange={handleInputChange}
              label="?????????????? ????????????????" />
            <TextField
              error={errors.capacity ? true : false}
              helperText={errors.capacity ? "?????????????? ??????????????????????" : ''}
              name='capacity'
              value={values.capacity}
              InputLabelProps={{ required: true }}
              onChange={handleInputChange}
              label="?????????????? ??????????????????????" />
          </div>

          <div className='addcar__item-address'>
            <YandexSuggester 
              car={car}
              setCoordinates={setCoordinates} 
              enableAddressInput={enableAddressInput}
              setEnableAddressInput={setEnableAddressInput}
              values={values}
              setValues={setValues} />
          </div>

            <div className='addcar__item-dropzone'>
              <MyDropzone files={files} setFiles={setFiles} />
            </div>
            <DraggableImages files={files} setFiles={setFiles} />

          <div className='addcar__item'>
            <TextField
              error={errors.price ? true : false}
              helperText={errors.price ? "?????????????? ????????" : ''}
              name='price'
              value={values.price}
              InputLabelProps={{ required: true }}
              onChange={handleInputChange}
              label="?????????? ?????????" />
          <Button
            type='submit'
            onClick={handleSubmit}

            style={{ display: 'none' }}

          >???????? ????????????????</Button>
          </div>


          <div className='addcar__item-buttons'>
            {car ?
              <button className="addcar__item-buttons-btn" type='submit' onClick={editCarToDb}>????????????????</button>
              : <button className="addcar__item-buttons-btn" type='submit' onClick={addCarToDb}>??????????????????</button>
            }
            <button className="addcar__item-buttons-btn" onClick={handleReset}>????????????????</button>
          </div>

        </div>
      </div>
    </div>
  );
}

