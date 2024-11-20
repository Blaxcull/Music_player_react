import React from 'react';

function SongList({ filenames, currentSong, pauseAndPlay }) {
    return (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
            {filenames.map((file, fileIndex) => (
                <li key={fileIndex} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => pauseAndPlay(fileIndex)}>
                        {currentSong === file ? "Playing" : "Play"}
                    </button>
                    {file}
                    <br />
                </li>
            ))}
        </ul>
    );
}

export default SongList;
