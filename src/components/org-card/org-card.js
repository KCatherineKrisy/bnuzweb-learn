import React, { Component } from 'react';
import { withRouter } from 'dva/router' 
import './org-card.less'

@withRouter
class OrgCard extends Component {
  // 点击跳转到机构详情页
  goToOrgDetail = () => {
    console.log('test')
    this.props.history.push(`OrgDetail/${this.props.org.id}`)
  }

  render() {
    const { org } = this.props;
    return (
      <div className="orgCard" onClick={this.goToOrgDetail}>
        <div className="orgCard-left">
          <img src={org.busAvatar} />
          <div className="orgCard-middle">
            <span style={{ fontSize: '18px' }}>{org.busName}</span>
            <span>{org.legalPerson}</span>
            <span>{org.busDescribe}</span>
          </div>
        </div>
        <div className="orgCard-right">
          <span>{org.busCapital ? org.busCapital : '暫時無數據'}</span>
        </div>
      </div>
    );
  }
}

export default OrgCard;