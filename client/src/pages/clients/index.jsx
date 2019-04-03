import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import List from '../../components/lists/List'
import CreateList from '../../components/lists/CreateList'

class Lists extends Component {
  // eslint-disable-next-line react/no-deprecated
  componentWillMount () {
    document.title = 'Lists'
  }

  static get propTypes () {
    return {
      userLists: PropTypes.array
    }
  }

  render () {
    const { userLists } = this.props
    let listComp = []
    if (userLists) {
      for (let list in userLists) { listComp.push(<List key={list} list={userLists[list]}/>) }
    }

    return (
      <div>
        {listComp}
        <CreateList></CreateList>
      </div>
    )
  }
}

// Suscribe the component to changes of the store
const mapStateToProps = (state) => {
  return {
    userLists: state.firestore.data.lists
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(() => [
    'lists' // { path: '/todos' } // object notation
  ])
)(Lists)
