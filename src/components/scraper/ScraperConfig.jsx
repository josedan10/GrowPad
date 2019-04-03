import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import { addSiteToSearch, removeSiteToSearch } from '../../store/actions/scraperActions'

class ScraperConfig extends Component {
  static get propTypes () {
    return {
      scraper: PropTypes.object.isRequired
    }
  }
  render () {
    return (
      <div>
        <select>
          {this.props.scraper.sites.map((site) => <option key={site.name}>{site.name}</option>)}
        </select>
      </div>
    )
  }
}

const mapToStateProps = ({ scraper }) => {
  return {
    scraper
  }
}

export default connect(mapToStateProps)(ScraperConfig)
