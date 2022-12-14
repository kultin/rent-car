import ACTypes from "./types";
import { setLoadingUA, setErrorUA } from "./userActions";

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

export const deleteCarAC = (id) => ({
  type: ACTypes.DELETE_CAR, 
  payload: {id}
})

export const deleteCarThunk = (id) => async (dispatch) => {
  // dispatch(setLoadingUA(true))
  try {
      const response = await fetch("http://localhost:3005/cars/mycars/delete", {
          method: "delete",
          credentials: 'include',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
      });
      
      if (response.status !== 200) {
        return dispatch(setErrorUA('???????????? ???????????????? ???? ??????????????'))
      }
      dispatch(deleteCarAC(id))
  } catch (err) {
      console.error('err', err);
      dispatch(setErrorUA('???????????? ?? ?????????????? ????????????????'))
  } finally {
      dispatch(setLoadingUA(false));
  }
}

export const deleteCarPhotoAC = (file) => ({
  type: ACTypes.DELETE_PHOTO_CAR, 
  payload: file
})

export const deleteCarPhotoThunk = (file) => async (dispatch) => {
  // dispatch(setLoadingUA(true))
  try {
      const response = await fetch("http://localhost:3005/cars/mycars/photo/delete", {
          method: "delete",
          credentials: 'include',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ imgId : file.id }),
      });
      
      if (response.status !== 200) {
        console.log('Delete Car Photo', response.status)
        return dispatch(setErrorUA('???????????? ???????????????? ???? ??????????????'))
      }
      dispatch(deleteCarPhotoAC(file))
  } catch (err) {
      console.error('err', err);
      dispatch(setErrorUA('???????????? ?? ?????????????? ????????????????'))
  } finally {
      dispatch(setLoadingUA(false));
  }
}




