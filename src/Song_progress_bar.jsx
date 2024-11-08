// Song_progress_bar.jsx
import React, { useEffect, useRef, useState } from 'react';
import { music } from './Music';
import TimeDisplay from './TimeDisplay.jsx'; // Import TimeDisplay component

function Song_progress_bar() {
    const [width, setWidth] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const progressBarRef = useRef(null);

    useEffect(() => {
        const handleLoadedMetadata = () => {
            setDuration(music.duration);
        };

        const increaseWidth = () => {
            const percentage = (music.currentTime / duration) * 100;
            setWidth(percentage);
        };

        const handleCurrentTime = () => {
            setCurrentTime(music.currentTime);
            increaseWidth();
        };

        music.addEventListener('loadedmetadata', handleLoadedMetadata);
        music.addEventListener('timeupdate', handleCurrentTime);

        return () => {
            music.removeEventListener('loadedmetadata', handleLoadedMetadata);
            music.removeEventListener('timeupdate', handleCurrentTime);
        };
    }, [duration]);

    const handleDrag = (event) => {
        const rect = progressBarRef.current.getBoundingClientRect();
        const newWidth = ((event.clientX - rect.left) / rect.width) * 100;
        const clampedWidth = Math.min(Math.max(newWidth, 0), 100);

        setWidth(clampedWidth);
        const newTime = (clampedWidth / 100) * duration; 
        music.currentTime = newTime; 
        setCurrentTime(newTime); 
    };

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

    // Internal progress bar component
    const ProgressBar = () => {
        return (
            <div 
                className="progress_bar" 
                ref={progressBarRef} 
                onMouseDown={handleMouseDown} 
                
            >
                <div className="progress_fill" style={{ width: `${width}%` }}>
                    <div className='dot'></div>
                </div>
            </div>
        );
    };

    return (
        <>
            <ProgressBar />
            <TimeDisplay currentTime={currentTime} duration={duration} />
        </>
    );
}

export default Song_progress_bar;
