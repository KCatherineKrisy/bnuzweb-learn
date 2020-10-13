import React, { Component } from 'react';
import { Button, Modal, Form, Input, Cascader, Radio } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { connect } from 'dva'
import './personalInfo.less'

class PersonalInfo extends Component {
  formRef = React.createRef();

  state = {
    user: {},
    showUpdateInfoModal: false, // 修改信息 Modal
    btnDisable: false, // 表单按钮是否可用
  }

  // 获取用户信息
  componentDidMount() {
    this.getUserInfo()
  }

  // 获取个人信息数据
  getUserInfo = () => {
    let that = this;
    this.props.dispatch({
      type: 'user/getUserDetail',
    }).then(() => {
      that.setState({
        user: that.props.user
      })
    })
  }

  // 判断表单是否修改过
  formIsChanged = async () => {
    const { user } = this.state;
    const values = await this.formRef.current.validateFields();
    if(values.nickname === user.nickname && values.sex === user.sex && values.age === user.age && values.sign === user.sign) {
      this.setState({
        btnDisable: false
      })
    } else {
      this.setState({
        btnDisable: true
      })
    }
  }

  // 提交表單
  handleFinishForm = async () => {
    const { user } = this.state;
    const that = this;
    try {
      const values = await this.formRef.current.validateFields();
      this.props.dispatch({
        type: 'user/updateUserDetail',
        payload: {
          id: user.id,
          nickname: values.nickname || user.nickname,
          sex: values.sex || user.sex,
          age: values.age || user.age,
          sign: values.sign || user.sign
        }
      }).then(() => {
        that.setState({
          showUpdateInfoModal: false,
        })
        this.getUserInfo()
      })
    } catch (errorInfo) {
      Modal.error({
        title: '表单提交出错',
        content: '哎呀出错了，请重试！'
      })
    }
  }

  // 重置表单
  handleResetForm = () => {
    this.formRef.current.resetFields();
  }

  // 顯示信息更新錶格
  showUpdateInfoModal = () => {
    this.setState({
      showUpdateInfoModal: true,
    })
  }

  // 隱藏信息更新表格
  closeUpdateInfoModal = () => {
    this.setState({
      showUpdateInfoModal: false,
    })
  }

  render() {
    const { user } = this.state;

    return (
      <div className="personalInfo">
        <div className="personalInfo-header">
          <div className="header-title">
            <h2>个人信息</h2>
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={this.showUpdateInfoModal} />
          </div>
          <div className="divider"></div>
        </div>
        <div className="personalInfo-content">
          <div className="content-body">
            <span className="title">用户名</span>
            <span className="content">{user.nickname}</span>
          </div>
          <div className="content-body">
            <span className="title">性别</span>
            <span className="content">{user.sex === 1 ? '女' : '男'}</span>
          </div>
          <div className="content-body">
            <span className="title">年龄</span>
            <span className="content">{user.age}</span>
          </div>
          <div className="content-body">
            <span className="title">签名</span>
            <span className="content">{user.sign}</span>
          </div>
        </div>

        <Modal 
          visible={this.state.showUpdateInfoModal}
          onCancel={this.closeUpdateInfoModal}
          title="" 
          footer="" 
        >
          <Form 
            name="updateUserInfo" 
            ref={this.formRef}
            className="updateInfoModal"
            initialValues={{ 
              nickname: user.nickname,
              sex: user.sex,
              age: user.age,
              sign: user.sign
            }}
          >
            <Form.Item label="昵称" name="nickname">
                <Input onChange={this.formIsChanged} />  
            </Form.Item>
            <Form.Item label="性别" name="sex">
              <Radio.Group onChange={this.formIsChanged}>
                <Radio value={1}>女</Radio>
                <Radio value={2}>男</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="年龄" name="age">
              <Input onChange={this.formIsChanged} />
            </Form.Item>
            <Form.Item label="签名" name="sign">
              <Input maxLength={20} onChange={this.formIsChanged} />
            </Form.Item>
          </Form>
          <Button onClick={this.handleResetForm}>重置</Button>
          <Button type="primary" onClick={this.handleFinishForm} disabled={!this.state.btnDisable}>提交</Button>
        </Modal>
      </div>
    );
  }
}

export default connect( state => state.user )(PersonalInfo);