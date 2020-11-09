import React, { Component } from 'react';
import { connect } from 'dva'
import './class-list-item.less'

class ClassListItem extends Component {
  componentDidMount() {
    // console.log(this.props.classItem)
  }
  render() {
    const { classItem } = this.props;
    return (
      <div className="classListItem">
        <div className="item-left">
          <div className="class-icon">
            <img src={require('../../resource/assets/书.png')} width='70' height='70' />
          </div>
          <div className="class-detail">
            <span className="class-detail-name">{classItem.name}</span>
          </div>
        </div>
        <div className="item-right">
          <div className="org-name">{classItem.busName}</div>
          <div className="time">{classItem.gmtModified.split(' ')[0]}</div>
        </div>

      </div>
    );
  }
}

export default connect(state => state.class)(ClassListItem);