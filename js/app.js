import {toOrdinal,fromOrdinal,formatYear,active,distance,fromParts,parts,project,selectPreferredStoryForSubject} from './core.js?v=0.1.0-alpha.28';

const P={
  config:'./data/config.json?v=0.1.0-alpha.28',
  taxonomy:'./data/taxonomy.json?v=0.1.0-alpha.28',
  subjects:'./data/subjects.json?v=0.1.0-alpha.28',
  places:'./data/places.json?v=0.1.0-alpha.28',
  occurrences:'./data/occurrences.json?v=0.1.0-alpha.28',
  events:'./data/events.json?v=0.1.0-alpha.28',
  relationships:'./data/relationships.json?v=0.1.0-alpha.28',
  contexts:'./data/contexts.json?v=0.1.0-alpha.28',
  developments:'./data/developments.json?v=0.1.0-alpha.28',
  sources:'./data/sources.json?v=0.1.0-alpha.28',
  stories:'./data/stories.json?v=0.1.0-alpha.28',
  glossary:'./data/glossary.json?v=0.1.0-alpha.28',
  basemap:'./data/basemap/world_110m.geojson?v=0.1.0-alpha.28'
};

const s={
  config:null,taxonomy:null,subjects:[],places:[],occurrences:[],events:[],relationships:[],contexts:[],developments:[],sources:[],stories:[],glossary:[],basemap:null,
  year:1500,view:'histories',search:'',evidence:'all',occurrenceType:'all',certainty:'all',precision:'all',spatial:'all',labelMode:'auto',
  selectedOccurrence:null,historySubject:null,activeStory:null,storyScene:0,temporalSelection:null,eventWindow:100,category:'all',
  mapView:{x:0,y:0,w:1000,h:500},mapViewMode:'world',
  layers:{gastronomy:true,contexts:true,developments:true,safety:true}
};

const $=q=>document.querySelector(q);
const $$=q=>[...document.querySelectorAll(q)];

const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=v=>String(v??'').normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();
const queryMatches=(haystack,query)=>{
  const text=norm(haystack);
  const q=norm(query).trim();
  if(!q) return true;
  const words=text.split(/[^a-z0-9]+/).filter(Boolean);
  return q.split(/\s+/).filter(Boolean).every(token=>{
    if(token.length<=3) return words.some(word=>word===token||word.startsWith(token));
    return text.includes(token);
  });
};

const TYPE_LABELS={
  ingredient:'Ingrediente',
  food_species:'Especie / cultivo',
  dish:'Plato',
  preparation:'Preparación',
  beverage:'Bebida',
  processed_product:'Producto elaborado',
  culinary_technique:'Técnica culinaria',
  preservation_method:'Conservación',
  food_tool:'Utensilio',
  foodway:'Cultura alimentaria',
  meal_practice:'Práctica de comida',
  culinary_institution:'Institución gastronómica',
  historical_text:'Texto histórico',
  recipe:'Receta',
  trade_good:'Mercancía alimentaria',
  other:'Otro'
};

const EVIDENCE_LABELS={
  archaeological:'Arqueológica',
  archaeobotanical:'Arqueobotánica',
  archaeozoological:'Arqueozoológica',
  biomolecular:'Biomolecular',
  genetic:'Genética',
  textual:'Textual',
  iconographic:'Iconográfica',
  material_culture:'Cultura material',
  legal:'Legal',
  economic_record:'Registro económico',
  ethnographic:'Etnográfica',
  traditional:'Tradicional',
  unknown:'Sin validar'
};

const OCC_LABELS={
  archaeological_presence:'Presencia arqueológica',
  cultivation:'Cultivo',
  domestication_evidence:'Evidencia de domesticación',
  production:'Producción',
  storage:'Almacenamiento',
  consumption:'Consumo',
  textual_attestation:'Atestiguación textual',
  recipe_attestation:'Receta documentada',
  technique_attestation:'Técnica documentada',
  trade:'Comercio',
  introduction:'Introducción',
  adoption:'Adopción',
  regulation:'Regulación',
  industrial_production:'Producción industrial',
  traditional_attribution:'Atribución tradicional',
  other:'Otro'
};

const CERTAINTY_LABELS={
  high:'Alta',
  medium:'Media',
  low:'Baja',
  disputed:'Discutida',
  unknown:'Desconocida'
};


const PRECISION_LABELS={
  exact:'Exacta',
  year:'Año',
  decade:'Década',
  century:'Siglo',
  millennium:'Milenio',
  range:'Intervalo',
  phase:'Fase',
  before:'Anterior a',
  after:'Posterior a',
  circa:'Aproximada',
  unknown:'Desconocida'
};

const PRECISION_HELP={
  exact:'La fuente permite situar la afirmación en una fecha explícita y concreta.',
  year:'La resolución disponible es de un año, sin afirmar mayor precisión interna.',
  decade:'La evidencia solo permite resolver la cronología a escala de década.',
  century:'La cronología se expresa a escala de siglo; no debe leerse como un año concreto.',
  millennium:'La cronología se expresa a escala de milenio; el intervalo amplio es parte de la evidencia.',
  range:'La afirmación corresponde a un intervalo documentado; no existe una fecha única válida.',
  phase:'La datación depende de una fase arqueológica o histórica, no de un año aislado.',
  before:'La evidencia establece un límite anterior, no una fecha exacta.',
  after:'La evidencia establece un límite posterior, no una fecha exacta.',
  circa:'La fecha es aproximada. El valor mostrado orienta, pero no debe interpretarse como exacto.',
  unknown:'La resolución cronológica no está determinada con seguridad.'
};

const CERTAINTY_HELP={
  high:'La afirmación central está sólidamente respaldada por la evidencia citada en este registro. No significa certeza absoluta ni convierte una primera evidencia en un origen.',
  medium:'La afirmación es plausible y está documentada, pero conserva una limitación relevante de evidencia, interpretación o generalización.',
  low:'La afirmación tiene apoyo limitado y debe leerse con cautela.',
  disputed:'Existen interpretaciones académicas contrapuestas. El Atlas conserva el desacuerdo y muestra las posiciones y sus fuentes.',
  unknown:'No existe todavía una evaluación de certeza suficientemente informativa.'
};

const STATUS_HELP={
  reviewed:'El registro ha superado revisión editorial de fuentes, cronología, precisión, evidencia y redacción.',
  verified:'El registro ha superado una segunda revisión explícita con contraste independiente cuando ha sido posible.'
};

const SOURCE_TYPE_LABELS={
  peer_reviewed_article:'Artículo revisado por pares',
  peer_reviewed_commentary:'Comentario académico revisado por pares',
  peer_reviewed_letter:'Carta científica revisada por pares',
  conference_proceedings:'Actas académicas',
  official_institution:'Institución oficial',
  official_document:'Documento oficial',
  scholarly_monograph:'Monografía académica',
  monograph:'Monografía',
  primary_text:'Texto primario',
  primary_source:'Fuente primaria',
  book:'Libro',
  institutional_outreach:'Divulgación institucional',
  dataset:'Dataset',
  museum:'Museo / colección',
  museum_collection:'Colección museística',
  museum_institution:'Museo / institución patrimonial',
  museum_scholarly_chapter:'Capítulo académico museístico',
  corporate_archive:'Archivo / historia corporativa',
  other:'Otra fuente',
  unknown:'Tipo no clasificado'
};

const PRECISION_ORDER=['exact','year','decade','circa','range','century','millennium','phase','before','after','unknown'];

const EVENT_LABELS={
  diffusion:'Difusión / intercambio',
  exchange:'Intercambio',
  regulation:'Regulación',
  scientific:'Cambio científico',
  industrial:'Cambio industrial',
  other:'Proceso histórico'
};

const CATEGORY_LABELS={
  food_species:'Cultivos y especies',
  beverage:'Bebidas',
  culinary_technique:'Técnicas',
  processed_product:'Productos elaborados',
  ingredient:'Ingredientes',
  other:'Otros'
};

async function j(url){
  const r=await fetch(url);
  if(!r.ok) throw new Error(`${url}: ${r.status}`);
  return r.json();
}

async function load(){
  try{
    const [config,taxonomy,subjects,places,occurrences,events,relationships,contexts,developments,sources,stories,glossary,basemap]=await Promise.all(Object.values(P).map(j));
    Object.assign(s,{config,taxonomy,subjects,places,occurrences,events,relationships,contexts,developments,sources,stories,glossary,basemap});
    s.year=config.timeline.initialYear;
    s.eventWindow=config.timeline.eventWindowYears;

    fillControls();
    renderBasemap();
    resetMapView({silent:true});
    bind();
    applyTheme(getStore('agh_theme')==='light'?'light':'dark');
    setYear(s.year);
    if(!location.hash) history.replaceState({aghRoute:true},'','#historias');
    restoreRouteFromLocation({initial:true});

    $('#versionLabel').textContent=config.project.version.replace('0.1.0-','');
    showToast('Atlas cargado');
  }catch(error){
    console.error(error);
    $('#mapMessage').classList.remove('hidden');
    $('#mapMessage').innerHTML='No se pudieron cargar los datos. Abre la URL publicada en GitHub Pages o usa el servidor local de desarrollo.';
  }
}

function fillControls(){
  const sf=$('#subjectTypeFilter');
  s.taxonomy.subjectTypes.forEach(x=>sf.add(new Option(TYPE_LABELS[x]||x,x)));

  const ef=$('#evidenceFilter');
  s.taxonomy.evidenceTypes.forEach(x=>ef.add(new Option(EVIDENCE_LABELS[x]||x,x)));

  const of=$('#occurrenceTypeFilter');
  s.taxonomy.occurrenceTypes.forEach(x=>of.add(new Option(OCC_LABELS[x]||x,x)));

  const cf=$('#certaintyFilter');
  s.taxonomy.certaintyLevels.forEach(x=>cf.add(new Option(CERTAINTY_LABELS[x]||x,x)));

  const pf=$('#precisionFilter');
  const precisions=[...new Set(
    [...s.occurrences,...s.events,...s.developments]
      .filter(item=>isPublicStatus(item.status))
      .map(item=>item.period?.precision)
      .filter(Boolean)
  )].sort((a,b)=>{
    const ai=PRECISION_ORDER.indexOf(a),bi=PRECISION_ORDER.indexOf(b);
    return (ai<0?999:ai)-(bi<0?999:bi)||a.localeCompare(b,'es');
  });
  precisions.forEach(x=>pf.add(new Option(PRECISION_LABELS[x]||x,x)));

  const ew=$('#eventWindowSelect');
  [25,50,100,250,500].forEach(x=>ew.add(new Option(`±${x} años`,x)));
  ew.value=s.eventWindow;

  $('#temporalMinLabel').textContent=formatYear(s.config.timeline.minYear);
  $('#temporalMaxLabel').textContent=formatYear(s.config.timeline.maxYear);
  $('#temporalCursor').setAttribute('aria-valuemin',String(s.config.timeline.minYear));
  $('#temporalCursor').setAttribute('aria-valuemax',String(s.config.timeline.maxYear));

  syncTypeControls();
}

function subj(id){return s.subjects.find(x=>x.id===id)}
function place(id){return s.places.find(x=>x.id===id)}
function sourceById(id){return s.sources.find(x=>x.id===id)}
function storyById(id){return s.stories.find(x=>x.id===id)}
function preferredStoryForSubject(subjectId){return selectPreferredStoryForSubject(s.stories.filter(x=>isPublicStatus(x.status)),subjectId)}
function glossaryById(id){return s.glossary.find(x=>x.id===id&&isPublicStatus(x.status))||null}

let routeSyncLocked=false;

function withRouteSyncLocked(fn){
  const previous=routeSyncLocked;
  routeSyncLocked=true;
  try{return fn();}
  finally{routeSyncLocked=previous;}
}

function safeRoutePart(value){
  return encodeURIComponent(String(value??''));
}

