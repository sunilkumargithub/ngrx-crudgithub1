var mongoose=require('mongoose')
var jwt = require('jsonwebtoken')
var validator = require('validator');
var TusersSchema=new mongoose.Schema(
  { name:{type:String,required:true,trim:true},
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
    password:{
      type:String,
      trim:true,
      required:true,
      minlength:6
    },
    tokens:[{
      access:{
        type:String,
        required:true
      },
      token:{
        type:String,
        required:true
      }
    }]
})
TusersSchema.method.generateAuthToken= function(){
  var user=this
  var access='auth'
  var token=jwt.sign({_id:user._id.toHexString(),access},'123').toString()
  user.tokens.push({access,token})
  //tuser.tokens=tuser.tokens.concat([{access,token}])
  return user.save().then(()=>{
    return token
  })
}
var Tusers = mongoose.model('tusers',TusersSchema)
module.exports = {Tusers}
