import React, { Component } from 'react';
import { connect } from 'dva'
import { Tabs, Divider, Modal, Form, Input, Button, Comment, List, InputNumber } from 'antd'
import NoteCard from '../../components/note-card/note-card'
import './ClassDetail.less'

const { TextArea } = Input;
const { TabPane } = Tabs;
const QRCode = require('qrcode.react');

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class ClassDetail extends Component {
  formRef = React.createRef();

  state = {
    showAppointmentModal: false, // 展示报名框
    showPayModal: false, // 展示付款二维码
    btnDisable: false, // 是否可以报名
    isLogin: false, // 是否登錄
    itemNum: 1, // 报名数量
    canAttend: true, // 能否报名
    url: '', // 支付二维码
  }

  componentDidMount() {
    // 根據 ID 獲取數據
    let id = this.props.match.params.id;
    this.props.dispatch({
      type: 'class/getClassDetailById',
      payload: {
        id: id
      }
    }).then(() => {
      if(this.props.classDetail.item.itemNum === 0) {
        this.setState({ canAttend: false })
      }
    })

    // 判斷缓存中是否存在用户名字和头像
    let token = localStorage.getItem('bsyx-user-token');
    if(token) {
      this.props.dispatch({
        type: 'class/getUserInfo'
      }).then(() => {
        this.setState({ 
          user: this.props.user,
          isLogin: true
        });
      })
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  // 点击预约报名出现的弹框
  handleAppointment = () => {
    if(this.state.isLogin) {
      this.setState({
        showAppointmentModal: true,
      })
    } else {
      Modal.error({
        title: '报名失败',
        content: '请先登录！'
      })
    }
  }

  // 关闭预约报名的弹框
  handleClickCancel = () => {
    this.setState({ showAppointmentModal: false })
  }

  // 判断是否输入内容
  formIsFill = async () => {
    const values = await this.formRef.current.validateFields();
    if(values.username && values.telNumber && values.telNumber.length === 11) {
      this.setState({ btnDisable: true })
    } else {
      this.setState({ btnDisable: false })
    }
  }

  //  报名人数修改
  handleChangeItemNum = (value) => {
    this.setState({ itemNum: value })
  }

  // 点击报名
  handleClickOk = async () => {
    const values = await this.formRef.current.validateFields();
    let contact = values.username;
    let mobile = values.telNumber;
    this.props.dispatch({
      type: 'class/addOrder',
      payload: {
        items: [{
          itemId : this.props.classDetail.item.id,
          num: this.state.itemNum
        }],
        mobile: mobile,
        contact: contact,
      },
      callback: (res) => {
        this.setState({ 
          showAppointmentModal: false,
          showPayModal: true
        })
        this.createNative(res.orderId);
      }
    })
  }

  // 生成支付二维码
  createNative = (orderId) => {
    this.props.dispatch({
      type: 'class/createNative',
      payload: {
        orderNo: orderId
      },
      callback: (res) => {
        let url = res.code_url;
        this.setState({ url });
        // 设置定时器判断是否支付成功
        this.timer = setInterval(() => {
          this.getPayStatus(orderId);
        }, 1000);
      }
    })
  }

  // 查询支付状态
  getPayStatus = (orderId) => {
    this.props.dispatch({
      type: 'class/queryPayStatus',
      payload: {
        orderNo: orderId
      },
      callback: (res) => {
        this.setState({ showPayModal: false });
        this.timer && clearTimeout(this.timer);
        Modal.info({
          title: '报名成功',
          content: (
            "您已经成功报名该课程！"
          )
        })
      }
    })
  }

  // 关闭支付弹窗
  handleClosePayModal = () => {
    this.setState({ showPayModal: false });
    this.timer && clearTimeout(this.timer);
  }

  // 点击发表笔记
  handleClickWriteNote = () => {
    this.props.history.push(`/noteEdit/edit/${this.props.classDetail.activity.id}`)
  }

  // 点击机构
  handleLinkOrgDetail = () => {
    this.props.history.push(`/OrgDetail/${this.props.classDetail.activity.orgId}`)
  }

  // 点击收藏
  handleClickCollect = () => {
    if(this.state.isLogin) {
      this.props.dispatch({
        type: 'class/addCollection',
        payload: {
          orgCollectId: this.props.classDetail.item.id,
          type: 0
        }
      })
    } else {
      Modal.error({
        title: '收藏失败',
        content: '请先登录！'
      })
    }
  }

  // 评论内容更改
  handleChangeEvaluate = e => {
    this.setState({ value: e.target.value })
  }

  // 评论编辑框组件
  renderEditor = ({value, submitting}) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={this.handleChangeEvaluate} value={value}  />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={this.handleSubmitEvaluate} type="primary">
          发表评论
        </Button>
      </Form.Item>
    </>
  );

  // 评论列表组件
  renderCommentList = ({ comments }) => (
    <List
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={props => 
        <Comment author={props.nickname} avatar={props.avatar} content={props.content} datetime={props.gmtModified.split(' ')[0]} />
      }
    />
  )

  render() {
    const { classDetail, comments} = this.props;
    const { showPayModal, btnDisable, showAppointmentModal, itemNum, canAttend } = this.state;

    return (
      JSON.stringify(classDetail) !== "{}" ? (
        <div className="ClassDetail">
          <div className="class_message">
            <div className="class_message-cover">
              <img src={classDetail.item.cover} />
            </div>
            <div className="class_message-detail">
              <div>课程名称：{classDetail.item.name}</div>
              <div>举办城市：{classDetail.activity.province + classDetail.activity.city + classDetail.activity.county}</div>
              <div>课程类型：{classDetail.activity.labelName + ' | ' + classDetail.activity.subjectName}</div>
              <div>课程时间：{classDetail.item.beginTime} 到 {classDetail.item.endTime}</div>
              <div>课程价格：¥{classDetail.item.price}</div>
              <div>课程名额：{classDetail.item.itemNum}</div>
              <div className="class_action">
                <Button type="primary" className="actionBtn" onClick={this.handleAppointment} disabled={!canAttend}>预约报名</Button>
                <Button className="actionBtn" style={{ backgroundColor: 'orange', color: 'white' }} onClick={this.handleClickCollect}>收藏</Button>
              </div>
              <div className="class_message-share">
                <span>分享：</span>
                <img src={require('../../resource/assets/微博.png')} />
                <img src={require('../../resource/assets/微信.png')} />
                <img src={require('../../resource/assets/支付宝.png')} />
              </div>
            </div>
          </div>

          <Divider />

          <div className="class_detail">
            <div className="class_detail-tabs">
              <Tabs defaultActiveKey="1">
                <TabPane tab="课程简介" key="1" className="class_detail-tabpane">
                  <div dangerouslySetInnerHTML={{ __html: classDetail.activity.detail}}></div>
                </TabPane>
                <TabPane tab="课程安排" key="2" className="class_detail-tabpane">
                  <div dangerouslySetInnerHTML={{ __html: classDetail.activity.arrangement}}></div>
                </TabPane>
                <TabPane tab="注意事项" key="3" className="class_detail-tabpane">
                  <div dangerouslySetInnerHTML={{ __html: classDetail.activity.matter}}></div>
                </TabPane>
                <TabPane tab="课程评论" key="4" className="class_detail-tabpane">
                  <div className="class_evaluate">
                    { classDetail.comments.length > 0 && this.renderCommentList({ comments: comments }) }
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
          
          <div className="org_detail" onClick={this.handleLinkOrgDetail}>
            <div className="org_detail-left">
              <div className="busName">{classDetail.activity.busName}</div>
              <div className="busDes">{classDetail.activity.busDescribe}</div>
            </div>
            <div className="org_detail-right">
              <img src={classDetail.activity.busAvatar} />
            </div>
          </div>

          <div className="class_note">
            <div className="note_header">
              <h2>课程笔记</h2>
              <Button type="primary" onClick={this.handleClickWriteNote}>发表笔记</Button>
            </div>
            <div className="note_list">
              {
                classDetail.notes.map((item, index) => (
                  <NoteCard item={item} />
                ))
              }
            </div>
          </div>

          <Modal
            title="预约报名"
            visible={showAppointmentModal}
            onCancel={this.handleClickCancel}
            okText="确认报名"
            footer={[
              <Button disabled={!btnDisable} type="primary" onClick={this.handleClickOk}>确认报名</Button>
            ]}
          >
            <Form {...layout} name="appointment" ref={this.formRef}>
              <Form.Item label="活动名称" name="activityName">
                <span>{classDetail.item.name}</span>
              </Form.Item>

              <Form.Item label="姓名" name="username" 
                hasFeedback rules={[{ required: true, message: '请输入您的姓名！' }]}
              >
                <Input style={{ width: '200px'}} allowClear onChange={this.formIsFill} />
              </Form.Item>

              <Form.Item label="联系方式" name="telNumber" 
                hasFeedback rules={[{ required: true, len: 11, message: '请保证手机号码正确且有效' }]}
              >
                <Input style={{ width: '200px'}} allowClear onChange={this.formIsFill}/>
              </Form.Item>

              <Form.Item label="报名人数" name="itemNum">
                <InputNumber min={1} max={classDetail.item.itemNum} defaultValue={1} value={itemNum} onChange={this.handleChangeItemNum}/>
                <span style={{ marginLeft: '5px' }}>剩余名额：{classDetail.item.itemNum}</span>
              </Form.Item>
              
              <Form.Item label="课程时间" name="activityTime">
                <span>{classDetail.item.beginTime + ' ~ ' + classDetail.item.endTime}</span>
              </Form.Item>

              <Form.Item label="课程价格" name="activityPrice">
                <span>{classDetail.item.price}元</span>
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title=""
            footer=""
            visible={showPayModal}
            onCancel={this.handleClosePayModal}
          >
            { this.state.url ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <QRCode size={250} value={this.state.url} style={{ margin: '0 auto' }}/>
                <div style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>打开微信扫一扫</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>个人中心-订单页面可继续支付</div>
              </div>
            ) : ''}
          </Modal>
        </div>
      ) : ''
    );
  }
}

export default connect( state => state.class)(ClassDetail);