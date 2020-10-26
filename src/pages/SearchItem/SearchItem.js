import React, { Component } from 'react';
import ClassCard from '../../components/class-card/class-card'
import OrgCard from '../../components/org-card/org-card'
import { Cascader, Empty } from 'antd'
import './SearchItem.less'
import { connect } from 'dva'

class SearchItem extends Component {
  state = {};

  componentDidMount() {
    this.props.dispatch({
      type: 'class/getSearchOpinion',
    }).then(() => {
      let type = this.props.match.params.type; // 查找类型有三种，keywords、label、subject
      let keywords = this.props.match.params.keywords;
      if(type && keywords) {
        if(type === 'keywords') {
          this.props.dispatch({
            type: 'class/searchClassItem',
            payload: {
              keywords: keywords,
              pageNo: 1,
              pageSize: this.props.pageSize,
            }
          })
        } else if (type === 'label') {
          this.props.labelList && this.props.labelList.map((item) => {
            if(item.name === keywords) {
              this.props.dispatch({
                type: 'class/searchClassItem',
                payload: {
                  keywords: '',
                  label: item.id,
                  pageNo: 1,
                  pageSize: this.props.pageSize,
                }
              })
            }
          })
        } else {
          this.props.subjectList.map((item) => {
            if(item.name === keywords) {
              this.props.dispatch({
                type: 'class/searchClassItem',
                payload: {
                  keywords: '',
                  subject: item.id,
                  pageNo: 1,
                  pageSize: this.props.pageSize,
                }
              })
            }
          })
        }
      }
    })
  }

  // 點擊獲取標籤 id 進行查詢
  getLabelId = (e) => {
    let labelId = e.target.value;
    let label = e.target.getAttribute('data-label')
    this.props.dispatch({
      type: 'class/searchClassItem',
      payload: {
        keywords: '',
        pageNo: this.props.pageNo,
        pageSize: this.props.pageSize,
        label: labelId
      }
    })
    this.props.history.push(`/search/label/${label}`)
  }

  // 點擊獲取课程 id 進行查詢
  getSubjectId = (e) => {
    let subjectId = e.target.value;
    let subject = e.target.getAttribute('data-subject')
    this.props.dispatch({
      type: 'class/searchClassItem',
      payload: {
        keywords: '',
        pageNo: this.props.pageNo,
        pageSize: this.props.pageSize,
        subject: subjectId
      }
    })
    this.props.history.push(`/search/subject/${subject}`)
  }

  // 触底函数
  onScroll = () => {

  }


  render() {
    const time = ['1~3 天', '3~5 天', '5~7 天', '7~15 天', '15~28 天', '28 天以上'];
    const result = this.props.searchClassList ? (
      (this.props.searchClassList || []).map((item, index) => (
        <li><ClassCard classItem={item}/></li>
    ))) : ((this.props.searchOrgList || []).map((item, index) => (
        <li><OrgCard orgItem={item}/></li>
    )))

    return (
      <div className="searchClass">
        <div className="searchType">
          <ul>
            <li style={{ fontWeight: 'bold', fontSize: '18px'}}>类型</li>
            { this.props.labelList.map((item, index) => ( <li value={item.id} data-label={item.name} onClick={this.getLabelId}>{item.name}</li> )) }
          </ul>
          <ul>
            <li style={{ fontWeight: 'bold', fontSize: '18px'}}>标签</li>
            { this.props.subjectList.map((item, index) => ( <li value={item.id} data-subject={item.name} onClick={this.getSubjectId}>{item.name}</li> )) }
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
            {
              this.props.total === 0 ? ( <Empty className="dataEmpty"/> ) : result
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state.class)(SearchItem);