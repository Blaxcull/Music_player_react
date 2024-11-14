

const music = new Audio(); 
music.volume = 0.3
let currentSong = null;

const playSong = (file) => {  
   
    if (file !== currentSong) {
        music.src = `./src/assets/${file}`;
        currentSong = file; 
       
        music.play()
    }
    
};



const Music = () => {
  return null;  
};

export default Music;
export { music, playSong };  
