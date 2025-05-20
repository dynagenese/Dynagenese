const canvas = document.getElementById("dynagenCanvas");
const ctx = canvas.getContext("2d");
let width, height;

function resizeCanvas() {
  const header = document.getElementById("header");
  width = canvas.width = header.offsetWidth;
  height = canvas.height = header.offsetHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const particles = Array.from({ length: 60 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 0.5,
  vy: (Math.random() - 0.5) * 0.5,
}));

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.5, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(animate);
}
animate();
