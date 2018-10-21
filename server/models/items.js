var mongoose=require('mongoose')
var items = mongoose.model('ITEMS',{
  itemcode:{type:String,required:true,trim:true},
  itemdescription:{type: String,required:true,trim:true},
  itemprice:{type:Number},
  itemhazard:{type: Boolean,default:false},
  createdby: {type:String},
  creationdate:{type: Date, Default: new Date()},
  updatedby:{type: String},
  lastupdatedate:{type: Date,Default: new Date()}

  })
module.exports = {items}
