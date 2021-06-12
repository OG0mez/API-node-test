'use strcit';

const {getRandomUsers} = require('../controllers/controllers')  

module.exports = (app) =>{
    app.get('/random-users',getRandomUsers);
}