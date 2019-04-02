const config = {
  sites: [
    {
      name: 'Paginas Amarillas (Argentina)',
      baseUrl: 'https://www.paginasamarillas.com.ar',
      params: {
        pagination: 'p-',
        noPaginateIndex: true,
        searchDir: 'buscar/q',
        keyWords: [
          'restaurantes',
          'zapaterias',
          'pizzerias',
          'pastelerias'
        ]
      },
      maxPages: 1
    }
    // {
    //   baseUrl: 'paginasamarillas.com.co',
    //   params: {
    //     pagination: 'p-',
    //     noPaginateIndex: true,
    //     searchDir: 'buscar/q',
    //     keyWords: [
    //       'restaurantes',
    //       'zapaterias'
    //     ]
    //   },
    //   maxPages: 4
    // },
    // {
    //   baseUrl: 'paginasamarillas.com.ecu',
    //   params: {
    //     pagination: 'p-',
    //     noPaginateIndex: true,
    //     searchDir: 'buscar/q',
    //     keyWords: [
    //       'restaurantes',
    //       'zapaterias'
    //     ]
    //   },
    //   maxPages: 4
    // }
  ],
  timeOut: 0
}

export default config
