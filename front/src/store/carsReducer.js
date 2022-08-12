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

      case ACTypes.FILTER:
        const {body,brand,price} =action.payload;
        let filteredCars;
        if((brand==="все марки")&&(body==="all"))   filteredCars= state.cars;
        if(brand==="все марки")   filteredCars=state.cars.filter((car)=> car.body===body)   
        if(body==="all")   filteredCars=state.cars.filter((car)=> car.brand===brand)         
        filteredCars=state.cars.filter((car)=> {
          return car.brand===brand&&car.body===body
        });
        console.log(filteredCars)
      //  let filteredByBody
      //   (body==="all")  ?
      //   filteredByBody=state.cars.filter((car)=> car.brand===brand)       
      //   :
      //     filteredCars=state.cars.filter((car)=>  car.brand===brand&&car.body===body)  
        

        if (price==="по возрастанию")  {
          const filteredNSorted =filteredCars.sort((a,b)=>a.price -b.price);  
          return {...state, filter: true, currentPage : 1, filteredCars: filteredNSorted};        
        } else {
          const filteredNSorted =filteredCars.sort((a,b)=>b.price -a.price);  
          return {...state, filter: true, currentPage : 1, filteredCars: filteredNSorted};        
        }
        
        

      // case ACTypes.BRAND_FILTER:      
      //   const brand=action.payload.brand;
      //   if (brand==="все марки")  return {...state, filteredCars: state.cars};
      //   const filteredCars=state.cars.filter((car)=>car.brand===brand);
      //   console.log(filteredCars);
      //   return {...state, currentPage : 1, filteredCars: filteredCars};

      // case ACTypes.BODY_FILTER:  
      // const body=action.payload.body;
      // const filteredByBody=state.cars.filter((car)=>car.body===body);
      // console.log(filteredByBody);
      // return {...state, currentPage : 1, filteredCars: filteredByBody};
     
      // case ACTypes.PRICE_FILTER:      
      // const price=action.payload.price;
      // console.log(price)
      // if (price==="по возрастанию")  {
      //   const filteredByPrice=state.cars.sort((a,b)=>a.price -b.price);
      //   return {...state, filter:true, currentPage : 1, filteredCars: filteredByPrice }
      // } else {
      //   const filteredByPrice=state.cars.sort((a,b)=>b.price -a.price);
      //   return {...state, filter:true, currentPage : 1, filteredCars:filteredByPrice }
      // }
      
      // case ACTypes.CLASS_FILTER:  
      
      // const carClass=action.payload.class;
      // console.log(carClass)
      // const filteredByClass=state.cars.filter((car)=>car.class===carClass);
      // console.log(filteredByClass);
      // return {...state, filter:true, currentPage : 1, filteredCars: filteredByClass};


     

    default:
      return state;  
  }
}
