import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { bodyFilterAC, classFilterAC, priceSortAC, sortAllAC } from '../../store/action';
import style from "./style.module.css"
const options = ["Volkswagen", "Skoda", "Nissan", "Renault", "Audi", "Toyota", "все марки"];
const optionsPrice = ["по убыванию", "по возрастанию"];

export default function Filter() {
  const [valueBody, setValueBody] = React.useState("all");
  const [valueBrand, setValueBrand] = React.useState(options[0]);
  const [valuePrice, setValuePrice] = React.useState(optionsPrice[0]);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(sortAllAC(valueBody, valueBrand, valuePrice))
  }

  return (
    <div className={style.filter}>
      <div className={style.carbody}>
        <button className={style.btn} onClick={() => dispatch(bodyFilterAC("sedan"))} >
          <img className={style.images} src="/images/sedan.png" alt="sedan" />
          <h5 className={style.title}>Седан</h5>
        </button>
        <button className={style.btn} onClick={() => { setValueBody("SUV") }} >
          <img className={style.images} src="/images/cross.png" alt="cross" />
          <h5 className={style.title}>Кроссовер</h5>
        </button>
      </div>
      <Autocomplete
        value={valueBrand}
        onChange={(e, brand) => {
          setValueBrand(brand);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Марка" />}
      />
      <Autocomplete
        className={style.sort}
        value={valuePrice}
        onChange={(e, price) => {
          setValuePrice(price);
        }}
        id="controllable-states-demo"
        options={optionsPrice}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Сортировать по цене" />}
      />
      <button className={style.btn2} onClick={onClick}> Сортировать</button>
    </div>

  );
}
