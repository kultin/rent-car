import ACTypes from "./types"

const initCars = [
  {id:1, brand: "Volkswagen", model: "Polo", body: "sedan", year:2018, engine: "1,6 ", gear: "Автомат", power: "110", seats: "ткань", photo:"", price: 2500},
  {id:2, brand: "Skoda", model: "Rapid", body: "sedan", year:2020, engine: "1,6 ", gear: "Автомат", power: "110", seats: "ткань", photo:"", price: 2500},
  {id:3, brand: "Nissan", model: "Quashqai", body: "sedan", year:2020, engine: "1,6 ", gear: "Автомат", power: "144",seats: "экокожа", photo:"", price: 3500},
  {id:4, brand: "Renault", model: "Arkana", body: "crossover", year:2022, engine: "2 ", gear: "Автомат", power: "184",seats: "кожа", photo:"", price: 3500},
  {id:5, brand: "Renault", model: "Kaptur", body: "crossover", year:2021, engine: "2 ", gear: "Автомат", power: "150",seats: "кожа",photo:"", price: 2900}
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
      return {...state, filter: action.payload};

      case ACTypes.FILTER:      
        const brand=action.payload.brand;
        const filteredCars=state.cars.filter((car)=>car.brand===brand);
        console.log(filteredCars);
        return {...state, filteredCars: filteredCars};
  
    default:
      return state;  
  }
}
