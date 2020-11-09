import React, { Component } from 'react';
import { Tabs } from 'antd'
import ClassListItem from '../class-list-item/class-list-item'
import { connect } from 'dva'

const { TabPane } = Tabs;

class ClassList extends Component {
  state = {}

  componentDidMount() {
    this.props.dispatch({
      type: 'user/getCollectionList',
      payload: {
        type: 0,
      }
    })
  }

  render() {
    return (
      <div className="ClassList">
        <Tabs defaultActiveKey="1">
          <TabPane tab="收藏课程" key="/collect">
            {
              this.props.collectionList ? this.props.collectionList.map((item, index) => (
                <ClassListItem classItem={item} />
              )) : ''
            }
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default connect( state => state.user )(ClassList);