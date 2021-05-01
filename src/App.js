import 'antd/dist/antd.css';
import { Login } from 'modules';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/panel">Panel</Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