function parseExperienceRoute(hash=location.hash){
  const raw=String(hash||'').replace(/^#/,'');
  if(!raw||raw==='inicio'||raw==='historias') return {view:'histories'};

  const parts=raw.split('/').map(x=>{
    try{return decodeURIComponent(x)}
    catch{return x}
  });

  if(parts[0]==='historia'&&parts[1]){
    return {view:'histories',storyId:parts[1],scene:Math.max(0,(Number(parts[2])||1)-1)};
  }

  if(parts[0]==='atlas'){
    if(parts[1]==='evidencia'&&parts[2]) return {view:'explore',kind:'occurrence',ref:parts[2]};
    if(parts[1]==='hito'&&parts[2]&&parts[3]) return {view:'explore',kind:parts[2],ref:parts[3]};
    if(parts[1]==='fecha'&&parts[2]&&Number.isFinite(Number(parts[2]))) return {view:'explore',year:Number(parts[2])};
    return {view:'explore'};
  }

  return {view:'histories'};
}

function pushExperienceRoute(hash,{replace=false}={}){
  if(routeSyncLocked) return;
  const target=hash.startsWith('#')?hash:`#${hash}`;
  if(location.hash===target) return;
  history[replace?'replaceState':'pushState']({aghRoute:true},'',target);
}

function routeToHistories({replace=false}={}){
  pushExperienceRoute('#historias',{replace});
}

function routeToStory(storyId,sceneIndex,{replace=false}={}){
  pushExperienceRoute(`#historia/${safeRoutePart(storyId)}/${Number(sceneIndex)+1}`,{replace});
}

function routeToAtlas({kind=null,ref=null,year=null,replace=false}={}){
  if(kind&&ref){
    const hash=kind==='occurrence'
      ? `#atlas/evidencia/${safeRoutePart(ref)}`
      : `#atlas/hito/${safeRoutePart(kind)}/${safeRoutePart(ref)}`;
    pushExperienceRoute(hash,{replace});
    return;
  }
  if(Number.isFinite(Number(year))){
    pushExperienceRoute(`#atlas/fecha/${Number(year)}`,{replace});
    return;
  }
  pushExperienceRoute('#atlas',{replace});
}

function temporalEntryForRoute(kind,ref){
  return temporalCorpusItems().find(entry=>entry.key===`${kind}:${ref}`)||null;
}

function applyExperienceRoute(route,{initial=false}={}){
  const target=route||{view:'histories'};
  withRouteSyncLocked(()=>{
    closeHistory();
    closeDrawer();
    closeLayers();
    closeDetail();

    if(target.view==='histories'){
      setExperienceView('histories',{scroll:false});
      if(target.storyId&&storyById(target.storyId)) openNarrativeStory(target.storyId,target.scene||0);
      else closeNarrativeStory({scroll:false});
      return;
    }

    closeNarrativeStory({scroll:false});
    setExperienceView('explore',{scroll:false});

    if(target.kind==='occurrence'&&target.ref){
      const o=s.occurrences.find(x=>x.id===target.ref);
      if(o){
        revealOccurrenceForDirectAccess(o);
        setYear(o.period.start);
        selectOccurrence(o.id,true);
        setTimeout(()=>fitMapToOccurrences([o],{mode:'selection'}),0);
        return;
      }
    }

    if(target.kind&&target.ref){
      const entry=temporalEntryForRoute(target.kind,target.ref);
      if(entry){
        focusTemporalItem(entry,true);
        setTimeout(()=>$('#temporalNavigator')?.scrollIntoView({behavior:initial?'auto':'smooth',block:'center'}),20);
        return;
      }
    }

    if(Number.isFinite(target.year)){
      const year=Math.max(s.config.timeline.minYear,Math.min(s.config.timeline.maxYear,target.year));
      setExactYear(year);
    }
  });
}

function restoreRouteFromLocation({initial=false}={}){
  applyExperienceRoute(parseExperienceRoute(location.hash),{initial});
}


function isPublicStatus(status){
  return status==='reviewed'||status==='verified';
}

function occurrenceHeadline(o){
  const subject=subj(o.subjectRef);
  const pl=place(o.placeRef);
  const subjectName=subject?.name||o.subjectRef;
  const placeName=pl?.name||'Lugar sin resolver';
  const action={
    archaeological_presence:'Evidencia de',
    cultivation:'Cultivo de',
    domestication_evidence:'Domesticación de',
    production:'Producción de',
    storage:'Almacenamiento de',
    consumption:'Consumo de',
    textual_attestation:'Mención de',
    recipe_attestation:'Receta de',
    technique_attestation:'Técnica vinculada a',
    trade:'Comercio de',
    introduction:'Introducción de',
    adoption:'Adopción de',
    regulation:'Regulación de',
    industrial_production:'Producción industrial de',
    traditional_attribution:'Tradición sobre',
    other:'Evidencia de'
  }[o.occurrenceType]||'Evidencia de';
  return `${action} ${subjectName} · ${placeName}`;
}

function statusMeta(status){
  const map={
    verified:{label:'Verificado',className:'verified'},
    reviewed:{label:'Revisado',className:'reviewed'},
    draft:{label:'Borrador',className:'draft'},
    seed:{label:'Dato provisional',className:'seed'},
    deprecated:{label:'Obsoleto',className:'deprecated'}
  };
  return map[status]||{label:status||'Sin estado',className:'draft'};
}

function sourceListHTML(refs=[]){
  const resolved=[...new Set(refs)].map(sourceById).filter(Boolean);
  if(!resolved.length) return '<p class="source-empty">Fuentes pendientes.</p>';

  return `<div class="source-list">${resolved.map(src=>`
    <a class="source-link" href="${esc(src.url||'#')}" target="_blank" rel="noopener noreferrer">
      <span>${esc(src.publisher||'Fuente')}</span>
      <strong>${esc(src.title)}</strong>
    </a>
  `).join('')}</div>`;
}

function disputeHTML(item){
  if(item?.certainty!=='disputed'||!item.dispute) return '';
  const summary=disputedSourceSummary(item);
  const positions=(item.dispute.positions||[]).map((position,index)=>{
    const profile=sourceProfileText(position.sourceRefs||[]);
    return `<article class="dispute-position">
      <span>${String(index+1).padStart(2,'0')}</span>
      <div>
        <div class="dispute-position-head">
          <strong>${esc(position.label)}</strong>
          <small>${esc(profile)}</small>
        </div>
        <p>${esc(position.summary)}</p>
        ${sourceListHTML(position.sourceRefs||[])}
        ${sourceComparisonHTML(position.sourceRefs||[])}
      </div>
    </article>`;
  }).join('');

  const sharedText=summary?.shared?.length
    ? `${summary.shared.length} ${summary.shared.length===1?'fuente aparece':'fuentes aparecen'} en más de una posición`
    : 'Las posiciones no comparten fuentes citadas en este registro';

  return `<section class="dispute-box" aria-label="Debate historiográfico">
    <div class="dispute-head">
      <span>DEBATE ABIERTO · SIN CONSENSO EDITORIAL IMPUESTO</span>
      <strong>${esc(item.dispute.question)}</strong>
      <small>${summary?.positions?.length||0} posiciones · ${summary?.unique?.length||0} fuentes únicas · ${esc(sharedText)}</small>
    </div>
    <div class="dispute-positions">${positions}</div>
    <div class="dispute-neutrality">
      <strong>Cómo leer este debate</strong>
      <span>Que el registro esté revisado significa que el desacuerdo está documentado correctamente; no significa que el Atlas haya resuelto cuál interpretación es correcta.</span>
    </div>
    ${item.dispute.editorialNote?`<p class="dispute-editorial">${esc(item.dispute.editorialNote)}</p>`:''}
  </section>`;
}

function pointPrecisionLabel(pl){
  const precision=pl?.point?.precision;
  if(precision==='approximate') return 'Punto cartográfico aproximado';
  if(precision==='reference') return 'Punto cartográfico de referencia';
  if(precision==='exact_from_publication') return 'Coordenadas publicadas';
  return pl?.point ? 'Punto cartográfico' : 'Sin punto cartográfico';
}

function pointPrecisionHelp(pl){
  const precision=pl?.point?.precision;
  if(precision==='exact_from_publication') return 'Las coordenadas proceden de una publicación citada. Esto describe la posición del lugar, no la precisión de la afirmación histórica.';
  if(precision==='reference') return 'Se usa un punto de referencia para orientar el mapa; no debe interpretarse como localización exacta del hallazgo o de toda la región.';
  if(precision==='approximate') return 'La posición es aproximada y se representa solo como orientación espacial.';
  if(pl?.point) return 'Existe un punto cartográfico, pero su precisión espacial debe leerse según la procedencia documentada.';
  return 'El registro conserva su lugar histórico, pero no se ha asignado un punto porque no hay coordenadas suficientemente fiables. No se usa un centroide arbitrario para rellenar el mapa.';
}

function sourceTypeLabel(type){
  return SOURCE_TYPE_LABELS[type]||String(type||'Tipo no clasificado').replaceAll('_',' ');
}

function sourceProfile(refs=[]){
  const resolved=[...new Set(refs)].map(sourceById).filter(Boolean);
  const types=new Map();
  const publishers=new Set();
  for(const src of resolved){
    const label=sourceTypeLabel(src.sourceType);
    types.set(label,(types.get(label)||0)+1);
    if(src.publisher) publishers.add(src.publisher);
  }
  return {resolved,types,publishers};
}

function sourceProfileText(refs=[]){
  const {resolved,types}=sourceProfile(refs);
  if(!resolved.length) return 'Sin fuentes resueltas';
  const detail=[...types.entries()]
    .map(([label,count])=>`${count} ${label.toLowerCase()}`)
    .join(' · ');
  return `${resolved.length} ${resolved.length===1?'fuente':'fuentes'}${detail?` · ${detail}`:''}`;
}

function sourceComparisonHTML(refs=[]){
  const {resolved}=sourceProfile(refs);
  if(resolved.length<2) return '';

  return `<details class="source-comparison">
    <summary>Comparar ${resolved.length} fuentes</summary>
    <div class="source-comparison-grid">
      ${resolved.map((src,index)=>`
        <article class="source-compare-card">
          <span>${String(index+1).padStart(2,'0')} · ${esc(sourceTypeLabel(src.sourceType))}</span>
          <strong>${esc(src.publisher||'Fuente')}</strong>
          <p>${esc(src.title)}</p>
          ${src.notes?`<small>${esc(src.notes)}</small>`:''}
          ${src.url?`<a href="${esc(src.url)}" target="_blank" rel="noopener noreferrer">Abrir fuente ↗</a>`:''}
        </article>
      `).join('')}
    </div>
  </details>`;
}

function precisionLabel(item){
  return PRECISION_LABELS[item?.period?.precision]||item?.period?.precision||'Sin precisión';
}

function periodSpanYears(period){
  if(!period) return null;
  const start=toOrdinal(period.start);
  const end=toOrdinal(period.end);
  if(!Number.isFinite(start)||!Number.isFinite(end)) return null;
  return Math.abs(end-start);
}

function formatTemporalSpan(years){
  if(!Number.isFinite(years)) return 'Amplitud no calculable';
  if(years===0) return 'Fecha puntual en la resolución declarada';
  const fmt=new Intl.NumberFormat('es-ES');
  return `≈ ${fmt.format(years)} ${years===1?'año':'años'} de intervalo`;
}

function periodSemantics(item){
  const precision=item?.period?.precision||'unknown';
  const span=periodSpanYears(item?.period);
  const open=precision==='before'||precision==='after';
  const approximate=precision==='circa';
  const broad=['century','millennium','phase'].includes(precision);
  const ranged=precision==='range'||(Number.isFinite(span)&&span>0);

  let mode='point';
  if(open) mode=precision;
  else if(approximate) mode='circa';
  else if(broad) mode='broad';
  else if(ranged) mode='range';

  return {precision,span,open,approximate,broad,ranged,mode};
}

function periodProfileHTML(item){
  const sem=periodSemantics(item);
  const display=item?.period?.display||`${formatYear(item.period.start)}–${formatYear(item.period.end)}`;
  let spanText=formatTemporalSpan(sem.span);
  if(sem.open) spanText=sem.precision==='before'?'Límite abierto hacia fechas anteriores':'Límite abierto hacia fechas posteriores';

  return `<div class="period-profile ${esc(sem.mode)}">
    <div class="period-profile-rail" aria-hidden="true">
      <i></i><b></b><em></em>
    </div>
    <div class="period-profile-copy">
      <strong>${esc(display)}</strong>
      <span>${esc(precisionLabel(item))} · ${esc(spanText)}</span>
    </div>
  </div>`;
}

function historyGapLabel(previous,current){
  if(!previous?.period||!current?.period) return '';
  const previousEnd=toOrdinal(previous.period.end);
  const currentStart=toOrdinal(current.period.start);
  if(!Number.isFinite(previousEnd)||!Number.isFinite(currentStart)) return '';

  if(currentStart<=previousEnd){
    return 'Se solapa temporalmente con el hito anterior';
  }

  const gap=currentStart-previousEnd;
  if(gap<=1) return 'Continuidad temporal con el hito anterior';

  const fmt=new Intl.NumberFormat('es-ES');
  return `≈ ${fmt.format(gap)} ${gap===1?'año':'años'} desde el final del hito anterior`;
}

function historyGapHTML(previous,current){
  if(!previous) return '';
  const label=historyGapLabel(previous,current);
  return label?`<div class="history-gap"><i></i><span>${esc(label)}</span></div>`:'';
}

function temporalPeriodPercent(period){
  if(!period) return null;
  const start=temporalPercent(period.start);
  const end=temporalPercent(period.end);
  if(!Number.isFinite(start)||!Number.isFinite(end)) return null;
  return {
    left:Math.min(start,end),
    width:Math.abs(end-start),
    start,
    end
  };
}

function renderTemporalPrecisionWindow(entry){
  const box=$('#temporalPrecisionWindow');
  if(!box) return;

  if(!entry?.period){
    box.classList.add('hidden');
    box.removeAttribute('data-mode');
    return;
  }

  const pos=temporalPeriodPercent(entry.period);
  if(!pos){
    box.classList.add('hidden');
    return;
  }

  const sem=periodSemantics(entry);
  const center=temporalPercent(temporalRepresentativeYear(entry));
  const exact=sem.span===0&&!sem.open;
  const left=exact?center:pos.left;
  const width=exact?0:pos.width;

  box.classList.remove('hidden');
  box.dataset.mode=sem.mode;
  box.style.setProperty('--left',`${left.toFixed(4)}%`);
  box.style.setProperty('--width',`${width.toFixed(4)}%`);
  box.querySelector('span').textContent=`${precisionLabel(entry)} · ${entry.period.display||formatYear(entry.period.start)}`;
}

function disputedSourceSummary(item){
  if(item?.certainty!=='disputed'||!item.dispute) return null;
  const positions=item.dispute.positions||[];
  const unique=[...new Set(positions.flatMap(position=>position.sourceRefs||[]))];
  const overlap=new Map();
  for(const position of positions){
    for(const ref of new Set(position.sourceRefs||[])){
      overlap.set(ref,(overlap.get(ref)||0)+1);
    }
  }
  const shared=[...overlap.entries()].filter(([,count])=>count>1).map(([ref])=>ref);
  return {positions,unique,shared};
}


function evidenceReadingHTML(o,pl){
  const status=statusMeta(o.status);
  const sourceText=sourceProfileText(o.sourceRefs||[]);
  const precision=o.period?.precision||'unknown';
  const certainty=o.certainty||'unknown';

  return `<div class="evidence-reading-grid">
    <article class="reading-card chronology">
      <span>RESOLUCIÓN CRONOLÓGICA</span>
      <strong>${esc(precisionLabel(o))}</strong>
      <p>${esc(PRECISION_HELP[precision]||'La fecha debe interpretarse con la resolución declarada en el registro.')}</p>
      ${periodProfileHTML(o)}
      ${o.period?.note?`<small>${esc(o.period.note)}</small>`:''}
    </article>

    <article class="reading-card certainty ${esc(certainty)}">
      <span>CERTEZA HISTÓRICA</span>
      <strong>${esc(CERTAINTY_LABELS[certainty]||certainty)}</strong>
      <p>${esc(CERTAINTY_HELP[certainty]||CERTAINTY_HELP.unknown)}</p>
    </article>

    <article class="reading-card editorial ${esc(status.className)}">
      <span>ESTADO EDITORIAL</span>
      <strong>${esc(status.label)}</strong>
      <p>${esc(STATUS_HELP[o.status]||'Estado editorial del registro.')}</p>
    </article>

    <article class="reading-card spatial">
      <span>PRECISIÓN ESPACIAL</span>
      <strong>${esc(pointPrecisionLabel(pl))}</strong>
      <p>${esc(pointPrecisionHelp(pl))}</p>
    </article>

    <article class="reading-card sources">
      <span>BASE DOCUMENTAL</span>
      <strong>${esc(sourceText)}</strong>
      <p>El número de fuentes no equivale por sí solo a mayor certeza: importa su independencia, pertinencia y tipo de evidencia.</p>
    </article>
  </div>
  <div class="reading-separation-note">
    <strong>No confundir:</strong>
    <span><b>${esc(status.label)}</b> describe el proceso editorial del Atlas; <b>${esc(CERTAINTY_LABELS[certainty]||certainty)}</b> describe la solidez o grado de disputa de la afirmación histórica; <b>${esc(precisionLabel(o))}</b> describe la resolución temporal.</span>
  </div>`;
}

function matchesSpatialFilter(o){
  if(s.spatial==='all') return true;
  const pl=place(o.placeRef);
  const mapped=Boolean(pl?.point && Number.isFinite(Number(pl.point.lat)) && Number.isFinite(Number(pl.point.lon)));
  return s.spatial==='mapped' ? mapped : !mapped;
}

function matchesEvidenceQualityFilters(item){
  if(s.certainty!=='all' && item.certainty!==s.certainty) return false;
  if(s.precision!=='all' && item.period?.precision!==s.precision) return false;
  return true;
}


function verificationHTML(item){
  if(item?.status!=='verified'||!item.verification) return '';
  const v=item.verification;
  return `<div class="verification-box">
    <span>SEGUNDA REVISIÓN</span>
    <strong>Verificado · ${esc(v.verifiedOn||'')}</strong>
    <p>${esc(v.note||'')}</p>
  </div>`;
}

function occurrenceMatchesExplorerFilters(o){
  if(!isPublicStatus(o.status)) return false;
  if(s.evidence!=='all' && o.evidenceType!==s.evidence) return false;
  if(s.occurrenceType!=='all' && o.occurrenceType!==s.occurrenceType) return false;
  if(!matchesEvidenceQualityFilters(o)) return false;
  if(!matchesSpatialFilter(o)) return false;

  const subject=subj(o.subjectRef);
  const pl=place(o.placeRef);
  if(!subject || !pl || !isPublicStatus(subject.status) || !isPublicStatus(pl.status)) return false;
  if(s.category!=='all' && subject.type!==s.category) return false;

  const q=norm(s.search.trim());
  if(q){
    const haystack=norm([
      subject.name,subject.summary,(subject.aliases||[]).join(' '),(subject.tags||[]).join(' '),
      pl.name,pl.summary,o.summary,occurrenceHeadline(o),
      TYPE_LABELS[subject.type],EVIDENCE_LABELS[o.evidenceType],OCC_LABELS[o.occurrenceType],
      CERTAINTY_LABELS[o.certainty],PRECISION_LABELS[o.period?.precision],pointPrecisionLabel(pl)
    ].join(' '));
    if(!queryMatches(haystack,q)) return false;
  }
  return true;
}

function occMapVisible(){
  if(!s.layers.gastronomy) return [];
  return s.occurrences.filter(occurrenceMatchesExplorerFilters);
}

function occVisible(){
  return occMapVisible().filter(o=>active(o.period,s.year));
}


function placeHasMapPoint(pl){
  return Boolean(pl?.point && Number.isFinite(Number(pl.point.lat)) && Number.isFinite(Number(pl.point.lon)));
}
function firstResolvedPlace(placeRefs=[]){return placeRefs.map(place).find(Boolean)||null;}
function firstMappablePlace(placeRefs=[]){return placeRefs.map(place).find(placeHasMapPoint)||null;}
function occurrencesWithoutMapPoint(list){return list.filter(o=>!placeHasMapPoint(place(o.placeRef)));}
function activeUnmappedSecondaryRecords(){
  const records=[];
  if(s.layers.contexts){
    for(const c of s.contexts){
      if(!isPublicStatus(c.status)||!active(c.period,s.year)||firstMappablePlace(c.placeRefs||[])) continue;
      const resolved=firstResolvedPlace(c.placeRefs||[]);
      records.push({kind:'context',id:c.id,title:c.name,period:c.period,placeLabel:resolved?.name||'Ámbito no puntual',reason:(c.placeRefs||[]).length?'Ámbito regional o referencia histórica sin un punto cartográfico validado.':'Contexto sin una localización puntual única atribuida.'});
    }
  }
  for(const d of s.developments){
    if(!isPublicStatus(d.status)||!matchesEvidenceQualityFilters(d)||!active(d.period,s.year)) continue;
    const safety=['hygiene','food_safety','public_health','regulation','quality_system'].includes(d.type);
    if((safety?!s.layers.safety:!s.layers.developments)||firstMappablePlace(d.placeRefs||[])) continue;
    const resolved=firstResolvedPlace(d.placeRefs||[]);
    records.push({kind:'development',id:d.id,title:d.name,period:d.period,placeLabel:resolved?.name||'Proceso multiterritorial',reason:(d.placeRefs||[]).length?'Referencia espacial existente, pero sin un punto cartográfico validado.':'Transformación multiterritorial o sin una localización puntual única sustentada.'});
  }
  return records;
}

function setMapViewBox(view,{mode='custom'}={}){
  const map=$('#worldMap');
  if(!map) return;
  const x=Math.max(0,Math.min(1000-Number(view.w),Number(view.x)));
  const y=Math.max(0,Math.min(500-Number(view.h),Number(view.y)));
  const w=Math.max(120,Math.min(1000,Number(view.w)));
  const h=Math.max(80,Math.min(500,Number(view.h)));
  s.mapView={x,y,w,h};
  s.mapViewMode=mode;
  map.setAttribute('viewBox',`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)}`);
  $('#mapResetViewBtn')?.classList.toggle('hidden',mode==='world');
}

function resetMapView({silent=false}={}){
  setMapViewBox({x:0,y:0,w:1000,h:500},{mode:'world'});
  if(!silent) showToast('Vista mundial');
}

function mappedOccurrences(list){return list.filter(o=>placeHasMapPoint(place(o.placeRef)));}

function mapBoundsForOccurrences(list){
  const pts=mappedOccurrences(list).map(o=>{
    const pl=place(o.placeRef);
    const [x,y]=project(pl.point.lon,pl.point.lat);
    return {x,y};
  });
  if(!pts.length) return null;

  if(pts.length===1){
    const {x,y}=pts[0];
    const w=260,h=150;
    return {x:x-w/2,y:y-h/2,w,h};
  }

  const xs=pts.map(p=>p.x), ys=pts.map(p=>p.y);
  const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
  const spanX=Math.max(70,maxX-minX);
  const spanY=Math.max(45,maxY-minY);
  const aspect=2;
  let w=Math.min(920,spanX*1.55);
  let h=Math.min(460,spanY*1.8);

  if(w/h<aspect) w=h*aspect;
  else h=w/aspect;

  const cx=(minX+maxX)/2,cy=(minY+maxY)/2;
  return {x:cx-w/2,y:cy-h/2,w,h};
}

function fitMapToOccurrences(list,{mode='results'}={}){
  const bounds=mapBoundsForOccurrences(list);
  if(!bounds){
    if(mode==='results') resetMapView({silent:true});
    return false;
  }
  setMapViewBox(bounds,{mode});
  return true;
}

function focusMapOccurrence(o){
  if(!o) return;
  const targetYear=active(o.period,s.year)?s.year:o.period.start;
  setYear(targetYear);
  selectOccurrence(o.id,true);
  fitMapToOccurrences([o],{mode:'selection'});
}

function renderMapOverview(mapList,dateList){
  const box=$('#mapOverview');
  if(!box) return;
  const mapped=mappedOccurrences(mapList);
  const dateMapped=mappedOccurrences(dateList);
  const query=s.search.trim();

  if(!s.layers.gastronomy){
    box.innerHTML='<span>La capa gastronómica está oculta.</span>';
    return;
  }

  if(query){
    box.innerHTML=`<strong>${mapList.length}</strong> ${mapList.length===1?'resultado':'resultados'} para “${esc(query)}” · <b>${mapped.length}</b> con punto${mapList.length-mapped.length?` · <b>${mapList.length-mapped.length}</b> sin punto`:''}`;
    return;
  }

  box.innerHTML=`<strong>${mapped.length}</strong> evidencias localizadas en el mapa · <b>${dateList.length}</b> ${dateList.length===1?'evidencia pertenece':'evidencias pertenecen'} a ${esc(formatYear(s.year))}${dateList.length?` · <b>${dateMapped.length}</b> con punto`:''}`;
}

function mapSearchEntries(){
  const q=s.search.trim();
  if(!q) return [];
  return temporalCorpusItems().slice(0,10);
}

function renderMapSearchResults(){
  const box=$('#mapSearchResults');
  if(!box) return;
  const q=s.search.trim();
  if(!q){
    box.classList.add('hidden');
    box.innerHTML='';
    return;
  }

  const entries=mapSearchEntries();
  box.classList.remove('hidden');

  if(!entries.length){
    box.innerHTML=`<div class="map-search-empty">No hay resultados en el corpus para “${esc(q)}”.</div>`;
    return;
  }

  box.innerHTML=entries.map(entry=>{
    let placeLabel='';
    let mapped=false;
    if(entry.kind==='occurrence'){
      const pl=place(entry.item.placeRef);
      placeLabel=pl?.name||'Lugar sin resolver';
      mapped=placeHasMapPoint(pl);
    }else if(entry.kind==='development'){
      mapped=Boolean(firstMappablePlace(entry.item.placeRefs||[]));
      placeLabel=`Transformación · ${mapped?'con punto':'sin punto único'}`;
    }else{
      placeLabel='Proceso histórico';
    }
    return `<button type="button" class="map-search-result" data-map-result-kind="${esc(entry.kind)}" data-map-result-id="${esc(entry.item.id)}">
      <span>${esc(entry.period.display||formatYear(entry.period.start))}</span>
      <strong>${esc(entry.title)}</strong>
      <small>${esc(placeLabel)}${entry.kind==='occurrence'?(mapped?' · con punto':' · sin punto'):''}</small>
    </button>`;
  }).join('');

  $$('[data-map-result-id]').forEach(button=>{
    button.addEventListener('click',()=>{
      const kind=button.dataset.mapResultKind;
      const id=button.dataset.mapResultId;
      if(kind==='occurrence'){
        const o=s.occurrences.find(x=>x.id===id);
        if(o) focusMapOccurrence(o);
        return;
      }
      const entry=temporalEntryForRoute(kind,id);
      if(entry){
        focusTemporalItem(entry,true);
        routeToAtlas({kind,ref:id});
        $('#temporalNavigator')?.scrollIntoView({behavior:'smooth',block:'center'});
      }
    });
  });
}

function renderMapCoverage(list){
  const box=$('#mapCoverageStatus');
  const panel=$('#unmappedRecordsPanel');
  if(!box) return;
  const missingOccurrences=occurrencesWithoutMapPoint(list);
  const secondary=activeUnmappedSecondaryRecords();
  if(!missingOccurrences.length&&!secondary.length){box.classList.add('hidden');box.innerHTML='';panel?.classList.add('hidden');if(panel)panel.innerHTML='';return;}
  const labels=[];
  if(missingOccurrences.length) labels.push(`${missingOccurrences.length} ${missingOccurrences.length===1?'evidencia del corpus sin punto':'evidencias del corpus sin punto'}`);
  if(secondary.length) labels.push(`${secondary.length} ${secondary.length===1?'capa activa no puntual':'capas activas no puntuales'}`);
  box.classList.remove('hidden');
  box.innerHTML=`<button type="button" class="coverage-chip" data-toggle-unmapped aria-expanded="false">${esc(labels.join(' · '))}</button>`;
  if(panel){
    panel.classList.add('hidden');
    panel.innerHTML=`<p class="unmapped-explanation">El Atlas no inventa centroides ni puntos únicos. Algunos registros se mantienen en cronología e historias aunque su ámbito sea regional, multiterritorial o no disponga de una localización puntual suficientemente sustentada.</p>
    ${missingOccurrences.length?`<section class="unmapped-section"><h3>Evidencias del corpus sin punto</h3><div class="unmapped-record-list">${missingOccurrences.map(o=>{const subject=subj(o.subjectRef);const pl=place(o.placeRef);return `<button type="button" data-unmapped-occurrence="${esc(o.id)}"><span>Evidencia</span><strong>${esc(subject?.name||o.subjectRef)} · ${esc(pl?.name||o.placeRef)}</strong><small>${esc(o.period.display||`${formatYear(o.period.start)}–${formatYear(o.period.end)}`)} · abrir ficha</small></button>`;}).join('')}</div></section>`:''}
    ${secondary.length?`<section class="unmapped-section"><h3>Capas activas en ${esc(formatYear(s.year))} sin punto único</h3><div class="unmapped-record-list secondary">${secondary.map(item=>{const clickable=item.kind==='development';const tag=clickable?'button':'article';const attrs=clickable?` type="button" data-unmapped-secondary="${esc(item.id)}"`:'';return `<${tag}${attrs}><span>${item.kind==='development'?'Transformación':'Contexto'}</span><strong>${esc(item.title)}</strong><small>${esc(item.period.display||formatYear(item.period.start))} · ${esc(item.reason)}</small></${tag}>`;}).join('')}</div></section>`:''}`;
    const toggle=$('[data-toggle-unmapped]');
    toggle?.addEventListener('click',()=>{const willOpen=panel.classList.contains('hidden');panel.classList.toggle('hidden');toggle.setAttribute('aria-expanded',String(willOpen));});
    $$('[data-unmapped-occurrence]').forEach(button=>button.addEventListener('click',()=>selectOccurrence(button.dataset.unmappedOccurrence,true)));
    $$('[data-unmapped-secondary]').forEach(button=>button.addEventListener('click',()=>{const entry=temporalEntryForRoute('development',button.dataset.unmappedSecondary);if(entry){focusTemporalItem(entry,true);routeToAtlas({kind:'development',ref:entry.item.id});$('#temporalNavigator')?.scrollIntoView({behavior:'smooth',block:'center'});}}));
  }
  for(const o of missingOccurrences){const key=`occurrence:${o.id}`;if(!warnedUnmapped.has(key)){warnedUnmapped.add(key);console.warn(`[Atlas] Registro sin punto cartográfico: ${o.id} · placeRef=${o.placeRef}`);}}
  for(const item of secondary){const key=`${item.kind}:${item.id}`;if(!warnedUnmapped.has(key)){warnedUnmapped.add(key);console.warn(`[Atlas] Capa activa sin punto cartográfico: ${item.kind}:${item.id} · ${item.reason}`);}}
}

const warnedUnmapped=new Set();


function subjectMatchesTemporalFilters(subject){
  if(!subject||subject.status==='deprecated') return false;
  if(s.category!=='all' && subject.type!==s.category) return false;

  const q=norm(s.search.trim());
  if(q){
    const haystack=norm([
      subject.name,
      subject.summary,
      ...(subject.aliases||[]),
      ...(subject.tags||[])
    ].join(' '));
    if(!queryMatches(haystack,q)) return false;
  }
  return true;
}

function temporalCorpusItems(){
  const out=[];

  if(s.layers.gastronomy){
    for(const o of s.occurrences){
      if(o.status!=='reviewed'&&o.status!=='verified') continue;
      const subject=subj(o.subjectRef);
      if(!subjectMatchesTemporalFilters(subject)) continue;
      if(s.evidence!=='all' && o.evidenceType!==s.evidence) continue;
      if(s.occurrenceType!=='all' && o.occurrenceType!==s.occurrenceType) continue;
      if(!matchesEvidenceQualityFilters(o)) continue;
      if(!matchesSpatialFilter(o)) continue;

      out.push({
        key:`occurrence:${o.id}`,
        kind:'occurrence',
        period:o.period,
        status:o.status,
        certainty:o.certainty,
        title:occurrenceHeadline(o),
        subtitle:`${OCC_LABELS[o.occurrenceType]||o.occurrenceType} · ${subject.name}`,
        item:o
      });
    }
  }

  for(const e of s.events){
    if(e.status!=='reviewed'&&e.status!=='verified') continue;
    if(!matchesEvidenceQualityFilters(e)) continue;
    const related=(e.subjectRefs||[]).map(subj).filter(Boolean);
    if(s.category!=='all' && !related.some(subject=>subject.type===s.category)) continue;

    const q=norm(s.search.trim());
    if(q){
      const haystack=norm([
        e.title,e.summary,
        ...related.map(x=>x.name),
        ...related.flatMap(x=>x.tags||[])
      ].join(' '));
      if(!queryMatches(haystack,q)) continue;
    }

    out.push({
      key:`event:${e.id}`,
      kind:'event',
      period:e.period,
      status:e.status,
      certainty:e.certainty,
      title:e.title,
      subtitle:EVENT_LABELS[e.eventType]||e.eventType||'Proceso histórico',
      item:e
    });
  }

  for(const d of s.developments){
    if(d.status!=='reviewed'&&d.status!=='verified') continue;
    if(!matchesEvidenceQualityFilters(d)) continue;
    const safety=['hygiene','food_safety','public_health','regulation','quality_system'].includes(d.type);
    if(safety ? !s.layers.safety : !s.layers.developments) continue;

    const related=(d.impactSubjectRefs||[]).map(subj).filter(Boolean);
    if(s.category!=='all' && related.length && !related.some(subject=>subject.type===s.category)) continue;

    const q=norm(s.search.trim());
    if(q){
      const haystack=norm([
        d.name,d.summary,
        ...related.map(x=>x.name),
        ...related.flatMap(x=>x.tags||[])
      ].join(' '));
      if(!queryMatches(haystack,q)) continue;
    }

    out.push({
      key:`development:${d.id}`,
      kind:'development',
      period:d.period,
      status:d.status,
      certainty:d.certainty,
      title:d.name,
      subtitle:developmentTypeLabel(d.type),
      item:d
    });
  }

  return out.sort((a,b)=>{
    if(a.period.start!==b.period.start) return a.period.start-b.period.start;
    if(a.period.end!==b.period.end) return a.period.end-b.period.end;
    return a.kind.localeCompare(b.kind);
  });
}

function temporalOrdinalBounds(){
  return {
    min:toOrdinal(s.config.timeline.minYear),
    max:toOrdinal(s.config.timeline.maxYear)
  };
}

function temporalPercent(year){
  const {min,max}=temporalOrdinalBounds();
  const value=Math.max(min,Math.min(max,toOrdinal(year)));
  return ((value-min)/(max-min))*100;
}

function temporalRepresentativeYear(entry){
  return entry.period.start;
}

function temporalDistanceToYear(entry,year=s.year){
  return distance(entry.period,year);
}

function temporalSnapCandidate(entry,targetYear){
  if(!entry) return null;
  const targetOrdinal=toOrdinal(targetYear);
  const startOrdinal=toOrdinal(entry.period.start);
  const endOrdinal=toOrdinal(entry.period.end);
  const low=Math.min(startOrdinal,endOrdinal);
  const high=Math.max(startOrdinal,endOrdinal);

  if(targetOrdinal>=low && targetOrdinal<=high){
    return {entry,snapYear:targetYear,distanceOrdinal:0,contains:true};
  }

  const boundaryOrdinal=Math.abs(targetOrdinal-low)<=Math.abs(targetOrdinal-high)?low:high;
  return {entry,snapYear:fromOrdinal(boundaryOrdinal),distanceOrdinal:Math.abs(targetOrdinal-boundaryOrdinal),contains:false};
}

function temporalMagneticRank(candidate){
  const entry=candidate.entry;
  const kindRank=entry.kind==='event'?0:entry.kind==='development'?1:2;
  const statusRank=entry.status==='verified'?0:1;
  const span=Math.abs(toOrdinal(entry.period.end)-toOrdinal(entry.period.start));
  return [candidate.distanceOrdinal,candidate.contains?0:1,kindRank,statusRank,span];
}

function compareTemporalCandidates(a,b){
  const ra=temporalMagneticRank(a), rb=temporalMagneticRank(b);
  for(let i=0;i<ra.length;i++) if(ra[i]!==rb[i]) return ra[i]-rb[i];
  return a.entry.key.localeCompare(b.entry.key);
}

function nearestTemporalHit(targetYear,items=temporalCorpusItems()){
  if(!items.length) return null;
  return items.map(entry=>temporalSnapCandidate(entry,targetYear)).filter(Boolean).sort(compareTemporalCandidates)[0]||null;
}

function clearMagneticCandidate(){
  $$('.magnetic-candidate').forEach(node=>node.classList.remove('magnetic-candidate'));
  $('#temporalRail')?.classList.remove('has-magnetic-candidate');
}

function temporalBinIndexForEntry(entry,items){
  const bins=temporalBins(items);
  return bins.findIndex(bin=>bin.items.some(x=>x.key===entry.key));
}

function markMagneticCandidate(candidate,items){
  clearMagneticCandidate();
  if(!candidate) return;
  $('#temporalRail')?.classList.add('has-magnetic-candidate');
  let direct=null;
  $$('[data-temporal-key]').some(node=>{
    if(node.dataset.temporalKey===candidate.entry.key){direct=node;return true;}
    return false;
  });
  if(direct){direct.classList.add('magnetic-candidate');return;}
  if(candidate.entry.kind==='occurrence'){
    const index=temporalBinIndexForEntry(candidate.entry,items);
    if(index>=0) $(`[data-temporal-bin="${index}"]`)?.classList.add('magnetic-candidate');
  }
}

function previewMagneticCandidate(targetYear,items=temporalCorpusItems()){
  const candidate=nearestTemporalHit(targetYear,items);
  markMagneticCandidate(candidate,items);
  if(candidate){
    previewTemporalItem(candidate.entry,true);
    renderTemporalPrecisionWindow(candidate.entry);
  }
  return candidate;
}

function setExactYear(year){
  s.temporalSelection=null;
  clearMagneticCandidate();
  setYear(year);
  if(s.view==='explore') routeToAtlas({year});
}

function temporalBins(items){
  const occurrences=items.filter(x=>x.kind==='occurrence');
  const width=$('#temporalRail')?.clientWidth||window.innerWidth||800;
  const count=width<430?38:width<800?68:120;
  const bins=Array.from({length:count},()=>({count:0,verified:0,uncertain:0,items:[]}));

  for(const entry of occurrences){
    const pct=temporalPercent(temporalRepresentativeYear(entry));
    const index=Math.max(0,Math.min(count-1,Math.floor((pct/100)*count)));
    const bin=bins[index];
    bin.count++;
    if(entry.status==='verified') bin.verified++;
    if(entry.certainty&&entry.certainty!=='high') bin.uncertain++;
    bin.items.push(entry);
  }
  return bins;
}

function temporalItemAria(entry){
  const when=entry.period.display||`${formatYear(entry.period.start)}–${formatYear(entry.period.end)}`;
  const state=statusMeta(entry.status).label;
  return `${entry.title}. ${entry.subtitle}. ${when}. ${state}.`;
}

function renderTemporalDensity(items){
  const box=$('#temporalDensity');
  if(!box) return;
  const bins=temporalBins(items);
  const maxCount=Math.max(1,...bins.map(x=>x.count));

  box.innerHTML=bins.map((bin,index)=>{
    if(!bin.count) return `<i class="density-bin empty" style="--bin:${index};--bins:${bins.length}"></i>`;
    const strength=Math.max(.18,bin.count/maxCount);
    const className=[
      'density-bin',
      bin.verified?'has-verified':'',
      bin.uncertain?'has-uncertain':''
    ].filter(Boolean).join(' ');
    return `<button class="${className}" type="button"
      data-temporal-bin="${index}"
      aria-label="${bin.count} ${bin.count===1?'evidencia':'evidencias'} en este tramo"
      style="--bin:${index};--bins:${bins.length};--density:${strength.toFixed(3)}">
      <i></i>
    </button>`;
  }).join('');

  $$('[data-temporal-bin]').forEach(button=>{
    const bin=bins[Number(button.dataset.temporalBin)];
    button.addEventListener('click',event=>{
      if(!bin?.items?.length) return;
      const targetYear=temporalYearFromClientX(event.clientX);
      const candidate=nearestTemporalHit(targetYear,bin.items);
      if(candidate) focusTemporalItem(candidate.entry,true,candidate.snapYear);
    });
  });
}

function renderTemporalVerified(items){
  const box=$('#temporalVerified');
  if(!box) return;
  const verified=items.filter(x=>x.kind==='occurrence'&&x.status==='verified');

  box.innerHTML=verified.map(entry=>{
    const left=temporalPercent(temporalRepresentativeYear(entry));
    const uncertain=entry.certainty&&entry.certainty!=='high';
    return `<button type="button"
      class="temporal-mark verified-mark ${uncertain?'uncertain':''}"
      data-temporal-key="${esc(entry.key)}"
      style="--left:${left.toFixed(4)}%"
      aria-label="${esc(temporalItemAria(entry))}">
      <i></i>
    </button>`;
  }).join('');
}

function renderTemporalRanges(items,kind,containerId){
  const box=$(containerId);
  if(!box) return;
  const entries=items.filter(x=>x.kind===kind);

  box.innerHTML=entries.map(entry=>{
    const start=temporalPercent(entry.period.start);
    const end=temporalPercent(entry.period.end);
    const left=Math.min(start,end);
    const rawWidth=Math.abs(end-start);
    const width=Math.max(.55,rawWidth);
    const sm=statusMeta(entry.status);
    const uncertain=entry.certainty&&entry.certainty!=='high';

    return `<button type="button"
      class="temporal-range ${kind}-range ${entry.status==='verified'?'verified':''} ${uncertain?'uncertain':''}"
      data-temporal-key="${esc(entry.key)}"
      style="--left:${left.toFixed(4)}%;--width:${width.toFixed(4)}%"
      aria-label="${esc(temporalItemAria(entry))}">
      <i></i>
      <span>${esc(entry.title)}</span>
    </button>`;
  }).join('');
}

function bindTemporalMarks(items){
  const lookup=new Map(items.map(x=>[x.key,x]));
  $$('[data-temporal-key]').forEach(button=>{
    const entry=lookup.get(button.dataset.temporalKey);
    if(!entry) return;

    button.addEventListener('click',event=>{
      let snapYear=temporalRepresentativeYear(entry);
      if(entry.kind==='event'||entry.kind==='development'){
        const targetYear=temporalYearFromClientX(event.clientX);
        snapYear=temporalSnapCandidate(entry,targetYear)?.snapYear??snapYear;
      }
      focusTemporalItem(entry,true,snapYear);
    });
    button.addEventListener('mouseenter',()=>previewTemporalItem(entry));
    button.addEventListener('focus',()=>previewTemporalItem(entry));
  });
}

function currentTemporalCandidate(items){
  const activeNow=items.filter(entry=>active(entry.period,s.year));
  if(activeNow.length){
    return activeNow.slice().sort((a,b)=>{
      const rank=x=>x.kind==='event'?0:x.kind==='development'?1:2;
      const status=x=>x.status==='verified'?0:1;
      return rank(a)-rank(b)||status(a)-status(b);
    })[0];
  }

  return items
    .slice()
    .sort((a,b)=>{
      const da=temporalDistanceToYear(a);
      const db=temporalDistanceToYear(b);
      if(da!==db) return da-db;
      return (a.status==='verified'?0:1)-(b.status==='verified'?0:1);
    })[0]||null;
}

function previewTemporalItem(entry,magnetic=false){
  const box=$('#temporalFocus');
  if(!box||!entry) return;
  const sm=statusMeta(entry.status);
  const when=entry.period.display||`${formatYear(entry.period.start)}–${formatYear(entry.period.end)}`;
  const kind=entry.kind==='occurrence'?'Evidencia':entry.kind==='event'?'Evento':'Transformación';
  box.classList.toggle('magnetic-preview',Boolean(magnetic));
  box.innerHTML=`
    <span>${magnetic?'Destino cercano · ':''}${kind} · ${esc(when)} · <em class="${esc(sm.className)}">${esc(sm.label)}</em></span>
    <strong>${esc(entry.title)}</strong>
    <small>${esc(entry.subtitle)}</small>
  `;
}

function focusTemporalItem(entry,jump=false,snapYear=null){
  if(!entry) return;
  s.temporalSelection=entry.key;
  clearMagneticCandidate();
  previewTemporalItem(entry);
  if(jump){
    const year=snapYear??temporalRepresentativeYear(entry);
    setYear(year);
    if(s.view==='explore') routeToAtlas({kind:entry.kind,ref:entry.item.id});
    showToast(`${entry.title} · ${entry.period.display||formatYear(year)}`);
  }
}

function renderTemporalCursor(){
  const cursor=$('#temporalCursor');
  if(!cursor) return;
  cursor.style.setProperty('--left',`${temporalPercent(s.year).toFixed(4)}%`);
}

function renderTemporalNavigator(){
  const items=temporalCorpusItems();
  renderTemporalDensity(items);
  renderTemporalVerified(items);
  renderTemporalRanges(items,'event','#temporalEvents');
  renderTemporalRanges(items,'development','#temporalDevelopments');
  bindTemporalMarks(items);
  renderTemporalCursor();

  const selected=s.temporalSelection
    ? items.find(x=>x.key===s.temporalSelection)
    : null;
  const focused=selected||currentTemporalCandidate(items);
  previewTemporalItem(focused);
  renderTemporalPrecisionWindow(focused);

  const before=temporalStepTarget(items,-1);
  const after=temporalStepTarget(items,1);

  const prev=$('#prevTemporalHitBtn');
  const next=$('#nextTemporalHitBtn');
  if(prev){
    prev.disabled=!before;
    prev.dataset.temporalTarget=before?.key||'';
    prev.title=before?`${before.title} · ${before.period.display||formatYear(before.period.start)}`:'No hay hitos anteriores';
  }
  if(next){
    next.disabled=!after;
    next.dataset.temporalTarget=after?.key||'';
    next.title=after?`${after.title} · ${after.period.display||formatYear(after.period.start)}`:'No hay hitos posteriores';
  }
}

function temporalStepTarget(items,direction,currentYear=s.year,selectedKey=s.temporalSelection){
  if(!items.length) return null;

  if(selectedKey){
    const index=items.findIndex(entry=>entry.key===selectedKey);
    if(index>=0){
      const next=index+(direction<0?-1:1);
      return next>=0&&next<items.length?items[next]:null;
    }
  }

  const current=toOrdinal(currentYear);
  const candidates=items
    .filter(entry=>{
      const ord=toOrdinal(temporalRepresentativeYear(entry));
      return direction<0?ord<current:ord>current;
    })
    .sort((a,b)=>{
      const oa=toOrdinal(temporalRepresentativeYear(a));
      const ob=toOrdinal(temporalRepresentativeYear(b));
      return direction<0?ob-oa:oa-ob;
    });

  return candidates[0]||null;
}

function stepTemporalHit(direction){
  const items=temporalCorpusItems();
  const target=temporalStepTarget(items,direction);
  if(target){
    focusTemporalItem(target,true);
    routeToAtlas({kind:target.kind,ref:target.item.id});
  }
}


const temporalDrag={
  active:false,
  pointerId:null,
  startYear:null,
  grabOffsetPx:0,
  pendingYear:null,
  items:null,
  candidate:null,
  raf:null
};

function temporalYearFromClientX(clientX,offsetPx=0){
  const rail=$('#temporalRail');
  if(!rail) return s.year;

  const rect=rail.getBoundingClientRect();
  if(!rect.width) return s.year;

  const ratio=Math.max(0,Math.min(1,(clientX-offsetPx-rect.left)/rect.width));
  const {min,max}=temporalOrdinalBounds();
  const ordinal=Math.round(min+ratio*(max-min));
  return fromOrdinal(ordinal);
}

function updateYearChrome(year){
  const safe=Math.max(s.config.timeline.minYear,Math.min(s.config.timeline.maxYear,year===0?1:year));
  s.year=safe;

  $('#yearDisplay').textContent=formatYear(s.year);
  $('#mapYearDisplay').textContent=formatYear(s.year);

  const p=parts(s.year);
  $('#yearMagnitude').value=p.magnitude;
  $('#yearEra').value=p.era;
  $('#heroYear').textContent=p.magnitude;
  $('#heroEra').textContent=p.era==='BCE'?'a. C.':'d. C.';

  const cursor=$('#temporalCursor');
  if(cursor){
    cursor.style.setProperty('--left',`${temporalPercent(s.year).toFixed(4)}%`);
    cursor.setAttribute('aria-valuenow',String(s.year));
    cursor.setAttribute('aria-valuetext',formatYear(s.year));
  }
}

function previewTemporalYear(year){
  temporalDrag.pendingYear=year;
  if(temporalDrag.raf!==null) return;

  temporalDrag.raf=requestAnimationFrame(()=>{
    temporalDrag.raf=null;
    const year=temporalDrag.pendingYear;
    updateYearChrome(year);
    temporalDrag.candidate=previewMagneticCandidate(year,temporalDrag.items||temporalCorpusItems());
  });
}


function temporalPointerIgnored(target){
  return Boolean(target.closest(
    '[data-temporal-key],[data-temporal-bin],button,a,input,select,label'
  ));
}

function beginTemporalDrag(event){
  const rail=$('#temporalRail');
  if(!rail || temporalPointerIgnored(event.target)) return;
  if(event.button!==undefined && event.button!==0) return;

  temporalDrag.active=true;
  temporalDrag.pointerId=event.pointerId;
  temporalDrag.startYear=s.year;
  temporalDrag.items=temporalCorpusItems();
  temporalDrag.candidate=null;

  const cursor=event.target.closest('#temporalCursor');
  if(cursor){
    const rect=rail.getBoundingClientRect();
    const cursorX=rect.left+(temporalPercent(s.year)/100)*rect.width;
    temporalDrag.grabOffsetPx=event.clientX-cursorX;
  }else{
    temporalDrag.grabOffsetPx=0;
  }

  rail.classList.add('dragging');
  rail.setPointerCapture?.(event.pointerId);

  previewTemporalYear(temporalYearFromClientX(event.clientX,temporalDrag.grabOffsetPx));
  event.preventDefault();
}

function moveTemporalDrag(event){
  if(!temporalDrag.active || event.pointerId!==temporalDrag.pointerId) return;

  previewTemporalYear(temporalYearFromClientX(event.clientX,temporalDrag.grabOffsetPx));
  event.preventDefault();
}

function endTemporalDrag(event){
  if(!temporalDrag.active || event.pointerId!==temporalDrag.pointerId) return;
  const rail=$('#temporalRail');
  const targetYear=temporalYearFromClientX(event.clientX,temporalDrag.grabOffsetPx);
  const items=temporalDrag.items||temporalCorpusItems();
  const candidate=nearestTemporalHit(targetYear,items);
  temporalDrag.active=false;
  temporalDrag.pointerId=null;
  temporalDrag.startYear=null;
  temporalDrag.grabOffsetPx=0;
  temporalDrag.items=null;
  temporalDrag.candidate=null;
  rail?.classList.remove('dragging');
  try{rail?.releasePointerCapture?.(event.pointerId)}catch{}
  if(candidate) focusTemporalItem(candidate.entry,true,candidate.snapYear);
  else setExactYear(targetYear);
  event.preventDefault();
}

function cancelTemporalDrag(event){
  if(!temporalDrag.active) return;

  const rail=$('#temporalRail');
  temporalDrag.active=false;
  temporalDrag.pointerId=null;
  rail?.classList.remove('dragging');

  if(temporalDrag.raf!==null){
    cancelAnimationFrame(temporalDrag.raf);
    temporalDrag.raf=null;
  }
  temporalDrag.pendingYear=null;
  temporalDrag.items=null;
  temporalDrag.candidate=null;
  clearMagneticCandidate();
  $('#temporalFocus')?.classList.remove('magnetic-preview');
  if(temporalDrag.startYear!==null){
    updateYearChrome(temporalDrag.startYear);
  }
  temporalDrag.startYear=null;
  temporalDrag.grabOffsetPx=0;

  const restoredItems=temporalCorpusItems();
  const restored=s.temporalSelection
    ? restoredItems.find(x=>x.key===s.temporalSelection)
    : currentTemporalCandidate(restoredItems);
  renderTemporalPrecisionWindow(restored);
}

function handleTemporalCursorKey(event){
  if(event.key==='ArrowLeft'){
    event.preventDefault();
    stepTemporalHit(-1);
  }else if(event.key==='ArrowRight'){
    event.preventDefault();
    stepTemporalHit(1);
  }else if(event.key==='Home'){
    event.preventDefault();
    setExactYear(s.config.timeline.minYear);
  }else if(event.key==='End'){
    event.preventDefault();
    setExactYear(s.config.timeline.maxYear);
  }
}

function setYear(year){
  updateYearChrome(year);
  render();
}


function setExperienceView(view,{scroll=true}={}){
  const next=view==='histories'?'histories':'explore';
  s.view=next;

  const explore=$('#exploreView');
  const histories=$('#historiesView');
  explore?.classList.toggle('hidden',next!=='explore');
  explore?.classList.toggle('active',next==='explore');
  histories?.classList.toggle('hidden',next!=='histories');
  histories?.classList.toggle('active',next==='histories');

  const exploreBtn=$('#exploreNavBtn');
  const historiesBtn=$('#historiesNavBtn');
  exploreBtn?.classList.toggle('active',next==='explore');
  historiesBtn?.classList.toggle('active',next==='histories');
  exploreBtn?.setAttribute('aria-pressed',String(next==='explore'));
  historiesBtn?.setAttribute('aria-pressed',String(next==='histories'));

  if(next==='histories') renderHistorySpotlight();

  if(scroll){
    const target=next==='histories'?histories:explore;
    target?.scrollIntoView({behavior:'smooth',block:'start'});
  }
}

function render(){
  const dateList=occVisible();
  const mapList=occMapVisible();

  renderTemporalNavigator();
  renderMetrics(dateList);
  renderEvidenceLens(dateList);
  renderList(dateList);

  renderMapOverview(mapList,dateList);
  renderMapSearchResults();
  renderMapCoverage(mapList);
  renderMarkers(mapList);

  renderContextLayer();
  renderDevelopmentLayer();
  renderTransformationPreview();
  renderEvents();
  if(s.view==='histories') renderHistorySpotlight();

  if(s.selectedOccurrence && !mapList.some(x=>x.id===s.selectedOccurrence)){
    s.selectedOccurrence=null;
    renderDetails(null);
  }
}

function visibleEventCandidates(){
  return s.events
    .filter(e=>isPublicStatus(e.status)&&matchesEvidenceQualityFilters(e)&&distance(e.period,s.year)<=s.eventWindow)
    .sort((a,b)=>distance(a.period,s.year)-distance(b.period,s.year));
}

function visibleDevelopmentCandidates(){
  const candidates=s.developments
    .filter(d=>isPublicStatus(d.status)&&matchesEvidenceQualityFilters(d))
    .filter(d=>{
      const safety=['hygiene','food_safety','public_health','regulation','quality_system'].includes(d.type);
      return safety ? s.layers.safety : s.layers.developments;
    });

  const activeNow=candidates.filter(d=>active(d.period,s.year));
  return (activeNow.length
    ? activeNow
    : candidates.slice().sort((a,b)=>distance(a.period,s.year)-distance(b.period,s.year))
  ).slice(0,3);
}

function renderMetrics(list){
  $('#visibleBadge').textContent=list.length;
  $('#evidenceContext').textContent=list.length
    ? `${list.length} ${list.length===1?'registro':'registros'} en ${formatYear(s.year)}.`
    : `Sin registros en ${formatYear(s.year)} con los filtros actuales.`;

  const changes=visibleEventCandidates().length+visibleDevelopmentCandidates().length;
  const badge=$('#changesCount');
  if(badge) badge.textContent=changes;
}



function renderEvidenceLens(list){
  const box=$('#evidenceLensSummary');
  if(!box) return;

  if(!list.length){
    box.innerHTML='<p class="lens-empty">No hay registros visibles para resumir con los filtros actuales.</p>';
    return;
  }

  const certaintyCounts=new Map();
  const precisionCounts=new Map();
  let mapped=0;

  for(const o of list){
    certaintyCounts.set(o.certainty,(certaintyCounts.get(o.certainty)||0)+1);
    const precision=o.period?.precision||'unknown';
    precisionCounts.set(precision,(precisionCounts.get(precision)||0)+1);
    if(!occurrencesWithoutMapPoint([o]).length) mapped++;
  }

  const certaintyHTML=[...certaintyCounts.entries()]
    .sort((a,b)=>{
      const order=['high','medium','low','disputed','unknown'];
      return order.indexOf(a[0])-order.indexOf(b[0]);
    })
    .map(([key,count])=>`<span class="lens-stat certainty ${esc(key)}"><b>${count}</b>${esc(CERTAINTY_LABELS[key]||key)}</span>`)
    .join('');

  const precisionHTML=[...precisionCounts.entries()]
    .sort((a,b)=>{
      const ai=PRECISION_ORDER.indexOf(a[0]),bi=PRECISION_ORDER.indexOf(b[0]);
      return (ai<0?999:ai)-(bi<0?999:bi);
    })
    .map(([key,count])=>`<span class="lens-stat precision"><b>${count}</b>${esc(PRECISION_LABELS[key]||key)}</span>`)
    .join('');

  box.innerHTML=`
    <div class="lens-row">
      <span class="lens-row-label">Certeza</span>
      <div>${certaintyHTML}</div>
    </div>
    <div class="lens-row">
      <span class="lens-row-label">Cronología</span>
      <div>${precisionHTML}</div>
    </div>
    <div class="lens-row">
      <span class="lens-row-label">Mapa</span>
      <div>
        <span class="lens-stat mapped"><b>${mapped}</b>con punto</span>
        <span class="lens-stat unmapped"><b>${list.length-mapped}</b>sin punto</span>
      </div>
    </div>
  `;
}

function evidenceCardNode(o){
  const subject=subj(o.subjectRef);
  const pl=place(o.placeRef);
  const button=document.createElement('button');
  button.type='button';
  button.className='evidence-card focused'+(o.id===s.selectedOccurrence?' active':'');
  const uncertainty=o.certainty&&o.certainty!=='high'
    ? `<span class="focused-caution ${esc(o.certainty)}">${esc(CERTAINTY_LABELS[o.certainty]||o.certainty)}</span>`
    : '';

  button.innerHTML=`
    <span class="card-top focused">
      <i class="category-dot" data-kind="${esc(subject.type)}"></i>
      <strong>${esc(subject.name)}</strong>
      ${uncertainty}
    </span>
    <span class="focused-evidence-type">${esc(OCC_LABELS[o.occurrenceType]||o.occurrenceType)} · ${esc(EVIDENCE_LABELS[o.evidenceType]||o.evidenceType)}</span>
    <small>${esc(pl.name)} · ${esc(o.period.display||`${formatYear(o.period.start)}–${formatYear(o.period.end)}`)}</small>
  `;
  button.addEventListener('click',()=>selectOccurrence(o.id,true));
  return button;
}

function renderList(list){
  const box=$('#occurrenceList');
  box.innerHTML='';

  if(!list.length){
    box.innerHTML='<p class="focused-empty">No hay evidencias visibles. Cambia de fecha o abre Filtros.</p>';
    return;
  }

  const sorted=list
    .slice()
    .sort((a,b)=>subj(a.subjectRef).name.localeCompare(subj(b.subjectRef).name,'es'));

  const primary=sorted.slice(0,4);
  const rest=sorted.slice(4);

  primary.forEach(o=>box.appendChild(evidenceCardNode(o)));

  if(rest.length){
    const details=document.createElement('details');
    details.className='evidence-more';
    details.innerHTML=`<summary>Ver ${rest.length} ${rest.length===1?'registro más':'registros más'}</summary><div class="evidence-more-list"></div>`;
    const listBox=details.querySelector('.evidence-more-list');
    rest.forEach(o=>listBox.appendChild(evidenceCardNode(o)));
    box.appendChild(details);
  }
}

function renderBasemap(){
  const layer=$('#basemapLayer');
  layer.innerHTML='';

  for(const feature of s.basemap.features){
    const d=geom(feature.geometry);
    if(!d) continue;
    layer.appendChild(svg('path',{d,class:'country'}));
  }
}

function ring(coords){
  let out='';
  let prev=null;

  coords.forEach((p,i)=>{
    const [x,y]=project(p[0],p[1]);
    const cross=prev!==null && Math.abs(p[0]-prev)>180;
    out+=`${i===0||cross?' M':' L'}${x.toFixed(2)},${y.toFixed(2)}`;
    prev=p[0];
  });

  return out+' Z';
}

function geom(g){
  if(!g) return '';
  if(g.type==='Polygon') return g.coordinates.map(ring).join(' ');
  if(g.type==='MultiPolygon') return g.coordinates.flatMap(p=>p.map(ring)).join(' ');
  return '';
}

function svg(name,attrs={}){
  const element=document.createElementNS('http://www.w3.org/2000/svg',name);
  Object.entries(attrs).forEach(([k,v])=>element.setAttribute(k,v));
  return element;
}

function renderMarkers(list){
  const layer=$('#occurrenceLayer');
  layer.innerHTML='';

  const map=$('#worldMap');
  const mapped=mappedOccurrences(list);
  map.classList.toggle('compact-labels',s.labelMode==='auto'&&(innerWidth<760||mapped.length>8));
  map.classList.toggle('selected-labels',s.labelMode==='selected');

  mapped.forEach(o=>{
    const subject=subj(o.subjectRef);
    const pl=place(o.placeRef);
    const current=active(o.period,s.year);
    const selected=o.id===s.selectedOccurrence;
    const [x,y]=project(pl.point.lon,pl.point.lat);

    const classes=['occ-marker',current?'temporal-current':'temporal-context'];
    if(selected) classes.push('active');

    const group=svg('g',{
      class:classes.join(' '),
      transform:`translate(${x} ${y})`,
      tabindex:'0',
      role:'button',
      'aria-label':`${occurrenceHeadline(o)} · ${o.period.display}`,
      'data-kind':subject.type,
      'data-occurrence-id':o.id
    });

    const title=svg('title');
    title.textContent=`${occurrenceHeadline(o)} · ${o.period.display}`;
    group.appendChild(title);
    group.appendChild(svg('circle',{r:current?'17':'13',class:'marker-halo'}));
    group.appendChild(svg('circle',{r:current?'6.8':'5.3',class:'marker-core'}));

    const text=svg('text',{x:'10',y:'-9'});
    text.textContent=subject.name;
    group.appendChild(text);

    group.addEventListener('click',()=>focusMapOccurrence(o));
    group.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){
        event.preventDefault();
        focusMapOccurrence(o);
      }
    });

    layer.appendChild(group);
  });
}


