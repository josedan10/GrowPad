import axios from 'axios'
import fs from 'fs'
import path from 'path'
import moment from 'moment'

import config from './config'
import formatPage from './formats'
import React from 'react'

export default class Scraper extends React.Component {
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
      actualPage: 0,
      companiesFound: []
    }
    this.baseUrl = './src/scraper/results/'
    // this.scrapPage = this.scrapPage.bind(this)
    // this.updateProgress = this.updateProgress.bind(this)
    this.setMessage = this.setMessage.bind(this)
  }

  setMessage (msg) {
    this.props.setMessage(msg)
  }

  scrapPage (baseUrl, params, keyWord, page) {
    let { setMessage, state } = this
    return new Promise(function (resolve, reject) {
      setTimeout(async () => {
        console.log(setMessage)
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

  async scrapFunction () {
    let companiesFound = []
    const { sites } = this.state.config
    const start = moment()

    let site
    let actualPage = 1
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

    this.setState(prevState => ({
      ...prevState,
      status: 'sleeping',
      timeLapsed: finish
    }))
    this.setMessage(`Fetch data in ${finish}`)
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
    console.log(this)
    this.setState(prevState => (
      {
        ...prevState,
        percentage: (page * 100 / prevState.config.sites.length * prevState.config.sites.maxPages).toFixed(2),
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
      actualPage,
      config
    } = this.state

    let maxPages = 0
    config.sites.forEach(site => { maxPages += (site.maxPages * site.params.keyWords.length) })

    return (
      <div>
        <div>{ percentage }%</div>
        <div>Reviewed { actualPage }/{ maxPages * config.sites.length } pages</div>
        <dir>Status: { status }</dir>
        { companiesFound.length > 0 && (
          <pre>
            { companiesFound }
          </pre>
        ) }

        <button disabled={status !== 'sleeping'} onClick={e => this.initScraping()}>Init Scraping</button>
        <button disabled={status !== 'sleeping'} onClick={e => this.saveData()}>Review results</button>
      </div>
    )
  }
}

// scraping test
// let scraper = new Scraper()

// scraper.initScraping()
