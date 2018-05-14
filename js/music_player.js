var icons = document.getElementsByTagName('i');
var music = new Audio("media/audio/Always.mp3");

music.loop = true;
music.play(); 

function play() {
  music.play();    
}

function pause() {
  music.pause();        
}

function stop() {
  music.pause();
  music.currentTime = 0;    
}

icons[0].onclick = stop;
icons[1].onclick = pause;
icons[2].onclick = play;
