import React from 'react';

import './css/car.css';
const Car = props => {
    const { id, yPos, xPos,angle } = props;



    
    return (
        <div className="car-main" style={{'top':`${yPos}px`,'left':`${xPos}`,'transform':`rotate(${angle}deg)`}} id={id} >

        </div>
    );
}


export default Car;