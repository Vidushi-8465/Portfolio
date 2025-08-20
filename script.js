const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

$('#year').textContent = new Date().getFullYear();

// Active nav on scroll
const sections = ['home','about','projects','education','contact'].map(id=>document.getElementById(id));
const navLinks = $$('.nav-link');
const ioNav = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      navLinks.forEach(a=>a.classList.remove('active'));
      const active = document.querySelector(`a[href="#${e.target.id}"]`);
      if(active) active.classList.add('active');
    }
  })
},{rootMargin:'-50% 0px -50% 0px'});
sections.forEach(sec=>ioNav.observe(sec));

// Reveal animations
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:.2});
$$('.reveal, .project-card, .t-item').forEach(el=>io.observe(el));

// Timeline reveal
const ioTime = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('reveal'); ioTime.unobserve(e.target); }});
},{threshold:.35});
$$('.t-item').forEach(el=>ioTime.observe(el));

// Modal setup
const modal = document.createElement('div');
modal.className='modal';
modal.innerHTML=`<div class="modal-card"><div class="modal-header"><strong id="modal-title"></strong><button class="close" id="modal-close">Close</button></div><div class="modal-body" id="modal-body"></div></div>`;
document.body.appendChild(modal);
$('#modal-close').addEventListener('click',()=>modal.classList.remove('open'));
modal.addEventListener('click',e=>{ if(e.target===modal) modal.classList.remove('open'); });

const projectDetails = {
  p1: { title:'TaskFlow', html:'<p>Details of TaskFlow project...</p>' },
  p2: { title:'Weatherly', html:'<p>Details of Weatherly...</p>' },
  p3: { title:'AuthKit', html:'<p>Details of AuthKit...</p>' },
  p4: { title:'DocuSpark', html:'<p>Details of DocuSpark...</p>' }
};

$$('.project-card').forEach(card=>{
  card.addEventListener('click',()=>{
    const data = projectDetails[card.dataset.project];
    if(!data) return;
    $('#modal-title').textContent = data.title;
    $('#modal-body').innerHTML = data.html;
    modal.classList.add('open');
  });
});

// Contact Form EmailJS
emailjs.init('PUBLIC_KEY_HERE');
$('#contact-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const payload = Object.fromEntries(fd.entries());
  const status = $('#form-status');
  status.textContent = 'Sending…';
  try{
    await emailjs.send('SERVICE_ID','TEMPLATE_ID', payload);
    status.textContent = 'Thanks! Message sent.';
    e.currentTarget.reset();
  }catch(err){
    console.error(err);
    status.textContent = 'Error sending message.';
  }
});

window.addEventListener("scroll", function() {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});

