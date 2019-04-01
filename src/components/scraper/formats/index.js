import paginasAmarillas from './paginasamarillas.com'

export default async (page) => {
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
