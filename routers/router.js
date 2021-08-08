const express = require('express');
const connection = require('../database/connection');
const router = express.Router();

const {nanoid} = require('nanoid');

const validate_user = require('../schema/schemas')

router.get('/users',(req,res)=>{

    connection.query('SELECT * FROM Users',(err,rows)=>{
        if(err){
            res.status(500).json({
                status: "false",
                response: "false",
                message: "Serve error"
            }) 
        }
        res.json({
            status: "true",
            response: "true",
            peopleList:rows
            
        }) 

    })

})


router.post('/user',(req,res)=>{
        const {body} = req
        const validate = validate_user(body);
        if(validate.error==null){
            const sql = 'INSERT INTO Users(_id, first_name, last_name, age, identification_number, email, avatar) VALUES (?,?,?,?,?,?,?)'
            const {first_name,last_name,age,identification_number,email,avatar} = body
            let _age;
            let _email;
            if(!age){
                _age = "underfined"
            }else{
                _age = age
            }
            if(!email){
                _email="underfined"
            }else{
                _email = email
            }
            const data = [nanoid(),first_name,last_name,_age,identification_number,_email,avatar]
            connection.query(sql,data,(err,rows)=>{
            
                    if(err){
                        res.status(500).json({
                            status: "false",
                            response: "false",
                            message: "Serve error" + err
                        }) 
                    }
                    res.json({
                        status: "true",
                        response: "true",
                        message: "User create success"
                    }) 
            })
        }else{
            res.status(400).json({
                message: "data invalidad",
                error: validate.error.details[0].message
            })
        }
})

router.delete('/user/:id',(req,res)=>{
    const {id} = req.params
    const sql = 'DELETE FROM `Users` WHERE _id = ?'
    connection.query(sql,[id],(err,rows)=>{
            if(!err){
                res.json({
                    status: "true",
                    response: "true",
                    message: "User delete success"
                }) 
            }
            res.status(500).json({
                status: "false",
                response: "false",
                message: "Serve error"
            }) 
    })
})

router.put('/user/:id',(req,res)=>{
    const {id} = req.params
    const {body} = req
    const validate = validate_user(body);
    if(validate.error == null){
        const sql = 'UPDATE `Users` SET `first_name`=?,`last_name`= ?,`age`= ?,`identification_number`= ?,`email`= ? ,`avatar`= ? WHERE _id = ?'
        const {first_name,last_name,age,identification_number,email,avatar} = body
        let _age;
        let _email;
        if(!age){
            _age = "underfined"
        }else{
            _age = age
        }
        if(!email){
            _email="underfined"
        }else{
            _email = email
        }
        const data = [first_name,last_name,_age,identification_number,_email,avatar,id]
        connection.query(sql,data,(err,rows)=>{
                if(err){
                    res.status(500).json({
                        status: "false",
                        response: "false",
                        message: "Serve error" + err
                    }) 
                }
                res.json({
                    status: "true",
                    response: "true",
                    message: "User update success"
                }) 
        })
    }else{
        res.status(400).json({
            message: "data invalidad",
            error: validate.error.details[0].message
        })
    }
})

module.exports = router;