import React, { Component } from 'react';
import List from './list';

export default class Lists extends Component {
  render() {
    return (
      <div>
        {this.props.lists && this.props.lists.map((list, index) => <List key={index} list={list}/>)}
      </div>
    )
  }
}
