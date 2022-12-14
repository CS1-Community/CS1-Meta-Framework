require('dotenv').config();

var fs = require('fs'),
    https = require('https'),
    express = require('express');

var port = 8443;

var options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
};

var app = express();

var server = https.createServer(options, app).listen(port, function(){
  console.log("Express server listening on port " + port);
  console.log(`https://localhost:${port}`);
});

// app.get('/', function (req, res) {
//     res.writeHead(200);
//     res.end("hello world\n");
// });


//const express = require('express');  
//const app = express();  
//const http = require('http').Server(app); 
const io = require('socket.io')(server);
require('./socket/socket.js')(io);
require('./socket/addons/iot-api.js').setApp(app);
require('./admin/ide/ide-api.js').setApp(app);
app.use(express.static('public'));
if(process.env.PROD)
app.use(function(req, res, next) {
      if ((req.get('X-Forwarded-Proto') !== 'https')) {
        res.redirect('https://' + req.get('Host') + req.url);
      } else
        next();    
    });
app.get("/", function (request, response) {
  response.send('CS1 Game Server');
  //response.sendFile('./public/index.html',{root:'.'});
}); 
app.get("/admin", function (request, response) {
  response.send('Server Admin Console');
  //response.sendFile('admin.html',{root:'.'});
}); 
// app.set('port', (process.env.PORT || 5000));

// const default_config = {
//   test: "config testing"
// }

// const CS1Server = {
  
  
//   configure : (config)=>{
    
//     this.config = config; 
    
//   },
  
//   start : (config=default_config)=>{
    
//     http.listen(app.get('port'), ()=>{
//       console.log('GAME CONFIG:');
//       console.log(config);
//       console.log('CS1 Game Server listening on port',app.get('port'));
//       console.log(`CS1 Game Server ADMIN_KEY is ${process.env.ADMIN_KEY}.`);
//     });
    
    
//   }
  

  
// }


//module.exports = CS1Server
