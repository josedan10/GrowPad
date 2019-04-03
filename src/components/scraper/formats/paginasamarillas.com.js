import cheerio from 'cheerio'
import axios from 'axios'

const regExIg = /instagram.com/g
const regExFb = /facebook.com/g
const regExBadWebsite = /blogger.com|wix.com|wordpress.com/g

const getCompanyData = (response) => {
  let name = cheerio('h1[itemprop="name"]', response).text().trim()
  let location = 'Argentina'
  let email = cheerio('#mailAnunciante', response).attr('value')
  let web = cheerio('#Web', response).text().trim()
  let description = cheerio('.aboutinfo > p', response).text()

  return {
    name,
    location,
    email,
    web,
    description
  }
}

const verifyWebsite = (web) => {
  let website
  let facebook
  let instagram
  let observations = ''
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

  return {
    observations,
    website,
    instagram,
    facebook,
    weakness
  }
}

const reviewWebsite = (link) => {
  console.log(link)
}

export default async (html) => {
  try {
    // console.log('Formato de paginas amarillas')
    let $ = cheerio.load(html)
    let businesses = $('.businesses > li')
    return await Promise.all(
      businesses.map(async function () {
        let detailsResponse = await axios.get(encodeURI($(this).data('href')))
        let data = getCompanyData(detailsResponse.data)
        let { web, ...info } = data
        let accounts = verifyWebsite(web)

        if (accounts.website) {
          let webPage = await axios.get(accounts.link)
          let analisys = reviewWebsite(webPage.data)
          accounts.observations = [...accounts.observations, ...analisys.observations]
        }

        return {
          ...info,
          ...accounts,
          pageWereWasFound: 'paginasamarillas.com.ar'
        }
      }).get()
    )
  } catch (error) {
    console.log(`Error fetching some subpage`)
    console.log(error)
  }
}
