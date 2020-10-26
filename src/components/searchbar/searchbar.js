import React, { Component } from 'react';
import { Input, message } from 'antd'
import { connect } from 'dva'
import './searchbar.less'
import { withRouter } from 'dva/router';

const { Search } = Input;

@withRouter
class SearchBar extends Component {
  state = {
    keywords: '', // 關鍵詞
  }

  componentDidMount() {
    let keywords = this.props.match.params.keywords;
    let type = this.props.match.params.type;
    console.log(this.props.match.url, 'this.props.match.url')
    if(type === 'keywords') {
      this.setState({ keywords: keywords })
    }
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
        this.props.history.push(`/search/keywords/${this.state.keywords}`)
      })
    }
  }

  render() {
    return (
      <div className="search">
        <Search allowClear placeholder="请输入关键词！" enterButton="Search" value={this.state.keywords} onChange={this.updateKeyword} onSearch={this.handleSearchClass} />
      </div>
    );
  }
}

export default connect(state => state.class)(SearchBar);