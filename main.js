const dialogue = [
  "Evet, I know you're still mad...",
  "And I understand why 😔",
  "I just want to say I'm really, really sorry...",
  "When you're mad at me, it honestly ruins my day 😢",
  "I miss your energy, your laughter, your love",
  "Please forgive me. I promise to do better",
  "🥹 Will you forgive me?",
  "Don't tell Phelly I made you this, she'll be mad at me too 😅"
];

let i = 0;
const bubble = document.getElementById("dialogueBubble");

function showNextLine() {
  if (i >= dialogue.length) {
    showFinal();
    return;
  }

  bubble.innerHTML = "";
  let text = dialogue[i];
  let span = document.createElement("span");
  bubble.appendChild(span);
  let j = 0;

  const typing = setInterval(() => {
    span.innerHTML += text[j] === " " ? "&nbsp;" : text[j];
    j++;
    if (j === text.length) {
      clearInterval(typing);
      i++;
      setTimeout(showNextLine, 1800);
    }
  }, 35);
}

function showFinal() {
  bubble.style.display = "none";
  const msg = document.getElementById("finalMessage");
  const btnContainer = document.getElementById("gameRedirect");

  msg.style.display = "block";

  setTimeout(() => {
    btnContainer.style.display = "block";
    gsap.from("#doNotClickBtn", { scale: 0, duration: 0.5, ease: "back.out(1.7)" });
  }, 2000);
}



function dropFireworks(emojis) {
  for (let i = 0; i < 25; i++) {
    const emoji = document.createElement("div");
    emoji.classList.add("emoji");
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * window.innerWidth + "px";
    emoji.style.top = "-40px";
    document.body.appendChild(emoji);

    gsap.to(emoji, {
      y: window.innerHeight + 50,
      duration: 3 + Math.random() * 2,
      ease: "power1.in",
      opacity: 0,
      scale: 0.6 + Math.random(),
      onComplete: () => emoji.remove()
    });
  }
}

// Start typing once DOM is ready
document.addEventListener("DOMContentLoaded", showNextLine);
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("doNotClickBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      window.location.href = "game.html";
    });
  }
});

