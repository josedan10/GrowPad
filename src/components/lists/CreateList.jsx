import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createList } from '../../store/actions/listActions';

class CreateList extends Component {
  state = {
    name: '',
    items: [],
    createdAt: null,
  }

  handleChange (e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit (e) {
    e.preventDefault();

    // TODO: Validate state to execute function
    this.props.createList(this.state);
  }

  render() {
    return (
      <div>
        <form action="post" onSubmit={this.handleSubmit.bind(this)}>
          <div className="input-group">
            <input id="name" type="text" onChange={this.handleChange.bind(this)} placeholder="What's the new list name?"/>
          </div>

          <div className="input-group">
            <input className="btn btn-submit" disabled={this.state.name === ''} type="submit" value="Create"/>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createList: (list) => dispatch(createList(list))
  };
}

export default connect(null, mapDispatchToProps)(CreateList);