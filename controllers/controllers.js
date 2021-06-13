'use strict';

const {User} = require('../model/User');
const {requestUsers} = require('../services/axios')


const getRandomUsers = async(req,res)=>{
    const results = Number(req.query.results) || 10;
      try{
        const randomUsers = await requestUsers(results);
        res.status(200).send({
          code : 200,
          status : "success",
          randomUsers
        });
      }catch(error){
        res.status(500).send({
            code : 500,
            status : "error",
            message : error.message
        });
      }
}



const addUser = async(req,res) =>{
    const {id,firstName,lastName,email,phoneNumber,picture} = req.body;
      if(Object.keys(req.body).length === 0 || !id || !firstName || !lastName || !email || !phoneNumber || !picture){
       return res.status(422).send({
          code : 422,
          status : "failed",
          message : "wrong body parameters"
        });
      }
      try {
        const userExist = await User.findOne({id});
        if(userExist) return res.status(409).send({
          code : 409,
          status : "failed",
          message : "user already exists"
        });   
        const createdUser = new User({id,firstName,lastName,email,phoneNumber,picture});
        const newUser = await createdUser.save();
        res.status(201).send({
          code: 201,
          status : "success",
          newUser,
          message : "user created"

        }) 
      } catch (error) {
          res.status(500).send({
          error : 500,
          status : "error",
          message : error.message
        })
      }
}

const deleteUser = async(req,res) =>{
  const {id} = req.body;
  if(Object.keys(req.body).legnth ===0 || !id){
    return res.status(422).send({
      code : 422,
      status : "failed",
      message : "wrong body parameters"
    })
  };
  try{
   let deletedUser =  await User.findOneAndDelete({id});
   if(deletedUser){
      res.status(201).send({
      code: 201,
      status: "success",
      message : "user deleted"
    });
  }else{
      res.status(404).send({
      code: 404,
      status : "failed",
      message : "user already deleted or doesn't exists"
    });
    
  }
  }catch(error){
      res.status(500).send({
      error : 500,
      stauts : "error",
      message : error.message
    })
  }
}

const getUsers = async(req,res) =>{
  try {
    const randomUsers = await requestUsers(5);
    const getAllUsers = await User.find({});
    res.status(200).send({
      code : 200,
      status : "success",
      random_Users: randomUsers,
      DB_Users  : getAllUsers
    });
  }catch(error) {
    res.status(500).send({
      code : 500,
      status : "error",
      message : error.message
  });
  }
}
 



module.exports = {
    getRandomUsers,
    addUser,
    deleteUser,
    getUsers
}
