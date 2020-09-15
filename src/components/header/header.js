import React, { Component } from 'react'
import { Row, Col, Input, Modal } from 'antd'
import './header.less'
import LoginForm from '../form/loginform'
import RegisterForm from '../form/registerform'

const { Search } = Input

class Header extends Component {
  state = {
    loginVisible: false,
    registerVisible: true,
  }

  handleShowLogin = () => {
    this.setState({
      loginVisible: true,
    })
  }

  handleCloseLogin = () => {
    this.setState({
      loginVisible: false,
    })
  }

  handleCloseRegister = () => {
    this.setState({
      registerVisible: false,
    })
  }

  render() {
    return (
      <div className="header">
        <Row gutter="100" className="header-row">
          <Col span="4" className="header-left">
            <img src={require("../../resource/assets/北师研学-logo.png")} alt="北师研学"/>
            <h1>北师研学</h1>
          </Col>

          <Col span="10" className="header-middle">
            <Search placeholder="请输入搜索内容" enterButton className="search" />
          </Col>

          <Col span="10" className="header-right">
            <span>热门好课</span>
            <span>新上好课</span>
            <span>关于我们</span>
            <a onClick={this.handleShowLogin}>登录</a>
          </Col>
        </Row>
        
        <Modal
          visible={this.state.loginVisible} 
          title="" 
          footer="" 
          width="518px" 
          height="562px"
          onCancel={this.handleCloseLogin}
        >
          <LoginForm />
        </Modal>

        <Modal
          visible={this.state.registerVisible} 
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

export default Header;