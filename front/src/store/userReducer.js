import {UTypes} from "./types"

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
    id:1,
    
  }
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {

      case UTypes.EDIT_USER:
          // const user = 
          console.log('test');
          return { ...state  };

          case UTypes.GETBOOKINGS_USER:
          const bookings = action.payload.bookings
          console.log('test');
          return { ...state  };

      default:
          return state;
  }
}
