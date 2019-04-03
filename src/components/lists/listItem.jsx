import React from 'react'
import PropTypes from 'prop-types'

const ListItem = ({ item }) => (
  <li>
    <input type='checkbox' name='' id='' defaultChecked={item.checked} /><label> {item.itemName}</label>
  </li>
)

ListItem.propTypes = {
  item: PropTypes.object
}

export default ListItem
