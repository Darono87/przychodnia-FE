import 'antd/dist/antd.less';
import './theme/overrides.less';
import { Login, Panel } from 'modules';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './store';

const App = () => {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              Home
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/panel">
              <Panel />
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
};

export default App;
