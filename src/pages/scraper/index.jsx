import React, { Component } from 'react'
import Scraper from '../../components/scraper'

export default class ScraperContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      msg: ''
    }
    this.child = React.createRef()
    this.setMessage = this.setMessage.bind(this)
  }

  setMessage (msg) {
    this.setState(prevState => (
      {
        ...prevState,
        msg
      }
    ))
  }

  render () {
    return (
      <div>
        <div>{ this.state.msg }</div>
        <Scraper setMessage={this.setMessage} />
      </div>
    )
  }
}
