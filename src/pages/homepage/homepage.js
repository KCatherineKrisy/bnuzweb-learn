import React, { Component } from "react";
import { Carousel, Card, Button } from "antd";
import NewsShow from "../../components/news-show/news-show";
import QuestionShow from "../../components/question-show/question-show";
import "./homepage.less";
import { connect } from 'dva'
import { withRouter } from 'dva/router'

const { Meta } = Card;

@withRouter
class HomePage extends Component {
  state = {
    organizationList: [],
    labelList: [],
    newsList: []
  };

  componentDidMount() {
    // 获取机构团队数据
    this.props.dispatch({
      type: 'app/getOrgList',
      callback: (res) => {
        this.setState({
          organizationList: res.orgList.slice(0)
        })
      }
    })

    // 获取课程类型列表
    this.props.dispatch({
      type: 'app/getLabelList',
      payload: {
        num: 8
      },
      callback: (res) => {
        this.setState({
          labelList: res.label
        })
      }
    })

    // 获取新闻列表
    this.props.dispatch({
      type: 'app/getNewsList',
      payload: {
        num: 5
      },
      callback: (res) => {
        this.setState({
          newsList: res.label
        })
      }
    })
  }

  renderCardList = (list) => {
    return list.map((item, index) => (
      <div className="card" onClick={() => this.handleLinkSearchLabel(item)}>
        <Card
          hoverable
          style={{ width: 205, height: 150 }}
          cover={ <img src={item.picture} /> }
        >
          <Meta
            title={item.name}
            style={{ textAlign: "center", marginTop: "-18px" }}
          />
        </Card>
      </div>
    ))
  }

  renderOrgList = () => {
    return this.state.organizationList.map((item) => (
      <div className="organization-card" onClick={() => this.handleLinkOrgDetail(item)}>
        <Card
          hoverable
          style={{ width: 265, height: 256 }}
          cover={
            <img src={item.busAvatar} style={{ width: '265px', height: '155px'}} />
          }
        >
          <Meta title={item.busName} description={item.busDescribe} />
        </Card>
      </div>
    ))
  }

  // 点击标签跳转
  handleLinkSearchLabel = (item) => {
    this.props.history.push(`/search/label/${item.name}`)
  }

  // 点击机构跳转
  handleLinkOrgDetail = (item) => {
    this.props.history.push(`/OrgDetail/${item.id}`)
  }

  // 跳转到新闻详情
  handleLinkNewsDetail = (item) => {
    this.props.history.push(`/NewsDetail/${item.id}`)
  }
  
  // 跳转到机构列表
  handleLinkOrgList = () => {
    this.props.history.push('/OrgList')
  }

  // 点击更多标签跳转到搜索页
  handleLinkSearch = () => {
    this.props.history.push(`/search/label/${this.state.labelList[0].name}`)
  }

  render() {
    const { labelList, newsList } = this.state;
  

    return (
      JSON.stringify(labelList) !== "{}" ? (
        <div className="home">
          <div className="photo">
            <Carousel autoplay dots={false}>
              <div><img src={require("../../resource/assets/轮播图 1.jpg")} /></div>
              <div><img src={require("../../resource/assets/轮播图 2.jpg")} /></div>
              <div><img src={require("../../resource/assets/轮播图 3.jpg")} /></div>
            </Carousel>
          </div>

          <div className="all">
            <div className="all-classes">
              <ul>
                {
                  labelList.map((item, index) => {
                    return <li><a onClick={() => this.handleLinkSearchLabel(item)}>{item.name}</a></li>;
                  })
                }
              </ul>
            </div>
            <div className="cardList">
              {this.renderCardList(labelList)}
            </div>
            <div className="more"><Button onClick={this.handleLinkSearch}>更多</Button></div>
          </div>

          {/* 需要从接口获取数据 */}
          <div className="hot">
            <h1>热门课程</h1>
            <div className="cardList">
              {this.renderCardList(labelList)} 
            </div>
            <div className="more"><Button>更多</Button></div>
          </div>

          <div className="organization">
            <h1>机构团队</h1>
            <div className="cardList">
              {this.renderOrgList()}
            </div>
            <div className="more"><Button onClick={this.handleLinkOrgList}>更多</Button></div>
          </div>

          <div className="news_question">
            <div className="news">
              <h1>新闻资讯</h1>
              <div className="news-item">
                {
                  newsList.map((item, index) => (
                    <div onClick={() => this.handleLinkNewsDetail(item)}>
                    <NewsShow img={item.cover} title={item.title} />
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="question">
              <h1>常见问题</h1>
              <div className="question-item">
                <QuestionShow />
                <QuestionShow />
                <QuestionShow />
                <QuestionShow />
                <QuestionShow />
                <QuestionShow />
                <QuestionShow />
                <QuestionShow />
                <QuestionShow />
                <QuestionShow />
                <QuestionShow />
              </div>
            </div>
          </div>

          <div className="aboutus">
            <img src={require("../../resource/assets/关于我们.jpg")} width="547" height="347" />
            <div className="aboutus-word">
              <h2>关于我们</h2>
              <p>北师研学平台是一个专注于研学课程的平台，我们有大量优质研学机构的入驻，提供大量的优质研学课程。</p>
            </div>
          </div>
        </div>
      ) : ''
    );
  }
}

export default connect( state => state.app )(HomePage);
