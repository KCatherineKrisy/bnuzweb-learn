import React, { Component } from 'react';
import './NoteDetail.less'
import { connect } from 'dva'
import { Divider } from 'antd'

class NoteDetail extends Component {
  state = {};

  componentDidMount() {
    let aid = this.props.match.params.aid;
    this.props.dispatch({
      type: 'user/getNoteDetailById',
      payload: {
        aid: aid,
      }
    }).then(() => {
      this.setState({ noteDetail: this.props.noteDetail })
    })
  }

  handleLinkClassDetail = () => {
    this.props.history.push(`/ClassDetail/${this.state.noteDetail.orgActivityId}`)
  }

  render() {
    const { noteDetail } = this.props;

    return (
      <div className="NoteDetail">
        <div className="NoteDetail-title">
          <h1>{noteDetail.title}</h1>
        </div>
        <div className="NoteDetail-message">
          <div className="NoteDetail-activityName">活动：<a onClick={this.handleLinkClassDetail}>{noteDetail.activityName}</a></div>
          <div className="NoteDetail-author">作者：随便啦</div>
        </div>
        <Divider />
        <div className="NoteDetail-content">
          <div dangerouslySetInnerHTML={{ __html: noteDetail.content }} />
        </div>
        <div className="NoteDetail-time">
          更新于：<span style={{ fontWeight: 'bold' }}>{noteDetail.gmtModified}</span>
        </div>
      </div>
    );
  }
}

export default connect( state => state.user )(NoteDetail);