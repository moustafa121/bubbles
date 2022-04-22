const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Circle(x, y, dx, dy, r, c) {
  this.x = x;
  this.y = y;
  this.dx = dx * (Math.floor(Math.random() * 2 + 1) == 1 ? 1 : -1);
  this.dy = dy * (Math.floor(Math.random() * 2 + 1) == 1 ? 1 : -1);
  this.c = c;
  this.r = r;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = c;
    ctx.fill();

    if (this.x - r + dx < 0 || this.x + r + dx > canvas.width) {
      this.dx = -this.dx;
    }

    if (this.y - r + dy < 0 || this.y + r + dy > canvas.height) {
      this.dy = -this.dy;
    }
  };
}

const balls = [];

for (let i = 0; i < 20; i++) {
  createCircle("red");
}

animate();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => {
    ball.x += ball.dx;
    ball.y += ball.dy;
    ball.draw();
  });
  requestAnimationFrame(animate);
}

function createCircle(color) {
  var r = Math.floor(Math.random() * 30) + 15;
  var x = Math.floor(Math.random() * (canvas.width - 2 * r)) + r;
  var y = Math.floor(Math.random() * (canvas.height - 2 * r)) + r;
  var dx = Math.floor(Math.random() * 5 + 1);
  var dy = Math.floor(Math.random() * 5 + 1);
  var redCircle = new Circle(x, y, dx, dy, r, color);
  redCircle.draw();
  balls.push(redCircle);
}

canvas.addEventListener("mousedown", (e) => {
  var r = Math.floor(Math.random() * 30) + 15;
  if (
    e.clientX - r >= 0 &&
    e.clientY - r >= 0 &&
    e.clientX + r <= canvas.width &&
    e.clientY + r <= canvas.height
  ) {
    var dx = Math.floor(Math.random() * 5 + 1);
    var dy = Math.floor(Math.random() * 5 + 1);
    var blueCircle = new Circle(e.clientX, e.clientY, dx, dy, r, "blue");
    blueCircle.draw();
    balls.push(blueCircle);
  }
});
