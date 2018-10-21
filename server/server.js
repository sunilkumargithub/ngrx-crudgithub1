//https://api.darksky.net/forecast/89c59d9683d292fd4bf19803ea327e6f/37.8267,-122.4233
//crypto-js is used for hash like md5 and es6 just for understanding
// we will use jsonwebtoken for hash purpose
//
var port = process.env.PORT||4000
require('./db/config.js')
const _ =require('lodash')
const express=require('express')
const bodyParser=require('body-parser')

const {mongoose}=require('./db/mongoose.js')
const {ObjectID}=require('mongoose')
const {items}=require('./models/items.js')
const {users}=require('./models/users.js')
const {Tusers}=require('./models/tusers.js')
const {registeredusers}=require('./models/registeredusers.js')
const {vegItem}=require('./models/vegitem.js')
const {employee}=require('./models/employee.js')

var app = express()
app.use(bodyParser.json())
app.use(function (req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     res.setHeader('Access-Control-Allow-Credentials', true);
     next();
 });
 //----Registered user APis
 //------------------


 app.post('/vegItem',(req,res)=>{
  var body = _.pick(req.body,['itemname','itemdescription','imageurl','price'])
  console.log(body);
  var vegItems = new vegItem(body);
  vegItems.save().then((docs)=>{
    res.send(docs)
  }).catch((err)=>{
    res.send(err)
  })
})



app.get('/vegItem',(req,res)=>{
  console.log(req.query);
  const pagesize= +req.query.pagesize;
  const currentpage =req.query.page;
  const postquery=vegItem.find()
  let fetchedItem;
if(pagesize&&currentpage){
  postquery
  .skip(pagesize * (currentpage-1))
  .limit(pagesize)
}

  postquery.then((docs)=>{
    fetchedItem=docs;
    return vegItem.find();
  })
  .then(count =>{

    res.status(200).json({
      message:"gettin posts",
      posts:fetchedItem,
      maxItems:count
  });



    //res.send(docs)
  }).catch((err)=>{
    res.status(400).send(err)
  })
 })

 app.post('/registeredusers',(req,res)=>{
   var body = _.pick(req.body,['email','password','mobile','line1','line2','line3','city','state','zipcode'])
   var user = new registeredusers(body)
   user.save().then((docs)=>{
     res.send(docs)
   }).catch((err)=>{
     res.send(err)
   })
 })

app.get('/registeredusers',(req,res)=>{
 registeredusers.find().then((docs)=>{
   res.send({docs})
 }).catch((err)=>{
   res.status(400).send(err)
 })
})

app.post('/validateusers',(req,res)=>{
//console.log(`${req.params.email}:${req.params.password}`)
 registeredusers.findOne({email:req.body.email,password:req.body.password}).then((docs)=>{
   if(!(docs)){
     res.status(200).json({
         message:'invalid Auth',
         result:docs})
   }
   res.status(200).json({
       message:'valid Auth',
       result:docs})
  //res.send({docs})
 }).catch((err)=>{
   res.status(400).send({error:err })
 })
})

app.delete('/registeredusers',(req,res)=>{
 registeredusers.remove({email:req.body.email}).then((docs)=>{
   res.send({docs})
 }).catch((err)=>{
   res.status(400).send(err)
 })
})

app.patch('/registeredusers/:id',(req,res)=>{
   var body = _.pick(req.body,['email','password','mobile','line1','line2','line3','city','state','zipcode'])
   registeredusers.findByIdAndUpdate(req.params.id,{$set:body},{new:true}).then((docs)=>{
     if(!docs){
       return res.status(400).send('Unable to find record')
     }
     res.send({docs})
   }).catch((err)=>{
     res.status(400).send(err)
   })
})

//------------------
  app.post('/items',(req,res)=>{
    var item = new items({
      itemcode:req.body.itemcode,
      itemdescription:req.body.itemdescription
    })
    item.save().then((docs)=>{
      res.send(docs)
    }),(err)=>{
      res.send(err)
    }
  })
