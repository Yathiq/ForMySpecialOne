// ----------------- CONFIG -----------------
const SHEETDB_URL = "https://sheetdb.io/api/v1/6379f7871chd9";

// ---------------- ELEMENTS ----------------
const loader = document.getElementById("loader");
const heartReveal = document.getElementById("heartReveal");
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const card4 = document.getElementById("card4");
const card5 = document.getElementById("card5");
const next1 = document.getElementById("next1");
const voiceBtn = document.getElementById("voiceBtn");
const memoriesBtn = document.getElementById("memoriesBtn");
const typedText = document.getElementById("typedText");
const memoryImg = document.getElementById("memoryImg");
const memoryMsg = document.getElementById("memoryMsg");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const finishBtn = document.getElementById("finishBtn");
const closeBtn = document.getElementById("closeBtn");
const heartImg = document.getElementById("hisImage");
const heartsContainer = document.getElementById("heartsContainer");
const restartBtn = document.getElementById("audioRestart");
const playBtn = document.getElementById("audioPlay");
const audio = document.getElementById("voiceAudio");
const icon = playBtn.querySelector(".play-icon");

// modal elements
const saySomethingBtn = document.getElementById("saySomethingBtn");
const messageModal = document.getElementById("messageModal");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const cancelMessageBtn = document.getElementById("cancelMessageBtn");
const userMessage = document.getElementById("userMessage");
const userMessageDisplay = document.getElementById("userMessageDisplay");
const modalLoader = document.getElementById("modalLoader");

// SFX
const clickSfx = document.getElementById("clickSfx");
const typeSfx = document.getElementById("typeSfx");
const heartSfx = document.getElementById("heartSfx");
const sendSfx = document.getElementById("sendSfx");

// gallery
const dotsContainer = document.getElementById("dots");

// ---------------- PAGE FLOW ----------------
setTimeout(() => {
  loader.classList.add("hidden");
  heartReveal.classList.remove("hidden");
  heartReveal.classList.add("fade-in");
  heartReveal.style.display = 'flex';
  heartReveal.style.justifyContent = 'center';
  heartReveal.style.alignItems = 'center';

  setTimeout(() => {
    heartReveal.classList.add("hidden");
    heartReveal.classList.remove("fade-in");
    card1.classList.remove("hidden");
    card1.classList.add("fade-in");
    card1.style.display = 'flex';
    card1.style.justifyContent = 'center';
    card1.style.alignItems = 'center';
  }, 10000);
}, 2000);

// ---------------- PARALLAX HEART ----------------
document.addEventListener("mousemove", e => {
  const x = (window.innerWidth / 2 - e.clientX) / 30;
  const y = (window.innerHeight / 2 - e.clientY) / 30;
  if (heartImg) heartImg.style.transform = `translate(${x}px, ${y}px)`;
});

// ---------------- SFX ----------------
function playClick() { 
    try { 
        clickSfx.currentTime = 0; 
        clickSfx.play().catch(() => {}); 
        navigator.vibrate && navigator.vibrate(10); 
    } catch (e) {} 
}

// Heartbeat
function playHeart(){ 
    try{ 
        heartSfx.currentTime = 0; 
        heartSfx.volume = 1.0; // max safe volume
        heartSfx.play().catch(()=>{}); 
    } catch(e){} 
}

// Send button
function playSend() { 
    try { 
        sendSfx.currentTime = 0; 
        sendSfx.play().catch(() => {}); 
    } catch (e) {} 
}

// ---------------- TYPE BACKGROUND ----------------
let typeBgPlaying = false;
function startTypeBg() {
    if (typeBgPlaying) return;
    typeBgPlaying = true;
    try {
        typeSfx.loop = true;       // loop smoothly
        typeSfx.volume = 0.55;
        typeSfx.currentTime = 0;
        typeSfx.play().catch(()=>{});
    } catch(e){}
}

function stopTypeBg() {
    if (!typeBgPlaying) return;
    typeBgPlaying = false;
    try {
        typeSfx.pause();
        typeSfx.currentTime = 0;
    } catch(e){}
}

// ---------------- CARD NAVIGATION ----------------
function showCard(newCard, oldCard = null) {
  playClick();
  if (oldCard) {
    oldCard.classList.remove("fade-in");
    oldCard.classList.add("fade-out");
    setTimeout(() => oldCard.classList.add("hidden"), 420);
  }
  newCard.classList.remove("hidden");
  newCard.classList.remove("fade-out");
  newCard.classList.add("fade-in");
}

