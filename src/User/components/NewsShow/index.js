import React, { Component } from 'react';
import './index.less'

/*
 * 首页新闻展示组件
 */
class NewsShow extends Component {
    render() {
        return (
            <div className="newsShow">
                <img src={require('../../resource/assets/地理.jpg')} />
                <h2>我是一个资讯的题目</h2>
            </div>
        );
    }
}

export default NewsShow;