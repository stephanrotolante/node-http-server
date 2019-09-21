import React, {useState, useLayoutEffect} from 'react';
const client = require('../../../client.js');



import './css/canvas.css';

const Canvas = props => {
    const { angle:a, xPos:x, yPos:y, id } = props;
    const [angle, setAngle] = useState(a);
    const [xPos, setXPos] = useState(x);
    const [yPos,setYPos] = useState(y);

    useLayoutEffect(() => {
    },[])

    useLayoutEffect(() => {
        console.log('xPos',xPos, 'yPos',yPos,'angle', angle,"cosine sine values", Math.cos(angle* Math.PI / 180.0),Math.sin(angle* Math.PI / 180.0));
        const car = document.getElementById(id).style;
        car.left = `${xPos}px`;
        car.top = `${yPos}px`;
        car.transform = `rotate(${angle}deg)`;
        client.send(JSON.stringify({action:"UPDATE_PLAYER",data:{id,xPos,yPos,angle}}));
    },[xPos,yPos,angle]);

    
    const handleKeyPress = event => {
        
        const { keyCode } = event;
    
        const xDirection = Math.cos(angle* Math.PI / 180.0);
        const yDirection = Math.sin(angle* Math.PI / 180.0)
     
        switch(keyCode) {
            case 37:
                setAngle(angle-5);
                break;
            case 38:
                setXPos(xPos+5*xDirection);
                setYPos(yPos+5*yDirection);
              
                break;
            case 39:
                setAngle(angle+5);
                break;
            case 40:
                setXPos(xPos-5*xDirection);
                setYPos(yPos-5*yDirection);
                break;
            default:

        }


    }
    return (
        <div className="canvas-main" onKeyDown={handleKeyPress} tabIndex="0">
            {props.children}
        </div>
    );
}

export default Canvas;