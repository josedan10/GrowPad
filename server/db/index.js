const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/3Dmensional-clients', { useNewUrlParser: true },
  (error) => {
    if (error) {
      console.log('Error connecting to db.', error)
      return
    }

    console.log('Connected to db 3Dmensional-clients')
  }
)
