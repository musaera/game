document.addEventListener("DOMContentLoaded", () => {
  const player1 = document.getElementById("player1");
  const player2 = document.getElementById("player2");
  const ball = document.getElementById("ball");
  const goal1 = document.getElementById("goal1");
  const goal2 = document.getElementById("goal2");
  const score1Element = document.getElementById("score1");
  const score2Element = document.getElementById("score2");
  const timerElement = document.getElementById("timer");

  let score1 = 0;
  let score2 = 0;
  let ballSpeedX = 5;
  let ballSpeedY = 3;
  let gameInterval;
  let timer = 30;

  function startGame() {
    gameInterval = setInterval(updateGame, 1000 / 60);
    countdown();
  }

  function updateGame() {
    moveBall();
    checkCollision();
  }

  function moveBall() {
    const ballRect = ball.getBoundingClientRect();
    ball.style.left = ballRect.left + ballSpeedX + "px";
    ball.style.top = ballRect.top + ballSpeedY + "px";

    // Bounce off the walls
    if (ballRect.left <= 0 || ballRect.right >= window.innerWidth) {
      ballSpeedX *= -1;
    }
    if (ballRect.top <= 0 || ballRect.bottom >= window.innerHeight) {
      ballSpeedY *= -1;
    }
  }

  function checkCollision() {
    const ballRect = ball.getBoundingClientRect();
    const player1Rect = player1.getBoundingClientRect();
    const player2Rect = player2.getBoundingClientRect();
    const goal1Rect = goal1.getBoundingClientRect();
    const goal2Rect = goal2.getBoundingClientRect();

    if (ballRect.intersects(player1Rect) || ballRect.intersects(player2Rect)) {
      ballSpeedX *= -1;
      ballSpeedY *= -1;
    }

    // Check if ball enters goal
    if (
      ballRect.left <= goal1Rect.right &&
      ballRect.bottom >= goal1Rect.top &&
      ballRect.top <= goal1Rect.bottom
    ) {
      score2++;
      updateScore();
      resetBall();
    }

    if (
      ballRect.right >= goal2Rect.left &&
      ballRect.bottom >= goal2Rect.top &&
      ballRect.top <= goal2Rect.bottom
    ) {
      score1++;
      updateScore();
      resetBall();
    }
  }

  function updateScore() {
    score1Element.textContent = score1;
    score2Element.textContent = score2;
  }

  function resetBall() {
    ball.style.left = "50%";
    ball.style.top = "200px";
    ballSpeedX *= -1;
  }

  function countdown() {
    const countdownInterval = setInterval(() => {
      timer--;
      timerElement.textContent = timer;
      if (timer === 0) {
        clearInterval(countdownInterval);
        clearInterval(gameInterval);
        alert(`Game Over! Final Score: Brazil ${score1} - England ${score2}`);
      }
    }, 1000);
  }

  // Player 1 controls (WASD)
  document.addEventListener("keydown", (e) => {
    const player1Rect = player1.getBoundingClientRect();
    switch (e.key) {
      case "w":
        if (player1Rect.top > 0)
          player1.style.top = player1Rect.top - 10 + "px";
        break;
      case "s":
        if (player1Rect.bottom < window.innerHeight)
          player1.style.top = player1Rect.top + 10 + "px";
        break;
      case "a":
        if (player1Rect.left > 0)
          player1.style.left = player1Rect.left - 10 + "px";
        break;
      case "d":
        if (player1Rect.right < window.innerWidth / 2)
          player1.style.left = player1Rect.left + 10 + "px";
        break;
    }
  });

  startGame();
});
