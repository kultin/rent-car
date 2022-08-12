import React from "react";
import { YMaps, withYMaps } from "react-yandex-maps";

function MapSuggestComponent(props) {
  const { ymaps } = props;

  const [addressInput, setAddressInput] = React.useState('')
  const [coords, setCoords] = React.useState([])

  console.log('COOORDS', coords)

  React.useEffect(() => {
    const suggestView = new ymaps.SuggestView("suggest");
  }, [ymaps.SuggestView]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(addressInput)
  }

  const getCoords = (e, addres) => {
    if(e.key === 'Enter') console.log('enter')

    ymaps.geocode(`${addres}`)
          .then((result) => {
            setCoords(result.geoObjects.get(0).geometry.getCoordinates())
          })
  }

  

  return (
    <form
        onSubmit={submitHandler}>
          <input 
            id="suggest"
            type="text" 
            placeholder='Введите адрес'
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            onClick={(e) => getCoords(e, e.target.value)}
            // onBlur={getCoords(addressInput)}
              />
            <button type="submit">Загрузить адрес</button>
        </form>
  )  
}

export default function YandexSuggester() {
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
        <SuggestComponent />
      </YMaps>
    </div>
  );
}
