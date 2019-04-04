const SiteModel = require('../db/models/Site')

const getAll = async (req, res) => {
  try {
    res.status(200).send({
      msg: 'Successfull request',
      data: await SiteModel.find({})
    })
  } catch (error) {
    let msg = 'Error getting sites'
    console.log(msg)
    console.log(error)
    res.status(500).send({
      msg,
      error
    })
  }
}

const newSite = async (req, res) => {
  try {
    let { data } = req.body
    await SiteModel.create(data)
    res.status(200).send({
      msg: 'Added new site config.'
    })
  } catch (error) {
    let msg = 'Error creating new site configuration'
    console.log(msg)
    console.log(error)
    res.status(500).send({
      msg,
      error
    })
  }
}

module.exports = {
  getAll,
  newSite
}
