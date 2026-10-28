'use strict';
// Padrão Pneus OT — V0.2. Demonstração não oficial.
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.navigation');
const closeMenu=(restoreFocus=false)=>{
 const wasOpen=nav?.classList.contains('open');
 nav?.classList.remove('open');
 menuButton?.setAttribute('aria-expanded','false');
 menuButton?.setAttribute('aria-label','Abrir menu');
 if(restoreFocus&&wasOpen)menuButton?.focus();
};
menuButton?.addEventListener('click',()=>{
 const expanded=nav.classList.toggle('open');
 menuButton.setAttribute('aria-expanded',String(expanded));
 menuButton.setAttribute('aria-label',expanded?'Fechar menu':'Abrir menu');
});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu(true)});
// Vídeo de fundo: autoplay discreto com fallback e acionamento manual no Safari iOS.
// Safari pode impedir autoplay em economia de energia: manter poster e oferecer play.
const video=document.querySelector('#hero-video');
const retry=document.querySelector('#hero-video-retry');
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
const mobileVideo=window.matchMedia('(max-width: 767px)');
const connection=navigator.connection;
if(video){
  const hero=video.closest('.hero');
  const status=document.querySelector('#hero-video-status');
  // Respeitar movimento reduzido e economia de dados no autoplay; permitir play voluntário.
  let manualRequested=false;
  const enabled=()=>manualRequested||(!motionPreference.matches&&!connection?.saveData);
  let userPaused=false;
  let inView=true;
  let failed=false;
  let generation=0;
  let pendingPlay=null;
  let lastError='';
  const diagnostic=document.querySelector('#hero-video-debug');
  const debugEnabled=new URLSearchParams(window.location.search).has('video-debug');
  const updateDebug=(state)=>{
    if(!diagnostic||!debugEnabled)return;
    diagnostic.hidden=false;
    diagnostic.textContent='Safari vídeo | '+state+' | '+(mobileVideo.matches?'mobile':'desktop')+' | ready='+video.readyState+' network='+video.networkState+' mediaError='+(video.error?.code||0)+' | playError='+(lastError||'-')+' | reducedMotion='+motionPreference.matches+' | saveData='+Boolean(connection?.saveData)+' | hidden='+document.hidden;
  };
  const control=state=>{
    hero.dataset.videoState=state;
    if(!retry)return;
    retry.hidden=false;
    retry.textContent=state==='playing'?'Ⅱ':'▶';
    retry.title=state==='playing'?'Pausar vídeo':'Reproduzir vídeo';
    retry.setAttribute('aria-label',state==='playing'?'Pausar vídeo de apresentação':'Reproduzir vídeo de apresentação');
    updateDebug(state);
  };
  const fail=()=>{
    failed=true;
    lastError='MediaError '+(video.error?.code||'não informado');
    video.classList.remove('video-ready');
    control('error');
    if(status)status.textContent='Vídeo indisponível. A imagem de apresentação continua visível. Tente reproduzir novamente.';
  };
  const attempt=()=>{
    if(!enabled()||userPaused||failed||!inView||document.hidden||pendingPlay)return;
    const currentGeneration=generation;
    const rejected=error=>{
      // load()/pause() can interrupt an older attempt during a source or visibility change.
      if(currentGeneration!==generation||error?.name==='AbortError')return;
      lastError=error?.name||'PlayError';
      if(error.name==='NotSupportedError'){fail();return;}
      control('blocked');
    };
    try{
      const result=video.play();
      if(result&&typeof result.then==='function'){
        pendingPlay=result;
        result.catch(rejected).finally(()=>{if(pendingPlay===result)pendingPlay=null;});
      }
    }catch(error){rejected(error);}
  };
  video.muted=true;
  video.defaultMuted=true;
  video.setAttribute('muted','');
  video.setAttribute('playsinline','');
  video.setAttribute('webkit-playsinline','');
  video.addEventListener('playing',()=>{
    if(!enabled()||userPaused||!inView||document.hidden){video.pause();return;}
    lastError='';
    video.classList.add('video-ready');
    control('playing');
  });
  video.addEventListener('pause',()=>{if(!failed)control('paused')});
  video.addEventListener('error',fail);
  video.addEventListener('loadeddata',attempt);
  retry?.addEventListener('click',()=>{
    if(!video.paused){
      userPaused=true;
      video.pause();
      control('paused');
    }else{
      userPaused=false;
      manualRequested=true;
      video.muted=true;
      // O gesto do usuário deve iniciar carregamento e play de forma síncrona.
      if(!video.getAttribute('src')){ selectSource(); return; }
      if(pendingPlay){ generation++; pendingPlay=null; }
      if(failed){
        // A falha de rede pode ser transitória. Nova tentativa só após toque.
        failed=false;
        generation++;
        pendingPlay=null;
        video.load();
      }
      // Keep play() directly in the click handler: iOS requires the user gesture.
      attempt();
    }
  });
  const selectSource=()=>{
    generation++;
    pendingPlay=null;
    failed=false;
    if(status)status.textContent='';
    if(!enabled()){
      video.pause();
      video.removeAttribute('autoplay');
      video.removeAttribute('src');
      video.preload='none';
      video.classList.remove('video-ready');
      video.load();
      control('static');
      return;
    }
    const source=mobileVideo.matches?video.dataset.mobileSrc:video.dataset.desktopSrc;
    if(video.getAttribute('src')!==source){
      video.pause();
      video.classList.remove('video-ready');
      video.preload='metadata';
      video.src=source;
      video.load();
    }
    // Explicit play() handles autoplay and allows a persistent user pause across rotation.
    video.autoplay=false;
    control(video.paused?'paused':'playing');
    attempt();
  };
  const observer=new IntersectionObserver(entries=>{
    if(!entries[0])return;
    inView=entries[0].isIntersecting;
    if(inView)attempt();
    else video.pause();
  },{threshold:0.05});
  observer.observe(hero);
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)video.pause();
    else attempt();
  });
  video.addEventListener('stalled',()=>updateDebug('stalled'));
  video.addEventListener('waiting',()=>updateDebug('waiting'));
  video.addEventListener('canplay',()=>updateDebug('canplay'));
  // React to rotation and accessibility changes without relying on <source media> reselection.
  motionPreference.addEventListener('change',selectSource);
  mobileVideo.addEventListener('change',selectSource);
  connection?.addEventListener?.('change',selectSource);
  selectSource();
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