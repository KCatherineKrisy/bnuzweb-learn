import React, { Component } from 'react';
import './org-card.less'

class OrgCard extends Component {
  render() {
    return (
      <div className="orgCard">
        <div className="orgCard-left">
          <img src={this.props.org.pic} />
        </div>
        <div className="orgCard-middle">
          <span>{this.props.org.name}</span>
          <span>{this.props.org.address}</span>
          <span>{this.props.org.des}</span>
        </div>
        <div className="orgCard-right">
          <span>{this.props.org.grade}</span>
        </div>
      </div>
    );
  }
}

export default OrgCard;