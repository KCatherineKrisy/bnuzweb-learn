import React, { Suspense }  from 'react'
import { BrowserRouter, Route, Switch } from 'dva/router'
import App from './App'
import HomePage from './pages/homepage/homepage'
import SearchItem from './pages/SearchItem/SearchItem'
import UserInfo from './pages/UserInfo/UserInfo'
import UserSetting from './pages/UserSetting/UserSetting'
import ClassList from './components/class-list/class-list'
import PersonalInfo from './components/personalInfo/personalInfo'
import ClassDetail from './pages/ClassDetail/ClassDetail'

const RouterConfig = (({ history }) => (
  <BrowserRouter history={history}>
    <Suspense fallback={( <div>Loading...</div> )}>
      <App>
        <Switch>
          <Route path='/' component={HomePage} exact/>
          <Route path='/search/:type/:keywords' component={SearchItem} />
          <Route path='/ClassDetail/:id' component={ClassDetail} />
          <Route path='/setting/personalInfo'>
            <UserSetting>
              <Switch>
                <Route path='/setting/personalInfo' component={PersonalInfo} />
              </Switch>
            </UserSetting>
          </Route>
          <Route path='/user/classlist'>
            <UserInfo>
              <Switch>
                <Route path='/user/classlist' component={ClassList} />
              </Switch>
            </UserInfo>  
          </Route>
        </Switch>
      </App>
    </Suspense>
  </BrowserRouter>
))

export default RouterConfig;