// Next button triggers typing page
next1.addEventListener("click", () => {
    showCard(card2, card1);
    startTyping();    // start typing text
    startTypeBg();    // start looping typing sound
});

// Stop typing sound when leaving card2
voiceBtn.addEventListener("click", () => {
    showCard(card3, card2);
    stopTypeBg();
});

// PLAY / PAUSE FUNCTION
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    setPlayingUI(true);
  } else {
    audio.pause();
    setPlayingUI(false);
  }
});

// RESTART FUNCTION
restartBtn.addEventListener("click", function (e) {
  e.preventDefault();     // stop form submit
  e.stopImmediatePropagation(); // stop ANY default behavior

  // restart audio only
  audio.pause();
  audio.currentTime = 0;
  audio.play();

  // update UI
  setPlayingUI(true);
});




// WHEN AUDIO FINISHES
audio.addEventListener("ended", () => {
  setPlayingUI(false);
});

function setPlayingUI(isPlaying) {
  if (isPlaying) {
    playBtn.classList.add("playing");
    icon.innerText = "⏸ Pause";
  } else {
    playBtn.classList.remove("playing");
    icon.innerText = "▶ Play";
  }
}



memoriesBtn.addEventListener("click", () => showCard(card4, card3));
finishBtn.addEventListener("click", () => showCard(card5, card4));
restartBtn.addEventListener("click", () => location.reload());
closeBtn.addEventListener("click", () => showCard(card4, card5));

// ---------------- HEART REVEAL ----------------
function burstHearts() {
  playHeart();
  for (let i = 0; i < 18; i++) {
    setTimeout(() => spawnHeart(Math.random() * 90, 80 - Math.random() * 50, ['💖', '❤️', '💫'][Math.floor(Math.random() * 3)]), i * 50);
  }
}
function revealPhotoSmooth() { burstHearts(); playHeart(); }
setTimeout(() => revealPhotoSmooth(), 1200);

