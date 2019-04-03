const mongoose = require('mongoose')
const { ObjectId } = mongoose.SchemaTypes

const siteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The site name is required']
  },
  baseUrl: {
    type: String,
    required: [true, 'The site url is required']
  },
  emailSelector: {
    type: String,
    required: [true, 'The email selector is required']
  },
  pagEndPoint: String,
  facebookSelector: String,
  instragramSelector: String,
  descriptionSelector: String

}, { timestamps: true })

module.exports = mongoose.model('Site', siteSchema)
