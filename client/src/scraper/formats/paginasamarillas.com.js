const cheerio = require('cheerio')
const axios = require('axios')

const regExIg = /instagram.com/g
const regExFb = /facebook.com/g
const regExBadWebsite = /blogger.com|wix.com|wordpress.com/g

module.exports = async (html) => {
  try {
    // console.log('Formato de paginas amarillas')
    let $ = cheerio.load(html)
    let businesses = $('.businesses > li')

    return await Promise.all(
      businesses.map(async function () {
        let detailsResponse = await axios.get(encodeURI($(this).data('href')))
        let name = cheerio('h1[itemprop="name"]', detailsResponse.data).text()
        let location = 'Argentina'
        let email = cheerio('#mailAnunciante', detailsResponse.data).attr('value')
        let web = cheerio('#Web', detailsResponse.data).text().trim()
        let description = cheerio('.aboutinfo > p', detailsResponse.data).text()
        let observations = ''

        let website
        let facebook
        let instagram
        let weakness = []

        if (regExFb.test(web)) {
          facebook = web
          weakness.push('SEO')
          weakness.push('web design')
          observations += '\nDon\'t have website'
        } else if (regExIg.test(web)) {
          instagram = web
          weakness.push('SEO')
          weakness.push('web design')
          observations += '\nDon\'t have website'
        } else if (regExBadWebsite.test(web) || web === '') {
          weakness.push('SEO')
          weakness.push('web design')
          observations += '\nDon\'t have own domain name'
          website = web
        } else website = web

        let business = {
          name,
          location,
          email,
          website,
          facebook,
          instagram,
          weakness,
          description,
          observations,
          pageWereWasFound: 'paginasamarillas.com.ar'
        }
        return business
      }).get()
    )
  } catch (error) {
    console.log(`Error fetching some subpage`)
    console.log(error)
  }
}
