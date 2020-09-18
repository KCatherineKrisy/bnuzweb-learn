import React, { Component } from 'react';
import { Input, Button } from 'antd'
import './search.less'

class Search extends Component {
  render() {
    return (
      <div className="search">
        <Input className="search-input" placeholder="请输入关键词！" />
        <Button className="search-btn" type="primary">搜索</Button>
      </div>
    );
  }
}

export default Search;