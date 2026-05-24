const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
//<-------DO LOGIKI MEMORY----->
const karty = [
  "../img/gory-memory.jpg", "../img/gory-memory.jpg",
   "../img/wintersosny-memory.jpg", "../img/wintersosny-memory.jpg",
    "../img/iceberg.jpg", "../img/iceberg.jpg",
     "../img/waterfall.jpg", "../img/waterfall.jpg", 
     "../img/drzewo.jpg", "../img/drzewo.jpg",
      "../img/gory.jpg", "../img/gory.jpg"]
const kontener = document.querySelector(".container")
let pierwszaKarta = null
let drugaKarta = null
let zablokowane = false

//<-------------------\/--------->

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
    ctx.fillStyle = ` rgb(123, 255, 0)`;//rgb(123, 255, 0)
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();


//logika gry
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

    //LOGIKA

    document.querySelector('.container').innerHTML =""
    pierwszaKarta = null
    drugaKarta = null
    zablokowane = false
   karty.sort(function() {
    return Math.random() - 0.5
  })
karty.forEach(function(wartosc) {
    generujKarty(wartosc)
})
} 

przycisk.addEventListener('click', reset);
//<--------------------------------------------GRA / LOGIKA------------------------------------?


const generujKarty = (wartosc) => {
  const karta = document.createElement("div")
  const przod = document.createElement("div")
  const tyl = document.createElement("div")
  
   karta.classList.add("karta")        
   przod.classList.add("karta__przod")
   tyl.classList.add("karta__tyl") 
 
  const img = document.createElement("img")
  img.src = wartosc
  przod.appendChild(img)

  karta.addEventListener("click" , function(){
   if(zablokowane) return
    if(karta === pierwszaKarta) return
    if(karta.classList.contains("dopasowana")) return
    if(pierwszaKarta === null ){
      pierwszaKarta = karta
        karta.classList.add("odkryta")
      }else{
      zablokowane = true
      drugaKarta = karta 
      karta.classList.add("odkryta")
       ruchy += 1
       document.querySelector('.ruchy-liczba').textContent = ruchy
      if(pierwszaKarta.dataset.wartosc === drugaKarta.dataset.wartosc){
        pierwszaKarta.classList.add("dopasowana")
        drugaKarta.classList.add("dopasowana")
        pary += 1
       document.querySelector('.pary-liczba').textContent = `${pary}/6`
       if(pary === 6){
        clearInterval(timer)
       }
        pierwszaKarta = null
        drugaKarta = null
        zablokowane = false
        
      }else{
        setTimeout(function(){
          pierwszaKarta.classList.remove("odkryta")
          drugaKarta.classList.remove("odkryta")
          pierwszaKarta= null
          drugaKarta = null
          zablokowane = false
        }, 1000)
      }
    }

  })

  karta.appendChild(przod)
  karta.appendChild(tyl)
  kontener.appendChild(karta)
  karta.dataset.wartosc = wartosc

}

karty.sort(function() {
    return Math.random() - 0.5
})

karty.forEach(function(wartosc){
  
  generujKarty(wartosc)
  
})
