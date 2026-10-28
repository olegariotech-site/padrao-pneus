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
// Vídeo de fundo: autoplay discreto com fallback e acionamento manual no Safari iOS.
// Safari pode impedir autoplay em economia de energia: manter poster e oferecer play.
const video=document.querySelector('#hero-video');
const retry=document.querySelector('#hero-video-retry');
const motionReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData=Boolean(navigator.connection?.saveData);
if(video){
  video.muted=true;
  video.defaultMuted=true;
  video.setAttribute('muted','');
  video.setAttribute('playsinline','');
  video.setAttribute('webkit-playsinline','');
  if(motionReduced||saveData){
    video.pause();
    video.removeAttribute('autoplay');
    video.preload='none';
    video.querySelectorAll('source').forEach(source=>source.remove());
    video.load();
    if(retry)retry.hidden=true;
  }else{
    let hasPlayed=false;
    const reveal=()=>{
      hasPlayed=true;
      video.classList.add('video-ready');
      if(retry)retry.hidden=true;
    };
    const attempt=()=>{
      if(document.hidden)return;
      const result=video.play();
      if(result&&typeof result.then==='function'){
        result.then(reveal).catch(()=>{
          // Low Power Mode / autoplay restriction on iOS: user gesture required.
          if(!hasPlayed&&retry)retry.hidden=false;
        });
      }
    };
    video.addEventListener('playing',reveal);
    video.addEventListener('error',()=>{
      video.classList.remove('video-ready');
      if(retry)retry.hidden=false;
    });
    video.addEventListener('loadeddata',()=>{
      if(!hasPlayed)attempt();
    },{once:true});
    retry?.addEventListener('click',()=>{
      video.muted=true;
      attempt();
    });
    // Avoid pausing immediately on an initial IntersectionObserver callback in iOS.
    const observer=new IntersectionObserver(entries=>{
      if(!entries[0])return;
      if(entries[0].isIntersecting)attempt();
      else if(hasPlayed)video.pause();
    },{threshold:0.05});
    observer.observe(video);
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden)video.pause();
      else if(video.getBoundingClientRect().bottom>0)attempt();
    });
    attempt();
  }
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