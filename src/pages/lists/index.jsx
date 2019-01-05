import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import List from '../../components/lists/List';
import CreateList from '../../components/lists/CreateList';

class Lists extends Component {
  componentWillMount () {
    document.title = "Lists"
  }

  render() {
    const { userLists } = this.props;
    console.log(this.props);

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
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect({
    collection: 'lists'
  })
)(Lists)
