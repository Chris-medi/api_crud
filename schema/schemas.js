const joi = require('joi');


const schema_user = joi.object().keys( {
    first_name:joi.string().required(),
    last_name:joi.string().required(),
    age:joi.string(),
    identification_number:joi.string().required(),
    email:joi.string().email(),
    avatar:joi.string().required()
})


const validate_user = (objeto) =>{
    let valid = schema_user.validate(objeto)
    // console.log(valid)
    return valid
 };


 module.exports = validate_user