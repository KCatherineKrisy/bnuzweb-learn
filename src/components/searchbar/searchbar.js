import React, { Component } from 'react';
import { Input, Select, message } from 'antd'
import { connect } from 'dva'
import './searchbar.less'
import { withRouter } from 'dva/router';

const { Option } = Select;
const { Search } = Input;

@withRouter
class SearchBar extends Component {
  state = {
    keywords: '', // 關鍵詞
    type: 'class', // 查找类型
  }

  // 更新關鍵詞
  updateKeyword = (e) => {
    let keywords = e.target.value;
    this.setState({
      keywords: keywords
    })
  }

  // 獲取關鍵詞点击按钮查詢課程
  handleSearchClass = () => {
    if(!this.state.keywords) {
      message.error('搜索关键词不得为空！');
    } else {
      this.props.dispatch({
        type: 'class/searchClassItem',
        payload: {
          keywords: this.state.keywords,
          pageNo: this.props.pageNo,
          pageSize: this.props.pageSize,
          type: this.state.type,
          searchFuc: 'click'
        }
      }).then(() => {
        this.props.history.push(`/search/${this.state.type}/${this.state.keywords}`)
      })
    }
  }

  // 獲取關鍵詞查詢機構
  handleSearchOrg = () => {

  }

  // 修改查找类型
  handleChangeType = (value) => {
    this.setState({ type: value })
  }

  // 點擊查詢，判斷查詢類型
  handleSearchType = () => {
    if (this.state.type === 'class') {
      this.handleSearchClass();
    } else {
      this.handleSearchOrg();
    }
  }

  render() {
    const prefixSelector = (
      <Select defaultValue="class" onChange={this.handleChangeType}>
        <Option value="class">课程</Option>
        <Option value="organization">机构</Option>
      </Select>
    );
    return (
      <div className="search">
        <Search allowClear addonBefore={prefixSelector} placeholder="请输入关键词！" enterButton="Search" onChange={this.updateKeyword} onSearch={this.handleSearchType} />
      </div>
    );
  }
}

export default connect(state => state.class)(SearchBar);