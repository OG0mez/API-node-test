'use strcit';

const {getRandomUsers, addUser, deleteUser,getUsers} = require('../controllers/controllers')
  

module.exports = (app) =>{
    app.get('/random-users',getRandomUsers);
    app.get('/users',getUsers);
    app.post('/users',addUser);
    app.delete('/users', deleteUser);
    
}