const axios = require('axios')
const moment = require('moment')

const formatPage = require('../helpers/formats')

const scrapPage = (baseUrl, params, keyWord, page, timeOut = 0) => {
  return new Promise(function (resolve, reject) {
    setTimeout(async () => {
      // console.log(setMessage)
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
    }, timeOut)
  })
}

const startScrap = async (req, res) => {
  const { config } = req.body.config
  let companiesFound = []
  const { sites } = config
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
          response = await scrapPage(site.baseUrl, site.params, keyWord, page)
          companiesFound = [...companiesFound, ...response]
          page++
        } catch (error) {
          console.log(`Error scraping page.`)
          res.status(500).send({
            msg: 'Error scraping page',
            error
          })
          throw new Error(error)
        }
      } while (page <= site.maxPages)
    }
  }

  const finish = moment().from(start, true)

  res.status(200).send({
    msg: `Fetched data in ${finish}`,
    data: companiesFound
  })
}

module.exports = {
  startScrap
}