function contextById(id){return s.contexts.find(x=>x.id===id)}
function developmentById(id){return s.developments.find(x=>x.id===id)}

function renderContextLayer(){
  const layer=$('#contextLayer');
  if(!layer) return;
  layer.innerHTML='';
  if(!s.layers.contexts) return;

  s.contexts
    .filter(c=>isPublicStatus(c.status)&&active(c.period,s.year))
    .forEach(c=>{
      const firstPlace=firstMappablePlace(c.placeRefs||[]);
      if(!firstPlace) return;
      const [x,y]=project(firstPlace.point.lon,firstPlace.point.lat);
      const g=svg('g',{class:'context-marker',transform:`translate(${x} ${y})`});
      g.appendChild(svg('circle',{r:'4'}));
      layer.appendChild(g);
    });
}

function renderDevelopmentLayer(){
  const layer=$('#developmentLayer');
  if(!layer) return;
  layer.innerHTML='';
  if(!s.layers.developments && !s.layers.safety) return;

  s.developments
    .filter(d=>isPublicStatus(d.status)&&matchesEvidenceQualityFilters(d)&&active(d.period,s.year))
    .filter(d=>{
      const safety=['hygiene','food_safety','public_health','regulation','quality_system'];
      return safety.includes(d.type) ? s.layers.safety : s.layers.developments;
    })
    .forEach(d=>{
      const firstPlace=firstMappablePlace(d.placeRefs||[]);
      if(!firstPlace) return;
      const [x,y]=project(firstPlace.point.lon,firstPlace.point.lat);
      const safety=['hygiene','food_safety','public_health','regulation','quality_system'].includes(d.type);
      const g=svg('g',{class:safety?'safety-marker':'development-marker',transform:`translate(${x} ${y})`});
      g.appendChild(svg('circle',{r:'4.5'}));
      layer.appendChild(g);
    });
}


