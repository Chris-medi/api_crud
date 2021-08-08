const dotenv = require('dotenv');
dotenv.config();

let port = process.env.PORT || 3000 ||5400;

const express = require('express');
const app = express();


const cors = require('cors');
app.use(cors())

app.use(express.urlencoded({ extended: false} ));
app.use(express.json())


const connection = require('./database/connection');
const router  = require('./routers/router');

app.use('/person',router)

app.get('/',(req,res)=>{
    res.json({
        Message: "welcome to api project"
    })
})

app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    console.log("listening port: "+ port);

})
