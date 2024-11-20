import React, { useState, useRef } from 'react';
import { music } from './Music';

const Volume = () => {
    const [count, setCount] = useState(0.3);
    const [width, setWidth] = useState(30);

    const volmore = () => {
        const newCount = Math.min(count + 0.1, 1);
        const newWidth = Math.min(newCount * 100, 100);
        music.volume = newCount;

        setWidth(newWidth);
        setCount(newCount);
        console.log(newCount);
    };

    const volless = () => {
        const newCount = Math.max(count - 0.1, 0);
        const newWidth = Math.max(newCount * 100, 0);
        music.volume = newCount;

        setWidth(newWidth);
        setCount(newCount);
        console.log(newCount);
    };

    const handleDrag = (event) => {
        const rect = progressBarRef.current.getBoundingClientRect();
        const newWidth = ((event.clientX - rect.left) / rect.width) * 100;
        const clampedWidth = Math.min(Math.max(newWidth, 0), 100);

        setWidth(clampedWidth);
        setCount(clampedWidth / 100);
        music.volume = clampedWidth / 100;
        console.log(music.volume);
    };


    const progressBarRef = useRef(null);
    const handleMouseDown = (event) => {
        handleDrag(event);

  
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };
    const handleMouseMove = (event) => {
        handleDrag(event); 
    };
    const handleMouseUp = () => {
      
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };


    const ProgressBar = () => {
        return (
            <div
                className="volume_progress_bar"
                onMouseDown={handleMouseDown}
                ref={progressBarRef} >
                <div
                    className="volume_progress_fill"
                    style={{ width: `${width}%` }}>
                         <div className='dot'></div>
                    </div>
                
            </div>
            
        );
    };

    return (
        <>
       
        <br />
        <div className='volume_buttons'>
            <button onClick={volmore}>Volume +</button>
            <br /><br />
            <div className='volumebar'><ProgressBar /></div>
            <br />
            <button onClick={volless}>Volume -</button>
            
            </div>
            <br />
           
            
        </>
    );
};

export default Volume;
