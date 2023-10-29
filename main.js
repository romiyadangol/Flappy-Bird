const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

let gameScore = 0;
let isGameOverSoundPlayed = false; 

// Audio
const gameOver = new Audio();
gameOver.src = "./sounds/lose.wav";

const scor = new Audio();
scor.src = "./sounds/score.mp3";


const bird = new Bird();
const pipe = new Pipe();
const bg = new Background(0, 0);
const bg2 = new Background(bg.size.width, 0);

function drawScore(){
  if (bird.isDead) {
    c.fillStyle = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black background.
    c.fillRect(0, canvas.height / 2 - 50, canvas.width, 100);
    c.font = "40px Verdana";
    c.fillStyle = "white";
    c.textAlign = "center";
    c.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 10);
    c.font = "30px Verdana";
    c.fillText("Score: " + gameScore, canvas.width / 2, canvas.height / 2 + 30);
}
}

// game loop
function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  // game logic
  bg.update(bird.isDead);
  bg2.update(bird.isDead);
  pipe.update();
  bird.update();

  c.beginPath();
  c.fillStyle = "white";
  c.font = "30px sans serif";
  c.fillText(gameScore, canvas.width / 2 - 15, 50);

   // Call the function to draw the stylized score display
   drawScore();

  if (bird.isDead) {
    if (!isGameOverSoundPlayed) {
        gameOver.play();
        isGameOverSoundPlayed = true;
    }
    clearInterval(intervalId);
}
requestAnimationFrame(animate);
}

const intervalId = setInterval(() => {
gameScore++;
scor.play(); // Play the "score" sound when the game score increases.
}, 1000);

document.addEventListener("keydown", () => {
bird.jump();
});
animate();