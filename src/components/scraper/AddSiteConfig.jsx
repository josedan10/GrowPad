import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import config from '../../config'

export default class AddSite extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: '',
      emailSelector: '',
      companySelector: '',
      location: '',
      facebookSelector: '',
      instagramSelector: '',
      descriptionSelector: '',
      pagEndPoint: '',
      websiteSelector: '',
      baseUrl: '',
      keyWords: '',
      noPaginateIndex: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.addConfig = this.addConfig.bind(this)
  }

  static get propTypes () {
    return {
      firebase: PropTypes.object
    }
  }

  isValidState () {
    let {
      page,
      emailSelector,
      baseUrl,
      companySelector,
      location,
      pagination
    } = this.state
    return (
      page === null || page !== '' ||
      emailSelector === null || emailSelector === '' ||
      baseUrl === null || baseUrl === '' ||
      companySelector === null || companySelector === '' ||
      location === null || location === '' ||
      pagination === null || pagination === ''
    )
  }
  // 7C:4F:B5:9F:F3:DD

  addConfig (e) {
    e.preventDefault()
    console.log(this.state)

    if (this.isValidState()) {
      axios
        .post(`${config.apiUrl}/sites/newSite`,
          {
            data: this.state
          }
        )
        .then(res => console.log(res.data.msg))
        .catch(error => console.log('Error creating new site configuration', error))
    } else {
      console.log('Error invalid data.')
    }
  }

  handleChange ({ target }) {
    if (target.id === 'noPaginateIndex') {
      this.setState(prevState => ({
        ...prevState,
        [target.name]: target.checked
      }))
    } else {
      this.setState(prevState => ({
        ...prevState,
        [target.name]: target.value
      }))
    }
  }

  render () {
    return (
      <div>
        <form onSubmit={this.addConfig}>
          <div className='input-form'>
            <label htmlFor='page'>Page Name</label>
            <input onChange={this.handleChange} type='text' id='page' name='page' />
          </div>

          <div className='input-form'>
            <label htmlFor='baseUrl'>Base Url</label>
            <input onChange={this.handleChange} type='text' id='baseUrl' name='baseUrl' />
          </div>

          <div className='input-form'>
            <label htmlFor='location'>Location</label>
            <input onChange={this.handleChange} type='text' id='location' name='location' />
          </div>

          <div className='form-input'>
            <label htmlFor='companySelector'>Company Selector (id: #, class: .)</label>
            <input onChange={this.handleChange} type='text' id='companySelector' name='companySelector' />
          </div>

          <div className='input-form'>
            <label htmlFor='emailSelector'>Email Selector (id: #, class: .)</label>
            <input onChange={this.handleChange} type='text' id='emailSelector' name='emailSelector' />
          </div>

          <div className='input-form'>
            <label htmlFor='website'>Website Selector (id: #, class: .)</label>
            <input onChange={this.handleChange} type='text' id='website' name='website' />
          </div>

          <div className='input-form'>
            <label htmlFor='pagEndPoint'>Pagination Url</label>
            <input onChange={this.handleChange} type='text' id='pagEndPoint' name='pagEndPoint' />
          </div>

          <div className='input-form'>
            <label htmlFor='facebookSelector'>Facebook Selector</label>
            <input onChange={this.handleChange} type='text' id='facebookSelector' name='facebookSelector' />
          </div>

          <div className='input-form'>
            <label htmlFor='instagramSelector'>Instagram Selector</label>
            <input onChange={this.handleChange} type='text' id='instagramSelector' name='instagramSelector' />
          </div>

          <div className='input-form'>
            <label htmlFor='keywords'>Keywords Selector</label>
            <input onChange={this.handleChange} type='text' id='keywords' name='keywords' />
          </div>

          <div className='input-for'>
            <label htmlFor='noPaginateIndex'>No paginate Index</label>
            <input onChange={this.handleChange} type='checkbox' name='noPaginateIndex' id='noPaginateIndex' />
          </div>

          <input className='btn btn-primary' type='submit' value='Add new config' />
        </form>
      </div>
    )
  }
}
