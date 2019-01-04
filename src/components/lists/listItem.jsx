import React, { Component } from 'react'

export default class ListItem extends Component {
  render() {
    return (
      <li>
        <input type="checkbox" name="" id="" defaultChecked={this.props.item.checked}/><label> {this.props.item.itemName}</label>
      </li>
    )
  }
}
