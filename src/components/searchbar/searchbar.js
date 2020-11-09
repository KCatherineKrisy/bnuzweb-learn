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
    let url = this.props.location.pathname;
    let params = url.split('/');
    let type = params[params.length - 2];
    let keywords = decodeURIComponent(params[params.length - 1]);
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
      this.props.history.push(`/search/keywords/${this.state.keywords}`)
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