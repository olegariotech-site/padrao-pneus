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
// OT Design Hub / Curadoria V1: orientar o orçamento com base no serviço escolhido.
// Não envia dados, não cria rastreamento e preserva o atalho direto de WhatsApp.
const quoteServiceSelect=document.querySelector('#service');
const quoteGuidance=document.querySelector('#quote-guidance');
const quoteDetailsInput=document.querySelector('#details');
const serviceAdvice={
  'Pneus':['Para pneus, a medida e a quantidade ajudam a equipe a entender seu pedido. Se não souber, descreva a necessidade.','Ex.: 195/55 R16, 4 unidades'],
  'Alinhamento':['Se desejar, conte se o carro puxa para um lado ou se notou desgaste irregular. A avaliação precisa ser feita pela equipe.','Ex.: carro puxando para a direita'],
  'Balanceamento':['Se desejar, descreva quando percebe vibração e a velocidade aproximada. A equipe orientará a avaliação.','Ex.: vibração no volante em estrada'],
  'Freios':['Se desejar, relate ruídos ou mudanças percebidas na frenagem. Não substitui avaliação profissional.','Ex.: ruído ao frear; modelo e ano'],
  'Suspensão':['Se desejar, descreva ruídos, desconforto ou situações em que aparecem. A equipe poderá orientar a avaliação.','Ex.: ruído ao passar em lombadas'],
  'Troca de óleo e filtros':['Se souber, informe modelo, ano e motorização; a equipe confirma a especificação adequada.','Ex.: Onix 2021 1.0; última troca'],
  'Outro serviço (consultar)':['Descreva o que precisa ou o que percebeu no veículo para a equipe orientar o próximo passo.','Ex.: descrição da necessidade']
};
const updateQuoteGuidance=()=>{
  const advice=serviceAdvice[quoteServiceSelect?.value];
  if(quoteGuidance)quoteGuidance.textContent=advice?advice[0]:'Selecione um serviço para ver quais informações ajudam a preparar seu pedido.';
  if(quoteDetailsInput)quoteDetailsInput.placeholder=advice?advice[1]:'Ex.: 195/55 R16, 4 unidades';
};
quoteServiceSelect?.addEventListener('change',updateQuoteGuidance);
document.querySelectorAll('[data-quote-service]').forEach(link=>link.addEventListener('click',()=>{
  const target=link.getAttribute('data-quote-service');
  if(!quoteServiceSelect||!Array.from(quoteServiceSelect.options).some(opt=>opt.value===target))return;
  quoteServiceSelect.value=target;
  updateQuoteGuidance();
}));
updateQuoteGuidance();
const quoteForm=document.querySelector('#quote-form');
// OT Design Hub — em telas pequenas, o atalho fixo não deve cobrir o formulário.
// O WhatsApp no próprio formulário continua disponível durante toda a operação.
if(quoteForm && 'IntersectionObserver' in window){
  new IntersectionObserver(entries=>{
    document.body.classList.toggle('ot-quote-form-visible',Boolean(entries[0]?.isIntersecting));
  },{threshold:0}).observe(quoteForm);
}

quoteForm?.addEventListener('submit',event=>{
 event.preventDefault();if(!quoteForm.reportValidity())return;
 const service=document.querySelector('#service').value.trim();
 const vehicle=document.querySelector('#vehicle').value.trim();
 const details=document.querySelector('#details').value.trim();
 const result='Olá, equipe Padrão Pneus! Gostaria de solicitar um orçamento.\nServiço: '+service+'\nVeículo: '+vehicle+(details?'\nDetalhes: '+details:'')+'\n\nOrigem: site da Padrão Pneus';
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

// OT Design Hub — vídeo institucional somente após clique, com pausa ao fechar.
const brandFilmDialog=document.querySelector('#brand-film-dialog');
const brandFilmLink=document.querySelector('[data-brand-film-open]');
const brandFilmPlayer=document.querySelector('#brand-film-player');
const brandFilmClose=document.querySelector('#brand-film-close');
if(brandFilmDialog && brandFilmLink && brandFilmPlayer && typeof brandFilmDialog.showModal==='function'){
  brandFilmLink.addEventListener('click',event=>{
    event.preventDefault();
    brandFilmDialog.showModal();
    const playResult=brandFilmPlayer.play();
    playResult?.catch?.(()=>{/* Reprodução manual segue disponível pelos controles. */});
  });
  brandFilmClose?.addEventListener('click',()=>brandFilmDialog.close());
  brandFilmDialog.addEventListener('click',event=>{
    if(event.target===brandFilmDialog)brandFilmDialog.close();
  });
  brandFilmDialog.addEventListener('close',()=>{
    brandFilmPlayer.pause();
    try{brandFilmPlayer.currentTime=0;}catch{/* Fonte ainda não carregada. */}
    brandFilmLink.focus({preventScroll:true});
  });
}
