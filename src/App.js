import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ListaProdutos from './pages/ListaProdutos';
import Carrinho from './pages/Carrinho';
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