function spawnHeart(x, y, emoji) {
  const el = document.createElement('div');
  el.className = 'heart-particle';
  el.style.left = (x || (50 + Math.random() * 40)) + '%';
  el.style.top = (y || (80 + Math.random() * 10)) + '%';
  el.innerText = emoji || '💖';
  heartsContainer.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

// ---------------- SAY SOMETHING MODAL ----------------
saySomethingBtn.addEventListener('click', () => {
  messageModal.classList.remove('hidden');
  messageModal.style.zIndex = 9999;
  playClick();
});
cancelMessageBtn && cancelMessageBtn.addEventListener('click', () => {
  messageModal.classList.add('hidden'); playClick();
});

// ---------------- MEMORY SLIDESHOW ----------------
const memories = [
  { img: "img_1.jpg", msg: "Forever in my heart 💕" },
  { img: "img_3.jpg", msg: "Remember this moment? 🫣" },
  { img: "img_2.jpg", msg: "A sweetest memory 🍨" },
  { img: "img_4.jpg", msg: "You and me = Peace + Happiness ❤️" }
];

let idx = 0;
function updateMemory() {
  memoryImg.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
  memoryImg.style.opacity = 0;
  memoryImg.style.transform = 'scale(0.97)';
  setTimeout(() => {
    memoryImg.src = memories[idx].img;
    memoryImg.style.opacity = 1;
    memoryImg.style.transform = 'scale(1)';
    if (memoryMsg) memoryMsg.innerText = memories[idx].msg;
    updateDots();
  }, 250);
}
nextBtn.addEventListener("click", () => { idx = (idx + 1) % memories.length; updateMemory(); playClick(); });
prevBtn.addEventListener("click", () => { idx = (idx - 1 + memories.length) % memories.length; updateMemory(); playClick(); });
updateMemory(); // initial call

function initDots() {
  dotsContainer.innerHTML = '';
  memories.forEach((_, i) => {
    const b = document.createElement('button');
    b.addEventListener('click', () => { idx = i; updateMemory(); });
    dotsContainer.appendChild(b);
  });
  updateDots();
}
function updateDots() {
  Array.from(dotsContainer.children).forEach((b, i) => b.classList.toggle('active', i === idx));
}
initDots();

// ---------------- TYPING EFFECT ----------------
const lines = [
    "There’s something that I want to tell you…",
    "Naa yaarayum athigam admire pana maaten pudikatha varikum",
    "But naa una konjam admire paniruken solanum thonuchi",
    "I LITERALLY LOVE EVERYTHING ABOUT YOU !",
    
    "Your smile",
    "your voice",
    "your laugh",
    "your silence",
    
    "your presence",
    "your patience",
    "your kindness",
    "your eyes",
    
    "your honesty",
    "your little surprises",
    "your big heart",
    "your dreams (Those are mine too)",
    "your crazy cute fun",
    "your jokes",
    "your shyness",
    "your soft heart",
    "your soul",
    "your warmth",
    "your flaws",
    "your sweetness",
    "your good night texts",
    "your taste in music",
    "your choice of songs",
    "your loyalty",
    "your attention for me",
    "your stubbornness over things that you don't do for me sometimes",
    "your hands that I never held",
    "your heartbeat that I haven't heard closely",
    "your fear of losing me",
    "your random texts and reels",
    "your sleepy face",
    "your sleepy voice",
    "Our late-night talks",
    "Our inner child being safe around each other",
    "My courage around you",
    "The delicate melody of your breath I hear every night",
    
    "AND —",
    
    "The way you took care of me",
    "The way you calm my storms",
    "The way you say my name — that’s when I loved my name even more",
    "The way you care for me",
    "The way you stay with me",
    "The way you listen",
    "The way you see me",
    "The way you see through me",
    "The way you make me miss you",
    "The way you make me laugh",
    "The way you look sleepy",
    "The way you comfort me",
    "The way you respect me",
    "The way you make me possessive",
    "The way you look into my eyes",
    "The way you value small things",
    "The way you say ‘Naan iruken unaku’",
    "The way you believe in me",
    "The way you explain everything calmly",
    "The way I cry because I never want to lose you",
    "The way we apologize",
    "The way you make things better",
    "The way you forgive me every time",
    "The way you understand me the BEST",
    "The way you say ‘Miss you’ every night after me",
    "The way you handle my insecurities",
    "The way you accept my darkness and still stay",
    "The way you inspire me",
    "The way you're yourself with me",
    "The way you fix things",
    "The way you heal me",
    "The way you love me despite everything",
    "The way you whisper sometimes",
    "The way you react to compliments",
    "The way you express things",
    "The way you talk about your day",
    "The way you sit in silence with me",
    "The way you excite me",
    "The way you trust me",
    "The way you say goodnight",
    "The way you touch my soul",
    "The way you calm my anxiety",
    "The way you remind me of home",
    "The way you give me peace",
    "The way you still choose me even when I’m a chaos",
    "The way you assure me always",
    "The way you remember things about me",
    "The way you call me yours",
    "The way you stay in my prayers",
    "The way you changed for me",
    "The way we’ve changed for each other",
    "The way we are bored with each other with love",
    "The way you hesitated to say ‘Love you’ back",
    "The way you love me even when I’m unlovable",
    
    "YOU FEEL LIKE MY FAMILY",
    "YOU ARE OF COURSE MY FAMILY",
    "YOU ARE MY HOME ❤️🥹",
    
    "Naa unakaga ena panirukenu kepela…",
    "Ithellaam nee enakaga pannathu dhaan da… enaku romba rombaa pudikum da elamey.. Unnayum thaan",
    
    "Nama epovume ipdiye close ah irupoma nu therila…",
    "Anaa naa epovume unna intha alavuku special-ah dhaan naa paapen.",
    "Epomey ithey maari thaa naa unaya admire pannuven da....",
    
    "Nama ivalo romba close ah irukurathukuu… ivlovum thaandi onnu iruku:",
    "THE WAY WE COMMUNICATE, UNDERSTAND, LOVE, TRUST AND CARE EACH OTHER.",
    
    "💕 LOVE YOU SO MUCH DA MY FOREVER’EY 💕",
    
    "Unconditional love from your best friend,",
    "🦝 YATHIQ (Your DHARSHU) ❤️ (^◡^) ❤️",
    
    "To my Sweet Heart…💞 And to",
    "The Prince of my Heart,👑",
    "Tharun’ey 🫣😙",
    "Love you so much da Paiyaa 💎💝"
];

let lineIndex = 0, charIndex = 0;

function startTyping() {
    typedText.innerHTML = '';
    lineIndex = 0;
    charIndex = 0;
    typeLine();
}

function typeLine() {
    if (lineIndex >= lines.length) {
        stopTypeBg(); // stop typing sound when done
        return;
    }
    const currentLine = lines[lineIndex];
    if (charIndex < currentLine.length) {
        typedText.innerHTML += currentLine[charIndex];
        charIndex++;
        typedText.scrollTop = typedText.scrollHeight;
        setTimeout(typeLine, 25 + Math.random() * 30);
    } else {
        typedText.innerHTML += "<br>";
        lineIndex++;
        charIndex = 0;
        setTimeout(typeLine, 300);
    }
}

// ---------------- SENDING MESSAGE ----------------
sendMessageBtn.addEventListener("click", async () => {
  const msg = userMessage.value.trim();
  if (!msg) return;
  sendMessageBtn.disabled = true;
  sendMessageBtn.innerText = "Sending...";
  modalLoader.classList.remove('hidden');
  playClick();
  try {
    const res = await fetch(SHEETDB_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [{ name: 'Tharun', message: msg, time: new Date().toLocaleString() }] })
    });
    if (res.ok) {
      modalLoader.classList.add('hidden');
      messageModal.classList.add('hidden');
      userMessageDisplay.innerText = 'Your message has been sent ❤️';
      userMessage.value = '';
      playSend();
      navigator.vibrate && navigator.vibrate(20);
    } else throw new Error('SheetDB returned error');
  } catch (err) {
    console.error(err);
    modalLoader.classList.add('hidden');
    messageModal.classList.add('hidden');
    userMessageDisplay.innerText = 'Failed to send message 😔. Please try again later.';
    playClick();
  } finally {
    sendMessageBtn.disabled = false;
    sendMessageBtn.innerText = 'Send';
  }
});