function developmentTypeLabel(type){
  const labels={
    scientific_discovery:'Descubrimiento científico',
    food_technology:'Tecnología alimentaria',
    preservation_technology:'Conservación',
    cooking_appliance:'Equipamiento de cocción',
    food_storage_appliance:'Equipamiento de conservación',
    refrigeration:'Refrigeración',
    energy_infrastructure:'Energía',
    industrial_process:'Proceso industrial',
    hygiene:'Higiene',
    food_safety:'Seguridad alimentaria',
    public_health:'Salud pública',
    regulation:'Regulación',
    quality_system:'Sistema de calidad',
    analytical_method:'Método analítico',
    packaging:'Envase',
    transport_logistics:'Logística',
    other:'Transformación'
  };
  return labels[type]||type;
}

function transformationClass(type){
  if(['hygiene','food_safety','public_health','regulation','quality_system'].includes(type)) return 'safety';
  if(['scientific_discovery','analytical_method'].includes(type)) return 'science';
  return 'technology';
}

function renderTransformationPreview(){
  const box=$('#transformationPreview');
  if(!box) return;

  const chosen=visibleDevelopmentCandidates();

  if(!chosen.length){
    box.innerHTML=`
      <article class="transform-tile science"><span>CIENCIA</span><strong>Capa preparada</strong><small>Contenido revisado pendiente.</small></article>
      <article class="transform-tile technology"><span>TECNOLOGÍA</span><strong>Capa preparada</strong><small>Contenido revisado pendiente.</small></article>
      <article class="transform-tile safety"><span>SEGURIDAD</span><strong>Capa preparada</strong><small>Contenido revisado pendiente.</small></article>`;
    return;
  }

  box.innerHTML=chosen.map(d=>{
    const sm=statusMeta(d.status);
    const relation=active(d.period,s.year)
      ? 'Activo en esta fecha'
      : `A ${distance(d.period,s.year)} ${distance(d.period,s.year)===1?'año':'años'} de la fecha seleccionada`;

    return `<button class="transform-tile ${transformationClass(d.type)} development-card" type="button" data-development-year="${d.period.start}">
      <span>${esc(developmentTypeLabel(d.type).toUpperCase())}</span>
      <strong>${esc(d.name)}</strong>
      <small>${esc(d.period.display||`${formatYear(d.period.start)}–${formatYear(d.period.end)}`)} · ${esc(relation)}</small>
      <em class="mini-status ${esc(sm.className)}">${esc(sm.label)} · ${esc(CERTAINTY_LABELS[d.certainty]||d.certainty||'—')} · ${esc(precisionLabel(d))} · ${(d.sourceRefs||[]).length} ${(d.sourceRefs||[]).length===1?'fuente':'fuentes'}</em>
    </button>`;
  }).join('');

  $$('[data-development-year]').forEach(button=>{
    button.addEventListener('click',()=>setYear(Number(button.dataset.developmentYear)));
  });
}



