import React from "react";
import { YMaps, withYMaps } from "react-yandex-maps";
import TextField from '@mui/material/TextField';

function MapSuggestComponent(props) {

  const { ymaps } = props
  const {setCoordinates} = props

  const [addressInput, setAddressInput] = React.useState('')

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
          })
  }

  return (
          <TextField 
            id="suggest" 
            label="Введите адрес"
            variant="outlined"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)} />
  )  
}

export default function YandexSuggester(props) {
  const {setCoordinates} = props
  const SuggestComponent = React.useMemo(() => {
    return withYMaps(MapSuggestComponent, true, [
      "SuggestView",
      "geocode",
      "coordSystem.geo"
    ]);
  }, []);

  return (
    <div className="App">
      <YMaps
        enterprise
        query={{ apikey: "8702bcb9-70ec-40c4-8640-a7bafb10f01d" }}
      >
        <SuggestComponent setCoordinates={setCoordinates} />
      </YMaps>
    </div>
  );
}
