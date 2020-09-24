import React, { Component } from 'react';
import { Divider } from 'antd'
import './class-card.less'

class ClassCard extends Component {
  render() {
    const { name, tag, org } = this.props;
    return (
      <div className="classCard">
          <div className="content">
            <div className="content-left">
              <img src={require('../../resource/assets/书.png')} />
            </div>
            <div className="content-right">
              <div className="class_name">{name}</div>
              <div className="class_tag">{tag}</div>
              <div className="class_org">{org}</div>
            </div>
          </div>    
          <Divider className="divider" />
          <div className="footer">
            <div className="done">150人想上</div>
            <div className="collect">150人收藏</div>
          </div>
      </div>
    );
  }
}

export default ClassCard;
