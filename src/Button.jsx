// Button.jsx
import React, { useState } from 'react';
import { music } from './Music';

function Button() {

    const [count,setcount] = useState(0);

    const pauseandplay=()=>{
        
        if(count%2 == 0){
            music.play();
            
        }
        else{
            music.pause();

        }
        setcount(count+1);
    }
 
    
    const Text = count % 2 === 0 ? "Play" : "Pause";


    return (
        <>
            <button onClick={pauseandplay}>{Text}</button>
            
        </>
    );
}

export default Button;
