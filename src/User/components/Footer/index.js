import React, { Component } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

class FooterItem extends Component {
    render() {
        return (
            <div className="footer">
                <Footer style={{ textAlign: 'center' }}>网站首页  |  帮助中心  |  联系我们  |  客户服务  |  隐私政策  |  广告服务  |  意见反馈 <br />北师研学平台，助你更好的成长</Footer>
            </div>
        );
    }
}

export default FooterItem;