import React, { Component } from 'react';
import { Tabs } from 'antd'
import ClassListItem from '../class-list-item/class-list-item'

const { TabPane } = Tabs;

class ClassList extends Component {
  state = {
    classItem: {
      name: '带你了解岭南历史文化',
      tag: '体验考察/人文历史',
      org: '北京师范大学珠海分校',
      time: '2020-03-12',
    },
  }
  changeTab = (key) => {
    console.log(key, 'TabsKey')
  }
  render() {
    return (
      <div className="ClassList">
        <Tabs defaultActiveKey="1" onChange={this.changeTab}>
          <TabPane tab="全部" key="1">
            <ClassListItem classItem={this.state.classItem} />
            <ClassListItem classItem={this.state.classItem} />
          </TabPane>
          <TabPane tab="上过" key="2">
            <ClassListItem classItem={this.state.classItem} />
            <ClassListItem classItem={this.state.classItem} />
            <ClassListItem classItem={this.state.classItem} />
          </TabPane>
          <TabPane tab="收藏" key="3">
            <ClassListItem classItem={this.state.classItem} />
            <ClassListItem classItem={this.state.classItem} />
            <ClassListItem classItem={this.state.classItem} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ClassList;