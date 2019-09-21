import React from 'react';
const client = require('../client.js');
import ReactDOM from 'react-dom';
import Car from './components/Car';
import App from './App';


client.onopen = () => {
    console.log("Browser connected to the server!!");

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


client.onmessage = (e) => {
    // console.log(e)
    const {action, data, otherPlayerData} = JSON.parse(e.data);
    switch(action){
        case "INIATE":
            console.log("iniate")
            const otherCars = otherPlayerData.map(other =>  !isEquivalent(data,other)  && <Car {...other}/>)
            ReactDOM.render(<App {...data} otherPlayerData={otherCars}/>,document.getElementById('root'));
            break;
        case "NEW_PLAYER":
            console.log("new-player")
            document.dispatchEvent(new CustomEvent('add-player',{
                detail: {
                  data
                }
              }));
            break;
        case "UPDATE_CANVAS":
            console.log('update')
            const modifiedCar = document.getElementById(data.id);
            modifiedCar.style.top = data.yPos;
            modifiedCar.style.left = data.xPos;
            modifiedCar.style.transform = `rotate(${data.angle}deg)`
            break;
        default:
            console.log(data);
    }
    
};


    