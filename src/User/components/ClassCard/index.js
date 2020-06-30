import React, { Component } from 'react';
import { Card, Row, Col } from 'antd'

const { Meta } = Card

class ClassCard extends Component {
    constructor(props) {
        super(props)
        this.state={};
    }

    // 渲染课程分类图片
    renderClassPhoto = (data) => {
        return data.map((item) => {
            return (
                <Col span="3">
                    <Card 
                        className="classes"
                        hoverable
                        style={{ width: 205, height: 150 }}
                        cover={<img src={require(`../../resource/assets/${item}.jpg`)} />} 
                    >
                        <Meta title={item} style={{ textAlign: "center", marginTop: "-18px" }}/>
                    </Card>
                </Col>
            )
        })
    }

    componentWillMount() {
        const classPhotoList = this.renderClassPhoto(this.props.list);
        this.setState({
            classPhotoList
        })
    }

    render() {
        return (
            <div>
                <Row gutter="300">
                    {this.state.classPhotoList}
                </Row>  
            </div>
        );
    }
}

export default ClassCard;