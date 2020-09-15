import React from 'react';
import Home from './pages/home/home'
import { Route, Switch, HashRouter } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path='/' component={Home} exact />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}

export default App;
