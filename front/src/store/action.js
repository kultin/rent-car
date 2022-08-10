import ACTypes from "./types";

export const sendCorrectAnswer = (answer, id, topicId) => ({
  type: ACTypes.CORRECT_ANSWER,
  payload: { answer, id, status: 'correct', topicId}
});

export const sendWrongAnswer = (answer, id, topicId) => ({
  type: ACTypes.WRONG_ANSWER,
  payload: { answer, id, status: 'wrong', topicId}
});

export const brandFilterAC =(newValue) => ({
  type:ACTypes.BRAND_FILTER,
  payload: {brand:newValue}
})


export const bodyFilterAC =(value) => ({
  type:ACTypes.BODY_FILTER,
  payload: {body:value}
})

export const classFilterAC =(value) => ({
  type:ACTypes.CLASS_FILTER,
  payload: {class:value}
})

export const priceSortAC =(value) => ({
  type:ACTypes.PRICE_FILTER,
  payload: {price:value}
})

export const paginateAC =(value) => ({
  type:ACTypes.PAGINATE,
  payload: {page:value}
})
