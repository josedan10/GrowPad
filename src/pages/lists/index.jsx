import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '../../components/lists/List';
import CreateList from '../../components/lists/CreateList';

class Lists extends Component {
  componentWillMount () {
    document.title = "Lists"
  }

  render() {
    const { userLists } = this.props;

    return (
      <div>
        {userLists && userLists.map((list, index) => <List key={index} list={list}/>)}
        <CreateList></CreateList>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  userLists: state.userLists.lists
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
