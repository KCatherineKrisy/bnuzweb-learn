import React, { Component } from 'react';
import BraftEditor from 'braft-editor'
import { connect } from 'dva'
import { Input, Button } from 'antd'
import 'braft-editor/dist/index.css'
import './NoteEdit.less'

class NoteEdit extends Component {
  state = {
    // 创建一个空的 editorState 作为初始值
    editorState: BraftEditor.createEditorState(null),
    title: '',
    type: 'edit'
  }

  async componentDidMount() {
    let type = this.props.match.params.type;
    let aid = this.props.match.params.aid;
    if(type === 'modify') {
      // 发起请求获取笔记内容
      // set 进 setstate
      await this.props.dispatch({
        type: 'user/getNoteDetailById',
        payload: {
          aid: aid
        }
      }).then(() => {
        this.setState({ 
          editorState: BraftEditor.createEditorState(this.props.noteDetail.content),
          title: this.props.noteDetail.title,
          type: type
        })
      })
    } else {
      if(type === 'edit') {
        this.setState({
          orgActivityId: aid,
        })
      }
    }
  }

  handleEditChange = (editorState) => {
    this.setState({ editorState });
  }

  submitContent =  async () => {
    const content = this.state.editorState.toHTML();
    if(this.state.type === 'modify') {
      let aid = this.props.match.params.aid;
      await this.props.dispatch({
        type: 'user/updateNote',
        payload: {
          content: content,
          id: parseInt(aid),
          orgActivityId: this.props.noteDetail.orgActivityId,
          title: this.state.title,
          type: 0
        }
      })
    } else {
      await this.props.dispatch({
        type: 'user/addNote',
        payload: {
          content: content,
          orgActivityId: this.state.orgActivityId,
          title: this.state.title,
          type: 0
        }
      })
    }
  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  render() {
    const { editorState, title } = this.state;

    return (
      <div className="NoteEdit">
        <div className="note-title">
          <Input className="note-title-input" value={title} onChange={this.handleTitleChange} placeholder="请输入标题" />
        </div>
        <BraftEditor
          className="note-content"
          value={editorState}
          onChange={this.handleEditChange}
          onSave={this.submitContent}
        />
        <Button className="submit-action" type="primary" onClick={this.submitContent}>发布</Button>
      </div>
    );
  }
}

export default connect( state => state.user )(NoteEdit);