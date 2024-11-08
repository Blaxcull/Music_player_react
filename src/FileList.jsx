// frontend/src/FileList.js
import React, { useEffect, useState } from 'react';
import { playSong } from './Music'; // Import the playSong function

function FileList() {
  const [files, setFiles] = useState([]);
  const [playingFile, setPlayingFile] = useState(null); // Tracks the file that's currently playing

  useEffect(() => {
    fetch('http://127.0.0.1:5000/') 
      .then((response) => response.json()) 
      .then((data) => setFiles(data)); // Populate the files array with data from the API
  }, []);

  const handlePlay = (file) => {
    
      setPlayingFile(file); 
      playSong(file); 
    
  };

  return (
    <div className="FileList">
      <ul style={{ listStyleType: "none" }}>
        {files.map((file, index) => (
          <li key={index}>
            <button onClick={() => handlePlay(file)}>
              {playingFile === file ? 'Playing' : 'Play'}  
            </button> 
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
