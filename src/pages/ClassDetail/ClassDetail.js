import React, { Component } from 'react';
import { connect } from 'dva'
import { Table, Divider, Space, Modal, Form, Input, Button } from 'antd'
import './ClassDetail.less'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class ClassDetail extends Component {
  formRef = React.createRef();

  state = {
    classIndex: 0, // 点击进入时选择的活动位于 items 中的位置
    chooseClassIndex: 0, // 选中报名的课程 index
    showAppointmentModal: false, // 展示报名框
    btnDisable: false, // 是否可以报名
  }

  componentDidMount() {
    // 根據 ID 獲取數據
    let id = this.props.match.params.id;
    console.log(id, 'id');
    this.props.dispatch({
      type: 'class/getClassDetailById',
      payload: {
        id: id
      }
    }).then(() => {
      this.setState({
        classIndex: this.props.classDetail.choice
      })
    })
  }

  // 点击预约报名出现的弹框
  handleAppointment = (e) => {
    e.stopPropagation();
    let index = e.target.getAttribute('data-index');
    this.setState({
      showAppointmentModal: true,
      chooseClassIndex: index
    })
  }

  // 关闭预约报名的弹框
  handleClickCancel = () => {
    this.setState({ showAppointmentModal: false })
  }

  // 判断是否舒服内容
  formIsFill = async () => {
    const values = await this.formRef.current.validateFields();
    if(values.username && values.telNumber) {
      this.setState({ btnDisable: true })
    } else {
      this.setState({ btnDisable: false })
    }
  }

  // 点击报名
  handleClickOk = async () => {
    const values = await this.formRef.current.validateFields();
    let username = values.username;
    let telNumber = values.telNumber;
    console.log('报名表单提交')
  }

  render() {
    const { classDetail } = this.props;

    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        render: (text, record) => {
          let time = record.beginTime + ' ~ ' + record.endTime;
          return time;
        }
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: '名额',
        dataIndex: 'itemNum',
        key: 'itemNum'
      },
      {
        title: '剩余名额',
        dataIndex: 'sellNum',
        key: 'sellNum',
        render: (text, record) => {
          let num = record.itemNum - record.sellNum;
          return num;
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => (
          <Space size="middle">
            <a onClick={this.handleAppointment} data-index={index}>预约报名</a>
          </Space>
        ),
      },
    ]

    return (
      JSON.stringify(classDetail) !== "{}" ? (
        <div className="ClassDetail">
          <div className="class_title">
            <h2>{classDetail.activity.name}</h2>
          </div>
          <div className="class_message">
            <div className="class_message-cover">
              <img src={classDetail.items[0].cover} />
            </div>
            <div className="class_message-detail">
              <div>举办城市：{classDetail.activity.province + classDetail.activity.city + classDetail.activity.county}</div>
              <div>课程类型：{classDetail.activity.labelName + ' | ' + classDetail.activity.subjectName}</div>
              <div>课程时间：{classDetail.activity.timeStart.split(' ')[0]} 到 {classDetail.activity.timeEnd.split(' ')[0]}</div>
              <div>课程价格：¥{classDetail.activity.minPrice + ' ~ ¥' + classDetail.activity.maxPrice}</div>
              <div className="class_message-share">
                <span>分享：</span>
                <img src={require('../../resource/assets/微博.png')} />
                <img src={require('../../resource/assets/微信.png')} />
                <img src={require('../../resource/assets/支付宝.png')} />
              </div>
            </div>
          </div>
          <Divider />
          <div className="org_detail">
            <div className="org_detail-left">
              <div className="busName">{classDetail.activity.busName}</div>
              <div className="busDes">{classDetail.activity.busDescribe}</div>
            </div>
            <div className="org_detail-right">
              <img src={classDetail.activity.busAvatar} />
            </div>
          </div>
          <div className="class_list">
            <Table 
              className="class_list-table"
              columns={columns} 
              dataSource={classDetail.items} 
              expandable={{
                expandedRowRender: record => <p>{record.detail}</p>
              }}
              expandRowByClick="true"
              pagination={false}
            />
          </div>

          {/* 课程评论区 */}
          <div className="class_evaluate">

          </div>

          <Modal
            title="预约报名"
            visible={this.state.showAppointmentModal}
            onCancel={this.handleClickCancel}
            okText="确认报名"
            footer={[
              <Button disabled={!this.state.btnDisable} type="primary" onClick={this.handleClickOk}>确认报名</Button>
            ]}
          >
            <Form {...layout} name="appointment" ref={this.formRef}>
              <Form.Item label="活动名称" name="activityName">
                <span>{classDetail.items[this.state.chooseClassIndex].name}</span>
              </Form.Item>

              <Form.Item label="姓名" name="username">
                <Input style={{ width: '200px'}} allowClear onChange={this.formIsFill} />
              </Form.Item>

              <Form.Item label="联系方式" name="telNumber">
                <Input style={{ width: '200px'}} allowClear onChange={this.formIsFill}/>
              </Form.Item>
              
              <Form.Item label="课程时间" name="activityTime">
                <span>{classDetail.items[this.state.chooseClassIndex].beginTime + ' ~ ' + classDetail.items[this.state.chooseClassIndex].endTime}</span>
              </Form.Item>

              <Form.Item label="课程价格" name="activityPrice">
                <span>{classDetail.items[this.state.chooseClassIndex].price}元</span>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      ) : ''
    );
  }
}

export default connect( state => state.class)(ClassDetail);