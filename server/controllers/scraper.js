// scrapPage (baseUrl, params, keyWord, page) {
//   let { setMessage, state } = this
//   return new Promise(function (resolve, reject) {
//     setTimeout(async () => {
//       // console.log(setMessage)
//       let completeUrl = `${baseUrl}/${params.searchDir}/${keyWord}/${(params.noPaginateIndex && page === 1) ? '' : params.pagination + page + '/'}`
//       try {
//         // console.log(`Scraping page ${completeUrl}`)
//         setMessage(`Scraping page ${completeUrl}`)
//         let response = await axios.get(completeUrl)
//         let formatedData = await formatPage({ baseUrl, html: response.data })
//         resolve(formatedData)
//       } catch (error) {
//         // console.log(
//         setMessage(`Error fetching ${completeUrl}: ${error}`)
//         console.log(`Error fetching ${completeUrl}: ${error}`)
//         reject(error)
//       }
//     }, state.config.timeOut)
//   })
// }

// setMaxPages (maxPages) {
//   this.setState(prevState => (
//     {
//       ...prevState,
//       maxPages
//     }
//   ))
// }

// async scrapFunction () {
//   let companiesFound = []
//   const { sites } = this.state.config
//   const start = moment()
//   let maxPages = 0
//   config.sites.forEach(site => { maxPages += (site.maxPages * site.params.keyWords.length) })
//   this.setMaxPages(maxPages)

//   let site
//   let actualPage = 0
//   let page
//   let response
//   let keyWord

//   for (let i = 0; i < sites.length; i++) {
//     site = sites[i]
//     // For each site review the keywords

//     for (let j = 0; j < site.params.keyWords.length; j++) {
//       page = 1
//       keyWord = site.params.keyWords[j]
//       do {
//         try {
//           response = await this.scrapPage(site.baseUrl, site.params, keyWord, page)
//           companiesFound = [...companiesFound, ...response]
//           page++
//           actualPage++
//           this.updateProgress(actualPage)
//         } catch (error) {
//           this.setMessage(`Error scraping page.`)
//           // throw new Error(error)
//           return
//         }
//       } while (page <= site.maxPages)
//     }
//   }

//   const finish = moment().from(start, true)

//   console.log(companiesFound)

//   this.setState(prevState => ({
//     ...prevState,
//     status: 'sleeping',
//     timeLapsed: finish,
//     companiesFound
//   }))
//   this.setMessage(`Fetched data in ${finish}`)
//   // this.saveData()
// }

// initScraping () {
//   this.setState(
//     prevState => ({
//       ...prevState,
//       status: 'scraping'
//     }),
//     this.scrapFunction
//   )
// }

// updateProgress (page) {
//   this.setState(prevState => (
//     {
//       ...prevState,
//       percentage: (page * 100 / prevState.maxPages).toFixed(2),
//       page
//     }
//   ))
// }
