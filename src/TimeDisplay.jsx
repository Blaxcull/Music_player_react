// TimeDisplay.jsx
import React from 'react';

function TimeDisplay({ currentTime, duration }) {

    const minutes = (time) => {
        let min = 0;
        let sec = time;
    
        while (sec >= 60) {
            min += 1;
            sec -= 60; // Subtract 60 seconds from sec
        }
        const formatedmin = min>10 ? `0${min}`: min;
        const formatedsec = sec<10 ? `0${sec}`: sec;

        return `${formatedmin}:${formatedsec}`;
    };

    

    return (
        <div className='time'>
         <h3>
            {minutes(Math.floor(currentTime))}</h3>
            
        <h3>
            {minutes(Math.floor(duration))} 
        </h3>
        
        </div>
       
    );
}

export default TimeDisplay;
