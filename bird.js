class Bird {
  constructor() {
    this.position = {
      x: canvas.width / 2,
      y: 0,
    };

    this.velocity = {
      x: 0,
      y: 2,
    };

    this.size = {
      width: 50,
      height: 50,
    };

    this.isDead = false;

    this.acceleration = 0.2;
    this.img = new Image();
    this.img.src = "./images/flappy-bird.png";

    this.flySound = new Audio();
    this.flySound.src = "./sounds/fly.mp3";
  }

  draw() {
    c.beginPath();
    c.fillStyle = "red";
    c.drawImage(
      this.img,
      this.position.x - this.size.width / 2,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  borderCollision() {
    if (this.position.y + this.size.width >= canvas.height) {
      this.position.y = canvas.height - this.size.width;
      this.isDead = true;
    }
  }

  jump() {
    if (!this.isDead) {
      this.velocity.y = -2;
      this.flySound.play(); // Play the "fly" sound when the bird jumps.
    }
  }

  move() {
    this.velocity.y += this.acceleration;
    this.position.y += this.velocity.y;
  }

  update() {
    this.draw();

    if (!this.isDead) {
      this.move();
      this.borderCollision();
    }
  }
}
