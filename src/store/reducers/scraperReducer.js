import {
  ADD_SITE,
  REMOVE_SITE,
  NEW_SCRAP_CONFIG
} from '../actions/scraperActions'

// Set initial state from db

const initState = {
  sites: [],
  search: {
    sites: [],
    timeOut: 0
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
      // Launch firebase config
      return {
        ...state,
        sites: [...state.site, action.site]
      }
    default:
      return state
  }
}
