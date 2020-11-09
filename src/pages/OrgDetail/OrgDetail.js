import React, { Component } from 'react'
import { Carousel, Divider, Card } from 'antd'
import { connect } from 'dva'
import { withRouter } from 'dva/router'
import './OrgDetail.less'

const { Meta } = Card;

@withRouter
class OrgDetail extends Component {
  state = {
    oid: '', // 机构 id
  }

  componentDidMount() {
    let oid = this.props.match.params.oid;
    this.setState({ oid: oid }, () => {
      this.props.dispatch({
        type: 'org/getOrgDescribe',
        payload: {
          oid: oid
        }
      })
    })
  }

  // 点击轮播图跳转
  handleLinkActivity = (url) => {
    this.props.history.push(url);
  }

  // 点击新闻跳转
  handleLinkNewsDetail = (id) => {
    this.props.history.push(`/NewsDetail/${id}`)
  }
  
  // 点击课程跳转
  handleLinkClassDetail = (id) => {
    this.props.history.push(`/ClassDetail/${id}`)
  }

  render() {
    const { orgDetail } = this.props;

    return (

      JSON.stringify(orgDetail) !== "{}" ? (
        <div className="OrgDetail">
          <div className="Org_header">
            <div className="Org_header-left">
              <div className="organization_name">{orgDetail.describe.busName}</div>
              <div className="organization_describe">{orgDetail.describe.busDescribe}</div>
            </div>

            <div className="Org_header-right">
              <div className="organization_buildTime">成立时间：{orgDetail.describe.busBuildTime}</div>
            </div>

          </div>

          <div className="Org_carousel">
            <Carousel autoplay effect="fade">
              {
                orgDetail.coverList.map((item, index) => (
                  <div>
                    <img src={item.pic} style={{ height: '600px', width: '1200px' }} onClick={() => this.handleLinkActivity(item.url)}/>
                  </div>
                ))
              }
            </Carousel> 
          </div>

          <div className="Org_legal">
            <div className="legalPerson">
              <div>法人：{orgDetail.describe.legalPerson}</div>
              <div>联系方式：13168440588</div>
            </div>
            <div className="legalPerson_photo">
              <img src={orgDetail.describe.legalPersonPic} width="90px" height="120px" />
            </div>
          </div>

          <Divider />

          <div className="Org_classList">
            <h3>课程</h3>
            <div><a>这里可以写课程名称，用户点击之后跳转到对应的课程详细页面，如果课程已经不存在，弹出提示告诉用户课程已经删除</a></div>
            <div><a>这里可以写课程名称，用户点击之后跳转到对应的课程详细页面，如果课程已经不存在，弹出提示告诉用户课程已经删除</a></div>
            <div><a>这里可以写课程名称，用户点击之后跳转到对应的课程详细页面，如果课程已经不存在，弹出提示告诉用户课程已经删除</a></div>
            <div><a>这里可以写课程名称，用户点击之后跳转到对应的课程详细页面，如果课程已经不存在，弹出提示告诉用户课程已经删除</a></div>
            <div><a>这里可以写课程名称，用户点击之后跳转到对应的课程详细页面，如果课程已经不存在，弹出提示告诉用户课程已经删除</a></div>         
          </div>

          <div className="Org_newsList">
            <h3>资讯</h3>
            <div className="Org_newsList-body">
              {
                orgDetail.newsList.map((item, index) => {
                  return (
                    <div className="news-card" onClick={() => this.handleLinkNewsDetail(item.id)}>
                      <Card
                        hoverable
                        style={{ width: 240, height: 160 }}
                        cover={<img alt={item.title} src={item.cover} />}
                        bordered
                      >
                        <Meta title={item.title} style={{ textAlign: "center", marginTop: "-18px" }} />
                      </Card>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      ) : ''
    );
  }
}

export default connect(state => state.org)(OrgDetail);