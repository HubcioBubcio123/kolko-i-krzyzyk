const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function rand(a, b) { return a + Math.random() * (b - a); }

const particles = Array.from({length: 60}, () => ({
  x: rand(0, canvas.width),
  y: rand(0, canvas.height),
  r: rand(0.8, 2.5),
  vx: rand(-0.15, 0.15),
  vy: rand(-0.2, -0.05),
  opacity: rand(0.1, 0.5),
  flicker: rand(0, Math.PI * 2),
  flickerSpeed: rand(0.01, 0.03)
}));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const W = canvas.width, H = canvas.height;

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.flicker += p.flickerSpeed;
    const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.flicker));

    if (p.y < -5) { p.y = H + 5; p.x = rand(0, W); }
    if (p.x < -5) p.x = W + 5;
    if (p.x > W + 5) p.x = -5;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();

let ruchy = 0;
let sekundy = 0;
let pary = 0;
let timer;

document.querySelector('.ruchy-liczba').textContent = ruchy;
document.querySelector('.pary-liczba').textContent = `${pary}/8`;

timer = setInterval(() => {
  sekundy++;
  const min = Math.floor(sekundy / 60);
  const sek = sekundy % 60;
  document.querySelector('.czas-liczba').textContent = `${min}:${sek.toString().padStart(2, '0')}`;
}, 1000);

const przycisk = document.querySelector('.nowa-gra');

const reset = () => {
  ruchy = 0;
  sekundy = 0;
  pary = 0;
  clearInterval(timer);
  timer = setInterval(() => {
    sekundy++;
    const min = Math.floor(sekundy / 60);
    const sek = sekundy % 60;
    document.querySelector('.czas-liczba').textContent = `${min}:${sek.toString().padStart(2, '0')}`;
  }, 1000);
  document.querySelector('.ruchy-liczba').textContent = ruchy;
  document.querySelector('.pary-liczba').textContent = `${pary}/8`;
  document.querySelector('.czas-liczba').textContent = '0:00';
}

przycisk.addEventListener('click', reset);