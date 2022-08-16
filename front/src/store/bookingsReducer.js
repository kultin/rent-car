import ACTypes from "./types"

const initialState = {
  bookings: []
}

export const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {

    case ACTypes.SET_BOOCKINGS:
      return { ...state, bookings: action.payload.bookings };

    case ACTypes.NEW_BOOCKING:
      return { ...state, bookings: [...state.bookings, action.payload.booking]}

    default:
      return state;
  }
}
