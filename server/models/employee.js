var mongoose=require('mongoose')
var validator = require('validator');
var employee = mongoose.model('employee',
{
  name:{type:String,required:true,trim:true},
  mobile:{type: Number,trim:true},
  email:{
    type:String,
    trim:true,
    minlength:1,
    required:true,
    unique:true,
    validate:{
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
    }
  },
  salary:{
    type:Number,
    trim:true,
    required:true
  }

  })
module.exports = {employee}
