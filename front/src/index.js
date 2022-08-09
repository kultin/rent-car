import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals'

import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/index';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </BrowserRouter>
// );

ReactDOM.render(
  <BrowserRouter>
     <Provider store={store}>
       <App />
     </Provider>
   </BrowserRouter>,
   document.getElementById('root')
)
reportWebVitals();
