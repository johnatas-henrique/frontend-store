import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ListaProdutos from './pages/ListaProdutos';
import Carrinho from './pages/Carrinho';
import DetalheProduto from './pages/DetalheProduto';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ListaProdutos} />
        <Route exact path="/carrinho" component={Carrinho} />
        <Route path="/carrinho/:id" component={DetalheProduto} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
