import React, { Component } from 'react';
import { Layout, Menu } from 'antd'
import { withRouter } from 'dva/router'
import { Route, Switch } from 'dva/router'
import { BookOutlined, CalculatorOutlined, FormOutlined } from '@ant-design/icons';
import { connect } from 'dva'
import NoteList from '../../components/note-list/note-list'
import ClassList from '../../components/class-list/class-list'
import OrderList from '../../components/order-list/order-list'
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
    let token = localStorage.getItem('bsyx-user-token');
    if(token) {
      this.props.dispatch({
        type: 'user/getUserDetail',
      }).then(() => {
        this.setState({
          user: this.props.user
        })
      })
    } else {
      this.props.history.push('/')
    }
  }

  // 跳轉到個人設置頁面
  handleLinkSetting = () => {
    this.props.history.push('/setting/personalInfo')
  }

  // 跳转到课程界面
  handleLinkClass = () => {
    this.props.history.push('/user/classlist')
  }

  handleLinkOrder = () => {
    this.props.history.push('/user/orderlist')
  }

  handleLinkNote = () => {
    this.props.history.push('/user/notelist')
  }

  render() {
    const { user, classDetail } = this.state;
    return (
      <div className="userIndex">
        <div className="userIndex-header">
          <div className="userIndex-header-left">
            <div className="user-icon"><img src={user.avatar} /></div>
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
                <Menu.Item key="/user/classlist" icon={<CalculatorOutlined />} onClick={this.handleLinkClass}>课程</Menu.Item>
                <Menu.Item key="/user/orderlist" icon={<FormOutlined />} onClick={this.handleLinkOrder}>订单</Menu.Item>
                <Menu.Item key="/user/notelist" icon={<BookOutlined />} onClick={this.handleLinkNote}>笔记</Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 60px', minHeight: 280, backgroundColor: 'white' }}>
              <Switch>
                <Route path='/user/classlist' component={ClassList} exact/>
                <Route path='/user/notelist' component={NoteList} exact/>
                <Route path='/user/orderlist' component={OrderList} exact />
              </Switch>
            </Content>
          </Layout>
        </div>
      </div>
    );
  }
}

export default connect( state => state.user )(UserInfo);