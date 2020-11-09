import React, { Component } from 'react';
import { Modal } from 'antd'
import { connect } from 'dva'
import './note-list-item.less'
import { withRouter } from 'dva/router'

@withRouter
class NoteListItem extends Component {
  state = {
    activityName: ''
  }

  // 删除笔记
  handleDeleteNote = (e) => {
    let that = this;
    e.stopPropagation();
    Modal.confirm({
      title: '您确认删除该笔记吗？',
      onOk() {
        that.props.dispatch({
          type: 'user/deleteNote',
          payload: {
            note_id: that.props.noteItem.id,
          }
        })
      },
      onCancel() {}
    })
  }

  // 修改笔记
  handleModifyNote = (e) => {
    e.stopPropagation();
    this.props.history.push(`/NoteEdit/modify/${this.props.noteItem.id}`)
  }

  // 跳转到笔记详情页面
  handleShowNoteDetail = () => {
    this.props.history.push(`/NoteDetail/${this.props.noteItem.id}`)
  }

  render() {
    const { noteItem } = this.props;

    return (
      <div className="note-list-item" onClick={this.handleShowNoteDetail}>
        <div className="note-list-item-left">
          <div className="note-title"><h3>{noteItem.title}</h3></div>
          <div className="note-activity-name">{noteItem.activityName}</div>
        </div>
        <div className="note-list-item-right">
          <div className="note-modify-time">
            {noteItem.gmtModified.split(' ')[0]}
          </div>
          <div className="action">  
            <img src={require('../../resource/assets/修改.png')} width='20' height='20' onClick={this.handleModifyNote} />
            <img src={require('../../resource/assets/删除.png')} width='20' height='20' onClick={this.handleDeleteNote} />
            </div>
        </div>
      </div>
    );
  }
}

export default connect( state => state.user )(NoteListItem);