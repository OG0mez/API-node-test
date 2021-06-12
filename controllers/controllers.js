'use strict';
var axios = require('axios');
const { json } = require('body-parser');


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
            lasName : last,
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



module.exports = {
    getRandomUsers
}