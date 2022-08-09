import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { filterAC,setFilterAC } from '../../store/action';
const options = ["Volkswagen Polo", "Skoda Rapid", "Nissan Quashqai", "BMV 520", "KIA K5"];

export default function Filter() {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  const dispatch =useDispatch();

  return (
    <div>

      <br />
      <Autocomplete
        value={value}
        onChange={(e, newValue) => {
          // console.log(newValue)
          // console.log(e.target.value)
          setValue(newValue);          
          dispatch(setFilterAC(true))
          dispatch(filterAC(newValue))

        }}
        // inputValue={inputValue}
        // onInputChange={(event, newInputValue) => {
        //   setInputValue(newInputValue);
        // }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Марка" />}
      />
    </div>
  );
}
