import 'antd/dist/antd.less';
import './theme/overrides.less';
import { Home, Login, Panel } from 'modules';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider, SuggestionsContextProvider } from './store';
import { PATHS } from './strings';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <SuggestionsContextProvider>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path={PATHS.LOGIN}>
                <Login />
              </Route>
              <Route path={PATHS.PANEL}>
                <Panel />
              </Route>
            </Switch>
          </SuggestionsContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
