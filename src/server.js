const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocketServer = require('websocket').server;

const indexPath = path.join(__dirname,'/public/index.html');
const jsPath = path.join(__dirname,'../dist/bundle.js');
const cssPath = path.join(__dirname,'../dist/style.css');




let carData = [];
let clients = []





const server = http.createServer((req,res) => {
    if(req.url==="/"){
        fs.readFile(indexPath, (err, file) => {
            if(err) {
                res.send(500,{error: err});
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(file);
            res.end()
            
        })
    }

    if(req.url==="/bundle.js") {
        fs.readFile(jsPath, (err, file) => {
            if(err) {
               console.log("Error getting the javaScript")
            }
            res.writeHeader(200, {"Content-Type": "text/javascript"});
            res.write(file);
            res.end();
        })
    }


    if(req.url==="/styles.css") {
        fs.readFile(cssPath, (err, file ) => {
            if(err) {
                console.log("Error getting the css")
             }
             res.writeHeader(200, {"Content-Type": "text/css"});
             res.write(file);
             res.end();
        })
      
        
    }
});
server.listen(3000,'127.0.0.1');


const broadcastExcept = (action,data,connection) => {
    clients.map( socket => {

        if(!isEquivalent(connection,socket))
        socket.send(JSON.stringify(
            {
              action,
              data
          }));
    })
}

const broadcastAll = (action,data) => {
    clients.map( socket => {
        socket.send(JSON.stringify(
            {
              action,
              data
          }));
    })
}

const updateCars = (newData) => {
    return carData.map(car => {
        if(car.id === newData.id){
            return newData;
        }

        return car;
    })
}


const webSocketServer = new WebSocketServer({httpServer:server});

webSocketServer.on('request', request => {
    const data = {
        id: uuid(), 
        xPos: randomXPos(),
        yPos: randomXPos(),
        angle: randomAngle()
    }

    broadcastAll("NEW_PLAYER",data);

    var connection = request.accept('echo-protocol', request.origin);
    
    console.log((new Date()) + ' Connection accepted.');
    

    
    carData.push(data);
    console.log('8888888888888888888888888888888',carData);
    connection.send(JSON.stringify(
        {   
            action: 'INIATE',
            data,
            otherPlayerData:carData
      }))

    
    //   setInterval(() => {
    //       connection.send(JSON.stringify({
    //           action:"test",
    //           data:data.id
    //       }))
    //   }, 1000);

    clients.push(connection);
    connection.on('message', message => {
        const _message = JSON.parse(message.utf8Data);
        switch(_message.action){
            case "UPDATE_PLAYER":
                carData = updateCars(_message.data)
                console.log("New Canvas Positions", carData);
                broadcastExcept("UPDATE_CANVAS",_message.data,connection);
                break;
            default:
                // console.log(_message);
        }
        
    });


    connection.on('close', (reasonCode, description)  => {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});





const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

const randomXPos = () => {
    return Math.floor((Math.random() * 200) + 25);
}

const randomYPos = () => {
    return Math.floor((Math.random() * 200) + 25);
}



const randomAngle = () => {
    return Math.floor((Math.random() * 360));
}

const randomColor = () => {

}


function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}