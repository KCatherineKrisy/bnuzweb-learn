import React, { Suspense }  from 'react'
import { BrowserRouter, Route, Switch } from 'dva/router'
import App from './App'
import HomePage from './pages/homepage/homepage'
import SearchClass  from './pages/SearchClass/SearchClass'

const RouterConfig = (({ history }) => (
  <BrowserRouter history={history}>
    <Suspense fallback={( <div>Loading...</div> )}>
      <App>
        <Switch>
          <Route path='/' component={HomePage} exact/>
          <Route path='/search-class' component={SearchClass} />
        </Switch>
      </App>
    </Suspense>
  </BrowserRouter>
))

export default RouterConfig;