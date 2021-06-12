'use stric';

const axios = require('axios');


const requestUsers = async (results) =>{
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
        const UsersArray = filteredArray.map(({id:{value},name : {first,last},email,phone,picture:{large}})=>{
          return {
            id : value,
            firstName : first,
            lastName : last,
            email : email,
            phoneNumber : phone,
            picture : large
          }
        });
        return UsersArray;
    }catch(error){
        return error;
    }  
       
}


module.exports = {
    requestUsers
}