function renderHistorySpotlight(){
  const box=$('#historySpotlightList');
  if(!box) return;

  const available=s.stories
    .filter(story=>isPublicStatus(story.status))
    .sort((a,b)=>a.title.localeCompare(b.title,'es'));

  if(!available.length){
    box.innerHTML='<p class="map-foot">Todavía no hay historias museísticas publicadas.</p>';
    return;
  }

  box.innerHTML=available.map((story,index)=>`
    <button class="history-spotlight-card narrative-story-card" type="button" data-narrative-story="${esc(story.id)}">
      <span class="history-spotlight-kicker">${esc(story.eyebrow)}</span>
      <strong>${esc(story.title)}</strong>
      <blockquote>${esc(story.question)}</blockquote>
      <p>${esc(story.teaser)}</p>
      <small>${story.scenes.length} escenas · ~${story.estimatedMinutes} min</small>
      <em>Comenzar visita →</em>
    </button>`).join('');

  $$('[data-narrative-story]').forEach(button=>{
    button.addEventListener('click',()=>openNarrativeStory(button.dataset.narrativeStory));
  });
}

function resolveStoryItem(itemRef){
  if(itemRef.kind==='occurrence') return s.occurrences.find(x=>x.id===itemRef.ref)||null;
  if(itemRef.kind==='event') return s.events.find(x=>x.id===itemRef.ref)||null;
  if(itemRef.kind==='development') return s.developments.find(x=>x.id===itemRef.ref)||null;
  return null;
}

