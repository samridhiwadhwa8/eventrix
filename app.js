const prizeCards = document.querySelectorAll('#prizeCardsUniqueRow .prize-card');
  let flippedPrizeCard = null;

  function flipPrizeCard(card) {
    if (flippedPrizeCard && flippedPrizeCard !== card) {
      flippedPrizeCard.classList.remove('flipped');
      flippedPrizeCard.setAttribute('aria-pressed', 'false');
      flippedPrizeCard.querySelector('.prize-front').setAttribute('aria-hidden', 'false');
      flippedPrizeCard.querySelector('.prize-back').setAttribute('aria-hidden', 'true');
    }

    const isFlipped = card.classList.toggle('flipped');
    card.setAttribute('aria-pressed', isFlipped ? 'true' : 'false');
    card.querySelector('.prize-front').setAttribute('aria-hidden', isFlipped);
    card.querySelector('.prize-back').setAttribute('aria-hidden', !isFlipped);

    flippedPrizeCard = isFlipped ? card : null;
  }

  prizeCards.forEach(card => {
    card.addEventListener('click', () => flipPrizeCard(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flipPrizeCard(card);
      }
    });
  });
  
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll("#popular-artists .artist-card");
  const half = Math.ceil(cards.length / 2);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        
        cards.forEach((card, i) => {
          if (i < half) {
            setTimeout(() => {
              card.classList.add("show-left");
            }, i * 300); 
          } else {
            setTimeout(() => {
              card.classList.add("show-right");
            }, i * 300); 
          }
        });
        observer.disconnect(); 
      }
    });
  }, { threshold: 0.3 });

  observer.observe(document.querySelector("#popular-artists"));
});

//modals

const modal = document.getElementById("eventModal");
const modalVideo = document.getElementById("modalVideo");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".close");


document.querySelectorAll(".card2").forEach(card => {
  card.addEventListener("click", () => {
    modalVideo.src = card.dataset.video;
    modalTitle.textContent = card.dataset.title;
    modalSubtitle.textContent = card.dataset.subtitle;
    modalPrice.textContent = card.dataset.price;
    modalDescription.textContent = card.dataset.description;

    modal.classList.add("show");
  });
});


closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  modalVideo.pause();
  modalVideo.currentTime = 0;
});


window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.remove("show");
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }
});
     const toggleBtn = document.getElementById('toggle');
    const panel = document.getElementById('panel');
    const launcher = document.getElementById('launcher');
    const minimize = document.getElementById('minimize');
    const send = document.getElementById('send');
    const input = document.getElementById('input');
    const messages = document.getElementById('messages');

    function openPanel(){
      panel.classList.add('open');
      launcher.classList.add('open');
      panel.setAttribute('aria-hidden','false');
      input.focus();
    }
    function closePanel(){
      panel.classList.remove('open');
      launcher.classList.remove('open');
      panel.setAttribute('aria-hidden','true');
    }

    toggleBtn.addEventListener('click', ()=>{
      if(panel.classList.contains('open')) closePanel(); else openPanel();
    });
    minimize.addEventListener('click', closePanel);

    // add message to chat area
    function addMessage(text, who='bot'){
      const el = document.createElement('div');
      el.className = 'msg '+who;
      el.textContent = text;
      messages.appendChild(el);
      // keep scrolled to bottom
      messages.scrollTop = messages.scrollHeight + 200;
    }

    // Very simple bot logic (echo + canned replies). Replace this with real API integration if you want.
    function botReply(userText){
      const clean = (userText || '').toLowerCase().trim();
      if(!clean) return addMessage("Say something so I can help!", 'bot');
      if(clean.includes('hello') || clean.includes('hi')) return addMessage('Hello! How can I help you today?', 'bot');
      if(clean.includes('help')) return addMessage('Sure — tell me what you need help with (event booking, event hosting or splitting expenses).', 'bot');
      if(clean.includes('time')) return addMessage('I do not have a clock built-in here — check your device time :)', 'bot');
      // fallback: echo with a short delay to simulate thinking
      setTimeout(()=> addMessage('You said: "' + userText + '"', 'bot'), 700);
    }

    function sendMessage(){
      const text = input.value.trim();
      if(!text) return;
      addMessage(text, 'user');
      input.value = '';
      // small fake typing indicator
      const t = document.createElement('div'); t.className = 'msg bot';
      t.innerHTML = '<span class="typing"></span>';
      messages.appendChild(t);
      messages.scrollTop = messages.scrollHeight + 200;
      setTimeout(()=>{
        t.remove();
        botReply(text);
      }, 700);
    }

    send.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') sendMessage(); });

    // close panel on outside click (on small screens)
    document.addEventListener('click', (e)=>{
      if(!panel.classList.contains('open')) return;
      if(e.target.closest('.chat-panel') || e.target.closest('.chat-launcher')) return;
      closePanel();
    });

    // Nice little entrance animation on page load (optional)
    window.addEventListener('load', ()=>{
      setTimeout(()=> toggleBtn.animate([{transform:'translateY(0) scale(1)'},{transform:'translateY(-6px) scale(1.02)'}],{duration:750,iterations:1,easing:'cubic-bezier(.2,.9,.3,1)'}),300);
    });
     window.addEventListener("load", () => {
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("content").style.display = "block";
    }, 2000);
