import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { AppProvider } from './components/Add_cart/Context';
import store from './components/Redux/store';

// store.subscribe(() => console.log(store.getState()))

ReactDOM.render(
 
  <React.StrictMode>
    <BrowserRouter >
   <Provider store={store}>
    <AppProvider>
    <App />
    </AppProvider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
