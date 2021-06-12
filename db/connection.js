'use strict'

const mongoose = require('mongoose');

const url = `mongodb+srv://admin:P4ssw0rd@api-rest.qpdty.mongodb.net/Users?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

const connectDB = async()=>{
    try {
       await mongoose.connect(url,connectionParams);
       console.log("connnected to DB");
    } catch (error) {
        console.log("failed to conect");
        
    }
        
}

connectDB();

module.exports =  mongoose