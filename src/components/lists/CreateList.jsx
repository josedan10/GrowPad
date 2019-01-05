import React, { Component } from 'react';
import { compose } from 'redux';
import { withFirestore } from 'react-redux-firebase';

class CreateList extends Component {
  state = {
    name: '',
    items: [],
    description: '',
    createdAt: null,
  }
  
  handleChange (e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    console.log(this.props);

    // TODO: Validate state to execute function
    // Call redux dispatcher

    this.props.firestore.add('lists', {...this.state, createdAt: Date.now()});
  }

  render() {
    return (
      <div>
        <form action="post" onSubmit={this.handleSubmit.bind(this)}>
          <div className="input-group">
            <input id="name" type="text" onChange={this.handleChange.bind(this)} placeholder="What's the new list name?"/>
          </div>
          <div className="input-group">
            <textarea id="description" onChange={this.handleChange.bind(this)} placeholder="Write the list description..."></textarea>
          </div>

          <div className="input-group">
            <input className="btn btn-submit" disabled={this.state.name === ''} type="submit" value="Create"/>
          </div>
        </form>
      </div>
    )
  }
}

// export default firestoreConnect()(CreateList);

export default compose(
  withFirestore(CreateList)
)