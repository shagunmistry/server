import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
//get redux started and hooking it up with react-side of the application by placing the provider tag
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//Action Creator: help us initiate change inside of the redux side of our app. To Modify the state inside of our redux store. 


//So Provider tag is a React-Component that knows how to read changes from a Redux store
//every time the redux store gets a new state update inside of it, the provider tag makes sure that
//all the children components are informed and updated with the new state. 

//ReactDOM takes two arguments --root component and existing DOM node 
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);


console.log('Stripe Key is: ', process.env.REACT_APP_STRIPE_KEY);
console.log('Stripe Key is: ', process.env.NODE_ENV);