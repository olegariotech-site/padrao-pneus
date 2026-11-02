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
// HERO cinematográfico: reprodução silenciosa contínua enquanto visível, sem controles.
const video=document.querySelector('#hero-video');
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
const mobileVideo=window.matchMedia('(max-width: 767px)');
const connection=navigator.connection;
if(video){
  const hero=video.closest('.hero');
  const status=document.querySelector('#hero-video-status');
  const diagnostic=document.querySelector('#hero-video-debug');
  const debugEnabled=new URLSearchParams(window.location.search).has('video-debug');
  let inView=true;
  let failed=false;
  let generation=0;
  let pendingPlay=null;
  const enabled=()=>!motionPreference.matches&&!connection?.saveData;
  const updateDebug=(state)=>{
    hero.dataset.videoState=state;
    if(!diagnostic||!debugEnabled)return;
    diagnostic.hidden=false;
    diagnostic.textContent='HERO | '+state+' | '+(mobileVideo.matches?'mobile':'desktop')+' | ready='+video.readyState+' error='+(video.error?.code||0);
  };
  const fallback=()=>{
    video.classList.add('fallback');
    video.classList.remove('video-ready');
    updateDebug('static');
    if(status)status.textContent='Apresentação visual estática disponível.';
  };
  const attempt=()=>{
    if(!enabled()||failed||!inView||document.hidden||pendingPlay)return;
    const current=generation;
    try{
      const playPromise=video.play();
      if(playPromise&&typeof playPromise.then==='function'){
        pendingPlay=playPromise;
        playPromise.catch(error=>{
          if(current!==generation||error?.name==='AbortError')return;
          // O Safari pode bloquear autoplay: preservar a arte sem exibir botão de play.
          fallback();
        }).finally(()=>{if(pendingPlay===playPromise)pendingPlay=null;});
      }
    }catch{fallback();}
  };
  const selectSource=()=>{
    generation++;
    pendingPlay=null;
    failed=false;
    if(!enabled()){
      video.pause();
      video.removeAttribute('autoplay');
      video.removeAttribute('src');
      video.preload='none';
      video.load();
      fallback();
      return;
    }
    video.muted=true;
    video.defaultMuted=true;
    video.setAttribute('muted','');
    video.setAttribute('playsinline','');
    video.setAttribute('webkit-playsinline','');
    video.autoplay=true;
    video.loop=true;
    video.setAttribute('autoplay','');
    const chosen=mobileVideo.matches?video.dataset.mobileSrc:video.dataset.desktopSrc;
    if(video.getAttribute('src')!==chosen){
      video.pause();
      video.classList.add('fallback');
      video.classList.remove('video-ready');
      video.src=chosen;
      video.preload='metadata';
      video.load();
    }
    attempt();
  };
  video.addEventListener('playing',()=>{
    if(!enabled()||!inView||document.hidden){video.pause();return;}
    video.classList.remove('fallback');
    video.classList.add('video-ready');
    if(status)status.textContent='';
    updateDebug('playing');
  });
  video.addEventListener('error',()=>{failed=true;fallback();});
  video.addEventListener('loadeddata',attempt);
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      inView=Boolean(entries[0]?.isIntersecting);
      if(inView)attempt();else video.pause();
    },{threshold:0.05});
    observer.observe(hero);
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else attempt();});
  const onChange=(query,callback)=>{
    if(query.addEventListener)query.addEventListener('change',callback);
    else query.addListener?.(callback);
  };
  onChange(motionPreference,selectSource);
  onChange(mobileVideo,selectSource);
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

// Vídeo institucional: loop silencioso na vitrine, carregamento somente perto da área visível.
const brandLoopVideo=document.querySelector('#brand-film-loop-video');
const brandLoopSource=brandLoopVideo?.querySelector('source[data-src]');
if(brandLoopVideo && brandLoopSource){
  let prepared=false;
  let visible=false;
  const allowed=()=>!motionPreference.matches&&!connection?.saveData;
  const stop=()=>{
    brandLoopVideo.pause();
    brandLoopVideo.classList.remove('is-playing');
  };
  const resume=()=>{
    if(!allowed()||document.hidden||!visible){stop();return;}
    brandLoopVideo.muted=true;
    brandLoopVideo.defaultMuted=true;
    brandLoopVideo.setAttribute('muted','');
    brandLoopVideo.setAttribute('playsinline','');
    brandLoopVideo.setAttribute('webkit-playsinline','');
    brandLoopVideo.loop=true;
    if(!prepared){
      brandLoopSource.src=brandLoopSource.dataset.src;
      brandLoopVideo.load();
      prepared=true;
    }
    const playing=brandLoopVideo.play();
    playing?.catch?.(()=>{brandLoopVideo.classList.remove('is-playing');});
  };
  brandLoopVideo.addEventListener('playing',()=>{
    if(!allowed()||!visible||document.hidden){stop();return;}
    brandLoopVideo.classList.add('is-playing');
  });
  brandLoopVideo.addEventListener('error',()=>brandLoopVideo.classList.remove('is-playing'));
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      visible=Boolean(entries[0]?.isIntersecting);
      if(visible)resume();else stop();
    },{rootMargin:'180px 0px',threshold:0});
    observer.observe(brandLoopVideo.closest('.brand-film-loop-frame'));
  }else{visible=true;resume();}
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else resume();});
  if(motionPreference.addEventListener)motionPreference.addEventListener('change',resume);
  else motionPreference.addListener?.(resume);
  connection?.addEventListener?.('change',resume);
}
