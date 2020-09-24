import React, { Component } from 'react';
import ClassCard from '../../components/class-card/class-card'
import { Select, Col, Row, Button, Pagination } from 'antd'
import './SearchClass.less'

const { Option } = Select;

class SearchClass extends Component {
  state = {
    indexList: [], // 当前页数展示的数据
    currentIndex: 0, // 当前页面
    totalPage: 0, // 总页数
  };

  render() {
    const type = ['知识科普', '自然观赏', '体验考察', '励志拓展'];
    const tag = ['科学', '文学', '人文', '历史', '艺术', '地理', '体育', '经济']; 
    const time = ['1~3 天', '3~5 天', '5~7 天', '7~15 天', '15~28 天', '28 天以上'];
    const provice = [
      {
        value: 'Guangdong',
        name: '广东省',
      },
      {
        value: 'Beijing',
        name: '北京市',
      },
      {
        value: 'Chongqing',
        name: '重庆市',
      },
      {
        value: 'HongKong',
        name: '香港特别行政区',
      },
      {
        value: 'Macao',
        name: '澳门特别行政区'
      },
    ];
    const city = [
      {
        value: 'Guangzhou',
        name: '广州市',
      },
      {
        value: 'Zhuhai',
        name: '珠海市',
      },
      {
        value: 'Shenzhen',
        name: '深圳市',
      },
      {
        value: 'Zhongshan',
        name: '中山市',
      },
      {
        value: 'Jiangmen',
        name: '江门市',
      },
    ];
    const classList = [
      {
        name: '课程名称',
        tag: '体验考察/人文历史',
        org: '机构名称',
      },
      {
        name: '课程名称',
        tag: '体验考察/人文历史',
        org: '机构名称',
      },
      {
        name: '课程名称',
        tag: '体验考察/人文历史',
        org: '机构名称',
      },
      {
        name: '课程名称',
        tag: '体验考察/人文历史',
        org: '机构名称',
      },
      {
        name: '课程名称',
        tag: '体验考察/人文历史',
        org: '机构名称',
      },
      {
        name: '课程名称',
        tag: '体验考察/人文历史',
        org: '机构名称',
      },
      {
        name: '课程名称',
        tag: '体验考察/人文历史',
        org: '机构名称',
      },
      {
        name: '课程名称',
        tag: '体验考察/人文历史',
        org: '机构名称',
      },
    ];
    return (
      <div className="searchClass">
        <div className="searchType">
          <ul>
            <li style={{ fontWeight: 'bold', fontSize: '18px'}}>类型</li>
            { type.map((item, index) => ( <li><a>{item}</a></li> )) }
          </ul>
          <ul>
            <li style={{ fontWeight: 'bold', fontSize: '18px'}}>标签</li>
            { tag.map((item, index) => ( <li><a>{item}</a></li> )) }
          </ul>
          <ul>
            <li style={{ fontWeight: 'bold', fontSize: '18px'}}>时长</li>
            { time.map((item, index) => ( <li><a>{item}</a></li> )) }
          </ul>
          <ul>
            <li style={{ fontWeight: 'bold', fontSize: '18px'}}>地点</li>
            <li>
              <Select defaultValue="中国">
                <Option value="china">中国</Option>
              </Select>
            </li>
            <li className="selectSite">
              <Select defaultValue="广东省">
                { provice.map((item, index) => ( <Option value={item.value}>{item.name}</Option> )) }
              </Select>
            </li>
            <li className="selectSite">
              <Select defaultValue="珠海市">
                { city.map((item, index) => ( <Option value={item.value}>{item.name}</Option> )) }
              </Select>
            </li>
          </ul>
        </div>
        <div className="searchList">
          <div className="searchList-body">
            <Row gutter="{[16, 24]}">
              {
                classList.map((item, index) => (
                  <Col span="6"><ClassCard name={item.name} tag={item.tag} org={item.org}/></Col>
                ))
              }
            </Row>
          </div>
          <div className="searchList-footer">
            <Pagination defaultCurrent={1} total={3}/>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchClass;