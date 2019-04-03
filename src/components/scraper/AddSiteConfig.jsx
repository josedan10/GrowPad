import React, { Component } from 'react'

export default class AddSite extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      company: '',
      location: '',
      facebook: '',
      instagram: '',
      website: '',
      baseUrl: '',
      pagination: false,
      keyWords: []
    }
  }

  isValidState () {
    // let {
    //   email,
    //   company,
    //   location,
    //   facebook,
    //   instagram
    // } = this.state
    return (
      'Hello'
    )
  }

  addConfig () {
    // if (

    // )
  }

  render () {
    return (
      <div>Hello</div>
    )
  }
}
