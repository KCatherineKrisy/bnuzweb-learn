import React, { Component } from 'react';
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import './note-card.less'

class NoteCard extends Component {
  render() {
    return (
      <div className="NoteCard">
        <div className="userAvatar">
          <Avatar size={64} icon={<UserOutlined />} />
        </div>
        <div className="noteDetail">
          <div className="userName">陈东鑫</div>
          <div className="noteTitle">
            笔记的标题
          </div>
        </div>
      </div>
    );
  }
}

export default NoteCard;