//------------------
  app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['name','mobile','email','password'])
    var user = new users(body)
    user.save().then((docs)=>{
      res.send(docs)
    }).catch((err)=>{
      res.status(400).send(err)
    })
  })

app.get('/users',(req,res)=>{
  users.find().then((docs)=>{
    res.send({docs})
  }).catch((err)=>{
    res.status(400).send(err)
  })
})

app.delete('/users',(req,res)=>{
  users.remove({email:req.body.email}).then((docs)=>{
    res.send({docs})
  }).catch((err)=>{
    res.status(400).send(err)
  })
})

app.patch('/users/:id',(req,res)=>{

  //var id = new ObjectID().req.params.id

   // if(!(ObjectID.isValid(id))){
   //  return res.send.status(404).send(`Invalid Objectid ${id}`)
   //  }ss
    var body = _.pick(req.body,['name','mobile'])

  users.findByIdAndUpdate(req.params.id,{$set:body},{new:true}).then((docs)=>{
      if(!docs){
        return res.status(400).send('Unable to find record')
      }
      res.send({docs})
    }).catch((err)=>{
      res.status(400).send(err)
    })
})
//--------------end users operations-----------
//---employee operations
//------------------
app.post('/employee',(req,res)=>{
  var body = _.pick(req.body,['name','mobile','email','salary'])
  var employees = new employee(body)
  employees.save().then((docs)=>{
    res.send(docs)
  }).catch((err)=>{
    res.status(400).send(err)
  })
})

app.get('/employee',(req,res)=>{
employee.find().then((docs)=>{
  res.send({
    message:'ok',
    employee:docs

  })
}).catch((err)=>{
  res.status(400).send(err)
})
})

app.delete('/employee/',(req,res)=>{
  console.log('id is' , req.query)
 //id= req.query;
  employee.remove(req.query).then((docs)=>{
  console.log('docs' ,docs.n)
  //res.send({docs})

  res.send({
    message:'ok',
    employee:docs

  })
}).catch((err)=>{
  res.status(400).send(err)
})
})

app.put('/employee/',(req,res)=>{
  var body = _.pick(req.body,['name','salary','mobile'])
  console.log('body:',body)
  console.log('params:',req.query)


  employee.findOneAndUpdate(req.query,{$set:body},{new:true}).then((docs)=>{
    if(!docs){
      return res.status(400).send('Unable to find record')
    }
    res.send({docs})
  }).catch((err)=>{
    res.status(400).send(err)
  })
})
//--------------end employee operations-----------


app.post('/tusers',(req,res)=>{
  var body = _.pick(req.body,['name','mobile','email','password'])
  var user = new Tusers(body)
  user.save().then(()=>{
    return user.generateAuthToken()
    //res.send(docs)

  }).then((token)=>{
    res.header('x-auth',token).send(user)
    //res.send(tuser)
  }).catch((err)=>{
    res.send(err)
  })
})

app.get('/tusers',(req,res)=>{
tusers.find().then((docs)=>{
  res.send({docs})
}).catch((err)=>{
  res.status(400).send(err)
})
})

app.delete('/tusers',(req,res)=>{
tusers.remove({email:req.body.email}).then((docs)=>{
  res.send({docs})
}).catch((err)=>{
  res.status(400).send(err)
})
})

app.patch('/tusers/:id',(req,res)=>{

//var id = new ObjectID().req.params.id

 // if(!(ObjectID.isValid(id))){
 //  return res.send.status(404).send(`Invalid Objectid ${id}`)
 //  }ss
  var body = _.pick(req.body,['name','mobile'])

tusers.findByIdAndUpdate(req.params.id,{$set:body},{new:true}).then((docs)=>{
    if(!docs){
      return res.status(400).send('Unable to find record')
    }
    res.send({docs})
  }).catch((err)=>{
    res.status(400).send(err)
  })
})

app.get('/user/me',(req,res)=>{
  var token = req.header('x-auth')

})
  app.listen(port,()=>{
  console.log(`DB Node Server Started on port ${port}....`)
})
