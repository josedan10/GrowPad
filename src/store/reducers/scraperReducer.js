import {
  ADD_SITE,
  REMOVE_SITE,
  NEW_SCRAP_CONFIG
} from '../actions/scraperActions'

import config from '../../config'

import axios from 'axios'

// Set initial state from db

const getSiteNames = async () => {
  return axios
    .get(`${config.apiUrl}/sites/getSitesNames`)
    .then(res => res.data)
    .catch(error => console.log(error))
}

const initState = async () => {
  return {
    sites: await getSiteNames(),
    search: {
      sites: [],
      timeOut: 0
    }
  }
}

export default (state = initState, action) => {
  switch (action) {
    case ADD_SITE:
      return {
        ...state,
        search: {
          ...state.search,
          sites: [...state.search.sites, action.site]
        }
      }

    case REMOVE_SITE:
      return {
        ...state,
        search: {
          ...state.search,
          sites: [...state.search.sites.splice(action.index, 1)]
        }
      }

    case NEW_SCRAP_CONFIG:
      // Launch server config
      return {
        ...state,
        sites: [...state.site, action.site]
      }
    default:
      return state
  }
}
