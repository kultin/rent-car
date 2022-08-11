import { UTypes } from "./types"

const initialState = {
  user: {},
  bookings: {}
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case UTypes.LOGOUT_USER:
   
      return { ...state, user: {} };

    case UTypes.GETUSER_USER:
   
      return { ...state, user: action.payload.user };

    case UTypes.REGISTRATION_USER:
   
      return { ...state, user: action.payload.user };

    case UTypes.EDIT_USER:
      
      return { ...state, user: action.payload.user };

    case UTypes.LOGIN_USER:
     
      return { ...state, user: action.payload.user };

    case UTypes.GETBOOKINGS_USER:
     
      console.log('test');
      return { ...state };

    case UTypes.EDIT_AVATAR:
      const img_url = action.payload.url.substr(6)
      return {...state, user: {...state.user, img_url }}

    default:
      return state;
  }
}
