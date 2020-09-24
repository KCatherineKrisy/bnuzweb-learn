import React, { Component } from 'react';
import './class-list-item.less'

class ClassListItem extends Component {
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
            <span className="class-detail-tag">{classItem.tag}</span>
          </div>
        </div>
        <div className="item-right">
          <span className="org-name">{classItem.org}</span>
          <span className="time">{classItem.time}</span>
        </div>
      </div>
    );
  }
}

export default ClassListItem;