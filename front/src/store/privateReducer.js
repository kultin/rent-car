import PTypes from "./types"

const initTopics = []

const initialState = {
  topics: initTopics
}

export const privateReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ACTypes.SET_CARDS:
      // console.log("set cards reducer"1112)
      return {...state, topics: action.payload};
  
    default:
      return state;  
  }
}