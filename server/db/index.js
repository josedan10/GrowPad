const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/3dmensional-clients', { useNewUrlParser: true },
  (error) => {
    if (error) {
      console.log('Error connecting to db.', error)
      return
    }

    console.log('Connected to db 3dmensional-clients')
  }
)
