'use strict';
var axios = require('axios');
const {User} = require('../model/User');



const getRandomUsers = async(req,res)=>{
    const results = Number(req.query.results) || 10;
    const config = {
        method: 'get',
        url: `https://randomuser.me/api?results=${results}&inc=gender,name,id,email,phone,picture`,
        headers: { }
      };
      try{
        const result = await axios(config);
        const filteredArray = Object.values(result.data.results).filter(({id})=>{
          return id.value != null
        })
        const UsersArray = filteredArray.map(({id:{value},name : {first,last}, gender,email,phone,picture:{large}})=>{
          return {
            id : value,
            firstName : first,
            lastName : last,
            email : email,
            phoneNumber : phone,
            picture : large
          }
        }); 
        res.status(200).send(JSON.stringify(UsersArray));
      }catch(error){
        res.status(500).send({
            code : 500,
            message : error.message
        })
      }
}



const addUser = async(req,res) =>{
    const {id,firstName,lastName,email,phoneNumber,picture} = req.body;
      if(Object.keys(req.body).length === 0){
       return res.status(422).send({
          code : 422,
          message : "wrong body parameters"
        });
      }
      try {
        const userExist = await User.findOne({id});
        if(userExist) return res.status(409).send({
          code : 409,
          message : "user already exists"
        });   
        const createdUser = new User({id,firstName,lastName,email,phoneNumber,picture});
        const newUser = await createdUser.save();
        res.status(201).send({
          code: 201,
          newUser,
          message : "user created!"

        }) 
      } catch (error) {
        res.status(500).send({
          error : 500,
          message : error.message
        })
      }
}


module.exports = {
    getRandomUsers,
    addUser
}