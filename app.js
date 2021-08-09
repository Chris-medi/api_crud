const dotenv = require('dotenv');
dotenv.config();

let port = process.env.PORT || 3000 ||5400;

const express = require('express');
const app = express();


const cors = require('cors');
app.use(cors())


// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



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
