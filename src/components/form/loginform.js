import React, { Component } from 'react';
import { Form } from '@ant-design/compatible'
import { Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './loginform.less'

const LoginForm = Form.create({ name: 'login_form'}) (
	class extends Component {
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
							initialValues={{ remember: true }}
						>
							<Form.Item
								name="username"
								rules={[{ required: true, message: '请输入您的用户名！' }]}
							>
								<Input 
								  className="username"
									prefix={<UserOutlined className="site-form-item-icon" />} 
									placeholder="用户名" 
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
								<Button type="primary" htmlType="submit" className="login-form-button">
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
								<a>注册新用户</a>
							</div>
						</Form>
					</div>
				</div>
			)
		}
	}
)

export default LoginForm;