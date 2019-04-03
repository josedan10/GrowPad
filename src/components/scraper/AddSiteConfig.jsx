import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class AddSite extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: '',
      email: '',
      company: '',
      location: '',
      facebook: '',
      instagram: '',
      website: '',
      baseUrl: '',
      pagination: false,
      keyWords: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  static get propTypes () {
    return {
      firebase: PropTypes.object
    }
  }

  isValidState () {
    let {
      page,
      email,
      baseUrl,
      company,
      location,
      pagination
    } = this.state
    return (
      page !== null && page !== '' &&
      email !== null && email !== '' &&
      baseUrl !== null && baseUrl !== '' &&
      company !== null && company !== '' &&
      location !== null && location !== '' &&
      pagination !== null && pagination !== ''
    )
  }
  // 7C:4F:B5:9F:F3:DD

  addConfig () {
    if (this.isValidState()) {
      let { firebase } = this.props
      firebase.push('sites', this.state)
    } else {
      console.log('Error invalid data.')
    }
  }

  handleChange ({ target }) {
    this.setState(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  render () {
    return (
      <div>
        <form>
          <div className='input-form'>
            <label htmlFor='baseUrl'>Base Url</label>
            <input type='text' id='baseUrl' name='baseUrl' />
          </div>

          <div className='input-form'>
            <label htmlFor='location'>Location</label>
            <input type='text' id='location' name='location' />
          </div>

          <div className='form-input'>
            <label htmlFor='company'>Company Selector (id: #, class: .)</label>
            <input type='text' id='company' name='company' />
          </div>

          <div className='input-form'>
            <label htmlFor='email'>Email Selector (id: #, class: .)</label>
            <input type='text' id='email' name='email' />
          </div>

          <div className='input-form'>
            <label htmlFor='website'>Website Selector (id: #, class: .)</label>
            <input type='text' id='website' name='website' />
          </div>

          <div className='input-form'>
            <label htmlFor='pagination'>Pagination Url</label>
            <input type='text' id='pagination' name='pagination' />
          </div>

          <div className='input-form'>
            <label htmlFor='facebook'>Facebook Selector</label>
            <input type='text' id='facebook' name='facebook' />
          </div>

          <div className='input-form'>
            <label htmlFor='instagram'>Instagram Selector</label>
            <input type='text' id='instagram' name='instagram' />
          </div>

          <div className='input-form'>
            <label htmlFor='keywords'>Keywords Selector</label>
            <input type='text' id='keywords' name='keywords' />
          </div>

          <input className='btn btn-primary' type='submit' value='Add new config' />
        </form>
      </div>
    )
  }
}
