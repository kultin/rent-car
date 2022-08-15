import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { brandFilterAC, bodyFilterAC, classFilterAC, priceSortAC, sortAllAC } from '../../store/action';
import style from "./style.module.css"
const options = ["Volkswagen", "Skoda", "Nissan", "Renault", "Audi", "Toyota", "все марки"];
const optionsPrice = ["по убыванию", "по возрастанию"];

export default function Filter() {
  const [valueBody, setValueBody] = React.useState("all");
  const [valueBrand, setValueBrand] = React.useState(options[0]);
  //const [inputValue, setInputValue] = React.useState('');
  const [valuePrice, setValuePrice] = React.useState(optionsPrice[0]);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(sortAllAC(valueBody,valueBrand,valuePrice))
  }

  return (
    <div className={style.filter}>

      <div className={style.carbody}>
        <div className="carbody_type">

          <button onClick={() => {
            setValueBody("sedan")
            //dispatch(bodyFilterAC("sedan"))
            }} >

            <img src="/images/sedan.svg" alt="" />
            <h5>Седан</h5>
          </button>
        </div>
        <div className="carbody_type">
          <button onClick={() => {
            setValueBody("SUV")
            //dispatch(bodyFilterAC("SUV"))
            }} >

            <img src="/images/crossover.svg" alt="" />
            <h5>Кроссовер</h5>
          </button>
        </div>
      </div>
      <br />
      <Autocomplete
       
        value={valueBrand}
        onChange={(e, brand) => {
          setValueBrand(brand);
          //dispatch(brandFilterAC(newValue))

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
      {/* <div className={style.rate}>
        <button onClick={() => dispatch(classFilterAC("econom"))} >
          <h5>Эконом</h5>
        </button>
        <button onClick={() => dispatch(classFilterAC("comfort"))} >
          <h5>Комфорт</h5>
        </button>
        <button onClick={() => dispatch(classFilterAC("business"))} >
          <h5>Бизнес</h5>
        </button>
      </div> */}

      <Autocomplete
       className={style.sort}
        value={valuePrice}
        onChange={(e, price) => {
          setValuePrice(price);
          //dispatch(priceSortAC(newValue))

        }}
        id="controllable-states-demo"
        options={optionsPrice}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Сортировать по цене" />}
      />

      <button className='car__desc-btn' onClick={onClick}> Сортировать</button>
    </div>

  );
}
