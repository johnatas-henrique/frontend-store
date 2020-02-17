import React from 'react';
import Carrinho from './pages/Carrinho';
import ListaProdutos from './pages/ListaProdutos';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ListaProdutos} />
        <Route path="/carrinho" component={Carrinho} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
