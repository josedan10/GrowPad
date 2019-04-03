// Add new site to search config
export const ADD_SITE = 'ADD_SITE'
// Remove site from search config
export const REMOVE_SITE = 'REMOVE_SITE'
// Pass a new configuration to scrap this site
export const NEW_SCRAP_CONFIG = 'NEW_SCRAP_CONFIG'

/**
 * @description: pass a site object to add to search config
 *
 * @param {*} site
 */
export const addSiteToSearch = (site) => {
  return { type: ADD_SITE, site }
}

/**
 * @description: pass the index of the config to exclude of search
 *
 * @param {*} index
 * @returns
 */
export const removeSiteToSearch = (index) => {
  return { type: REMOVE_SITE, index }
}

/**
 * @description: pass a new config of site to scrap them
 *
 * @param {*} config
 * @returns
 */
export const newScrapConfig = (config) => {
  return { type: NEW_SCRAP_CONFIG, config }
}
