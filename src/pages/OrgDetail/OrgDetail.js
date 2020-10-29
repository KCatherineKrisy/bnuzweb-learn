import React, { Component } from 'react'
import { Carousel, Divider } from 'antd'
import NewsShow from "../../components/news-show/news-show";
import { connect } from 'dva'
import './OrgDetail.less'

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
              <div className="organization_capital">{orgDetail.describe.busCapital}</div>
            </div>
          </div>

          <div className="Org_carousel">
            {/* <Carousel autoplay>
              {
                orgDetail.coverList.map((item, index) => (
                  <div><img src={item.pic} /></div>
                ))
              }
            </Carousel> */}
            <Carousel>
              <div><h3 style={{ height: '320px', color: '#fff', lineHeight: '160px', textAlign: 'center', background: '#364d79' }}>1</h3></div>
              <div><h3 style={{ height: '320px', color: '#fff', lineHeight: '160px', textAlign: 'center', background: '#364d79' }}>2</h3></div>
              <div><h3 style={{ height: '320px', color: '#fff', lineHeight: '160px', textAlign: 'center', background: '#364d79' }}>3</h3></div>
            </Carousel>
          </div>

          <div className="Org_legal">
            <div className="legalPerson">法人：{orgDetail.describe.legalPerson}</div>
            <div className="legalPerson_Phont">联系方式：13168440588</div>
          </div>

          <Divider />

          <div className="Org_classList">
            <h3>课程</h3>
            <div>这里可以写课程名称，用户点击之后跳转到对应的课程详细页面，如果课程已经不存在，弹出提示告诉用户课程已经删除</div>
            <div>这里可以写课程名称，用户点击之后跳转到对应的课程详细页面，如果课程已经不存在，弹出提示告诉用户课程已经删除</div>
            <div>这里可以写课程名称，用户点击之后跳转到对应的课程详细页面，如果课程已经不存在，弹出提示告诉用户课程已经删除</div>
            <div>这里可以写课程名称，用户点击之后跳转到对应的课程详细页面，如果课程已经不存在，弹出提示告诉用户课程已经删除</div>
            <div>这里可以写课程名称，用户点击之后跳转到对应的课程详细页面，如果课程已经不存在，弹出提示告诉用户课程已经删除</div>
          </div>

          <div className="Org_newsList">
            <h3>资讯</h3>
            {
              orgDetail.newsList.map((item, index) => (
                <NewsShow pic={item.cover} title={item.title} />
              ))
            }
          </div>
        </div>
      ) : ''
    );
  }
}

export default connect(state => state.org)(OrgDetail);