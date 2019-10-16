import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import App from './App';
import Items from './pages/Items';
import ItemDetail from './pages/ItemDetail';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/items" exact={true} component={Items} />
      <Route path="/items/:id" exact={true} component={ItemDetail} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
