import { legacy_createStore as createStore, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { userReducer } from './reducers';
import { carsReducer } from './carsReducer';
// import { authReducer } from "./auth/reducers";
// import { cardReducer } from "./cards/reducers";
// import { modalReducer} from './cards/modal.reducer';

const composeEnhancers = composeWithDevTools(); // импорт reduxDevTools

const reducers = combineReducers({
    user: userReducer,
    // auth: authReducer, // по этим ключам, потом обращаемся в подредьюсеры
     cars: carsReducer,
    // topicsCombine: cardReducer,
    // modal: modalReducer,
  });

export const store = createStore(reducers, composeEnhancers);
