document.addEventListener("DOMContentLoaded", () => {
  const boardDiv = document.getElementById("board");
  const result = document.getElementById("gameResult");
  const emojiBg = document.getElementById("emojiBackground");
  const clickSound = new Audio("assets/click.opus");
  const winSound = new Audio("assets/win.opus");
  const loseSound = new Audio("assets/lose.opus");
  const drawSound = new Audio("assets/draw.opus");

  let board = Array(9).fill("");
  let currentPlayer = "X";
  let gameEnded = false;
  let round = 1;

  // Display round counter
  const roundDisplay = document.createElement("p");
  roundDisplay.id = "roundCounter";
  roundDisplay.textContent = `Round ${round}`;
  roundDisplay.style.color = "#ffe0ef";
  roundDisplay.style.fontSize = "1.1rem";
  roundDisplay.style.marginBottom = "15px";
  boardDiv.parentElement.insertBefore(roundDisplay, boardDiv);

  function checkWinner(player) {
    const wins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    return wins.some(combo => combo.every(i => board[i] === player));
  }

  function bestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, 0, false);
        board[i] = "";
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  }

  function minimax(newBoard, depth, isMaximizing) {
    if (checkWinner("O")) return 10 - depth;
    if (checkWinner("X")) return depth - 10;
    if (newBoard.every(cell => cell !== "")) return 0;

    if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === "") {
          newBoard[i] = "O";
          best = Math.max(best, minimax(newBoard, depth + 1, false));
          newBoard[i] = "";
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === "") {
          newBoard[i] = "X";
          best = Math.min(best, minimax(newBoard, depth + 1, true));
          newBoard[i] = "";
        }
      }
      return best;
    }
  }

  function aiMove() {
    if (gameEnded) return;
    const move = bestMove();
    board[move] = "O";
    emojiBurst("O", move);
    updateBoard();
    if (checkWinner("O") || board.every(cell => cell !== "")) {
      endGame();
    }
  }

  function endGame() {
    const playerWon = checkWinner("X");
    const aiWon = checkWinner("O");
     if (playerWon) {
  winSound.play();
  } else if (aiWon) 
{
  loseSound.play();
  } else 
  {
  drawSound.play();
  }
    if (playerWon || aiWon) {
      gameEnded = true;
      result.innerText = "Text Jermaine I'm not mad at you no more 😣";
      gsap.fromTo(result, { opacity: 0 }, { opacity: 1, duration: 1 });
      setTimeout(() => {
        window.location.href = "forgiven.html";
      }, 3500);
    } else {
      // Draw — start new round
      result.innerText = "Hmm... a draw! Try again 😅";
      gsap.fromTo(result, { opacity: 0 }, { opacity: 1, duration: 1 });

      setTimeout(() => {
        board = Array(9).fill("");
        round++;
        roundDisplay.textContent = `Round ${round}`;
        gameEnded = false;
        updateBoard();
      }, 1500);
    }

  }

  function handleClick(i) {
    if (board[i] || gameEnded) return;
    board[i] = currentPlayer;
    emojiBurst(currentPlayer, i);
    updateBoard();
    if (checkWinner(currentPlayer) || board.every(cell => cell !== "")) {
      endGame();
    } else {
      setTimeout(aiMove, 500);
    }
    clickSound.play();
  }

  function updateBoard() {
    boardDiv.innerHTML = "";
    board.forEach((val, i) => {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.innerText = val;
      cell.onclick = () => handleClick(i);
      boardDiv.appendChild(cell);
    });
  }

  function emojiBurst(player, index) {
    const emojis = player === "X" ? ["❤️", "🥰", "😘"] : ["💔", "🤖", "😅"];
    const emoji = document.createElement("span");
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.classList.add("emoji-burst");
    emoji.style.position = "absolute";

    const cell = boardDiv.children[index];
    const rect = cell.getBoundingClientRect();

    emoji.style.left = rect.left + rect.width / 2 + "px";
    emoji.style.top = rect.top + window.scrollY + "px";

    document.body.appendChild(emoji);

    gsap.to(emoji, {
      y: "-80",
      opacity: 0,
      duration: 1,
      scale: 1.5,
      onComplete: () => emoji.remove()
    });
  }

  function createFloatingEmojis() {
    setInterval(() => {
      const emoji = document.createElement("span");
      emoji.innerText = ["💖", "✨", "💕", "🌸"][Math.floor(Math.random() * 4)];
      emoji.style.left = Math.random() * 100 + "vw";
      emoji.style.fontSize = Math.random() * 1.5 + 1 + "rem";
      emoji.style.position = "absolute";
      emoji.style.animation = "floatDown 8s linear forwards";
      emojiBg.appendChild(emoji);
      setTimeout(() => emoji.remove(), 8000);
    }, 500);
  }

  updateBoard();
  createFloatingEmojis();
});
