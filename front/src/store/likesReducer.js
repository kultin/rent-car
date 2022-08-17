import ACTypes from "./types";

const initialState = {
  likes: []
}

export const likesReducer = (state = initialState, action) => {
  switch (action.type) {

    case ACTypes.DELETE_LIKE:
      const { carID, userID } = action.payload;

      const delLike = state.likes.filter((like) => like.user_id == userID && like.car_id == carID)[0]
      const filteredLikes = state.likes.filter((like) => like != delLike)
      
      return { ...state, likes: filteredLikes }

    case ACTypes.ADD_LIKE:

      const { carId, userId } = action.payload;

      const like = { user_id: userId, car_id: carId }
      return { ...state, likes: [...state.likes, like] }

    case ACTypes.SET_LIKES:
      const { likes } = action.payload;
      return { ...state, likes: likes }

    default:
      return state;
  }
}
