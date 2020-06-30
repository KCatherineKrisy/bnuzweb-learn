import React, { Component } from 'react'
import { Row, Col, Input } from 'antd'
import './index.less'

const { Search } = Input

class Header extends Component {
    render() {
        return (
            <div className="header">
                <Row gutter="100" className="header-row">
                    <Col span="4" className="header-left">
                        <img src={require("../../resource/assets/北师研学-logo.png")} alt="北师研学"/>
                        <h1>北师研学</h1>
                    </Col>

                    <Col span="10" className="header-middle">
                        <Search placeholder="请输入搜索内容" enterButton className="search" />
                    </Col>

                    <Col span="10" className="header-right">
                        <span>热门好课</span>
                        <span>新上好课</span>
                        <span>关于我们</span>
                        <a>登录</a>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Header;