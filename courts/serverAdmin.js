const http = require('http');
//importing the app.js from backend folder
const app = require('./backend/app');

const port = 3000;

app.set('port', port)

const server = http.createServer(app);

server.listen(port, ()=>{
    console.log("Port connected to: "+port);
});