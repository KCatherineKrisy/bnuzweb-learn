import React, { Suspense }  from 'react'
import { Router, Route } from 'dva/router'
import App from './App'


const RouterConfig = (({ history }) => (
  <Router history={history}>
    <Suspense fallback={( <div>Loading...</div> )}>
      <Route path='/' component={App} />
    </Suspense>
  </Router>
))

export default RouterConfig;