function storyItemPresentation(itemRef){
  const item=resolveStoryItem(itemRef);
  if(!item) return null;
  if(itemRef.kind==='occurrence'){
    const pl=place(item.placeRef);
    return {
      kind:'Evidencia',title:occurrenceHeadline(item),
      when:item.period.display||`${formatYear(item.period.start)}–${formatYear(item.period.end)}`,
      place:pl?.name||'Lugar sin resolver',summary:item.summary,
      meta:`${OCC_LABELS[item.occurrenceType]||item.occurrenceType} · ${EVIDENCE_LABELS[item.evidenceType]||item.evidenceType} · certeza ${CERTAINTY_LABELS[item.certainty]||item.certainty}`,
      point:pl?.point||null,item
    };
  }
  if(itemRef.kind==='event'){
    const displayPlace=firstResolvedPlace(item.placeRefs||[]);const mapPlace=firstMappablePlace(item.placeRefs||[]);
    return {kind:'Proceso',title:item.title,when:item.period.display||formatYear(item.period.start),place:displayPlace?.name||'Proceso multiterritorial',summary:item.summary,meta:`${EVENT_LABELS[item.eventType]||item.eventType} · certeza ${CERTAINTY_LABELS[item.certainty]||item.certainty}`,point:mapPlace?.point||null,item};
  }
  const displayPlace=firstResolvedPlace(item.placeRefs||[]);const mapPlace=firstMappablePlace(item.placeRefs||[]);
  return {kind:'Transformación',title:item.name,when:item.period.display||formatYear(item.period.start),place:displayPlace?.name||'Transformación científica/tecnológica',summary:item.summary,meta:`${developmentTypeLabel(item.type)} · certeza ${CERTAINTY_LABELS[item.certainty]||item.certainty}`,point:mapPlace?.point||null,item};
}

function openNarrativeStory(storyId,sceneIndex=0){
  const story=storyById(storyId);
  if(!story||!isPublicStatus(story.status)) return;
  s.activeStory=storyId;
  s.storyScene=Math.max(0,Math.min(story.scenes.length-1,Number(sceneIndex)||0));
  withRouteSyncLocked(()=>setExperienceView('histories',{scroll:false}));
  $('#narrativeLanding')?.classList.add('hidden');
  $('#narrativeStoryPlayer')?.classList.remove('hidden');
  renderNarrativeStory();
  routeToStory(storyId,s.storyScene);
  $('#narrativeStoryPlayer')?.scrollIntoView({behavior:'smooth',block:'start'});
}

function closeNarrativeStory({scroll=true}={}){
  s.activeStory=null;
  s.storyScene=0;
  $('#narrativeStoryPlayer')?.classList.add('hidden');
  $('#narrativeLanding')?.classList.remove('hidden');
  if(s.view==='histories') routeToHistories();
  if(scroll) $('#narrativeLanding')?.scrollIntoView({behavior:'smooth',block:'start'});
}

function renderStoryMap(scene){
  const base=$('#storyBasemapLayer');
  const markers=$('#storyMarkerLayer');
  const notice=$('#storyMapNotice');
  const caption=$('#storyMapCaption');
  if(!base||!markers||!notice||!caption) return;
  base.innerHTML='';markers.innerHTML='';
  for(const feature of s.basemap.features){
    const d=geom(feature.geometry);if(d) base.appendChild(svg('path',{d,class:'country'}));
  }
  const presentedItems=scene.itemRefs.map(storyItemPresentation).filter(Boolean);
  const points=[];
  let mappableCount=0;
  for(const presented of presentedItems){
    if(presented?.point&&Number.isFinite(Number(presented.point.lat))&&Number.isFinite(Number(presented.point.lon))){
      mappableCount+=1;
      const key=`${presented.point.lat}:${presented.point.lon}`;
      if(!points.some(x=>x.key===key)) points.push({key,...presented});
    }
  }
  if(!points.length){
    notice.classList.remove('hidden');
    notice.textContent='Esta escena no dispone de un punto cartográfico canónico. Puede tratarse de una localización todavía no resuelta con precisión o de un proceso que no debe reducirse a un único punto.';
  }else{
    notice.classList.add('hidden');notice.textContent='';
    for(const p of points){
      const [x,y]=project(p.point.lon,p.point.lat);
      markers.appendChild(svg('circle',{cx:x,cy:y,r:12,class:'story-map-pulse'}));
      markers.appendChild(svg('circle',{cx:x,cy:y,r:5,class:'story-map-pin'}));
    }
  }
  const missingCount=Math.max(0,presentedItems.length-mappableCount);
  const coverage=missingCount>0&&mappableCount>0
    ?`<small class="story-map-coverage">Mapa parcial: ${mappableCount} de ${presentedItems.length} referencias de esta escena tienen punto canónico.</small>`
    :'';
  caption.innerHTML=`<strong>${esc(scene.geography.today)}</strong><span>${esc(scene.geography.orientation)}</span>${coverage}`;
}

function openGlossaryEntry(id){
  const entry=glossaryById(id);if(!entry) return;
  $('#glossaryTitle').textContent=entry.term;
  $('#glossaryDefinition').textContent=entry.definition;
  $('#glossaryDialog').showModal();
}

function openStoryItemInAtlas(itemRef){
  const item=resolveStoryItem(itemRef);if(!item) return;
  withRouteSyncLocked(()=>setExperienceView('explore',{scroll:false}));

  if(itemRef.kind==='occurrence'){
    const filtersChanged=revealOccurrenceForDirectAccess(item);
    setYear(item.period.start);
    selectOccurrence(item.id,true);
    fitMapToOccurrences([item],{mode:'selection'});
    if(filtersChanged) showToast('Filtros ajustados para mostrar esta evidencia');
    return;
  }

  const entry=temporalEntryForRoute(itemRef.kind,item.id);
  if(entry){
    focusTemporalItem(entry,true);
    routeToAtlas({kind:itemRef.kind,ref:item.id});
    setTimeout(()=>$('#temporalNavigator')?.scrollIntoView({behavior:'smooth',block:'center'}),40);
    return;
  }

  setYear(item.period.start);
  routeToAtlas({year:item.period.start});
}

function renderNarrativeStory(){
  const story=storyById(s.activeStory);if(!story) return;
  const index=Math.max(0,Math.min(story.scenes.length-1,s.storyScene));
  s.storyScene=index;
  const scene=story.scenes[index];

  $('#narrativeStoryHeader').innerHTML=`<span class="section-label">${esc(story.eyebrow)}</span><h1>${esc(story.title)}</h1><p>${esc(story.subtitle)}</p><div class="narrative-reading-rule"><strong>${index+1} / ${story.scenes.length}</strong><span>Lee primero la historia. Método, límites y fuentes quedan disponibles cuando quieras profundizar.</span></div>`;
  $('#storyProgress').innerHTML=story.scenes.map((_,i)=>`<button type="button" aria-label="Ir a la escena ${i+1}" data-story-scene="${i}" class="${i<index?'done':''} ${i===index?'active':''}"></button>`).join('');
  $('#storySceneHeader').innerHTML=`<span class="narrative-scene-label">${esc(scene.label)}</span><h2>${esc(scene.title)}</h2><p class="narrative-lead">${esc(scene.lead)}</p><div class="narrative-orientation"><article><span>Dónde estás</span><strong>${esc(scene.geography.today)}</strong></article><article><span>Región histórica/geográfica</span><strong>${esc(scene.geography.region)}</strong></article><article><span>Quién vive aquí</span><strong>${esc(scene.geography.society)}</strong></article></div>`;
  $('#storyNarrativeContent').innerHTML=scene.narrative.map(p=>`<p>${esc(p)}</p>`).join('');
  $('#storyWhy').innerHTML=`<strong>Por qué importa</strong><span>${esc(scene.whyItMatters)}</span>`;
  $('#storyMethodTitle').textContent=scene.method.title;
  $('#storyMethodBody').textContent=scene.method.body;
  $('#storyLimits').innerHTML=`<strong>Qué no podemos afirmar.</strong> ${esc(scene.limits)}`;
  $('#storyGlossary').innerHTML=scene.glossaryRefs.map(ref=>{const g=glossaryById(ref);return g?`<button type="button" data-glossary-ref="${esc(g.id)}">${esc(g.term)} ⓘ</button>`:''}).join('');
  $('#storyNextQuestion').innerHTML=`<strong>${index===story.scenes.length-1?'Idea para llevarte.':'Siguiente pregunta.'}</strong> ${esc(scene.nextQuestion)}`;

  const presented=scene.itemRefs.map(ref=>({ref,p:storyItemPresentation(ref)})).filter(x=>x.p);
  $('#storyEvidenceList').innerHTML=presented.map(({ref,p})=>`<article class="narrative-evidence-item"><span>${esc(p.when)}</span><strong>${esc(p.title)}</strong><small>${esc(p.place)} · ${esc(p.meta)}</small><button type="button" data-story-atlas-kind="${esc(ref.kind)}" data-story-atlas-ref="${esc(ref.ref)}">Ver en el Atlas →</button></article>`).join('');
  $('#storySources').innerHTML=sourceListHTML(scene.sourceRefs);
  renderStoryMap(scene);

  $('#storyPrevBtn').disabled=index===0;
  $('#storyNextBtn').textContent=index===story.scenes.length-1?'Terminar visita':'Siguiente →';
  const end=$('#storyEndCard');
  if(index===story.scenes.length-1){end.classList.remove('hidden');end.innerHTML=`<h3>${esc(story.endTitle)}</h3><p>${esc(story.endText)}</p>`;}else{end.classList.add('hidden');end.innerHTML='';}

  $$('[data-story-scene]').forEach(button=>button.addEventListener('click',()=>{s.storyScene=Number(button.dataset.storyScene);renderNarrativeStory();routeToStory(story.id,s.storyScene);$('#narrativeStoryPlayer')?.scrollIntoView({behavior:'smooth',block:'start'});}));
  $$('[data-glossary-ref]').forEach(button=>button.addEventListener('click',()=>openGlossaryEntry(button.dataset.glossaryRef)));
  $$('[data-story-atlas-ref]').forEach(button=>button.addEventListener('click',()=>openStoryItemInAtlas({kind:button.dataset.storyAtlasKind,ref:button.dataset.storyAtlasRef})));
}

function stepNarrativeScene(direction){
  const story=storyById(s.activeStory);if(!story) return;
  const next=s.storyScene+direction;
  if(next<0) return;
  if(next>=story.scenes.length){closeNarrativeStory();return;}
  s.storyScene=next;
  renderNarrativeStory();
  routeToStory(story.id,s.storyScene);
  $('#narrativeStoryPlayer')?.scrollIntoView({behavior:'smooth',block:'start'});
}

function renderEvents(){
  const box=$('#eventList');
  box.innerHTML='';

  const ev=visibleEventCandidates();

  if(!ev.length){
    box.innerHTML='<p class="map-foot">No hay procesos registrados en esta ventana temporal.</p>';
    return;
  }

  ev.forEach(e=>{
    const article=document.createElement('article');
    article.className='event-card';
    const sm=statusMeta(e.status);
    article.innerHTML=`
      <span class="event-date">${esc(e.period.display||`${formatYear(e.period.start)}–${formatYear(e.period.end)}`)}</span>
      <strong>${esc(e.title)}</strong>
      <p>${esc(e.summary)}</p>
      <div class="event-meta">
        <span>${esc(EVENT_LABELS[e.eventType]||e.eventType||'Proceso histórico')}</span>
        <span class="status-badge ${esc(sm.className)}">${esc(sm.label)}</span>
        <span>${esc(CERTAINTY_LABELS[e.certainty]||e.certainty||'—')}</span>
        <span>${esc(precisionLabel(e))}</span>
        <span>${(e.sourceRefs||[]).length} ${(e.sourceRefs||[]).length===1?'fuente':'fuentes'}</span>
      </div>
    `;
    box.appendChild(article);
  });
}

