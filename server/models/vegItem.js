var mongoose=require('mongoose')
var validator = require('validator');
var vegItem = mongoose.model('vegItem',
{
  itemname:{
    type:String,
    trim:true,
    minlength:1,
    required:false,
    unique:false,

  },
itemdescription:{
    type:String,
    trim:false,
    required:false,
    minlength:1
  },
  imageurl:{
    type:String,
    trim:false,
    required:false,
    minlength:1
  },
  price:{
    type:String,
    trim:false,
    required:false,
    minlength:1
  },
  })

module.exports = {vegItem}
