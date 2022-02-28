import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';  
import Navbar from './Components/Navbar';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import userReducer from "./reducers/user";


const store = configureStore({
  reducer: {
    user: userReducer,
  }
})

// store -> stores all the globalized data 
// action -> describes 

// reducer ->  checks which action and based on the action modifies the data in the store 

// dispatch



ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <Navbar/>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
