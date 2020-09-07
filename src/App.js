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
        <Route exact path="/frontend-store/" component={PagInicial} />
        <Route exact path="/frontend-store/carrinho" component={Carrinho} />
        <Route path="/frontend-store/carrinho/checkout" component={Checkout} />
        <Route path="/frontend-store/products/:id_of_product" component={Product} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
