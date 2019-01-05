import React, { Component } from 'react';
import ListItem from './ListItem';

export default class List extends Component {
  render() {
    return (
    
      <ul>
        <h4>{this.props.list.name}</h4>
        <strong>Created { new Date(this.props.list.createdAt).toLocaleDateString() } at { new Date(this.props.list.createdAt).toLocaleTimeString() }</strong>
        <p>{this.props.list.description}</p>
        {this.props.list.items.length > 0 && this.props.list.items.map((item, indexItem) => <ListItem key={indexItem} item={item}/>)}
      </ul>
    )
  }
}
