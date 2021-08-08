const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORTHOST ||3000;

const express = require('express');
const app = express();


const cors = require('cors');
app.use(cors())

app.use(express.urlencoded({ extended: false} ));
app.use(express.json())


const connection = require('./database/connection');
const router  = require('./routers/router');

app.use('/person',router)




app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    console.log("listening port: "+ port);

})
