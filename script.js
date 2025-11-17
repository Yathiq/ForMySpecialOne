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
const audioPlay = document.getElementById("audioPlay");
const voiceAudio = document.getElementById("voiceAudio");
const memoriesBtn = document.getElementById("memoriesBtn");
const typedText = document.getElementById("typedText");
const memoryImg = document.getElementById("memoryImg");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const finishBtn = document.getElementById("finishBtn");
const restartBtn = document.getElementById("restartBtn");
const downloadBtn = document.getElementById("downloadBtn");
const closeBtn = document.getElementById("closeBtn");
const bgAudio = document.getElementById("bgAudio");
const heartImg = document.getElementById("herImage");

// ---------------- PAGE FLOW ----------------
setTimeout(()=>{
  loader.classList.add("hidden");
  heartReveal.classList.remove("hidden");
  setTimeout(()=>{
    heartReveal.classList.add("hidden");
    card1.classList.remove("hidden");
    card1.classList.add("fade-in");
  },3000);
},3000);

// ---------------- PARALLAX HEART ----------------
document.addEventListener("mousemove", e=>{
  const x = (window.innerWidth/2 - e.clientX)/25;
  const y = (window.innerHeight/2 - e.clientY)/25;
  heartImg.style.transform = `translate(${x}px, ${y}px)`;
});

// ---------------- CARD NAVIGATION ----------------
function showCard(newCard, oldCard=null){
  if(oldCard){
    oldCard.classList.remove("fade-in");
    oldCard.classList.add("fade-out");
    setTimeout(()=> oldCard.classList.add("hidden"),500);
  }
  newCard.classList.remove("hidden");
  newCard.classList.remove("fade-out");
  newCard.classList.add("fade-in");
}

