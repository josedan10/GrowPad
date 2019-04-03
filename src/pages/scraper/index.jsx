import React, { Component } from 'react'
import Scraper from '../../components/scraper'
// import ScraperConfig from '../../components/scraper/ScraperConfig'
import AddSiteConfig from '../../components/scraper/AddSiteConfig'

export default class ScraperContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      msg: '',
      config: {
        sites: [
          {
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
    }
    this.child = React.createRef()
    this.setMessage = this.setMessage.bind(this)
  }

  setMessage (msg) {
    this.setState(prevState => (
      {
        ...prevState,
        msg
      }
    ))
  }

  render () {
    return (
      <div className='flex-container scraper-container'>
        <Scraper setMessage={this.setMessage}>
          <div className={'msg-scraper'}>{ this.state.msg }</div>
        </Scraper>
        <AddSiteConfig />
        {/* <ScraperConfig /> */}
      </div>
    )
  }
}