// ---------------- PARTICLE BACKGROUND ----------------
const particleCanvas = document.getElementById("particleCanvas");
const ctx = particleCanvas.getContext("2d");

let w = particleCanvas.width = window.innerWidth;
let h = particleCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  w = particleCanvas.width = window.innerWidth;
  h = particleCanvas.height = window.innerHeight;
});

const particles = [];
const particleCount = 120; // number of particles

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1, // radius
    speedX: (Math.random() - 0.5) * 0.3, // horizontal drift
    speedY: (Math.random() - 0.5) * 0.3, // vertical drift
    alpha: Math.random() * 0.5 + 0.3 // opacity
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, w, h);

  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(255,255,255,0.8)';
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    // wrap around edges
    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;
  }

  requestAnimationFrame(animateParticles);
}

animateParticles();

const surpriseBtn = document.getElementById("surpriseBtn");
const surprisePopup = document.getElementById("surprisePopup");
const closePopup = document.getElementById("closePopup");

// Show popup
surpriseBtn.addEventListener("click", () => {
  surprisePopup.classList.remove("hidden");
});

// Close popup
closePopup.addEventListener("click", () => {
  surprisePopup.classList.add("hidden");
});

const timeDisplay = document.getElementById("audioTime");

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Update while playing
audio.addEventListener("timeupdate", () => {
  const current = formatTime(audio.currentTime);
  const total = formatTime(audio.duration || 0);
  timeDisplay.textContent = `${current} / ${total}`;
});

// Update when audio loads
audio.addEventListener("loadedmetadata", () => {
  timeDisplay.textContent = `00:00 / ${formatTime(audio.duration)}`;
});

// Reset when restarting
restartBtn.addEventListener("click", () => {
  audio.currentTime = 0;
  audio.play();
  setPlayingUI(true);
});

const voiceAudio = document.getElementById("voiceAudio");
const progressBar = document.getElementById("audioProgress");
const progressFill = document.getElementById("audioProgressFill");

// Update bar while playing
voiceAudio.addEventListener("timeupdate", () => {
    const percent = (voiceAudio.currentTime / voiceAudio.duration) * 100;
    progressFill.style.width = percent + "%";
});

// Seek when clicking on progress bar
progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const percent = clickX / width;
    const newTime = percent * voiceAudio.duration;

    voiceAudio.currentTime = newTime;  // <-- Jump to new time

    // Smooth fill update
    progressFill.style.width = (percent * 100) + "%";
});
