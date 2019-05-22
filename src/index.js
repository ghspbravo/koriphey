import React from 'react';
import ReactDOM from 'react-dom';
import { /*BrowserRouter,*/ HashRouter, Route } from "react-router-dom";

import * as serviceWorker from './serviceWorker';

import App from './App';

// App global styles
// libs
import 'normalize.css'; // from node_modules
import './styles/bootstrap-grid.css'
import 'swiper/dist/css/swiper.css'

// main styles
import './index.scss';
// components
import './styles/spacing.scss';
import './styles/search.scss';
import './styles/card.scss';
import './styles/list.scss';
import './styles/filter.scss';
import './styles/navigation.scss';

import { StoreProvider, createStore } from 'easy-peasy';
import { model } from './model';

const logger = store => next => action => {
  console.log(action)
  return next(action)
}

const store = createStore(model, {
  initialState: {
    auth: {
      isAuth: localStorage.getItem('refresh') ? true : false
      // refresh: localStorage.getItem('refresh'),
    },
    // profile: {
    //   id: localStorage.getItem('user'),
    // }
  },
  middleware: [logger]
})

/* TODO: 
  change HashRouter to BrowserRouter
*/
ReactDOM.render(<HashRouter>
  <StoreProvider store={store}>
    <Route component={App} />
  </StoreProvider>
</HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
