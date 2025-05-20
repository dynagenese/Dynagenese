
const canvas = document.getElementById('dynabg');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const entities = Array.from({ length: 40 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 0.6,
  vy: (Math.random() - 0.5) * 0.6,
  r: 2 + Math.random() * 2
}));

function animate() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < entities.length; i++) {
    for (let j = i + 1; j < entities.length; j++) {
      const dx = entities[i].x - entities[j].x;
      const dy = entities[i].y - entities[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.strokeStyle = `rgba(0,0,0,${1 - dist / 100})`;
        ctx.beginPath();
        ctx.moveTo(entities[i].x, entities[i].y);
        ctx.lineTo(entities[j].x, entities[j].y);
        ctx.stroke();
      }
    }
  }

  for (let e of entities) {
    e.x += e.vx;
    e.y += e.vy;

    if (e.x < 0 || e.x > width) e.vx *= -1;
    if (e.y < 0 || e.y > height) e.vy *= -1;

    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0, 150, 136, 0.5)';
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();
