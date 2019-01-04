import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Lists from '../components/lists';
import { connect } from 'react-redux';

class Dashboard extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {
    // console.log(this.props);
    const { userLists } = this.props;
    return (
      <div>
        <Lists lists={userLists} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userLists: state.userLists.lists
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

