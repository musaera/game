document.addEventListener("DOMContentLoaded", () => {
  const player2 = document.getElementById("player2");
  const ball = document.getElementById("ball");

  function updateBot() {
    const ballRect = ball.getBoundingClientRect();
    const player2Rect = player2.getBoundingClientRect();

    // Simple AI logic: Follow the ball vertically
    if (ballRect.top < player2Rect.top && player2Rect.top > 0) {
      player2.style.top = player2Rect.top - 5 + "px";
    } else if (
      ballRect.bottom > player2Rect.bottom &&
      player2Rect.bottom < window.innerHeight
    ) {
      player2.style.top = player2Rect.top + 5 + "px";
    }

    // Move horizontally within its half
    if (
      ballRect.left < player2Rect.left &&
      player2Rect.left > window.innerWidth / 2
    ) {
      player2.style.left = player2Rect.left - 5 + "px";
    } else if (
      ballRect.right > player2Rect.right &&
      player2Rect.right < window.innerWidth
    ) {
      player2.style.left = player2Rect.left + 5 + "px";
    }
  }

  // Run the updateBot function continuously to simulate the AI
  setInterval(updateBot, 1000 / 60);
});
