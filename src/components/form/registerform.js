import React, { Component } from 'react';
import { Form } from '@ant-design/compatible'
import { Input, Button, Checkbox, Row, Col } from 'antd'
import './registerform.less'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 6,
    },
  },
};

const agreementItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 5,
    },
  },
}

const RegisterForm = Form.create({ name: 'register_form'}) (
  class extends Component {
    render() {
      return (
        <div className="registerform">
          <div className="title">
            新用户注册
          </div>

          <div className="content">
          <Form
              {...formItemLayout}
              name="register-form"
              scrollToFirstError
            >
              <Form.Item
                className="item"
                name="username"
                label="用户名"
                rules={[
                  {
                    max: 12,
                    message: '用户名不能超过 12 个字符',
                  },
                  {
                    required: true,
                    message: '请输入用户名！',
                  },
                ]}
              >
                <Input placeholder="请输入用户名！" />
              </Form.Item>

              <Form.Item
                className="item"
                name="password"
                label="密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                  {
                    min: 6,
                    message: '密码不能小于 6 位'
                  },
                  {
                    max: 20,
                    message: '密码不能大于 20 位'
                  }
                ]}
                hasFeedback
              >
                <Input.Password placeholder="请输入密码！" />
              </Form.Item>

              <Form.Item
                className="item"
                name="confirm"
                label="确认密码"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: '请再次输入密码！',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('两次密码不一致，请检查！');
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="请再次输入密码！" />
              </Form.Item>

              <Form.Item
                className="item"
                name="telNumber"
                label="手机号"
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
                  }
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

              <Form.Item
                className="item agreement"
                name="agreement"
                rules={[
                  { validator:(_, value) => value ? Promise.resolve() : Promise.reject('需要同意服务协议才能进行下一步') },
                ]}
                {...agreementItemLayout}
              >
                <Checkbox>勾选同意<a href="">《用户服务协议》</a></Checkbox>
              </Form.Item>
              <Form.Item className="item" {...tailFormItemLayout}>
                <Button className="registerBtn" type="primary" htmlType="submit">
                  注册
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )
    }
  } 
)


export default RegisterForm;