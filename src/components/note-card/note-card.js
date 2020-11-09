import React, { Component } from 'react';
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import './note-card.less'
import { withRouter } from 'dva/router';

@withRouter
class NoteCard extends Component {
  handleLinkNoteDetail = () => {
    this.props.history.push(`/NoteDetail/${this.props.item.id}`)
  }

  render() {
    const { item } = this.props;

    return (
      <div className="NoteCard" onClick={this.handleLinkNoteDetail}>
        <div className="userAvatar">
          <Avatar size={64} icon={<UserOutlined />} />
        </div>
        <div className="noteDetail">
          <div className="noteTitle">{item.title}</div>
        </div>
      </div>
    );
  }
}

export default NoteCard;