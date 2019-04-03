import axios from 'axios'
import jsBeautify from 'js-beautify'
import React from 'react'
import PropTypes from 'prop-types'

import config from '../../config'

class Scraper extends React.Component {
  /**
   *Creates an instance of Scraper.
   * @memberof Scraper
   *
   * @attr [companiesFound]:
   *  @type Array
   *  @object {
   *    page: <WebsiteURL>,
   *    companyName: <String>,
   *    website: <String>,
   *    facebook: <String>,
   *    instagram: <String>,
   *    description: <String>,
   *    location: <String>,
   *    email: <String>
   * }
   */
  constructor (props) {
    super(props)
    this.props = props
    this.state = {
      status: 'sleeping',
      config: {},
      companiesFound: null
    }
    // this.scrapPage = this.scrapPage.bind(this)
    // this.updateProgress = this.updateProgress.bind(this)
    this.setMessage = this.setMessage.bind(this)
  }

  static get propTypes () {
    return {
      setMessage: PropTypes.func.isRequired,
      children: PropTypes.object
    }
  }

  setMessage (msg) {
    this.props.setMessage(msg)
  }

  initScraping () {
    this.setState(prevState => (
      {
        ...prevState,
        status: 'scraping'
      }
    ))

    axios
      .post(`${config.apiUrl}/scraper/initScraping`,
        {
          config: this.state.config
        }
      )
      .then(res => console.log(res))
      .catch(error => {
        this.setMessage('Error scraping... ' + error)
        this.setState(prevState => (
          {
            ...prevState,
            status: 'sleeping'
          }
        ))
      })
  }

  saveData () {
    if (this.state.status !== 'sleeping') {
      this.setMessage('Wait until the scraper finish to to the actual process.')
    } else {
      this.setState(prevState => (
        {
          ...prevState,
          status: 'saving'
        }
      ),
      () => {
        // Send data to database
      })
    }
  }

  render () {
    let {
      status,
      companiesFound
    } = this.state

    return (
      <div>
        <div>Status: { status }</div>
        { this.props.children }
        <button className='btn btn-primary' disabled={status !== 'sleeping'} onClick={e => this.initScraping()}>Init Scraping</button>
        <button className='btn btn-primary' disabled/* disabled={status !== 'sleeping'} */ onClick={e => this.saveData()}>Save Data</button>
        { (companiesFound && companiesFound.length > 0) && (
          <pre>
            <code>
              {
                jsBeautify(
                  JSON.stringify(companiesFound),
                  {
                    indent_size: 2,
                    space_in_empty_paren: true
                  }
                )
              }
            </code>
          </pre>
        ) }
      </div>
    )
  }
}

// const mapStateToProps = (state /*, ownProps*/) => {
//   return {
//     counter: state.counter
//   }
// }

export default Scraper
