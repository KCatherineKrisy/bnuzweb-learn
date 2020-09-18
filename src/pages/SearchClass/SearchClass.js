import React, { Component } from 'react';
import SearchInput from '../../components/search/search'
import './SearchClass.less'

class SearchClass extends Component {
  render() {
    return (
      <div className="searchClass">
        <div className="search">
          <SearchInput />
        </div>
        <div className="searchType">
          
        </div>
        <div className="searchList">

        </div>
      </div>
    );
  }
}

export default SearchClass;