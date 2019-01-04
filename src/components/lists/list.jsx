import React, { Component } from 'react';
import ListItem from './listItem';

export default class List extends Component {
  render() {
    return (
    
      <ul>
        <h4>{this.props.list.name}</h4>
        <strong>Created {this.props.list.createdAt.toLocaleDateString()} at {this.props.list.createdAt.toLocaleTimeString()}</strong>
        {this.props.list.items.length > 0 && this.props.list.items.map((item, indexItem) => <ListItem key={indexItem} item={item}/>)}
      </ul>
    )
  }
}
