'use strcit';

const {getRandomUsers, addUser} = require('../controllers/controllers')
  

module.exports = (app) =>{
    app.get('/random-users',getRandomUsers);
    app.post('/users',addUser);
}