import React, { Component } from 'react';
import './NewsDetail.less'
import { Divider } from 'antd'
import { connect } from 'dva'

class NewsDetail extends Component {
  state = {};
  
  componentDidMount() {
    // 獲取新聞詳情頁消息
    let nid = this.props.match.params.nid;
    this.props.dispatch({
      type: 'org/getNewsDetail',
      payload: {
        nid: nid,
      }
    })
  }

  // 跳转到机构详情页
  handleLinkOrgDetail = () => {
    this.props.history.push(`/OrgDetail/${this.props.newsDetail.orgId}`)
  }

  render() {
    const { newsDetail } = this.props;

    return (
      <div className="NewsDetail">
        <div className="NewsDetail-title">
          <h1>{newsDetail.title}</h1>
        </div>
        <div className="NewsDetail-message">
          <div className="NewsDetail-org">机构：<a onClick={this.handleLinkOrgDetail}>{newsDetail.busName}</a></div>
          <div className="NewsDetail-time">发布时间：<span style={{ fontWeight: 'bold' }}>{newsDetail.gmtModified ? newsDetail.gmtModified.split(' ')[0] : ''}</span></div>
        </div>
        <Divider />
        <div className="NewsDetail-content">
          <div dangerouslySetInnerHTML={{ __html: newsDetail.content }} />
        </div>
      </div>
    );
  }
}

export default connect( state => state.org )(NewsDetail);