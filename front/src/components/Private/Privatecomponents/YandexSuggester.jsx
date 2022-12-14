import React, { useEffect } from "react";
import { YMaps, withYMaps } from "react-yandex-maps";
import TextField from '@mui/material/TextField';
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import { set } from "ramda";


// const addressStyles ={
//   maxWidth: '100%',
//   backgroundColor: '#fff',
//   borderRadius: '3px'
// }

function MapSuggestComponent(props) { 
  const { ymaps } = props
  const {setCoordinates} = props
  const { car } = props

  const clearInput = props.enableAddressInput
  const {setEnableAddressInput} = props

  const getAddress = (coords) => {
    ymaps.geocode(`${coords}`)
          .then((result) => {
            const city = result.geoObjects.get(0).getLocalities()[0]
            const street = result.geoObjects.get(0).getThoroughfare()
            setAddressInput(`${city}, ${street}`)
          })
  }

  const [addressInput, setAddressInput] = React.useState('')

  useEffect(() => {
    setAddressInput(getAddress(car?.location))
  }, [])

  React.useEffect(() => {
    const suggestView = new ymaps.SuggestView("suggest");
    suggestView.events.add("select", (e) => {
      getCoords(e.get("item").value)
      setAddressInput(e.get("item").value)
    });
  }, [ymaps.SuggestView]);


  const getCoords = (addres) => {
    ymaps.geocode(`${addres}`)
          .then((result) => {
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
            onClick={() => setEnableAddressInput(false)}
            onChange={(e) => setAddressInput(e.target.value)} />
  )  
}

export default function YandexSuggester(props) {
  const { car } = props
  const { setCoordinates } = props
  const { setValues } = props
  const { enableAddressInput } = props
  const { setEnableAddressInput } = props

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
        <SuggestComponent 
          car={car} 
          setCoordinates={setCoordinates}
          setValues={setValues}
          enableAddressInput={enableAddressInput}
          setEnableAddressInput={setEnableAddressInput} />
      </YMaps>
    </>
  );
}
