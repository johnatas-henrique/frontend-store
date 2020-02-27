import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PagInicial from './pages/PagInicial';
import Carrinho from './pages/Carrinho';
import Checkout from './pages/Checkout';
import Product from './pages/Product';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={PagInicial} />
        <Route exact path="/carrinho" component={Carrinho} />
        <Route path="/carrinho/checkout" component={Checkout} />
        <Route path="/:id" component={Product} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