function revealOccurrenceForDirectAccess(o){
  if(!o) return false;
  let changed=false;

  if(s.search){s.search='';$('#searchInput').value='';changed=true;}
  if(s.evidence!=='all'){s.evidence='all';$('#evidenceFilter').value='all';changed=true;}
  if(s.occurrenceType!=='all'){s.occurrenceType='all';$('#occurrenceTypeFilter').value='all';changed=true;}
  if(s.certainty!=='all'){s.certainty='all';$('#certaintyFilter').value='all';changed=true;}
  if(s.precision!=='all'){s.precision='all';$('#precisionFilter').value='all';changed=true;}
  if(s.spatial!=='all'){s.spatial='all';$('#spatialFilter').value='all';changed=true;}
  if(s.category!=='all'){s.category='all';syncTypeControls();changed=true;}
  if(!s.layers.gastronomy){
    s.layers.gastronomy=true;
    $('#layerGastronomy').checked=true;
    changed=true;
  }

  return changed;
}

function selectOccurrence(id,openDrawer=false){
  s.selectedOccurrence=id;
  const o=s.occurrences.find(x=>x.id===id);
  render();
  renderDetails(o);

  if(openDrawer) openDetail();
  if(o&&s.view==='explore') routeToAtlas({kind:'occurrence',ref:o.id});
}


function subjectHistoryItems(subjectId){
  const occurrences=s.occurrences
    .filter(o=>o.subjectRef===subjectId&&isPublicStatus(o.status))
    .map(o=>({kind:'occurrence',period:o.period,item:o}));

  const events=s.events
    .filter(e=>isPublicStatus(e.status)&&(e.subjectRefs||[]).includes(subjectId))
    .map(e=>({kind:'event',period:e.period,item:e}));

  const developments=s.developments
    .filter(d=>isPublicStatus(d.status)&&(d.impactSubjectRefs||[]).includes(subjectId))
    .map(d=>({kind:'development',period:d.period,item:d}));

  const techniqueRelations=s.relationships
    .filter(r=>isPublicStatus(r.status)&&r.type==='uses_technique'&&r.from===subjectId);
  const techniqueRefs=new Set(techniqueRelations.map(r=>r.to));
  const techniques=s.occurrences
    .filter(o=>techniqueRefs.has(o.subjectRef)&&isPublicStatus(o.status))
    .map(o=>({
      kind:'technique',
      period:o.period,
      item:o,
      technique:subj(o.subjectRef),
      relationship:techniqueRelations.find(r=>r.to===o.subjectRef)||null
    }));

  return [...occurrences,...events,...techniques,...developments].sort((a,b)=>{
    if(a.period.start!==b.period.start) return a.period.start-b.period.start;
    return a.period.end-b.period.end;
  });
}

function historyContextNames(o){
  return (o.contextRefs||[])
    .map(contextById)
    .filter(c=>c&&isPublicStatus(c.status))
    .map(c=>c.name);
}

function renderSubjectHistory(subjectId){
  const subject=subj(subjectId);
  if(!subject) return;

  const items=subjectHistoryItems(subjectId);
  const occurrenceCount=items.filter(x=>x.kind==='occurrence').length;
  const eventCount=items.filter(x=>x.kind==='event').length;
  const techniqueCount=items.filter(x=>x.kind==='technique').length;
  const developmentCount=items.filter(x=>x.kind==='development').length;

  s.historySubject=subjectId;
  $('#historyTitle').textContent=`Historia de ${subject.name}`;
  $('#historySubtitle').textContent='Evidencias, técnicas relacionadas, procesos históricos y transformaciones documentados actualmente en el Atlas.';

  if(items.length){
    const first=items[0].period.start;
    const last=items[items.length-1].period.end;
    $('#historySummary').innerHTML=`
      <span><strong>${occurrenceCount}</strong> ${occurrenceCount===1?'evidencia':'evidencias'}</span>
      <i></i>
      <span><strong>${eventCount}</strong> ${eventCount===1?'evento':'eventos'}</span>
      <i></i>
      <span><strong>${techniqueCount}</strong> ${techniqueCount===1?'técnica':'técnicas'}</span>
      <i></i>
      <span><strong>${developmentCount}</strong> ${developmentCount===1?'transformación':'transformaciones'}</span>
      <i></i>
      <span><strong>${esc(formatYear(first))}</strong> → <strong>${esc(formatYear(last))}</strong></span>
    `;
  }else{
    $('#historySummary').innerHTML='<span>Sin hitos suficientes.</span>';
  }

  const timeline=$('#historyTimeline');
  timeline.innerHTML='';

  items.forEach((entry,index)=>{
    if(entry.kind==='occurrence'){
      const o=entry.item;
      const pl=place(o.placeRef);
      const sm=statusMeta(o.status);
      const contexts=historyContextNames(o);
      const article=document.createElement('article');
      article.className='history-item history-occurrence';
      article.innerHTML=`
        <div class="history-axis">
          <span class="history-index">${String(index+1).padStart(2,'0')}</span>
          <i></i>
        </div>
        <div class="history-card">
          ${historyGapHTML(items[index-1],entry)}
          <div class="history-card-head">
            <span class="history-kind">EVIDENCIA</span>
            <span class="status-badge ${esc(sm.className)}">${esc(sm.label)}</span>
          </div>
          <time>${esc(o.period.display||`${formatYear(o.period.start)}–${formatYear(o.period.end)}`)}</time>
          <h3>${esc(pl?.name||'Lugar no resuelto')}</h3>
          <p>${esc(o.summary)}</p>
          <div class="history-meta">
            <span>${esc(OCC_LABELS[o.occurrenceType]||o.occurrenceType)}</span>
            <span>${esc(EVIDENCE_LABELS[o.evidenceType]||o.evidenceType)}</span>
            <span class="history-precision ${esc(o.period?.precision||'unknown')}">${esc(precisionLabel(o))}</span>
            <span class="history-uncertainty ${esc(o.certainty||'unknown')}">Certeza: ${esc(CERTAINTY_LABELS[o.certainty]||o.certainty||'—')}</span>
            ${contexts.map(c=>`<span>${esc(c)}</span>`).join('')}
            <span>${(o.sourceRefs||[]).length} ${(o.sourceRefs||[]).length===1?'fuente':'fuentes'}</span>
          </div>
          ${o.certainty==='medium'?'<div class="history-caution">La evidencia o interpretación de este hito conserva incertidumbre explícita.</div>':''}${o.certainty==='disputed'?'<div class="history-caution disputed">Este hito contiene interpretaciones historiográficas contrapuestas. Abre la evidencia para compararlas.</div>':''}
          <button type="button" class="history-open-record" data-history-occurrence="${esc(o.id)}">Abrir evidencia</button>
        </div>
      `;
      timeline.appendChild(article);
    }else if(entry.kind==='event'){
      const e=entry.item;
      const sm=statusMeta(e.status);
      const article=document.createElement('article');
      article.className='history-item history-event';
      article.innerHTML=`
        <div class="history-axis">
          <span class="history-index">${String(index+1).padStart(2,'0')}</span>
          <i></i>
        </div>
        <div class="history-card">
          ${historyGapHTML(items[index-1],entry)}
          <div class="history-card-head">
            <span class="history-kind event">EVENTO</span>
            <span class="status-badge ${esc(sm.className)}">${esc(sm.label)}</span>
          </div>
          <time>${esc(e.period.display||`${formatYear(e.period.start)}–${formatYear(e.period.end)}`)}</time>
          <h3>${esc(e.title)}</h3>
          <p>${esc(e.summary)}</p>
          <div class="history-meta">
            <span>${esc(EVENT_LABELS[e.eventType]||e.eventType||'Proceso histórico')}</span>
            <span class="history-precision ${esc(e.period?.precision||'unknown')}">${esc(precisionLabel(e))}</span>
            <span class="history-uncertainty ${esc(e.certainty||'unknown')}">Certeza: ${esc(CERTAINTY_LABELS[e.certainty]||e.certainty||'—')}</span>
            <span>${(e.sourceRefs||[]).length} ${(e.sourceRefs||[]).length===1?'fuente':'fuentes'}</span>
          </div>
          ${verificationHTML(e)}
          <button type="button" class="history-open-event" data-history-event="${esc(e.id)}">Ir al proceso histórico</button>
        </div>
      `;
      timeline.appendChild(article);
    }else if(entry.kind==='technique'){
      const o=entry.item;
      const technique=entry.technique||subj(o.subjectRef);
      const pl=place(o.placeRef);
      const sm=statusMeta(o.status);
      const article=document.createElement('article');
      article.className='history-item history-technique';
      article.innerHTML=`
        <div class="history-axis">
          <span class="history-index">${String(index+1).padStart(2,'0')}</span>
          <i></i>
        </div>
        <div class="history-card">
          ${historyGapHTML(items[index-1],entry)}
          <div class="history-card-head">
            <span class="history-kind technique">TÉCNICA</span>
            <span class="status-badge ${esc(sm.className)}">${esc(sm.label)}</span>
          </div>
          <time>${esc(o.period.display||`${formatYear(o.period.start)}–${formatYear(o.period.end)}`)}</time>
          <h3>${esc(technique?.name||'Técnica culinaria')} · ${esc(pl?.name||'Lugar no resuelto')}</h3>
          <p>${esc(o.summary)}</p>
          <div class="history-meta">
            <span>${esc(OCC_LABELS[o.occurrenceType]||o.occurrenceType)}</span>
            <span>${esc(EVIDENCE_LABELS[o.evidenceType]||o.evidenceType)}</span>
            <span class="history-precision ${esc(o.period?.precision||'unknown')}">${esc(precisionLabel(o))}</span>
            <span class="history-uncertainty ${esc(o.certainty||'unknown')}">Certeza: ${esc(CERTAINTY_LABELS[o.certainty]||o.certainty||'—')}</span>
            <span>Relación: usa técnica</span>
            <span>${(o.sourceRefs||[]).length} ${(o.sourceRefs||[]).length===1?'fuente':'fuentes'}</span>
          </div>
          <button type="button" class="history-open-technique" data-history-technique-occurrence="${esc(o.id)}">Abrir técnica</button>
        </div>
      `;
      timeline.appendChild(article);
    }else{
      const d=entry.item;
      const sm=statusMeta(d.status);
      const article=document.createElement('article');
      article.className='history-item history-development';
      article.innerHTML=`
        <div class="history-axis">
          <span class="history-index">${String(index+1).padStart(2,'0')}</span>
          <i></i>
        </div>
        <div class="history-card">
          ${historyGapHTML(items[index-1],entry)}
          <div class="history-card-head">
            <span class="history-kind development">TRANSFORMACIÓN</span>
            <span class="status-badge ${esc(sm.className)}">${esc(sm.label)}</span>
          </div>
          <time>${esc(d.period.display||`${formatYear(d.period.start)}–${formatYear(d.period.end)}`)}</time>
          <h3>${esc(d.name)}</h3>
          <p>${esc(d.summary)}</p>
          <div class="history-meta">
            <span>${esc(developmentTypeLabel(d.type))}</span>
            <span class="history-precision ${esc(d.period?.precision||'unknown')}">${esc(precisionLabel(d))}</span>
            <span class="history-uncertainty ${esc(d.certainty||'unknown')}">Certeza: ${esc(CERTAINTY_LABELS[d.certainty]||d.certainty||'—')}</span>
            <span>${(d.sourceRefs||[]).length} ${(d.sourceRefs||[]).length===1?'fuente':'fuentes'}</span>
          </div>
          ${verificationHTML(d)}
          <button type="button" class="history-open-development" data-history-development="${esc(d.id)}">Ir a este momento</button>
        </div>
      `;
      timeline.appendChild(article);
    }
  });

  $$('[data-history-occurrence]').forEach(button=>{
    button.addEventListener('click',()=>{
      const id=button.dataset.historyOccurrence;
      const o=s.occurrences.find(x=>x.id===id);
      if(!o) return;
      closeHistory();
      setExperienceView('explore',{scroll:false});
      setYear(o.period.start);
      selectOccurrence(id,true);
      setTimeout(()=>$('#mapSection')?.scrollIntoView({behavior:'smooth',block:'start'}),40);
    });
  });

  $$('[data-history-technique-occurrence]').forEach(button=>{
    button.addEventListener('click',()=>{
      const id=button.dataset.historyTechniqueOccurrence;
      const o=s.occurrences.find(x=>x.id===id);
      if(!o) return;
      closeHistory();
      setExperienceView('explore',{scroll:false});
      setYear(o.period.start);
      selectOccurrence(id,true);
      setTimeout(()=>$('#mapSection')?.scrollIntoView({behavior:'smooth',block:'start'}),40);
    });
  });

  $$('[data-history-event]').forEach(button=>{
    button.addEventListener('click',()=>{
      const e=s.events.find(x=>x.id===button.dataset.historyEvent);
      if(!e) return;
      closeHistory();
      closeDetail();
      setExperienceView('explore',{scroll:false});
      setYear(e.period.start);
      const changes=$('#changesDisclosure');
      if(changes) changes.open=true;
      setTimeout(()=>$('#eventList')?.scrollIntoView({behavior:'smooth',block:'center'}),40);
      showToast(e.title);
    });
  });

  $$('[data-history-development]').forEach(button=>{
    button.addEventListener('click',()=>{
      const d=s.developments.find(x=>x.id===button.dataset.historyDevelopment);
      if(!d) return;
      closeHistory();
      closeDetail();
      setExperienceView('explore',{scroll:false});
      setYear(d.period.start);
      const changes=$('#changesDisclosure');
      if(changes) changes.open=true;
      setTimeout(()=>$('#transformationPreview')?.scrollIntoView({behavior:'smooth',block:'center'}),40);
      showToast(d.name);
    });
  });
}

function openHistory(subjectId){
  renderSubjectHistory(subjectId);
  $('#historyDrawer').classList.add('open');
  $('#historyDrawer').setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}

function closeHistory(){
  $('#historyDrawer').classList.remove('open');
  $('#historyDrawer').setAttribute('aria-hidden','true');
  document.body.style.overflow=$('#detailDrawer').classList.contains('open')?'hidden':'';
}

