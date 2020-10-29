import React, { Component } from 'react';
import { connect } from 'dva'
import OrgCard from '../../components/org-card/org-card'
import './OrgList.less'

class OrgList extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'org/getOrgList'
    })
  }

  render() {
    const { orgList } = this.props;
    return (
      <div className="orgList">
        <div className="orgList-content">
          {
            orgList && orgList.map((item) => (
              <OrgCard org={item} data-id={item.id} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default connect(state => state.org)(OrgList);