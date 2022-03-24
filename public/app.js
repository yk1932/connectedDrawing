let socket = io(); //opens and connects to the socket

//p5 variables
let r,g,b;

//listen for confirmation
socket.on('connect',()=>{
    console.log('connected to the server via sockets');
})

// PS Code
function setup() {
    createCanvas(400, 400);
    background(220);
    r = random(0,255);
    g = random(0,255);
    b = random(0,255);
    socket.on('mouseDataFromServer', (data) => {
        console.log(data);
        drawEllipseWithData(data);
    })
  }

//emit information of mouse position everything i move mouse

function mouseDragged() {
    // ellipse(mouseX, mouseY, 10, 10);
    let mousePos = {
        x:round(mouseX), 
        y:round(mouseY),
        red:r,
        blue:b,
        green:g
    }; //round to integer

    //emit this information to the server 
    socket.emit('mousePositionData',mousePos); //important!
}

function drawEllipseWithData(data){
    fill(data.red,data.blue,data.green);
    ellipse(data.x,data.y,20,20);
}

// add a disconnect function on the server so that you know when the sockets disconnect
// in the client side, write a function to draw on mouse dragged
// within the mouse drag function emit the mousePos information with the label mousePositionData
// in the server, get the information (index.js)
// now, the server has to send this info to the clients