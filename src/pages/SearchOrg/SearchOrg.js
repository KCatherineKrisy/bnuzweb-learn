import React, { Component } from 'react';
import OrgCard from '../../components/org-card/org-card'
import { Pagination } from 'antd'
import './SearchOrg.less'

class SearchOrg extends Component {
  state = {
    org: {
      pic: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%8C%97%E4%BA%AC%E5%B8%88%E8%8C%83%E5%A4%A7%E5%AD%A6%E7%8F%A0%E6%B5%B7%E5%88%86%E6%A0%A1&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=625534972,3316955992&os=473031943,3975964522&simid=4116966929,600079446&pn=2&rn=1&di=33000&ln=1451&fr=&fmq=1602136190798_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=http%3A%2F%2Fwww.x3cn.com%2Fdata%2Fattachment%2Fforum%2F201904%2F14%2F031312k9cdc19wd566dxdb.jpeg&rpstart=0&rpnum=0&adpicid=0&force=undefined',
      name: '北京师范大学珠海分校',
      address: '广东省珠海市香洲区金凤路 18 号',
      des: '我是一个简介叭叭叭叭叭叭叭叭叭叭叭叭叭叭叭叭叭',
      grade: '8.7',
    }
  }
  render() {
    return (
      <div className="searchOrg">
        <div className="searchList">
          <OrgCard org={this.state.org}/>
        </div>
        {/* <div className="searchList-footer">
          <Pagination defaultCurrent={1} total={3}/>
        </div> */}
      </div>
    );
  }
}

export default SearchOrg;