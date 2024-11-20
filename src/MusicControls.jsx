import React, { useState, useEffect } from 'react';
import { playSong, music } from './Music';
import FileList from './FileList';
import RepeatButton from './RepeatButton';
import SongList from './SongList';

function MusicControls() {
    const filenames = FileList();
    const [count, setCount] = useState(0);
    const [index, setIndex] = useState(0);
    const [currentSong, setCurrentSong] = useState(null);
    const [isRepeating, setIsRepeating] = useState(false);

    const pauseAndPlay = (fileIndex) => {
        if (count % 2 === 0) {
            if (filenames[fileIndex] !== currentSong) {
                playSong(filenames[fileIndex]);
                setCurrentSong(filenames[fileIndex]);
            } else {
                music.play();
            }
        } else {
            music.pause();
        }
        setCount(count + 1);
    };

    const next = () => {
        music.pause();
        let newIndex = index + 1;
        if (newIndex >= filenames.length) {
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

    useEffect(() => {
        if (index >= 0 && index < filenames.length) {
            playNextSong(index);
        }
    }, [index]);

    useEffect(() => {
        const handleSongEnd = () => {
            console.log("Song ended, playing next song");

            if (isRepeating) {
                music.currentTime = 0;
                music.play();
            } else {
                setIndex(prevIndex => {
                    let newIndex = prevIndex + 1;
                    if (newIndex >= filenames.length) {
                        newIndex = 0;
                    }
                    return newIndex;
                });
            }
        };

        music.addEventListener("ended", handleSongEnd);

        return () => {
            music.removeEventListener("ended", handleSongEnd);
        };
    }, [isRepeating, filenames.length]);

    const toggleRepeat = () => {
        setIsRepeating(prev => !prev); 
    };

    return (
        <div>
            <button onClick={() => pauseAndPlay(index)}>
                {music.paused ? "Play" : "Pause"}
            </button>
            <button onClick={next}>Next</button>
            <button onClick={prev}>Prev</button>
            <RepeatButton isRepeating={isRepeating} toggleRepeat={toggleRepeat} />
            <h3>{filenames[index]}</h3>
            <SongList 
                filenames={filenames} 
                currentSong={currentSong} 
                pauseAndPlay={pauseAndPlay} 
            />
        </div>
    );
}

export default MusicControls;
