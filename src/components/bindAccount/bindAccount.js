import React, { Component } from 'react';
import { Button, Modal, Form, Input, Row, Col } from 'antd'
import { connect } from 'dva'
import './bindAccount.less'

class BindAccount extends Component {
  state = {
    showMobileInfo: true, // 手机绑定提示框
    showMobileBind: false, // 手机改棒提示框
    showPwdInfo: false, // 密码修改提示框
  }

  // 获取用户信息
  componentDidMount() {
    this.getUserInfo()
  }

  // 获取个人信息数据
  getUserInfo = () => {
    this.props.dispatch({
      type: 'user/getUserDetail',
    }).then(() => {
      this.setState({
        user: this.props.user
      })
    })
  }

  handleShowMobileInfo = () => {
    this.setState({
      showMobileInfo: true
    })
  }

  handleCloseMobileInfo = () => {
    this.setState({
      showMobileInfo: false
    })
  }

  handleShowMobileAction = () => {
    this.setState({
      showMobileInfo: false,
      showMobileBind: true
    })
  }

  handleCloseMobileAction = () => {
    this.setState({
      showMobileBind: false
    })
  }

  handleShowPwdAction = () => {
    this.setState({
      showPwdInfo: true
    })
  }

  handleClosePwdAction = () => {
    this.setState({
      showPwdInfo: false
    })
  }

  handleCheckTpl = (rule, value, callback) => {
    try {
      if (value.mobileNum) {
          if (value.mobileNum.length !== 11) {
            callback('请输入正确的手机号码');
          } else {
            callback();
          }
      }else{
        callback(); 
      }
    } catch (err) {
      callback();
    }
  }

  render() {
    const { user } = this.props;

    return (
      <div className="bindAccount">
        <div className="header-title">
          <h2>个人信息</h2>
        </div>

        <div className="divider" />

        <div className="bind">
          <div className="bind-left">
            <div className="bind-icon">
              <img src={require('../../resource/assets/手机.png')} width="60px" height="60px" />
            </div>
            <div className="bind-content">
              <div>手机</div>
              <div>使用手机号和密码登录平台</div>
            </div>
          </div>
          <div className="bind-action">
            <Button style={{ borderRadius: '5px' }} onClick={this.handleShowMobileInfo}>操作</Button>
          </div>
        </div>

        <div className="divider" />

        <div className="bind">
          <div className="bind-left">
            <div className="bind-icon">
              <img src={require('../../resource/assets/密码.png')} width="60px" height="60px" />
            </div>
            <div className="bind-content">
              <div>密码</div>
              <div>用于账户登录和保护账户信息安全</div>
            </div>
          </div>
          <div className="bind-action">
            <Button style={{ borderRadius: '5px' }}>操作</Button>
          </div>
        </div>

        {
          JSON.stringify(user) !== "{}" ? (
            <Modal
              visible={this.state.showMobileInfo}
              onCancel={this.handleCloseMobileInfo}
              footer=""
            > 
              <div style={{ fontWeight: 'bold' }}>当前您绑定的手机号：{user.mobile}</div>
              <div style={{ marginTop: '20px', width: '400px' }}>绑定手机号可以方便您使用平台提供的功能，一个手机号只能绑定到一个账号.</div>
              <div style={{ margin: '0 auto', marginTop: '20px', display: 'flex', 'justifyContent': 'space-between', width: '300px' }}>
                <Button>解除手机绑定</Button>
                <Button type="primary" onClick={this.handleShowMobileAction}>更换绑定手机</Button>
              </div>
            </Modal>
          ) : ""
        }

        <Modal
          visible={this.state.showMobileBind}
          onCancel={this.handleCloseMobileAction}
          footer=""
        >
          <>
            <Form.Item 
              label="手机号" 
              name="mobileNum"
              hasFeedback 
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  type: Number,
                  message: '手机号无效！'
                },
                {
                  len: 13,
                  message: '位数不符，请检查！'
                },
                { validator: this.handleCheckTpl }
              ]}
            >
              <Input placeholder="请输入手机号！" />
            </Form.Item>

            <Form.Item className="item" label="验证码" extra="我们必须检查您不是机器人!">
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[{ required: true, message: '请输入您收到的验证码！' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Button>获取验证码</Button>
                </Col>
              </Row>
            </Form.Item>
          </>
        </Modal>
      </div>
    );
  }
}

export default connect( state => state.user )(BindAccount);