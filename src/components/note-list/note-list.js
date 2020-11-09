import React, { Component } from 'react';
import NoteListItem from '../note-list-item/note-list-item'
import { connect } from 'dva'

class NoteList extends Component {
  state = {
    noteList: []
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'user/getNoteList'
    })
  }

  render() {
    return (
      <div>
        {
          this.props.noteList.map((item) => (
            <NoteListItem noteItem={item} />
          ))
        }
      </div>
    );
  }
}

export default connect( state => state.user )(NoteList);