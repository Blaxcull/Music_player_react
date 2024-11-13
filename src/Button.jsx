import { playSong } from './Music';
import React, { useState, useEffect } from 'react';
import { music } from './Music';
import FileList from './FileList';

function Button() {
    const filenames = FileList();
    const [count, setCount] = useState(0);
    let [index, setIndex] = useState(0);
    const [currentSong, setCurrentSong] = useState(null);

    const pauseAndPlay = () => {
        if (count % 2 === 0) {
            
            if (filenames[index] !== currentSong) {
                playSong(filenames[index]);
                
                setCurrentSong(filenames[index]);
            } else {
                music.play();
            }
        } else {
            music.pause();
        }

        setCount(count + 1); 
        
    };

    const name = (index) => {
        return filenames[index];
    };

    const next = () => {
        
        music.pause();  

        let newIndex = index+1;
        if (newIndex>= filenames.length) {
            newIndex = 0;  
        }
        
        setIndex(newIndex); 
        
    };

    const prev = () => {
       
        music.pause();  

        let newIndex = index - 1;
        if (newIndex < 0) {
            newIndex = filenames.length - 1; 
        }
        setIndex(newIndex); 
        
    };

    const playNextSong = (newIndex) => {
        playSong(filenames[newIndex]);
        
        setCurrentSong(filenames[newIndex]);
    };

    const playing=()=>{
        if (music.paused){
            return "play"
        }
       
            return "pause"
        
    }

    useEffect(() => {
        if (index >= 0 && index < filenames.length) {
            playNextSong(index);  
        }
    }, [index]); 


    
    useEffect(() => {
        const handleSongEnd = () => {
        
                music.pause();  
        
                setIndex(index+1);
                index+=1 
                
        };
    
   
        music.addEventListener("ended", handleSongEnd);  
        
        
        return () => {
            
        music.removeEventListener("ended", handleSongEnd);
            
        };
    }, [music]);  

    return (
        <>
            <button onClick={pauseAndPlay}>{playing()}</button>
            <h3>{name(index)}</h3>
            <button onClick={next}>Next</button>
            <button onClick={prev}>prev</button>
        </>
    );
}

export default Button;
