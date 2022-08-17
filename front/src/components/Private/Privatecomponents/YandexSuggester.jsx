import React, { useEffect } from "react";
import { YMaps, withYMaps } from "react-yandex-maps";
import TextField from '@mui/material/TextField';
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import { set } from "ramda";


const addressStyles ={

  maxWidth: '100%',
  backgroundColor: '#fff',
  borderRadius: '3px'
}

function MapSuggestComponent(props) {

  const values = useSelector((store) => store.form.values)
 
  const { ymaps } = props
  const {setCoordinates} = props
  const { car } = props

  const clearInput = props.addressInput

  console.log('CLEAR INPUT', clearInput)

  const {setValues} = props
  

  const getAddress = (coords) => {
    ymaps.geocode(`${coords}`)
          .then((result) => {
            const city = result.geoObjects.get(0).getLocalities()[0]
            const street = result.geoObjects.get(0).getThoroughfare()
            setAddressInput(`${city}, ${street}`)
          })
  }

  const [addressInput, setAddressInput] = React.useState('')
  // const [addressInput, setAddressInput] = React.useState(getAddress(car?.location))

  useEffect(() => {
    setAddressInput(getAddress(car?.location))
  }, [])

  React.useEffect(() => {
    const suggestView = new ymaps.SuggestView("suggest");
    suggestView.events.add("select", (e) => {
      getCoords(e.get("item").value)
      console.log('sadfssfsf')
      setAddressInput(e.get("item").value)
    });
  }, [ymaps.SuggestView]);


  const getCoords = (addres) => {
    ymaps.geocode(`${addres}`)
          .then((result) => {
            console.log('aefsfjjgjsrgjg')
            setCoordinates(result.geoObjects.get(0).geometry.getCoordinates())
            // setValues({...values, coo})
          })
  }

  return (
          <TextField 
            id="suggest" 
            // sx={addressStyles}
            label={addressInput ? '' : 'Введите адрес' }
            style={{
              width: '100%',
              height: '55px',
              border: 'none',
              marginBottom: '20px',
              backgroundColor:'#fff'
            }}
            // variant="outlined"
            value={clearInput ? '' : addressInput}
            placeholder={addressInput ? '' : 'Введите адрес' }
            onChange={(e) => setAddressInput(e.target.value)} />
  )  
}

export default function YandexSuggester(props) {
  const {setCoordinates} = props
  const { setValues } = props
  const { car } = props
  const {addressInput} = props

  const SuggestComponent = React.useMemo(() => {
    return withYMaps(MapSuggestComponent, true, [
      "SuggestView",
      "geocode",
      "coordSystem.geo"
    ]);
  }, []);

  return (
    <>
      <YMaps
        enterprise
        query={{ apikey: "8702bcb9-70ec-40c4-8640-a7bafb10f01d" }}
      >
        <SuggestComponent car={car} setCoordinates={setCoordinates} setValues={setValues} addressInput={addressInput} />
      </YMaps>
    </>
  );
}
