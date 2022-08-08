import ACTypes from "./types"

const initTopics = []

const initialState = {
  topics: initTopics
}


export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ACTypes.SET_CARDS:
      // console.log("set cards reducer")
      return {...state, topics: action.payload};
  
    default:
      return state;  
  }
}
