const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
let yesScale = 1;
let noPos = { x: 0, y: 0 };

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const setNoPosition = (x, y) => {
  noPos = { x, y };
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
};

const centerNoButton = () => {
  const yesRect = yesBtn.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const gap = 16;
  const x = yesRect.right + noRect.width / 2 + gap;
  const y = yesRect.top + yesRect.height / 2;
  setNoPosition(x, y);
};

const moveNoButtonAway = (cursorX, cursorY) => {
  const bounds = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const rect = noBtn.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distanceX = centerX - cursorX;
  const distanceY = centerY - cursorY;
  const distance = Math.hypot(distanceX, distanceY);

  const threshold = 120;
  if (distance > threshold) return;

  const push = (threshold - distance) + 40;
  const angle = Math.atan2(distanceY || 1, distanceX || 1);

  const nextX = noPos.x + Math.cos(angle) * push;
  const nextY = noPos.y + Math.sin(angle) * push;

  const minX = rect.width / 2;
  const maxX = bounds.width - rect.width / 2;
  const minY = rect.height / 2;
  const maxY = bounds.height - rect.height / 2;

  setNoPosition(clamp(nextX, minX, maxX), clamp(nextY, minY, maxY));
};

const growYes = () => {
  yesScale *= 1.12;
  yesBtn.style.transform = `scale(${yesScale})`;
};

if (noBtn && yesBtn) {
  centerNoButton();

  window.addEventListener("resize", centerNoButton);

  document.addEventListener("mousemove", (event) => {
    moveNoButtonAway(event.clientX, event.clientY);
  });

  noBtn.addEventListener("mouseenter", () => {
    const jitterX = (Math.random() - 0.5) * 120;
    const jitterY = (Math.random() - 0.5) * 80;
    setNoPosition(noPos.x + jitterX, noPos.y + jitterY);
  });

  noBtn.addEventListener("click", () => {
    growYes();
  });

  yesBtn.addEventListener("click", () => {
    window.location.href = "yay.html";
  });
}

const slideshow = document.querySelector(".slideshow");
if (slideshow) {
  const slides = Array.from(slideshow.querySelectorAll("img"));
  if (slides.length > 0) {
    let index = 0;
    slides[index].classList.add("active");
    setInterval(() => {
      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
    }, 2000);
  }
}
