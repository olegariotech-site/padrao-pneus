'use strict';
// Padrão Pneus OT — V0.2. Demonstração não oficial.
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.navigation');
menuButton?.addEventListener('click',()=>{
 const expanded=nav.classList.toggle('open');
 menuButton.setAttribute('aria-expanded',String(expanded));
 menuButton.setAttribute('aria-label',expanded?'Fechar menu':'Abrir menu');
});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false')}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav?.classList.remove('open');menuButton?.setAttribute('aria-expanded','false')}});
// Prefere poster estático no modo economia de dados ou movimento reduzido.
const video=document.querySelector('#hero-video');
if(video&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&!navigator.connection?.saveData){
 const mobile=window.matchMedia('(max-width: 767px)').matches;
 video.poster='assets/hero-poster.svg';
 const source=document.createElement('source');
 source.src=mobile?'assets/padrao_hero_mobile.mp4':'assets/padrao_hero_desktop.mp4';
 source.type='video/mp4';
 video.appendChild(source);
 video.addEventListener('playing',()=>video.classList.add('video-ready'),{once:true});
 video.addEventListener('error',()=>video.classList.remove('video-ready'));
 video.muted=true;video.autoplay=true;video.load();
 const observer=new IntersectionObserver(entries=>{
  if(entries[0]?.isIntersecting&&!document.hidden){video.play().catch(()=>{});}
  else video.pause();
 },{threshold:.05});
 observer.observe(video);
 document.addEventListener('visibilitychange',()=>{
  if(document.hidden)video.pause();
  else if(video.getBoundingClientRect().bottom>0)video.play().catch(()=>{});
 });
}
const quoteForm=document.querySelector('#quote-form');
quoteForm?.addEventListener('submit',event=>{
 event.preventDefault();if(!quoteForm.reportValidity())return;
 const service=document.querySelector('#service').value.trim();
 const vehicle=document.querySelector('#vehicle').value.trim();
 const details=document.querySelector('#details').value.trim();
 const result='Olá, equipe Padrão Pneus! Gostaria de solicitar um orçamento.\nServiço: '+service+'\nVeículo: '+vehicle+(details?'\nDetalhes: '+details:'');
 document.querySelector('#quote-message').textContent=result;
 const sendQuote=document.querySelector('#send-quote');
 if(sendQuote)sendQuote.href='https://wa.me/5519974215389?text='+encodeURIComponent(result);
 document.querySelector('#quote-result').hidden=false;
});
document.querySelector('#copy-quote')?.addEventListener('click',async event=>{
 const message=document.querySelector('#quote-message').textContent;
 try{await navigator.clipboard.writeText(message);event.target.textContent='Mensagem copiada ✓';}
 catch{event.target.textContent='Selecione e copie a mensagem acima';}
});