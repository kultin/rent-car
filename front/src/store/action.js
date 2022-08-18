import ACTypes from "./types";

export const sendCorrectAnswer = (answer, id, topicId) => ({
  type: ACTypes.CORRECT_ANSWER,
  payload: { answer, id, status: 'correct', topicId }
});

export const sendWrongAnswer = (answer, id, topicId) => ({
  type: ACTypes.WRONG_ANSWER,
  payload: { answer, id, status: 'wrong', topicId }
});

export const brandFilterAC = (newValue) => ({
  type: ACTypes.BRAND_FILTER,
  payload: { brand: newValue }
})


export const bodyFilterAC = (value) => ({
  type: ACTypes.BODY_FILTER,
  payload: { body: value }
})

export const classFilterAC = (value) => ({
  type: ACTypes.CLASS_FILTER,
  payload: { class: value }
})

export const priceSortAC = (value) => ({
  type: ACTypes.PRICE_FILTER,
  payload: { price: value }
})

export const paginateAC = (value) => ({
  type: ACTypes.PAGINATE,
  payload: { page: value }
})

export const setCarsAC = (cars) => ({
  type: ACTypes.SET_CARS,
  payload: { cars }
})

export const sortAllAC = (body, brand, price) => ({
  type: ACTypes.FILTER,
  payload: { body, brand, price }
})

export const getAllBookingsAC = (bookings) => ({
  type: ACTypes.SET_BOOCKINGS,
  payload: { bookings }
})

export const addBookingAC = (booking) => ({
  type: ACTypes.NEW_BOOCKING,
  payload: { booking }
})

export const addLikeAC = ({carId, userId}) => ({
  type: ACTypes.ADD_LIKE,
  payload: { carId, userId }
})

export const deleteLikeAC = ({carID, userID}) => ({
  type: ACTypes.DELETE_LIKE,
  payload: { carID, userID}
})

export const setLikesAC = (likes) => ({
  type: ACTypes.SET_LIKES,
  payload: { likes }
})




