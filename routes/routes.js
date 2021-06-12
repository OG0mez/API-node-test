'use strcit';

const {getRandomUsers, addUser, deleteUser} = require('../controllers/controllers')
  

module.exports = (app) =>{
    app.get('/random-users',getRandomUsers);
    app.post('/users',addUser);
    app.delete('/users', deleteUser)
}