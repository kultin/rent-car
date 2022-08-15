import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { brandFilterAC, bodyFilterAC, classFilterAC, priceSortAC } from '../../store/action';
import style from "./style.module.css"
const options = ["Volkswagen", "Skoda", "Nissan", "Renault", "Audi", "Toyota", "все марки"];
const optionsPrice = ["по убыванию", "по возрастанию"];

export default function Filter() {
  const [value, setValue] = React.useState(options[0]);
  //const [inputValue, setInputValue] = React.useState('');
  const [valuePrice, setValuePrice] = React.useState(optionsPrice[0]);
  const dispatch = useDispatch();

  return (
    <div className={style.filter}>
      <div className={style.carbody}>
        <div className="carbody_type">
          <button onClick={() => dispatch(bodyFilterAC("sedan"))} >
            <img src="/images/sedan.svg" alt="" />
            <h5>Седан</h5>
          </button>
        </div>
        <div className="carbody_type">
          <button onClick={() => dispatch(bodyFilterAC("crossover"))} >

            <img src="/images/crossover.svg" alt="" />
            <h5>Кроссовер</h5>
          </button>
        </div>
      </div>
      <Autocomplete
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
          dispatch(brandFilterAC(newValue))

        }}
        // inputValue={inputValue}
        // onInputChange={(event, newInputValue) => {
        //   setInputValue(newInputValue);
        // }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Марка" />}
      />
      <div className={style.rate}>
        <button onClick={() => dispatch(classFilterAC("econom"))} >
          <h5>Эконом</h5>
        </button>
        <button onClick={() => dispatch(classFilterAC("comfort"))} >
          <h5>Комфорт</h5>
        </button>
        <button onClick={() => dispatch(classFilterAC("business"))} >
          <h5>Бизнес</h5>
        </button>
      </div>

      <Autocomplete
        value={valuePrice}
        onChange={(e, newValue) => {
          setValuePrice(newValue);
          dispatch(priceSortAC(newValue))

        }}      
        id="controllable-states-demo"
        options={optionsPrice}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Сортировать по цене" />}
      />
    </div>
  );
}
