// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const navlist = document.getElementById('nav-menu');
  toggle?.addEventListener('click', ()=>{
    const open = navlist.classList.toggle('show');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Smooth internal scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href');
      if(id && id !== '#'){
        const el = document.querySelector(id);
        if(el){
          e.preventDefault();
          el.scrollIntoView({behavior:'smooth', block:'start'});
        }
      }
    });
  });

  // Year in footer
  const y = document.getElementById('year');
  if(y){ y.textContent = new Date().getFullYear(); }

  // ===== Robust Type/Delete Title Cycler =====
  const titles = [
    "AI/ML Researcher",
    "AI/ML Engineer",
    "Computer Vision Engineer",
    "Data Scientist",
    "Data Manager",
    "Data Analyst",
    "Deep Learning Engineer",
    "NLP Engineer"
  ];

  const el = document.getElementById('typewriter');
  if(!el){ return; }

  // Config
  const typeDelay = 70;   // ms per char
  const deleteDelay = 40; // ms per char
  const holdTime = 3500;  // 6s on each full title

  // State
  let i = 0;
  let txt = el.textContent || "";  // start with any existing text
  let mode = txt.length ? "holding" : "typing";
  let lastTime = 0;

  function rafLoop(ts){
    if(!lastTime) lastTime = ts;
    const dt = ts - lastTime;
    const target = titles[i];

    if(mode === "typing"){
      if(dt >= typeDelay){
        txt = target.slice(0, txt.length + 1);
        el.textContent = txt;
        lastTime = ts;
        if(txt === target){
          mode = "holding";
          lastTime = ts;
        }
      }
    } else if(mode === "holding"){
      if(dt >= holdTime){
        mode = "deleting";
        lastTime = ts;
      }
    } else if(mode === "deleting"){
      if(dt >= deleteDelay){
        txt = txt.slice(0, -1);
        el.textContent = txt;
        lastTime = ts;
        if(txt.length === 0){
          i = (i + 1) % titles.length;
          mode = "typing";
        }
      }
    }
    requestAnimationFrame(rafLoop);
  }

  // Kick off
  try {
    requestAnimationFrame(rafLoop);
  } catch (e){
    // Fallback if RAF fails for any reason
    let deleting = false;
    setInterval(()=>{
      const target = titles[i];
      if(!deleting){
        txt = target.slice(0, txt.length + 1);
        el.textContent = txt;
        if(txt === target){
          deleting = true;
          setTimeout(()=>{}, holdTime);
        }
      } else {
        txt = txt.slice(0, -1);
        el.textContent = txt;
        if(!txt.length){
          deleting = false;
          i = (i + 1) % titles.length;
        }
      }
    }, 80);
  }
});
