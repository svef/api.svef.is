var koa = require('koa');
var app = koa();

app.use(function *(){
  this.body = {message: 'Hello World! Koa.js on Google App Engine.'};
});

app.listen(process.env.PORT || 8080);
