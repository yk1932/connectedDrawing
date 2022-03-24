let express = require('express');
let http = require('http');
let io = require('socket.io');

let app = express();
let server = http.createServer(app); // wrap the express app with http
io = new io.Server(server); // use socket.io on the http app

app.use('/', express.static('public'));

//when a socket connects, take the socket object in call back, and display the id in the server
io.sockets.on('connection',(socket)=>{
    console.log("we have a new client: ", socket.id);

    //drop a message on the server when th eserver disconnects
    socket.on('disconnect', ()=> {
        console.log('socket has been disconnected: ', socket.id);
    })

    //listen for a message from this client
    socket.on('mousePositionData', (data) => {
        console.log(data);
        io.sockets.emit('mouseDataFromServer', data);
    })
})


// server listening on port
server.listen(8000, () => {
  console.log("server is up and running")
})

//Ensure that the server gas sockets [done]
//Make sure server acknowledges client joining
//Make client join server

//1. client has to send the message to the server (.emit)
//2. server has to receive and process this information (on)
//3. server emits information to all clients
//4. client does something when it gets the information back (on)