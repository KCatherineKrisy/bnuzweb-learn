import React, { Component } from 'react';
import ClassCard from '../../components/class-card/class-card'
import { Col, Row, Cascader } from 'antd'
import './SearchItem.less'
import { connect } from 'dva'

class SearchItem extends Component {
  state = {};

  componentDidMount() {
    console.log(this.props.match.params, 'params');
    this.props.dispatch({
      type: 'class/getSearchOpinion',
    })
  }

  // 點擊獲取標籤 id 進行查詢
  getLabelId = (e) => {
    let labelId = e.target.value;
    this.props.dispatch({
      type: 'class/searchClassItem',
      payload: {
        keywords: '',
        pageNo: this.props.pageNo,
        pageSize: this.props.pageSize,
        label: labelId
      }
    })
  }

  getSubjectId = (e) => {
    let subjectId = e.target.value;
    this.props.dispatch({
      type: 'class/searchClassItem',
      payload: {
        keywords: '',
        pageNo: this.props.pageNo,
        pageSize: this.props.pageSize,
        subject: subjectId
      }
    })
  }

  render() {
    const time = ['1~3 天', '3~5 天', '5~7 天', '7~15 天', '15~28 天', '28 天以上'];
    return (
      <div className="searchClass">
        <div className="searchType">
          <ul>
            <li style={{ fontWeight: 'bold', fontSize: '18px'}}>类型</li>
            { this.props.labelList.map((item, index) => ( <li value={item.id} onClick={this.getLabelId}>{item.name}</li> )) }
          </ul>
          <ul>
            <li style={{ fontWeight: 'bold', fontSize: '18px'}}>标签</li>
            { this.props.subjectList.map((item, index) => ( <li value={item.id} onClick={this.getSubjectId}>{item.name}</li> )) }
          </ul>
          <ul>
            <li style={{ fontWeight: 'bold', fontSize: '18px'}}>时长</li>
            { time.map((item, index) => ( <li>{item}</li> )) }
          </ul>
          <ul>
            <li style={{ fontWeight: 'bold', fontSize: '18px'}}>地点</li>
            <li className="selectSite">
              <Cascader options={this.props.regionTree} placeholder="请选择地区！"/>
            </li>
          </ul>
        </div>
        <div className="searchList">
        <span className="searchList-Num">总共{this.props.total}个结果</span>
          <div className="searchList-body">
            <Row gutter="{[16, 24]}">
              {
                (this.props.searchClassList || []).map((item, index) => (
                  <Col span="6"><ClassCard name={item.name} tag={item.tag} org={item.orgName}/></Col>
                ))
              }
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state.class)(SearchItem);