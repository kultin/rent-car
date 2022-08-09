import ACTypes from "./types"

const initCars = [
  {id:1, brand: "Volkswagen Polo", year:2018, engine: "1,6 ", gear: "Автомат", power: "110", seats: "ткань", photo:""},
  {id:2, brand: "Skoda Rapid", year:2020, engine: "1,6 ", gear: "Автомат", power: "110", seats: "ткань", photo:""},
  {id:3, brand: "Nissan Quashqai", year:2020, engine: "1,6 ", gear: "Автомат", power: "144",seats: "экокожа", photo:""},
  {id:4, brand: "BMV 520", year:2022, engine: "2 ", gear: "Автомат", power: "184",seats: "кожа", photo:""},
  {id:5, brand: "KIA K5", year:2021, engine: "2 ", gear: "Автомат", power: "150",seats: "кожа",photo:""}
]

const initialState = {
  cars: initCars,
  filteredCars: [],
  filter: false
}


export const carsReducer = (state = initialState, action) => {
  switch (action.type) {
    
    // case ACTypes.SET_CARS:
      
    //   return {...state, cars: action.payload};

    case ACTypes.SET_FILTER:
      console.log(action.payload);
      return {...state, filter: action.payload.boolean};

      case ACTypes.FILTER:      
        const brand=action.payload.brand;
        const filteredCars=state.cars.filter((car)=>car.brand===brand);
        console.log(filteredCars);
        return {...state, filteredCars: filteredCars};
  
    default:
      return state;  
  }
}
