const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MONGO_URI = 'mongodb+srv://redlipped-batfish:GZZOEEuXyWYgyUik@cluster0.o55pjwp.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'users'
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  savedLocation: [{
    location: {type: String}
  }]
})

const User = mongoose.model('user', userSchema)

module.exports = User