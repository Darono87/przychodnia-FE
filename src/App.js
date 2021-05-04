import 'antd/dist/antd.less';
import './theme/overrides.less';
import { Login, Panel } from 'modules';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './store';
import { PATHS } from './strings';

const App = () => {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              Home
            </Route>
            <Route path={PATHS.LOGIN}>
              <Login />
            </Route>
            <Route path={PATHS.PANEL}>
              <Panel />
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
};

export default App;
