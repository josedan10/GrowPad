import axios from 'axios'
import moment from 'moment'
import jsBeautify from 'js-beautify'
import React from 'react'
import PropTypes from 'prop-types'

import config from './config'
import formatPage from './formats'

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
      config,
      status: 'sleeping',
      percentage: 0,
      page: 0,
      maxPages: 0,
      companiesFound: null
    }
    this.baseUrl = './src/scraper/results/'
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

  scrapPage (baseUrl, params, keyWord, page) {
    let { setMessage, state } = this
    return new Promise(function (resolve, reject) {
      setTimeout(async () => {
        // console.log(setMessage)
        let completeUrl = `${baseUrl}/${params.searchDir}/${keyWord}/${(params.noPaginateIndex && page === 1) ? '' : params.pagination + page + '/'}`
        try {
          // console.log(`Scraping page ${completeUrl}`)
          setMessage(`Scraping page ${completeUrl}`)
          let response = await axios.get(completeUrl)
          let formatedData = await formatPage({ baseUrl, html: response.data })
          resolve(formatedData)
        } catch (error) {
          // console.log(
          setMessage(`Error fetching ${completeUrl}: ${error}`)
          console.log(`Error fetching ${completeUrl}: ${error}`)
          reject(error)
        }
      }, state.config.timeOut)
    })
  }

  setMaxPages (maxPages) {
    this.setState(prevState => (
      {
        ...prevState,
        maxPages
      }
    ))
  }

  async scrapFunction () {
    let companiesFound = []
    const { sites } = this.state.config
    const start = moment()
    let maxPages = 0
    config.sites.forEach(site => { maxPages += (site.maxPages * site.params.keyWords.length) })
    this.setMaxPages(maxPages)

    let site
    let actualPage = 0
    let page
    let response
    let keyWord

    for (let i = 0; i < sites.length; i++) {
      site = sites[i]
      // For each site review the keywords

      for (let j = 0; j < site.params.keyWords.length; j++) {
        page = 1
        keyWord = site.params.keyWords[j]
        do {
          try {
            response = await this.scrapPage(site.baseUrl, site.params, keyWord, page)
            companiesFound = [...companiesFound, ...response]
            page++
            actualPage++
            this.updateProgress(actualPage)
          } catch (error) {
            this.setMessage(`Error scraping page.`)
            // throw new Error(error)
            return
          }
        } while (page <= site.maxPages)
      }
    }

    const finish = moment().from(start, true)

    console.log(companiesFound)

    this.setState(prevState => ({
      ...prevState,
      status: 'sleeping',
      timeLapsed: finish,
      companiesFound
    }))
    this.setMessage(`Fetched data in ${finish}`)
    // this.saveData()
  }

  initScraping () {
    this.setState(
      prevState => ({
        ...prevState,
        status: 'scraping'
      }),
      this.scrapFunction
    )
  }

  updateProgress (page) {
    this.setState(prevState => (
      {
        ...prevState,
        percentage: (page * 100 / prevState.maxPages).toFixed(2),
        page
      }
    ))
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
      percentage,
      status,
      companiesFound,
      page,
      maxPages,
      config
    } = this.state

    return (
      <div>
        <div>{ percentage }%</div>
        <div>Reviewed { page }/{ maxPages * config.sites.length } pages</div>
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
