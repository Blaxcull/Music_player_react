

const music = new Audio(); 
music.volume = 0.3

const playSong = (file) => {
 

  music.src = `src/assets/${file}`;

  music.play();
};

const Music = () => {
  return null;  
};

export default Music;
export { music, playSong };  
