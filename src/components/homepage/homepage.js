import React, { Component } from "react";
import { Carousel, Card, Row, Col, Button } from "antd";
import NewsShow from "../news-show/news-show";
import QuestionShow from "../question-show/question-show";
import "./homepage.less";

const { Meta } = Card;

class HomePage extends Component {
  componentWillMount() {
    // 获取机构团队数据
    const organizationList = [
      {
        name: "北京师范大学珠海分校",
        description: "我是北师珠",
      },
      {
        name: "吉林大学珠海学院",
        description: "我是吉珠",
      },
      {
        name: "北京理工大学珠海学院",
        description: "我是北理珠",
      },
    ];

    this.setState({
      organizationList,
    });
  }

  render() {
    const classType = [
      "全部课程",
      "科学",
      "地理",
      "文学",
      "历史",
      "艺术",
      "其他",
    ];
    const classList = [
      "科学",
      "地理",
      "文学",
      "历史",
      "艺术",
      "体育",
      "经济",
      "心理学",
    ];
    const moreButton = (
      <div className="more">
        <Button>更多</Button>
      </div>
    );

    return (
      <div className="home">
        <div className="photo">
          <Carousel autoplay dots={false}>
            <div>
              <img src={require("../../resource/assets/轮播图 1.jpg")} />
            </div>
            <div>
              <img src={require("../../resource/assets/轮播图 2.jpg")} />
            </div>
            <div>
              <img src={require("../../resource/assets/轮播图 3.jpg")} />
            </div>
          </Carousel>
        </div>

        <div className="all">
          <div className="all-classes">
            <ul>
              {classType.map((item, index) => {
                if (index == 0) return <li style={{ fontSize: 20 }}>{item}</li>;
                return <li>{item}</li>;
              })}
            </ul>
          </div>
          <div className="classes-list">
            <Row gutter="300">
              {classList.map((item) => (
                <Col span="3">
                  <Card
                    className="classes"
                    hoverable
                    style={{ width: 205, height: 150 }}
                    cover={
                      <img src={require(`../../resource/assets/${item}.jpg`)} />
                    }
                  >
                    <Meta
                      title={item}
                      style={{ textAlign: "center", marginTop: "-18px" }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          {moreButton}
        </div>

        {/* 需要从接口获取数据 */}
        <div className="hot">
          <h1>热门课程</h1>
          <div className="classes-list">
            <Row gutter="300">
              {classList.map((item) => (
                <Col span="3">
                  <Card
                    className="classes"
                    hoverable
                    style={{ width: 205, height: 150 }}
                    cover={
                      <img src={require(`../../resource/assets/${item}.jpg`)} />
                    }
                  >
                    <Meta
                      title={item}
                      style={{ textAlign: "center", marginTop: "-18px" }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          {moreButton}
        </div>

        <div className="organization">
          <h1>机构团队</h1>
          <div className="classes-list">
            <Row gutter="300">
              {this.state.organizationList.map((item) => (
                <Card
                  className="organization-list"
                  hoverable
                  style={{ width: 265, height: 256 }}
                  cover={
                    <img
                      src={require(`../../resource/assets/${item.name}.jpg`)}
                    />
                  }
                >
                  <Meta title={item.name} description={item.description} />
                </Card>
              ))}
            </Row>
          </div>
          {moreButton}
        </div>

        <div className="news_question">
          <div className="news">
            <h1>新闻资讯</h1>
            <div className="news-item">
              <NewsShow />
              <NewsShow />
              <NewsShow />
              <NewsShow />
              <NewsShow />
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
          <img
            src={require("../../resource/assets/关于我们.jpg")}
            width="547"
            height="347"
          />
          <div className="aboutus-word">
            <h2>关于我们</h2>
            <p>这里是一堆正文 很长很长的正文</p>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
