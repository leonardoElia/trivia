import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Play from './Pages/play';
import Configuracoes from './Pages/configuracao';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/play" component={ Play } />
      <Route path="/configuracoes" component={ Configuracoes } />
    </Switch>
  );
}
