const axios = require('axios')
const fs = require('fs')
const moment = require('moment')

const config = require('./config')
const formatPage = require('./formats')

class Scraper {
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
  constructor () {
    this.config = config
    this.isScraping = false
    this.companiesFound = []
  }

  scrapPage (baseUrl, params, keyWord, page) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        let completeUrl = `${baseUrl}/${params.searchDir}/${keyWord}/${(params.noPaginateIndex && page === 1) ? '' : params.pagination + page + '/'}`
        try {
          console.log(`Scraping page ${completeUrl}`)
          let response = await axios.get(completeUrl)
          let formatedData = await formatPage({ baseUrl, html: response.data })
          resolve(formatedData)
        } catch (error) {
          console.log(`Error fetching ${completeUrl}: ${error}`)
          reject(error)
        }
      }, this.config.timeOut)
    })
  }

  async initScraping () {
    this.companiesFound = []
    this.isScraping = true
    const { sites } = this.config
    const start = moment()

    let site
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
            this.companiesFound.push(response)
            page++
          } catch (error) {
            console.log(`Error scraping page.`)
            throw new Error(error)
          }
        } while (page <= site.maxPages)
      }
      console.log(`Scraping status: ${((i + 1) * 100 / sites.length).toFixed(2)}%`)
    }

    const finish = moment().from(start, true)

    this.isScraping = false
    console.log(`Fetch data in ${finish}`)
    this.saveData()
  }

  saveData () {
    if (this.isScraping) {
      console.log('Wait until the scraper finish to get the data')
    } else {
      fs.writeFileSync(
        `results/scrap-${moment().format('MMM D, YYYY - HH:mm')}-${this.companiesFound.length}`,
        JSON.encode(this.companiesFound),
        {
          encoding: 'UTF-8',
          mode: 'w'
        }
      )
    }
  }
}

// scraping test
let scraper = new Scraper()

scraper.initScraping()

module.exports = Scraper
