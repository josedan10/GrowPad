const paginasAmarillas = require('./paginasamarillas.com')

const formatPage = async (page) => {
  try {
    switch (page.baseUrl) {
      case 'https://www.paginasamarillas.com.ar':
        let response = paginasAmarillas(page.html)
        return response

      default:
        console.log('Formato desconocido')
        break
    }
  } catch (error) {
    console.log(`Error formatting the data`)
    console.log(error)
  }
}

module.exports = formatPage
