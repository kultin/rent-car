import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import { userReducer } from './userReducer';
import { carsReducer } from './carsReducer';
import { bookingsReducer } from './bookingsReducer';
import { likesReducer } from './likesReducer';
import { formCarReducer } from './formCarReducer';

const composeEnhancers = composeWithDevTools(applyMiddleware(thunkMiddleware)); // импорт reduxDevTools

const reducers = combineReducers({
  user: userReducer,
  cars: carsReducer,
  bookings: bookingsReducer,
  likes: likesReducer,
  form: formCarReducer,
});

export const store = createStore(reducers, composeEnhancers);
