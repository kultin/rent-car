import { legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import { userReducer } from './userReducer';
import { carsReducer } from './carsReducer';
import { bookingsReducer } from './bookingsReducer';

const composeEnhancers = composeWithDevTools(applyMiddleware(thunkMiddleware)); // импорт reduxDevTools

const reducers = combineReducers({
    user: userReducer,
    cars: carsReducer,
    bookings: bookingsReducer,
  });

export const store = createStore(reducers, composeEnhancers);
