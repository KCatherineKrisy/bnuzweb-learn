import React, { Component } from 'react'
import { Modal } from 'antd'
import { connect } from 'dva'
import './header.less'
import LoginForm from '../form/loginform'
import RegisterForm from '../form/registerform'
import SearchBar from '../searchbar/searchbar'
import { withRouter } from 'dva/router'

@withRouter
class Header extends Component {
  state = {
    isLogin: false, // 是否已登录
    loginModalVisible: false, // 显示登录弹窗
  };

  componentDidMount() {
    this.getToken();
  }

  // 判斷是否存在 token
  getToken = () => {
    const token = localStorage.getItem('bsyx-user-token');
    if(token) {
      this.setState({
        isLogin: true
      })
    }
  }

  // 顯示登錄彈窗
  handleShowLogin = () => {
    this.setState({
      loginModalVisible: true
    })
  }

  // 隱藏登錄彈窗
  handleCloseLogin = () => {
     this.setState({
      loginModalVisible: false
     }, () => {
      this.getToken();
     })
  }

  handleCloseRegister = () => {
    this.props.dispatch({
      type: 'user/closeRegisterModal'
    })
  }

  // 返回到首页
  backToHome = () => {
    this.props.history.push('/')
  }

  // 机构列表
  goToOrgList = () => {
    this.props.history.push('/OrgList')
  }

  render() {
    return (
      <div className="header">
        <div className="header-left" onClick={this.backToHome}>
          <img src={require('../../resource/assets/北师研学-logo.png')} alt="北师研学"/>
          <h1>北师研学</h1>
        </div>

        <div className="header-middle">
          <SearchBar placeholder="请输入搜索内容" enterButton />
        </div>

        <div className="header-right">
          <span>热门好课</span>
          <span onClick={this.goToOrgList}>机构列表</span>
          <span>关于我们</span>
          {this.state.isLogin ? <img className="header-right_right" src={require('../../resource/assets/头像.jpg')} width="30px" height="30px" /> : <a className="header-right_right" onClick={this.handleShowLogin}>登录</a>}
        </div>
        
        <Modal
          visible={this.state.loginModalVisible} 
          title="" 
          footer="" 
          width="518px" 
          height="562px"
          onCancel={this.handleCloseLogin}
        >
          <LoginForm onClickLogin={this.handleCloseLogin}/>
        </Modal>

        <Modal
          visible={this.props.registerModalVisible} 
          title="" 
          footer="" 
          width="518px" 
          height="562px"
          onCancel={this.handleCloseRegister}
        >
          <RegisterForm />
        </Modal>
      </div>
    );
  }
}

export default connect(state => state.user)(Header);