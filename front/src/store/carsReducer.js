import ACTypes from "./types"
import { initCars } from "./initCars"


// const initCars = [
//   {id:1, brand: "Volkswagen", model: "Polo", body: "sedan", year:2018, engine: "1,6 ", gear: "Автомат", power: "110", seats: "ткань", photo:"", price: 2500, class: "econom"},
//   {id:2, brand: "Volkswagen", model: "Passat B8", body: "sedan", year:2018, engine: "1,6 ", gear: "Автомат", power: "110", seats: "ткань", photo:"", price: 4200, class: "business"},
//   {id:3, brand: "Skoda", model: "Rapid", body: "sedan", year:2020, engine: "1,6 ", gear: "Автомат", power: "110", seats: "ткань", photo:"", price: 2500, class: "econom"},
//   {id:4, brand: "Nissan", model: "Quashqai", body: "sedan", year:2020, engine: "1,6 ", gear: "Автомат", power: "144",seats: "экокожа", photo:"", price: 3500, class: "comfort"},
//   {id:5, brand: "Renault", model: "Arkana", body: "crossover", year:2022, engine: "2 ", gear: "Автомат", power: "184",seats: "кожа", photo:"", price: 3500, class: "econom"},
//   {id:6, brand: "Renault", model: "Kaptur", body: "crossover", year:2021, engine: "2 ", gear: "Автомат", power: "150",seats: "кожа",photo:"", price: 2900, class: "econom"},
//   {id:7, brand: "Toyota", model: "Camry V55", body: "crossover", year:2021, engine: "2 ", gear: "Автомат", power: "150",seats: "кожа",photo:"", price: 8500, class: "business"},
//   {id:8, brand: "Audi", model: "A3", body: "crossover", year:2019, engine: "2 ", gear: "Автомат", power: "150",seats: "кожа",photo:"", price: 3500, class: "comfort"}
// ]

const initialState = {
  
  cars: [],
  filteredCars: [],
  filter: false,
  currentPage : 1
}


export const carsReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ACTypes.SET_CARS:
      
      return {...state, cars: action.payload};

    case ACTypes.PAGINATE:
      return {...state, currentPage: action.payload.page};

      case ACTypes.BRAND_FILTER:      
        const brand=action.payload.brand;
        if (brand==="все марки")  return {...state, filter:true, filteredCars: state.cars};
        const filteredCars=state.cars.filter((car)=>car.brand===brand);
        console.log(filteredCars);
        return {...state, filter:true, currentPage : 1, filteredCars: filteredCars};


      case ACTypes.BODY_FILTER:  
      const body=action.payload.body;
      const filteredByBody=state.cars.filter((car)=>car.body===body);
      console.log(filteredByBody);
      return {...state, filter:true, currentPage : 1, filteredCars: filteredByBody};

      case ACTypes.CLASS_FILTER:  
      
      const carClass=action.payload.class;
      console.log(carClass)
      const filteredByClass=state.cars.filter((car)=>car.class===carClass);
      console.log(filteredByClass);
      return {...state, filter:true, currentPage : 1, filteredCars: filteredByClass};


      case ACTypes.PRICE_FILTER:      
        const price=action.payload.price;
        console.log(price)
        if (price==="по возрастанию")  {
          const filteredByPrice=state.cars.sort((a,b)=>a.price -b.price);
          return {...state, filter:true, currentPage : 1, filteredCars: filteredByPrice }
        } else {
          const filteredByPrice=state.cars.sort((a,b)=>b.price -a.price);
          return {...state, filter:true, currentPage : 1, filteredCars:filteredByPrice }
        }
        

    default:
      return state;  
  }
}
