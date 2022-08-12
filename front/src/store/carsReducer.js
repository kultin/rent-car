import ACTypes from "./types"
import { initCars } from "./initCars"

const initialState = {
  cars: [],
  filteredCars: [],
  filter: false,
  currentPage : 1
}

export const carsReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ACTypes.SET_CARS:  
      return {...state, cars: action.payload.cars};

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
