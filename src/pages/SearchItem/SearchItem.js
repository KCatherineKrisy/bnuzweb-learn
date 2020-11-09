import React, { Component } from 'react';
import ClassCard from '../../components/class-card/class-card'
import { Empty, Input, Button } from 'antd'
import './SearchItem.less'
import { connect } from 'dva'
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'antd/lib/modal/Modal';

class SearchItem extends Component {
  state = {
    lowPrice: '',
    highPrice: '',
    type: '', // 类型
    keywords: '', // 关键词
    price: '', // 当前价格区间
    pageNo: 1, // 当前页数
    hasMore: true, // 是否有更多数据
    loading: false, // 是否加载中
    totalPage: 1, // 总共页数
    searchList: [], // 课程查询结果
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'class/getSearchOpinion',
    }).then(() => {
      let type = this.props.match.params.type; // 查找类型有四种，keywords、label、subject、price
      let keywords = decodeURIComponent(this.props.match.params.keywords);
      this.setState({ type, keywords })
      if(type && keywords) {
        this.searchByTypeAndKeywords(type, keywords);
      }
    })
  }

  // 根据 type 获取查询结果
  searchByTypeAndKeywords = (type, keywords, pageNo = 1, getMore = false) => {
    if(type === 'keywords') {
      this.props.dispatch({
        type: 'class/searchClassItem',
        payload: {
          keywords: keywords,
          pageNo: pageNo,
        },
        callback: (data) => {
          if(!data.rows) {
            this.setState({ hasMore: false })
          }
          let list = data.rows;
          let newList = this.state.searchList.concat(list);
          this.setState({ 
            totalPage: data.totalPage,
            searchList: newList 
          })
        }
      })
    } else if (type === 'label') {
      this.props.labelList && this.props.labelList.map((item) => {
        console.log(item.name, keywords)
        if(item.name === keywords) {
          console.log('test')
          this.props.dispatch({
            type: 'class/searchClassItem',
            payload: {
              keywords: '',
              label: item.id,
              pageNo: pageNo,
            },
            callback: (data) => {
              if(!data.rows) {
                this.setState({ hasMore: false })
                return;
              }
              let list = data.rows;
              let newList = this.state.searchList.concat(list);
              this.setState({ 
                totalPage: data.totalPage,
                searchList: newList 
              })
            }
          })
        }
      }) 
    } else if (type === 'price') {
      this.props.dispatch({
        type: 'class/searchClassItem',
        payload: {
          keywords: '',
          pageNo: pageNo,
          price: keywords,
        },
        callback: (data) => {
          if(!data.rows) {
            this.setState({ hasMore: false })
            return ;
          }
          let list = data.rows;
          let newList = this.state.searchList.concat(list);
          this.setState({ 
            totalPage: data.totalPage,
            searchList: newList 
          })
        }
      })
    } else {
      this.props.subjectList.map((item) => {
        if(item.name === keywords) {
          this.props.dispatch({
            type: 'class/searchClassItem',
            payload: {
              keywords: '',
              subject: item.id,
              pageNo: pageNo,
            },
            callback: (data) => {
              if(!data.rows) {
                this.setState({ hasMore: false })
                return ;
              }
              let list = data.rows;
              let newList = this.state.searchList.concat(list);
              this.setState({ 
                totalPage: data.totalPage,
                searchList: newList 
              })
            }
          })
        }
      })
    }
  }

  // 點擊獲取標籤 id 進行查詢
  getLabelId = (e) => {
    let label = e.target.getAttribute('data-label');
    this.setState({
      hasMore: true,
      pageNo: 1,
      searchList: [],
    }, () => {
      this.searchByTypeAndKeywords('label', label);
    })
    this.props.history.push(`/search/label/${label}`)
  }

  // 點擊獲取课程 id 進行查詢
  getSubjectId = (e) => {
    let subject = e.target.getAttribute('data-subject')
    this.setState({
      hasMore: true,
      pageNo: 1,
      searchList: [],
    }, () => {
      this.searchByTypeAndKeywords('subject', subject, this.state.pageNo);
    })
    this.props.history.push(`/search/subject/${subject}`)
  }

  // 获取最低价格
  handleLowChange = (e) => {
    this.setState({ lowPrice: e.target.value })
  }

  // 获取最高价格
  handleHighChange = (e) => {
    this.setState({ highPrice: e.target.value })
  }

  // 根据价格区间查找课程
  handleSearchByPrice = () => {
    if(!this.state.lowPrice) {
      Modal.error({
        title: '查找失败',
        content: '最低价不能为空！'
      })
    } else if (!this.state.highPrice) {
      Modal.error({
        title: '查找失败',
        content: '最高价不能为空！'
      })
    } else {
      let price = this.state.lowPrice + '-' + this.state.highPrice;
      this.setState({
        hasMore: true,
        pageNo: 1,
        searchList: [],
      }, () => {
        this.searchByTypeAndKeywords('price', price);
      })
      this.props.history.push(`/search/price/${this.state.lowPrice + '-' + this.state.highPrice}`)
    }
  }

  // 获取下一页数据
  getMore = () => {
    if(this.state.pageNo === this.state.totalPage) {
      return ;
    }
    this.setState({
      pageNo: this.state.pageNo + 1
    }, () => {
      this.searchByTypeAndKeywords(this.state.type, this.state.keywords, this.state.pageNo, true);
    })
  }


  render() {
    return (
      <div className="searchClass">
        <div className="searchType">
          <ul>
            <li style={{ fontWeight: 'bold', fontSize: '18px'}}>类型</li>
            { this.props.labelList.map((item, index) => ( <li value={item.id} data-label={item.name} onClick={this.getLabelId}>{item.name}</li> )) }
          </ul>
          <ul>
            <li style={{ fontWeight: 'bold', fontSize: '18px'}}>标签</li>
            { this.props.subjectList.map((item, index) => ( <li value={item.id} data-subject={item.name} onClick={this.getSubjectId}>{item.name}</li> )) }
          </ul>
          <ul>
            <li style={{ fontWeight: 'bold', fontSize: '18px'}}>价格</li>
            <li><Input style={{ width: '50px' }} onChange={this.handleLowChange} /></li>
            <li>~</li>
            <li><Input style={{ width: '50px' }} onChange={this.handleHighChange} /></li>
            <li><Button onClick={this.handleSearchByPrice}>查询</Button></li>
          </ul>
        </div>
        <div className="searchList">
          <span className="searchList-Num">总共{this.props.total}个结果</span>
          <InfiniteScroll 
            className="searchList-body"
            dataLength={this.props.searchClassList.length}
            next={this.getMore}
            hasMore={this.state.hasMore}
            endMessage={ <p style={{ textAlign: 'center' }}><b>没有更多数据了！</b></p> }
          >
            {
              this.props.total !== 0 ? (
                (this.state.searchList || []).map((item, index) => (
                  <li><ClassCard classItem={item}/></li>
                ))
              ) : ( 
                <Empty className="dataEmpty"/> 
              )
            }
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default connect(state => state.class)(SearchItem);