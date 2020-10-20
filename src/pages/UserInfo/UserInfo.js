import React, { Component } from 'react';
import { Layout, Menu } from 'antd'
import { withRouter } from 'dva/router'
import { BookOutlined, BellOutlined, CalculatorOutlined, FormOutlined } from '@ant-design/icons';
import { connect } from 'dva'
import './UserInfo.less'

const { Content, Sider } = Layout;

@withRouter
class UserInfo extends Component {
  state = {
    user: {},
    classDetail: {
      num: 42,
      comment: 10,
    },
  }

  // 獲取個人信息
  componentDidMount() {
    this.props.dispatch({
      type: 'user/getUserDetail',
    }).then(() => {
      this.setState({
        user: this.props.user
      })
    })
  }

  // 跳轉到個人設置頁面
  handleLinkSetting = () => {
    this.props.history.push('/setting/personalInfo')
  }

  render() {
    const { user, classDetail } = this.state;
    return (
      <div className="userIndex">
        <div className="userIndex-header">
          <div className="userIndex-header-left">
            <div className="user-icon">
              <img src={user.avatar} />
            </div>
            <div className="user-info">
              <span className="user-info_name">{user.nickname}</span>
              <span className="user-info_des">{user.sign}</span>
            </div>
          </div>

          <div className="userIndex-header-right">
            <div className="classDetail">
              <div className="classNum">
                <span className="num">{classDetail.num}</span>
                <span>参与课程</span>
              </div>
              <div className="commentNum">
                <span className="num">{classDetail.comment}</span>
                <span>评论</span>
              </div>
            </div>
            <div className="setUserBtn">
            <button onClick={this.handleLinkSetting}>个人设置</button>
            </div>
          </div>
        </div>

        <div className="userIndex-content">
          <Layout style={{ padding: '24px 0' }}>
            <Sider width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%' }}
              >
                <Menu.Item key="1" icon={<CalculatorOutlined />}>课程</Menu.Item>
                <Menu.Item key="2" icon={<BellOutlined />}>消息</Menu.Item>
                <Menu.Item key="3" icon={<FormOutlined />}>评论</Menu.Item>
                <Menu.Item key="4" icon={<BookOutlined />}>笔记</Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 60px', minHeight: 280, backgroundColor: 'white' }}>
              {this.props.children}
            </Content>
          </Layout>
        </div>
      </div>
    );
  }
}

export default connect( state => state.user )(UserInfo);