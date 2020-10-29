import React, { Component } from 'react';
import './news-show.less'

/*
 * 首页新闻展示组件
 */
class NewsShow extends Component {
    render() {
        return (
            <div className="newsShow">
                <img src={this.props.pic} />
                <h2>{this.props.title}</h2>
            </div>
        );
    }
}

export default NewsShow;