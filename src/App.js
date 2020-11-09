import React, { Component } from 'react';
import Header from './components/header/header'
import FooterItem from './components/footer/footer'
import { connect } from 'dva'
import { Router, Route, Switch } from 'dva/router'
import HomePage from './pages/homepage/homepage'
import SearchItem from './pages/SearchItem/SearchItem'
import UserInfo from './pages/UserInfo/UserInfo'
import UserSetting from './pages/UserSetting/UserSetting'
import ClassDetail from './pages/ClassDetail/ClassDetail'
import NotFound from './pages/NotFound/NotFound'
import OrgList from './pages/OrgList/OrgList'
import OrgDetail from './pages/OrgDetail/OrgDetail'
import NoteEdit from './pages/NoteEdit/NoteEdit'
import NoteDetail from './pages/NoteDetail/NoteDetail'
import NewsDetail from './pages/NewsDetial/NewsDetail'

class App extends Component {
  componentDidMount() {
    this.node.scrollTop = 0;
    this.props.dispatch({
      type: 'app/getLoginInfo',
      callback: (res) => {
        if(res.code === 40001) {
          localStorage.removeItem("bsyx-user-token");
          this.setState({})
        }
      }
    })
  }

  render() {
    return (
      <div ref={node => this.node = node}>
        <Header />
        <Switch>
          <Route path='/' component={HomePage} exact/>
          <Route path='/search/:type/:keywords' component={SearchItem} exact />
          <Route path='/ClassDetail/:id' component={ClassDetail} exact />
          <Route path='/OrgList' component={OrgList} exact />
          <Route path='/OrgDetail/:oid' component={OrgDetail} exact />
          <Route path='/NoteEdit/:type/:aid' component={NoteEdit} />
          <Route path='/NoteDetail/:aid' component={NoteDetail} />
          <Route path='/NewsDetail/:nid' component={NewsDetail} />
          <Route path='/setting' component={UserSetting} />
          <Route path='/user' component={UserInfo} />
          <Route component={NotFound} />
        </Switch>
        <FooterItem/>   
      </div>
    );
  }
}

export default connect( state => state.app )(App);