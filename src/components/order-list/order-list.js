import React, { Component } from 'react';
import { connect } from 'dva'
import { Table, Modal, Form, notification, Input } from 'antd'
import './order-list.less'
import QRCode from 'qrcode.react'

const { TextArea } = Input;

class OrderList extends Component {
  state = {
    index: 0, // 訂單詳情位置
    showDetail: false, // 是否显示订单详情
    url: '', // 支付二维码
    showEditComment: false, // 评论弹窗
    value: '', // 评论内容
    // canEditNote: false, // 是否能编辑
  }

  componentDidMount() {
    this.getOrderList();
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  // 获取订单列表
  getOrderList = () => {
    this.props.dispatch({
      type: 'user/getAllOrder'
    }).then(() => {
      this.setState({
        orderList: this.props.orderList
      })
    })
  }

  // 打开订单详情
  handleUpdateIndex = (index) => {
    this.setState({
      showDetail: true,
      index: index
    })
    this.props.dispatch({
      type: 'user/getOrderDetail',
      payload: {
        id: this.state.orderList[index].orderId
      }
    })
  }

  // 关闭订单详情
  handleCancel = () => {
    this.setState({ 
      showDetail: false, 
      url: '' 
    })
  }

  // 打开支付页面
  handlePay = (orderId) => {
    this.props.dispatch({
      type: 'user/createNative',
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
      type: 'user/queryPayStatus',
      payload: {
        orderNo: orderId
      },
      callback: (res) => {
        notification('success')({
          message: '支付成功',
        });
        this.setState({ showDetail: false });
        this.getOrderList();
        this.timer && clearInterval(this.timer);
      }
    })
  }

  // 评论的撰写
  handleEditComment = () => {
    this.setState({
      showEditComment: true,
      showDetail: false,
    })
  }

  // 关闭评论窗口
  handleCloseComment = () => {
    this.setState({
      showEditComment: false
    })
  }

  // 提交评论
  handleAddComment = () => {
    this.props.dispatch({
      type: 'user/addComment',
      payload: {
        content: this.state.value,
        orderItemId: this.props.orderDetail.itemList[0].id
      },
      callback: (res) => {
        this.setState({
          showEditComment: false,
        })
      }
    })
  }

  // 评论的内容修改
  handleChangeComment = (e) => {
    this.setState({
      value: e.target.value,
    }, () => {
      console.log(this.state.value)
    })
  }

  render() {
    const columns = [
      {
        title: '付款人',
        dataIndex: 'buyerNick',
        key: 'buyerNick',
      },
      {
        title: '付款金额(元)',
        dataIndex: 'payment',
        key: 'payment',
      },
      {
        title: '订单创建时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate'
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        key: 'status',
        render(status) {
          let config = {
            '1': '未付款',
            '2': '已付款',
            '3': '未参加',
            '4': '已参加',
            '5': '待评价'
          }
          return config[status]
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => (
          <a onClick={() => this.handleUpdateIndex(index)}>查看详情</a>
        ),
      }
    ]

    const { orderList, index, showEditComment, value } = this.state;
    const { orderDetail } = this.props;
    const status = {
      '1': '未付款',
      '2': '已付款',
      '3': '未参加',
      '4': '已参加',
      '5': '待评价'
    };

    return (
      <div className="OrderList">
        <Table columns={columns} dataSource={orderList} pagination={false} />
          {
            JSON.stringify(orderDetail) !== "{}" ? (
              <Modal
                visible={this.state.showDetail}
                onCancel={this.handleCancel}
                footer=""
              >
                { this.state.url ? (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <QRCode size={250} value={this.state.url} style={{ margin: '0 auto' }}/>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>打开微信扫一扫</div>
                  </div>
                ) : (
                  <>
                    <Form.Item label="付款人" name="buyerNick">{orderDetail.order.buyerNick}</Form.Item>
                    <Form.Item label="活动名称">{orderDetail.itemList[0].itemName}</Form.Item>
                    <Form.Item label="付款金额">¥{orderDetail.order.payment}</Form.Item>
                    <Form.Item label="订单状态">
                      {status[orderDetail.order.status]}
                      {orderDetail.order.status === "1" ? ( <a style={{ marginLeft: '5px'}} onClick={() => this.handlePay(orderList[index].orderId)}>去支付</a> ) : ''}
                      {/* {orderDetail.order.status === "5" ? ( <a style={{ marginLeft: '5px'}} onClick={() => this.handleEditNote(orderList[index].orderId)}>去评价</a> ) : ''} */}
                      {orderDetail.order.status === "5" ? (<a style={{ marginLeft: '5px'}} onClick={() => this.handleEditComment(orderList[index].orderId)}>去评价</a>) : ''}
                    </Form.Item>
                    <Form.Item label="收款人">{orderDetail.order.receiver}</Form.Item>
                    <Form.Item label="收款人联系方式">{orderDetail.order.receiverMobile}</Form.Item>
                  </>
                )}
              </Modal> 
            ) : ''
          }
        <Modal 
          visible={showEditComment}
          onOk={this.handleAddComment}
          onCancel={this.handleCloseComment}
        >
          { showEditComment ? (
            <>
              <Form.Item>活动名称：{orderDetail.itemList[0].itemName}</Form.Item>
              <Form.Item>评论内容<TextArea value={value} onChange={this.handleChangeComment}/></Form.Item>
            </>
          ) : ''}
        </Modal>
      </div>
    );
  }
}

export default connect( state => state.user )(OrderList);