const mongoose = require('mongoose')

const siteSchema = new mongoose.Schema({
  page: {
    type: String,
    unique: true,
    required: [true, 'The site name is required']
  },
  baseUrl: {
    type: String,
    unique: true,
    required: [true, 'The site url is required']
  },
  emailSelector: {
    type: String,
    required: [true, 'The email selector is required']
  },
  companySelector: {
    type: String,
    required: [true, 'The company selector is required']
  },
  location: {
    type: String,
    required: [true, 'The location is required']
  },
  pagEndPoint: String,
  websiteSelector: String,
  facebookSelector: String,
  instragramSelector: String,
  descriptionSelector: String,
  noPaginateIndex: {
    type: Boolean,
    required: [true, 'Specify if the paginate is required in index']
  }

}, { timestamps: true })

module.exports = mongoose.model('Site', siteSchema)
