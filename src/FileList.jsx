// frontend/src/FileList.js
import React, { useEffect, useState } from 'react';

FileList=()=> {
  const [files, setFiles] = useState([]);
 

  useEffect(() => {
    fetch('http://127.0.0.1:5000/') 
      .then((response) => response.json()) 
      .then((data) => setFiles(data)); // Populate the files array with data from the API
  }, []);

 
  

  return (
    files
  );
}

export default FileList;
