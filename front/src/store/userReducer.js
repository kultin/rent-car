import { UTypes } from "./types"

const initialState = {
  user: {
    id: 1,
    name: 'testname',
    email: 'aa@aa.ru',
    tel: '12345',
    img_url: 'avpic.jpeg',
    role: 'lessor'
  },
  bookings: {
    id: 1,

  }
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case UTypes.REGISTRATION_USER:
   
      return { ...state, user: action.payload.user };
    case UTypes.EDIT_USER:
   
      return { ...state, user: action.payload.user };

    case UTypes.LOGIN_USER:
     
      return { ...state, user: action.payload.user };

    case UTypes.GETBOOKINGS_USER:
     
      console.log('test');
      return { ...state };

    default:
      return state;
  }
}
