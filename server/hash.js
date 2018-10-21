//crpto-js this is just for understanding purpose
//we are not going to use this we will use jsonwebtoken in our project
const {SHA256}=require('crypto-js')
var jwt=require('jsonwebtoken')

var message='i am admin user'
var hash =SHA256(message).toString()
console.log(`message:${message}`)
console.log(`hash:${hash}`)
var data = {
  id:4
}

var token= {
  data,
  hash:SHA256(JSON.stringify(data)+'secret').toString()
}
// token.data.id=5
// token.data.hash=SHA256(JSON.stringify(token.data)).toString()

var hashresult=SHA256(JSON.stringify(token.data)+'secret').toString()

if(hashresult===token.hash){
  console.log(`has data not changed...`)
} else {
    console.log(`hash data changed...`)
}

var jdata = {
  id:10
}
var jtoken=jwt.sign(jdata,'Root@123')
var jdecoded=jwt.verify(jtoken,'Root@1234')

console.log(token)
console.log(jdecoded)
