'use stricts';

const {mongoose} = require('../db/connection');

const userSchema = mongoose.Schema({
  'id': {type : String, require: true },
  'firstName': {type: String},
  'lastName': {type: String},
  'email': {type : String},
  'phoneNumber': {type: String},
  'picture': {type : String}

})

const User = mongoose.model('User',userSchema);

module.exports = {
  User
}