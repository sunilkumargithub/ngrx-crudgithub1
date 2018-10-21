var mongoose=require('mongoose')
var validator = require('validator');
var registeredusers = mongoose.model('registeredusers',
{
  email:{
    type:String,
    trim:true,
    minlength:1,
    required:false,
    unique:true,
    validate:{
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
    }
  },
  password:{
    type:String,
    trim:true,
    required:false,
    minlength:6
  },
  mobile:{
    type:Number,
    trim:true,
  },
  line1:{
    type:String,
    trim:true,
  },
  line2:{
    type:String,
    trim:true,
  },
  line3:{
    type:String,
    trim:true,
  },
  city:{
    type:String,
    trim:true,
  },
  state:{
  type:String,
  trim:true,
},
zipcode:{
type:Number,
trim:true,
},
  tokens:[{
    access:{
      type:String,
      required:true
    },
    tokens:{
      type:String,
      required:true
    }
  }]
  })

module.exports = {registeredusers}
