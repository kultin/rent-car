import ACTypes from "./types";

const initialValues = {
  values: {
    brand: '',
    model: '',
    body: '',
    year: '',
    engine: '',
    gear: '',
    power: '',
    seats: '',
    photo: '',
    price: '',
    capacity: '',
    coordinates: null,
    user_id: null,
    file: null,
  }
}


export const formCarReducer = (state = initialValues, action) => {
  switch (action.type) {

    case ACTypes.EDIT_CAR:
      return { ...state};

      default:
        return state;
    }
}