function renderDetails(o){
  if(!o){
    $('#detailTitle').textContent='Selecciona una evidencia';
    $('#detailSubtitle').textContent='La ficha mostrará contexto, evidencia, cronología y fuentes.';
    $('#detailCategory').textContent='Elemento gastronómico';
    $('#subjectDetail').innerHTML='<p>Selecciona un punto del mapa o un registro de la lista.</p>';
    $('#occurrenceDetail').innerHTML='<p>Aquí se separarán lugar, intervalo, tipo de evidencia, certeza y fuentes.</p>';
    $('#evidenceReadingSection')?.classList.add('hidden');
    $('#evidenceReadingDetail').innerHTML='';
    $('#historicalContextSection')?.classList.add('hidden');
    $('#developmentContextSection')?.classList.add('hidden');
    $('#subjectHistoryBtn').disabled=true;
    $('#subjectHistoryBtn').textContent='Ver historia del elemento';
    return;
  }

  const subject=subj(o.subjectRef);
  const pl=place(o.placeRef);
  const subjectStatus=statusMeta(subject.status);
  const occurrenceStatus=statusMeta(o.status);

  $('#detailCategory').textContent=TYPE_LABELS[subject.type]||subject.type;
  $('#detailTitle').textContent=subject.name;
  $('#detailSubtitle').textContent=subject.summary;

  $('#subjectDetail').innerHTML=`
    <span class="status-badge ${esc(subjectStatus.className)}">${esc(subjectStatus.label)}</span>
    <h3>${esc(subject.name)}</h3>
    <p>${esc(subject.summary)}</p>
    <div class="detail-meta">
      <div><b>Tipo</b><span>${esc(TYPE_LABELS[subject.type]||subject.type)}</span></div>
      <div><b>Nombres alternativos</b><span>${esc((subject.aliases||[]).join(', ')||'—')}</span></div>
    </div>
    ${verificationHTML(subject)}
    <div class="detail-sources">
      <b>Fuentes del elemento</b>
      ${sourceListHTML(subject.sourceRefs||[])}
      ${sourceComparisonHTML(subject.sourceRefs||[])}
    </div>
  `;

  $('#occurrenceDetail').innerHTML=`
    <span class="status-badge ${esc(occurrenceStatus.className)}">${esc(occurrenceStatus.label)}</span>
    <h3>${esc(pl.name)}</h3>
    <p>${esc(o.summary)}</p>
    <div class="detail-meta">
      <div><b>Intervalo</b><span>${esc(o.period.display||`${formatYear(o.period.start)}–${formatYear(o.period.end)}`)}</span></div>
      <div><b>Precisión</b><span>${esc(precisionLabel(o))}</span></div>
      <div><b>Qué documenta</b><span>${esc(OCC_LABELS[o.occurrenceType]||o.occurrenceType)}</span></div>
      <div><b>Evidencia</b><span>${esc(EVIDENCE_LABELS[o.evidenceType]||o.evidenceType)}</span></div>
      <div><b>Certeza</b><span class="certainty-value ${esc(o.certainty)}">${esc(CERTAINTY_LABELS[o.certainty]||o.certainty)}</span></div>
      <div><b>Cartografía</b><span>${esc(pointPrecisionLabel(pl))}</span></div>
    </div>
    ${o.period.note?`<p class="evidence-note">${esc(o.period.note)}</p>`:''}
    ${verificationHTML(o)}
    ${disputeHTML(o)}
    <div class="detail-sources">
      <b>Fuentes del registro</b>
      ${sourceListHTML(o.sourceRefs||[])}
      ${sourceComparisonHTML(o.sourceRefs||[])}
    </div>
  `;

  $('#evidenceReadingSection').classList.remove('hidden');
  $('#evidenceReadingDetail').innerHTML=evidenceReadingHTML(o,pl);

  const relatedContexts=(o.contextRefs||[]).map(contextById).filter(c=>c&&isPublicStatus(c.status));
  const relatedDevelopments=(o.developmentRefs||[]).map(developmentById).filter(d=>d&&isPublicStatus(d.status));

  const contextSection=$('#historicalContextSection');
  const developmentSection=$('#developmentContextSection');

  if(relatedContexts.length){
    contextSection.classList.remove('hidden');
    $('#historicalContextDetail').innerHTML=relatedContexts.map(c=>{
      const sm=statusMeta(c.status);
      return `
        <article class="context-detail-card">
          <span class="status-badge ${esc(sm.className)}">${esc(sm.label)}</span>
          <h3>${esc(c.name)}</h3>
          <p>${esc(c.summary)}</p>
          <small>${esc(c.period.display||`${formatYear(c.period.start)}–${formatYear(c.period.end)}`)}</small>
          ${verificationHTML(c)}
          ${sourceListHTML(c.sourceRefs||[])}
        </article>`;
    }).join('');
  }else{
    contextSection.classList.add('hidden');
    $('#historicalContextDetail').innerHTML='';
  }

  if(relatedDevelopments.length){
    developmentSection.classList.remove('hidden');
    $('#developmentContextDetail').innerHTML=relatedDevelopments.map(d=>{
      const sm=statusMeta(d.status);
      return `
        <article class="context-detail-card">
          <span class="status-badge ${esc(sm.className)}">${esc(sm.label)}</span>
          <h3>${esc(d.name)}</h3>
          <p>${esc(d.summary)}</p>
          <small>${esc(d.period.display||`${formatYear(d.period.start)}–${formatYear(d.period.end)}`)}</small>
          ${verificationHTML(d)}
          ${sourceListHTML(d.sourceRefs||[])}
        </article>`;
    }).join('');
  }else{
    developmentSection.classList.add('hidden');
    $('#developmentContextDetail').innerHTML='';
  }

  const historyItems=subjectHistoryItems(subject.id);
  const historyCount=historyItems.filter(x=>x.kind==='occurrence').length;
  const eventCount=historyItems.filter(x=>x.kind==='event').length;
  const techniqueCount=historyItems.filter(x=>x.kind==='technique').length;
  const transformationCount=historyItems.filter(x=>x.kind==='development').length;
  const curatedStory=preferredStoryForSubject(subject.id);
  if(curatedStory){
    $('#subjectHistoryBtn').disabled=false;
    $('#subjectHistoryBtn').textContent=`Abrir ${curatedStory.title} · ${curatedStory.scenes.length} escenas`;
    $('#subjectHistoryBtn').title='Abrir la visita museística redactada para este elemento.';
  }else{
    $('#subjectHistoryBtn').disabled=historyCount<2;
    $('#subjectHistoryBtn').textContent=historyCount<2
      ? 'Historia todavía insuficiente'
      : `Ver secuencia del corpus · ${historyCount} evidencias${eventCount?` + ${eventCount} evento${eventCount===1?'':'s'}`:''}${techniqueCount?` + ${techniqueCount} técnica${techniqueCount===1?'':'s'}`:''}${transformationCount?` + ${transformationCount} transformación${transformationCount===1?'':'es'}`:''}`;
    $('#subjectHistoryBtn').title=historyCount<2
      ? 'Se activará cuando este elemento tenga al menos dos registros históricos revisados.'
      : 'Abrir secuencia técnica construida desde el corpus.';
  }
}

function debounce(fn,wait=160){
  let timer=null;
  const wrapped=(...args)=>{
    clearTimeout(timer);
    timer=setTimeout(()=>fn(...args),wait);
  };
  wrapped.cancel=()=>{
    if(timer!==null){
      clearTimeout(timer);
      timer=null;
    }
  };
  return wrapped;
}

function openLayers(){
  $('#layersDrawer').classList.add('open');
  $('#layersDrawer').setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeLayers(){
  $('#layersDrawer').classList.remove('open');
  $('#layersDrawer').setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

function openDrawer(){
  $('#filterDrawer').classList.add('open');
  $('#filterDrawer').setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}

function closeDrawer(){
  $('#filterDrawer').classList.remove('open');
  $('#filterDrawer').setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

function openDetail(){
  $('#detailDrawer').classList.add('open');
  $('#detailDrawer').setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}

function closeDetail(){
  $('#detailDrawer').classList.remove('open');
  $('#detailDrawer').setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

function syncTypeControls(){

  if($('#subjectTypeFilter')){
    $('#subjectTypeFilter').value=s.category;
  }
  if($('#certaintyFilter')) $('#certaintyFilter').value=s.certainty;
  if($('#precisionFilter')) $('#precisionFilter').value=s.precision;
  if($('#spatialFilter')) $('#spatialFilter').value=s.spatial;

}

function setCategoryFilter(value){
  s.category=value||'all';
  syncTypeControls();
}

function resetFilters(){
  s.search='';
  s.evidence='all';
  s.occurrenceType='all';
  s.certainty='all';
  s.precision='all';
  s.spatial='all';
  s.category='all';
  s.labelMode='auto';

  $('#searchInput').value='';
  $('#subjectTypeFilter').value='all';
  $('#evidenceFilter').value='all';
  $('#occurrenceTypeFilter').value='all';
  $('#certaintyFilter').value='all';
  $('#precisionFilter').value='all';
  $('#spatialFilter').value='all';
  $('#labelMode').value='auto';

  syncTypeControls();
  render();
}

function bind(){
  const min=s.config.timeline.minYear;
  const max=s.config.timeline.maxYear;

  $$('[data-jump-year]').forEach(button=>{
    button.addEventListener('click',()=>setExactYear(Number(button.dataset.jumpYear)));
  });

  $('#goYearBtn').addEventListener('click',()=>setExactYear(fromParts($('#yearMagnitude').value,$('#yearEra').value,min,max)));
  $('#yearMagnitude').addEventListener('keydown',e=>{if(e.key==='Enter') $('#goYearBtn').click()});

  const temporalRail=$('#temporalRail');
  temporalRail.addEventListener('pointerdown',beginTemporalDrag);
  temporalRail.addEventListener('pointermove',moveTemporalDrag);
  temporalRail.addEventListener('pointerup',endTemporalDrag);
  temporalRail.addEventListener('pointercancel',cancelTemporalDrag);
  $('#temporalCursor').addEventListener('keydown',handleTemporalCursorKey);


  $('#searchToggleBtn').addEventListener('click',()=>{
    $('#quickSearch').classList.toggle('hidden');
    if(!$('#quickSearch').classList.contains('hidden')) $('#searchInput').focus();
  });

  const debouncedSearch=debounce(value=>{
    s.search=value;
    render();
    if(value.trim()) fitMapToOccurrences(occMapVisible(),{mode:'results'});
    else resetMapView({silent:true});
  },160);

  $('#clearSearchBtn').addEventListener('click',()=>{
    debouncedSearch.cancel();
    s.search='';
    $('#searchInput').value='';
    render();
    resetMapView({silent:true});
  });

  $('#searchInput').addEventListener('input',e=>{
    debouncedSearch(e.target.value);
  });

  $('#mapResetViewBtn').addEventListener('click',()=>resetMapView());

  $('#subjectTypeFilter').addEventListener('change',e=>{
    setCategoryFilter(e.target.value);
    render();
  });
  $('#evidenceFilter').addEventListener('change',e=>{s.evidence=e.target.value;render()});
  $('#occurrenceTypeFilter').addEventListener('change',e=>{s.occurrenceType=e.target.value;render()});
  $('#certaintyFilter').addEventListener('change',e=>{s.certainty=e.target.value;render()});
  $('#precisionFilter').addEventListener('change',e=>{s.precision=e.target.value;render()});
  $('#spatialFilter').addEventListener('change',e=>{s.spatial=e.target.value;render()});
  $('#labelMode').addEventListener('change',e=>{s.labelMode=e.target.value;renderMarkers(occMapVisible())});
  $('#eventWindowSelect').addEventListener('change',e=>{
    s.eventWindow=Number(e.target.value)||100;
    renderMetrics(occVisible());
    renderEvents();
  });

  $('#resetFiltersBtn').addEventListener('click',()=>{debouncedSearch.cancel();resetFilters()});
  $('#applyFiltersBtn').addEventListener('click',closeDrawer);

  $('#layersBtn').addEventListener('click',openLayers);
  $('#openLayersTransformBtn').addEventListener('click',openLayers);
  $('#closeLayersBtn').addEventListener('click',closeLayers);
  $$('[data-close-layers]').forEach(x=>x.addEventListener('click',closeLayers));

  $('#layerGastronomy').addEventListener('change',e=>{s.layers.gastronomy=e.target.checked;render()});
  $('#layerContexts').addEventListener('change',e=>{s.layers.contexts=e.target.checked;render()});
  $('#layerDevelopments').addEventListener('change',e=>{s.layers.developments=e.target.checked;render()});
  $('#layerSafety').addEventListener('change',e=>{s.layers.safety=e.target.checked;render()});

  $('#filterBtn').addEventListener('click',openDrawer);
  $$('[data-close-drawer]').forEach(x=>x.addEventListener('click',closeDrawer));

  $$('[data-close-detail]').forEach(x=>x.addEventListener('click',closeDetail));
  $('#closeDetailBtn').addEventListener('click',closeDetail);
  $$('[data-close-history]').forEach(x=>x.addEventListener('click',closeHistory));
  $('#subjectHistoryBtn').addEventListener('click',()=>{
    const o=s.occurrences.find(x=>x.id===s.selectedOccurrence);
    if(!o) return;
    const curated=preferredStoryForSubject(o.subjectRef);
    if(curated){closeDetail();openNarrativeStory(curated.id);}
    else openHistory(o.subjectRef);
  });

  $('#prevTemporalHitBtn').addEventListener('click',()=>stepTemporalHit(-1));
  $('#nextTemporalHitBtn').addEventListener('click',()=>stepTemporalHit(1));
  $('#storyBackBtn').addEventListener('click',()=>closeNarrativeStory());
  $('#storyPrevBtn').addEventListener('click',()=>stepNarrativeScene(-1));
  $('#storyNextBtn').addEventListener('click',()=>stepNarrativeScene(1));
  $('#glossaryCloseBtn').addEventListener('click',()=>$('#glossaryDialog').close());
  $('#openAtlasFromStoriesBtn').addEventListener('click',()=>{withRouteSyncLocked(()=>closeNarrativeStory({scroll:false}));setExperienceView('explore');routeToAtlas();});

  $('#exploreNavBtn').addEventListener('click',()=>{withRouteSyncLocked(()=>closeNarrativeStory({scroll:false}));setExperienceView('explore');routeToAtlas();});
  $('#historiesNavBtn').addEventListener('click',()=>{withRouteSyncLocked(()=>closeNarrativeStory({scroll:false}));setExperienceView('histories');routeToHistories();});
  $('#openHistoriesHeroBtn').addEventListener('click',()=>{withRouteSyncLocked(()=>closeNarrativeStory({scroll:false}));setExperienceView('histories');routeToHistories();});
  $('.brand')?.addEventListener('click',event=>{event.preventDefault();withRouteSyncLocked(()=>closeNarrativeStory({scroll:false}));setExperienceView('histories',{scroll:false});routeToHistories();});

  $('#jumpMapBtn').addEventListener('click',()=>{
    setExperienceView('explore',{scroll:false});
    $('#mapSection').scrollIntoView({behavior:'smooth',block:'start'});
  });

  $('#themeBtn').addEventListener('click',()=>applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
  $('#fullscreenBtn').addEventListener('click',fullscreen);

  $('#aboutBtn').addEventListener('click',()=>$('#aboutDialog').showModal());
  $('#aboutCloseBtn').addEventListener('click',()=>$('#aboutDialog').close());
  $('#methodBtn').addEventListener('click',()=>$('#aboutDialog').showModal());

  window.addEventListener('resize',()=>renderMarkers(occMapVisible()));

  window.addEventListener('popstate',()=>restoreRouteFromLocation());


  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){
      const glossaryOpen=Boolean($('#glossaryDialog')?.open);
      const overlayOpen=$('#historyDrawer').classList.contains('open')
        ||$('#filterDrawer').classList.contains('open')
        ||$('#layersDrawer').classList.contains('open')
        ||$('#detailDrawer').classList.contains('open');

      closeHistory();
      closeDrawer();
      closeLayers();
      closeDetail();
      if(glossaryOpen) $('#glossaryDialog').close();
      else if(!overlayOpen&&s.view==='histories'&&s.activeStory) closeNarrativeStory();
    }
    if(s.view==='histories'&&s.activeStory&&event.key==='ArrowLeft'){
      event.preventDefault();stepNarrativeScene(-1);
    }else if(s.view==='histories'&&s.activeStory&&event.key==='ArrowRight'){
      event.preventDefault();stepNarrativeScene(1);
    }
  });
}


function getStore(key){
  try{return localStorage.getItem(key)}catch{return null}
}

function setStore(key,value){
  try{localStorage.setItem(key,value)}catch{}
}

function applyTheme(theme){
  document.documentElement.dataset.theme=theme;
  setStore('agh_theme',theme);
  $('#themeBtn').textContent=theme==='dark'?'☀':'☾';
  document.querySelector('meta[name="theme-color"]').setAttribute('content',theme==='dark'?'#10121a':'#f3efe6');
}

async function fullscreen(){
  try{
    if(!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  }catch{
    showToast('Pantalla completa no disponible en este navegador');
  }
}

let toastTimer;
function showToast(text){
  clearTimeout(toastTimer);
  const toast=$('#toast');
  toast.textContent=text;
  toast.classList.add('show');
  toastTimer=setTimeout(()=>toast.classList.remove('show'),1700);
}

load();
