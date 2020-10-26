import React, { Component } from 'react';
import { Button } from 'antd'

class NotFound extends Component {
  backToHome = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="notfound">
        <p>我们似乎找不到你正在访问的网页...</p>
        <p>请重试...</p>
        <Button type="primary" onClick={this.backToHome}>返回首页</Button>
      </div>
    );
  }
}

export default NotFound;