next1.addEventListener("click", ()=>{
  try{ bgAudio.volume=0.22; bgAudio.play().catch(()=>{}); }catch(e){}
  showCard(card2, card1);
  startTyping();
});
voiceBtn.addEventListener("click", ()=> showCard(card3, card2));
audioPlay.addEventListener("click", ()=>{ try{ voiceAudio.currentTime=0; voiceAudio.play(); }catch(e){}; });
memoriesBtn.addEventListener("click", ()=> showCard(card4, card3));
finishBtn.addEventListener("click", ()=> showCard(card5, card4));
restartBtn.addEventListener("click", ()=> location.reload());
downloadBtn.addEventListener("click", ()=>{
  const blob = new Blob(["My heart is full of you."],{type:"text/plain"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download="memory.txt";
  a.click();
});
closeBtn.addEventListener("click", ()=> showCard(card4, card5));

// ---------------- MEMORY SLIDESHOW ----------------
const images = ["img 1.jpg","img 3.jpg","img 2.jpg","img 4.jpg"];
let idx = 0;

function updateMemory(){
  memoryImg.style.opacity = 0;
  setTimeout(()=>{
    memoryImg.src = images[idx];
    memoryImg.style.opacity = 1;
  }, 200); // smooth fade
}

// Arrow button logic
nextBtn.addEventListener("click", ()=>{
  idx = (idx + 1) % images.length; // loop back to first
  updateMemory();
});

prevBtn.addEventListener("click", ()=>{
  idx = (idx - 1 + images.length) % images.length; // loop to last
  updateMemory();
});

// ---------------- TYPING EFFECT ----------------
const lines = [
        "There’s something that I want to tell you…",
        "I LITERALLY LOVE EVERYTHING ABOUT YOU !",
      
       /* "Your smile",
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
        "The wauy you assure me always",
        "The way you remember things about me",
        "The way you call me yours",
        "The way you stay in my prayers",
        "The way you changed for me",
        "The way we’ve changed for each other",
        "The way you hesitated to say ‘Love you’ back",
        "The way you love me even when I’m unlovable",
      
        "YOU FEEL LIKE MY FAMILY.",
        "THIS IS WHAT HOME FEELS LIKE.",
        "YOU ARE MY HOME ❤️🥹",
      
        "Naa unakaga ena panirukenu kepela…",
        "Ithellaam nee enakaga pannathu dhaan da… enaku rombaa pudikum elamey.. Unnayum.",
      
        "Nama epovume ipdiye close ah irupoma nu therila…",
        "Anaa naa epovume unna intha alavuku special-ah dhaan naa paapen.",
        "Epomey ithey maari thaa naa unaya admire pannuven.",
      
        "Nama romba close ah irukom ithuku… ivlovum thaandi onnu iruku:",
        "THE WAY WE COMMUNICATE, UNDERSTAND, LOVE, TRUST AND CARE EACH OTHER.",
      */
        "💕 LOVE YOU SO MUCH DA MY FOREVER’EY 💕",
      
        "Unconditional love from your best friend,",
        "🦝 UR YATHIQ (Your DHARSHU) ❤️ (^◡^) ❤️",
      
        "To my Sweet Heart… And to",
        "The Prince of my Heart,",
        "Tharun’ey 🫣😙",
        "Love you so much da Paiyaa 💎💝"   
];
let lineIndex=0, charIndex=0;
function startTyping(){
  typedText.innerHTML="";
  lineIndex=0; charIndex=0;
  typeLine();
}
function typeLine(){
  if(lineIndex>=lines.length) return;
  const currentLine=lines[lineIndex];
  if(charIndex<currentLine.length){
    typedText.innerHTML += currentLine[charIndex];
    charIndex++;
    typedText.scrollTop = typedText.scrollHeight;
    setTimeout(typeLine, 45);
  } else{
    typedText.innerHTML+="<br>";
    lineIndex++;
    charIndex=0;
    setTimeout(typeLine, 110);
  }
}

// ---------------- PARTICLE BACKGROUND ----------------
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let particlesArray = [];
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
window.addEventListener("resize", ()=>{
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});
class Particle{
  constructor(){
    this.x = Math.random()*w;
    this.y = Math.random()*h;
    this.size = Math.random()*3+1;
    this.speedX = (Math.random()-0.5)*0.5;
    this.speedY = (Math.random()-0.5)*0.5;
    this.opacity = Math.random()*0.5 + 0.3;
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x <0 || this.x>w) this.speedX*=-1;
    if(this.y <0 || this.y>h) this.speedY*=-1;
  }
  draw(){
    ctx.shadowColor = "white";
    ctx.shadowBlur = 6;
    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}
function initParticles(num=80){
  particlesArray=[];
  for(let i=0;i<num;i++){
    particlesArray.push(new Particle());
  }
}
initParticles();
function animateParticles(){
  ctx.clearRect(0,0,w,h);
  particlesArray.forEach(p=>{
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Elements
const saySomethingBtn = document.getElementById("saySomethingBtn");
const messageModal = document.getElementById("messageModal");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const userMessage = document.getElementById("userMessage");
const userMessageDisplay = document.getElementById("userMessageDisplay");

// Open modal when Say Something clicked
saySomethingBtn.addEventListener("click", () => {
  messageModal.classList.remove("hidden");
});

// Send message
sendMessageBtn.addEventListener("click", () => {
    const msg = userMessage.value.trim();
    if (!msg) return;
  
    sendMessageBtn.disabled = true;
    sendMessageBtn.innerText = "Sending...";
  
    fetch("https://sheetdb.io/api/v1/6379f7871chd9", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "Friend",
          message: msg
        })
      })
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
  
        if (data.status !== "success") {
          throw new Error("Failed to save to sheet");
        }
  
        messageModal.classList.add("hidden");
        userMessageDisplay.innerText = "Your message has been sent ❤️";
        userMessage.value = "";
      })
      .catch((err) => {
        console.error(err);
        messageModal.classList.add("hidden");
        userMessageDisplay.innerText =
          "Failed to send message 😔. Please try again later.";
      })
      .finally(() => {
        sendMessageBtn.disabled = false;
        sendMessageBtn.innerText = "Send";
      });
  });
  

// Show message on ending card (optional if you want to restore after page reload)
finishBtn.addEventListener("click", () => {
  showCard(card5, card4); // your existing function
  const savedMsg = localStorage.getItem("userMessage");
  if(savedMsg) {
    userMessageDisplay.textContent = savedMsg;
  }
});

function sendEmailNotification(e) {
    var sheet = e.range.getSheet();
    var row = sheet.getRange(e.range.getRow(), 1, 1, 3).getValues()[0];
    var message = row[2];
    MailApp.sendEmail("dharshuqueen2207@gmail.com", "New Heart Message", message);
  }
  