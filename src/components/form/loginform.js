import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd'
import { PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import './loginform.less'

class LoginForm extends Component {
	state = {
		mobile: '',
		password: ''
	}

	// 发送登录请求
	handleUserLogin = () => {
		const { mobile, password } = this.state;
		this.props.dispatch({
			type: 'login/login',
			payload: {
				mobile: mobile,
				password: password,
			},
		});
	}

	// 获取用户手机号
	handleGetUserMobile = e => {
		let mobile = e.target.value;
		this.setState({
			mobile
		})
	}

	// 获取用户密码
	handleGetUserPwd = e => {
		let password = e.target.value;
		this.setState({
			password
		})
	}

	// 打开注册窗口
	handleShowRegisterModal = () => {
		this.props.dispatch({
			type: 'login/showRegisterModal'
		})
	}

	render() {
		return (
			<div className="loginform">
				<div className="title">
					<div className="title_logo">
						<img src={require('../../resource/assets/北师研学-logo.png')} alt="" width="70" height="70" />
					</div>
					<div className="title_txt">北师研学</div>
				</div>
	
				<div className="content">
					<Form
						name="login-form"
						className="login-form"
					>
						<Form.Item
							name="mobile"
							rules={[{ required: true, message: '请输入您的手机号！' }]}
						>
							<Input 
								className="mobile"
								prefix={<PhoneOutlined className="site-form-item-icon" />} 
								placeholder="手机号" 
								onChange={this.handleGetUserMobile}
							/>
						</Form.Item>
	
						<Form.Item
							name="password"
							rules={[{ required: true, message: '请输入您的密码！' }]}
						>
							<Input
								className="password"
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="密码"
								onChange={this.handleGetUserPwd}
							/>
						</Form.Item>
	
						<div className="password_action">
							<Form.Item name="remember" noStyle>
								<Checkbox defaultChecked="true">记住我！</Checkbox>
							</Form.Item>
	
							<a className="login-form-forgot" href="">
								忘记密码
							</a>
						</div>
	
						<Form.Item className="login_action">
							<Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleUserLogin}>
								登录
							</Button>
						</Form.Item>
	
						<div className="register_action">
							<div>
								其他登录方式： 
								<img src={require('../../resource/assets/微信.png')} width="25px" height="25px" />
								<img src={require('../../resource/assets/支付宝.png')} width="25px" height="25px" />
								<img src={require('../../resource/assets/微博.png')} width="25px" height="25px" />
							</div>
							<a onClick={this.handleShowRegisterModal}>注册新用户</a>
						</div>
					</Form>
				</div>
			</div>
		)
	}
	 
}


export default connect(state => state.login)(LoginForm);