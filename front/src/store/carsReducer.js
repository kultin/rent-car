import ACTypes from "./types"
import { initCars } from "./initCars"

const initialState = {
  cars: [],
  filteredCars: [],
  filter: false,
  currentPage: 1
}

export const carsReducer = (state = initialState, action) => {
  switch (action.type) {

    case ACTypes.SET_CARS:
      return { ...state, cars: action.payload.cars };

    case ACTypes.PAGINATE:
      return { ...state, currentPage: action.payload.page };

    case ACTypes.FILTER:
      const { body, brand, price } = action.payload;
      let filteredCars = state.cars;
      if (brand !== "все марки") filteredCars = state.cars.filter((car) => car.brand === brand)
      if (body !== "all") filteredCars = state.cars.filter((car) => car.body === body)
      //console.log(filteredCars)   

      if (price === "по возрастанию") {
        const filteredNSorted = filteredCars.sort((a, b) => a.price - b.price);
        return { ...state, filter: true, currentPage: 1, filteredCars: filteredNSorted };
      } else {
        const filteredNSorted = filteredCars.sort((a, b) => b.price - a.price);
        return { ...state, filter: true, currentPage: 1, filteredCars: filteredNSorted };
      }

    case ACTypes.DELETE_CAR:
      const unDeletedCars = state.cars.filter((car) => (car.id !== action.payload.id))
      return {...state, cars: unDeletedCars};

    case ACTypes.EDIT_CAR:
      return { ...state, cars: action.payload} 
      
    case ACTypes.DELETE_PHOTO_CAR:
      console.log('reducer')

      const car = state.cars.filter(car => car.id === action.payload.car_id)[0]

      const images = car.Images.filter(img => img.id !== action.payload.id)
      const newState = state.cars.map((el) => {
        if (el.id === action.payload.car_id) {
          return {...el, Images: images }
        } 
        return el
      })
      console.log(newState)
      return {...state, cars: newState}  
      
    default:
      return state;
  }
}
