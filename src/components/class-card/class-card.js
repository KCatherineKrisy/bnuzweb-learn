import React, { Component } from 'react';
import { Divider } from 'antd'
import { connect } from 'dva'
import { get } from 'loader';
import './class-card.less'
import { withRouter } from 'dva/router';

@withRouter
class ClassCard extends Component {
  state = {};

  componentDidMount() {
    let label = ''
    let subject = ''
    let address = ''
    // eslint-disable-next-line array-callback-return
    this.props.labelList.map((item) => {
      if(item.id === this.props.classItem.label) {
        label = item.name
      }
    })
    // eslint-disable-next-line array-callback-return
    this.props.subjectList.map((item) => {
      if(item.id === this.props.classItem.subject) {
        subject = item.name
      }
    })
    this.setState({ label, subject })
  }

  // 点击具体课程跳转
  goToClassDetail = () => {
    let id = this.props.classItem.id;
    this.props.history.push(`/ClassDetail/${id}`);
  }

  render() {
    const { classItem } = this.props;
    const { label, subject } = this.state;

    return (
      <div className="classCard">
        <div className="content" onClick={this.goToClassDetail}>
          <div className="content-left">
            <img src={require('../../resource/assets/书.png')} />
          </div>
          <div className="content-right">
            <div className="class_name">{classItem.name ? classItem.name : ''}</div>
            {label ? <div className="class_tag">{label}/{subject}</div> : ''}
            <div className="class_org">{classItem.orgName}</div>
          </div>
        </div>    
        <Divider className="divider" />
        <div className="footer">
          <div className="class_address">150人想上</div>
          <div className="class_price">¥{classItem.price}</div>
        </div>
      </div>
    );
  }
}

export default connect(state => state.class)(ClassCard);
