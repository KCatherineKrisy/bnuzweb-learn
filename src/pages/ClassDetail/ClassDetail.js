import React, { Component } from 'react';
import { connect } from 'dva'
import { Tabs, Divider, Modal, Form, Input, Button, Comment, Avatar, List } from 'antd'
import moment from 'moment';
import NoteCard from '../../components/note-card/note-card'
import './ClassDetail.less'

const { TextArea } = Input;
const { TabPane } = Tabs;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class ClassDetail extends Component {
  formRef = React.createRef();

  state = {
    showAppointmentModal: false, // 展示报名框
    btnDisable: false, // 是否可以报名
    submiiting: false, // 是否提交中
    value: '', // 评论文本
    user: {}, // 用戶信息
    isLogin: false, // 是否登錄
  }

  componentDidMount() {
    // 根據 ID 獲取數據
    let id = this.props.match.params.id;
    this.props.dispatch({
      type: 'class/getClassDetailById',
      payload: {
        id: id
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

  // 点击预约报名出现的弹框
  handleAppointment = () => {
    this.setState({
      showAppointmentModal: true,
    })
  }

  // 关闭预约报名的弹框
  handleClickCancel = () => {
    this.setState({ showAppointmentModal: false })
  }

  // 判断是否输入内容
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
    let username = 
  }

  // 点击发表笔记
  handleClickWriteNote = () => {

  }

  // 评论内容更改
  handleChangeEvaluate = e => {
    this.setState({ value: e.target.value })
  }

  // 点击发表评论
  handleSubmitEvaluate = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
      });

    }, 1000);
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
      renderItem={props => <Comment {...props} />}
    />
  )

  render() {
    const { classDetail, comments} = this.props;
    const { submitting, value, user, isLogin } = this.state;

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
                <Button type="primary" className="actionBtn" onClick={this.handleAppointment}>预约报名</Button>
                <Button className="actionBtn" style={{ backgroundColor: 'orange', color: 'white' }}>收藏</Button>
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
                    { isLogin ? 
                        <Comment
                        avatar={ <Avatar src={user.avatar} alt={user.nickname} /> }
                        content={ this.renderEditor({ value: value, submitting: submitting }) }
                      /> : ''
                    }
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
          
          <div className="org_detail">
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
                <Button type="primary">发表笔记</Button>
              </div>
              <div className="note_list">
                {
                  classDetail.notes.map((item, index) => {
                    console.log(item, 'item')
                  })
                }
              </div>
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
                <span>{classDetail.item.name}</span>
              </Form.Item>

              <Form.Item label="姓名" name="username">
                <Input style={{ width: '200px'}} allowClear onChange={this.formIsFill} />
              </Form.Item>

              <Form.Item label="联系方式" name="telNumber">
                <Input style={{ width: '200px'}} allowClear onChange={this.formIsFill}/>
              </Form.Item>
              
              <Form.Item label="课程时间" name="activityTime">
                <span>{classDetail.item.beginTime + ' ~ ' + classDetail.item.endTime}</span>
              </Form.Item>

              <Form.Item label="课程价格" name="activityPrice">
                <span>{classDetail.item.price}元</span>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      ) : ''
    );
  }
}

export default connect( state => state.class)(ClassDetail);