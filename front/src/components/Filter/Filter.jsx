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

  const onClick = (e) => {
    dispatch(sortAllAC(valueBody, valueBrand, valuePrice));
    setValueBody("all");
  }

  return (
    <div className={style.filter}>
      <div className={style.carbody}>
        <button className={
          valueBody === "sedan" ? `${style.btn} ${style.btnfocus}`: style.btn} onClick={() => {setValueBody("sedan"); dispatch(bodyFilterAC("sedan"))}} >
          <img className={style.images} src="/images/sedan.png" alt="sedan" />
          <h5 className={style.title}>Седан</h5>
        </button>
        <button className={
          valueBody ===  "SUV" ? `${style.btn} ${style.btnfocus}`: style.btn} onClick={() => {setValueBody("SUV"); dispatch(bodyFilterAC("SUV"))}} >
          <img className={style.images} src="/images/cross.png" alt="cross" />
          <h5 className={style.title}>Кроссовер</h5>
        </button>
      </div>
      <div className={style.inputs}>
      <Autocomplete
        value={valueBrand}
        onChange={(e, brand) => {
          setValueBrand(brand);
        }}
        id="controllable-states-demo"
        options={options}
        className={style.input1}
        renderInput={(params) => <TextField {...params} label="Марка" />}
      />
      <Autocomplete
        value={valuePrice}
        onChange={(e, price) => {
          setValuePrice(price);
        }}
        id="controllable-states-demo"
        options={optionsPrice}
        className={style.input2}
        renderInput={(params) => <TextField {...params} label="Сортировать по цене" />}
      />
      </div>
      <button className={style.btn2} onClick={onClick}>Сортировать</button>
    </div>

  );
}
