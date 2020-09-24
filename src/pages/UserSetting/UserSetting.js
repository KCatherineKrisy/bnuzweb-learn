import React, { Component } from 'react';
import { Divider } from 'antd';
import './UserSetting.less'

class UserSetting extends Component {
  state = {
    user: {
      id: 123456,
      name: 'janette',
      url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600933551900&di=c97bb7c3d2f64f55d451c9e1ad6dcc76&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201712%2F19%2F20171219234358_VRdrH.thumb.700_0.jpeg",
    },
  };

  render() {
    const { user } = this.state;
    return (
      <div className="userSetting">
        <div className="userSetting-side">
          <div className="user-detail">
            <img src={user.url} width="120" height="120" />
            <div className="user-des">
              <span className="user-name">{user.name}</span>
              <span className="user-id">ID:{user.id}</span>
            </div>
          </div>
          <div className="accountManage">
            <span className="account_moduleName">账户管理</span>
            <Divider width="200px" style={{ color: '#797979' }}/>
            <div className="manageBtn">
              <span>个人信息</span>
              <span>账户绑定</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSetting;