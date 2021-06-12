'use strcit';

module.exports = (app) =>{
    app.get('/',(req,res)=>{
        res.status(200).send({
            code : '200',
            message : 'welcome to express'
        });
    })
}