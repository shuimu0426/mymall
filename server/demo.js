let user = require('./User');
console.log(`userName:${user.userName}`);
console.log(`I'm ${user.userName},${user.sayHello()}`);

let http = require('http');
http.createServer((req,res)=>{
	res.statusCode = 200;
	res.setHeader('')
})
