const mysql = require('mysql');

const config = {
  host:process.env.HOST,
  database: process.env.DATABASE,
  user:process.env.USERDATABASE,
  password:process.env.PASSWORD,
  port: process.env.PORT
}

console.log(config)


var connection = mysql.createConnection(config)


connection.connect((err)=>{
    if(err){
        console.log("error base de datos " + err)
        // handleDisconnection()
    }
    console.log('conection success')
  })
  

setInterval(function () {
  connection.query('SELECT * FROM Users',(err,rows) => {
    
  });
}, 10000); 


module.exports = connection