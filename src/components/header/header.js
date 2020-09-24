import React, { Component } from 'react'
import { Modal } from 'antd'
import { connect } from 'dva'
import './header.less'
import LoginForm from '../form/loginform'
import RegisterForm from '../form/registerform'
import Search from '../search/search'

class Header extends Component {
  state = {
    isLogin: false, // 是否已登录
  };

  componentDidMount() {
    const token = localStorage.getItem('bsyx-user-token');
    if(token) {
      this.setState({
        isLogin: true
      })
    }
  }

  handleShowLogin = () => {
    this.props.dispatch({
      type: 'login/showLoginModal',
    })
  }

  handleCloseLogin = () => {
    this.props.dispatch({
      type: 'login/closeLoginModal'
    })
  }

  handleCloseRegister = () => {
    this.props.dispatch({
      type: 'login/closeRegisterModal'
    })
  }

  render() {
    return (
      <div className="header">
        <div className="header-left">
          <img src={require('../../resource/assets/北师研学-logo.png')} alt="北师研学"/>
          <h1>北师研学</h1>
        </div>

        <div className="header-middle">
          <Search placeholder="请输入搜索内容" enterButton />
        </div>

        <div className="header-right">
          <span>热门好课</span>
          <span>新上好课</span>
          <span>关于我们</span>
          {this.state.isLogin ? <img className="header-right_right" src={require('../../resource/assets/头像.jpg')} width="30px" height="30px" /> : <a className="header-right_right" onClick={this.handleShowLogin}>登录</a>}
        </div>
        
        <Modal
          visible={this.props.loginModalVisible} 
          title="" 
          footer="" 
          width="518px" 
          height="562px"
          onCancel={this.handleCloseLogin}
        >
          <LoginForm />
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

export default connect(state => state.login)(Header);