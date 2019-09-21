import React, { useState, useLayoutEffect } from 'react';
import Car from './components/Car'
import Canvas from './components/Canvas';


export default props => {
        const [otherPlayers,setOtherPlayers] = useState([...props.otherPlayerData]);


        document.addEventListener('add-player', (event) => {            
                setOtherPlayers([...otherPlayers,<Car {...event.detail.data}/>])
        })

        useLayoutEffect(() => {
        },[otherPlayers])
        return (
                <Canvas {...props}>
                        <Car {...props} />
                        {otherPlayers.map((player,index) => {
                                return (
                                        <React.Fragment key={index}>
                                                {player}
                                        </React.Fragment>
                                )
                        })}
                </Canvas>
        );
}