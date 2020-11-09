import React, { Component } from 'react';
import './UserSetting.less'
import { withRouter, Route, Switch } from 'dva/router';
import { connect } from 'dva'
import PersonalInfo from '../../components/personalInfo/personalInfo'
import BindAccount from '../../components/bindAccount/bindAccount'

@withRouter
class UserSetting extends Component {
  state = {};

  componentDidMount() {
    let token = localStorage.getItem('bsyx-user-token');
    console.log(token)
    if(token) {
      return ;
    } else {
      this.props.history.push('/')
    }
  }

  handleLinkInfo = () => {
    this.props.history.push('/setting/personalInfo')
  }

  handleLinkBind = () => {
    this.props.history.push('/setting/bindAccount')
  }

  render() {
    const { user } = this.props;
    return (
      <div className="userSetting">
        <div className="userSetting-side">
          <div className="user-detail">
            <img src={user.avatar} width="120" height="120" />
            <div className="user-des">
              <span className="user-name">{user.name}</span>
              <span className="user-id">ID:{user.id}</span>
            </div>
          </div>
          <div className="accountManage">
            <span className="account_moduleName">账户管理</span>
            <div className="divider"></div>
            <div className="manageBtn">
              <span className="personalInfo" onClick={this.handleLinkInfo}>个人信息</span>
              <span className="accountBind" onClick={this.handleLinkBind}>账户绑定</span>
            </div>
          </div>
        </div>
        <div className="userSetting-content">
          <Switch>
            <Route path='/setting/personalInfo' component={PersonalInfo} />
            <Route path='/setting/bindAccount' component={BindAccount} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(state => state.user)(UserSetting);