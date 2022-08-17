import React from 'react'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const inputStyles ={
  width: '380px',
  backgroundColor: '#fff',
  borderRadius: '3px'
}

const Completer = (props) => {

  const {
    value,
    options=[],
    id, 
    values,
    setValues,
    error,
    helperText,
    name,
    handleInputChange,
    label,
    getModels
   } = props

  //  console.log('value from completer', value, name)

  return (
    <Autocomplete
                className="addcar__item-input"
                value={value}
                required
                id={id}
                freeSolo
                options={options}
                onChange={(e, newValue) => {
                  setValues({...values, [name]: newValue })
                  // handleInputChange(e, newValue)
                }}
                renderInput={(params) => <TextField 
                  sx={inputStyles}
                  {...params} 
                  error={error ? true : false}
                  helperText={error ? (helperText) : ''}
                  name={name}
                  value={value}
                  InputLabelProps={ { required: true }}
                  onChange={(e, value) => {
                    handleInputChange(e, value)
                  }}
                  label={label} />}
              />
  )
}

export default Completer
