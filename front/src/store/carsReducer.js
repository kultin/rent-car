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
      
    default:
      return state;
  }
}
