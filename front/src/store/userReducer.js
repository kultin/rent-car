import { UTypes } from "./types"

const initialState = {
  user: {},
  bookings: [],
  error: false,
  isLoading: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case UTypes.SET_LOADING:

      return { ...state, isLoading: action.payload.isLoading };

    case UTypes.ERROR:

      return { ...state, error: action.payload.msg };

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

      return { ...state, bookings: action.payload.bookings };

    case UTypes.EDIT_AVATAR:
      const img_url = action.payload.url.substr(6)
      return {...state, user: {...state.user, img_url }}

    default:
      return state;
  }
}
