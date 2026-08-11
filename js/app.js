import {toOrdinal,fromOrdinal,formatYear,shiftYear,active,distance,fromParts,parts,project} from './core.js?v=0.1.0-alpha.9';

const P={
  config:'./data/config.json?v=0.1.0-alpha.9',
  taxonomy:'./data/taxonomy.json?v=0.1.0-alpha.9',
  subjects:'./data/subjects.json?v=0.1.0-alpha.9',
  places:'./data/places.json?v=0.1.0-alpha.9',
  occurrences:'./data/occurrences.json?v=0.1.0-alpha.9',
  events:'./data/events.json?v=0.1.0-alpha.9',
  relationships:'./data/relationships.json?v=0.1.0-alpha.9',
  contexts:'./data/contexts.json?v=0.1.0-alpha.9',
  developments:'./data/developments.json?v=0.1.0-alpha.9',
  sources:'./data/sources.json?v=0.1.0-alpha.9',
  basemap:'./data/basemap/world_110m.geojson?v=0.1.0-alpha.9'
};

const s={
  config:null,taxonomy:null,subjects:[],places:[],occurrences:[],events:[],relationships:[],contexts:[],developments:[],sources:[],basemap:null,
  year:1500,search:'',evidence:'all',occurrenceType:'all',showSeed:true,labelMode:'auto',
  selectedOccurrence:null,historySubject:null,eventWindow:100,playStep:50,playing:false,timer:null,category:'all',layers:{gastronomy:true,contexts:true,developments:true,safety:true}
};

const $=q=>document.querySelector(q);
const $$=q=>[...document.querySelectorAll(q)];

const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=v=>String(v??'').normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();

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
  trade:'Comercio',
  introduction:'Introducción',
  adoption:'Adopción',
  regulation:'Regulación',
  industrial_production:'Producción industrial',
  traditional_attribution:'Atribución tradicional',
  other:'Otro'
};

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
    const [config,taxonomy,subjects,places,occurrences,events,relationships,contexts,developments,sources,basemap]=await Promise.all(Object.values(P).map(j));
    Object.assign(s,{config,taxonomy,subjects,places,occurrences,events,relationships,contexts,developments,sources,basemap});
    s.year=config.timeline.initialYear;
    s.playStep=config.timeline.playStep;
    s.eventWindow=config.timeline.eventWindowYears;

    fillControls();
    renderBasemap();
    bind();
    applyTheme(getStore('agh_theme')==='light'?'light':'dark');
    setYear(s.year);

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

  const ps=$('#playStepSelect');
  s.config.timeline.playStepOptions.forEach(x=>ps.add(new Option(`${x} ${x===1?'año':'años'}/paso`,x)));
  ps.value=s.playStep;

  const ew=$('#eventWindowSelect');
  [25,50,100,250,500].forEach(x=>ew.add(new Option(`±${x} años`,x)));
  ew.value=s.eventWindow;

  $('#yearRange').min=toOrdinal(s.config.timeline.minYear);
  $('#yearRange').max=toOrdinal(s.config.timeline.maxYear);
  syncTypeControls();
}

function subj(id){return s.subjects.find(x=>x.id===id)}
function place(id){return s.places.find(x=>x.id===id)}
function sourceById(id){return s.sources.find(x=>x.id===id)}

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

function pointPrecisionLabel(pl){
  const precision=pl?.point?.precision;
  if(precision==='approximate') return 'Punto cartográfico aproximado';
  if(precision==='reference') return 'Punto cartográfico de referencia';
  if(precision==='exact_from_publication') return 'Coordenadas publicadas';
  return pl?.point ? 'Punto cartográfico' : 'Sin punto cartográfico';
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

function occVisible(){
  if(!s.layers.gastronomy) return [];
  const q=norm(s.search.trim());

  return s.occurrences.filter(o=>{
    if(o.status==='deprecated') return false;
    if(!active(o.period,s.year)) return false;
    if(!s.showSeed && o.status==='seed') return false;
    if(s.evidence!=='all' && o.evidenceType!==s.evidence) return false;
    if(s.occurrenceType!=='all' && o.occurrenceType!==s.occurrenceType) return false;

    const subject=subj(o.subjectRef);
    const pl=place(o.placeRef);
    if(!subject || !pl || subject.status==='deprecated' || pl.status==='deprecated') return false;

    if(s.category!=='all' && subject.type!==s.category) return false;

    if(q){
      const haystack=norm([
        subject.name,subject.summary,(subject.aliases||[]).join(' '),
        pl.name,o.summary,TYPE_LABELS[subject.type],EVIDENCE_LABELS[o.evidenceType],OCC_LABELS[o.occurrenceType]
      ].join(' '));
      if(!haystack.includes(q)) return false;
    }
    return true;
  });
}


function occurrencesWithoutMapPoint(list){
  return list.filter(o=>{
    const pl=place(o.placeRef);
    return !pl?.point || !Number.isFinite(Number(pl.point.lat)) || !Number.isFinite(Number(pl.point.lon));
  });
}

function renderMapCoverage(list){
  const box=$('#mapCoverageStatus');
  if(!box) return;

  const missing=occurrencesWithoutMapPoint(list);
  if(!missing.length){
    box.classList.add('hidden');
    box.textContent='';
    return;
  }

  const uniquePlaces=new Set(missing.map(o=>o.placeRef)).size;
  box.classList.remove('hidden');
  box.innerHTML=`
    <strong>${missing.length} ${missing.length===1?'registro visible no puede':'registros visibles no pueden'} situarse en el mapa.</strong>
    <span>${uniquePlaces} ${uniquePlaces===1?'lugar carece':'lugares carecen'} de coordenadas fiables. El registro sigue disponible en la lista.</span>
  `;

  for(const o of missing){
    if(!warnedUnmapped.has(o.id)){
      warnedUnmapped.add(o.id);
      console.warn(`[Atlas] Registro sin punto cartográfico: ${o.id} · placeRef=${o.placeRef}`);
    }
  }
}

const warnedUnmapped=new Set();

function setYear(year){
  s.year=Math.max(s.config.timeline.minYear,Math.min(s.config.timeline.maxYear,year===0?1:year));

  $('#yearRange').value=toOrdinal(s.year);
  $('#yearDisplay').textContent=formatYear(s.year);
  $('#mapYearDisplay').textContent=formatYear(s.year);

  const p=parts(s.year);
  $('#yearMagnitude').value=p.magnitude;
  $('#yearEra').value=p.era;
  $('#heroYear').textContent=p.magnitude;
  $('#heroEra').textContent=p.era==='BCE'?'a. C.':'d. C.';

  render();
}

function render(){
  const list=occVisible();
  renderMetrics(list);
  renderCategorySummary(list);
  renderList(list);
  renderMapCoverage(list);
  renderMarkers(list);
  renderContextLayer();
  renderDevelopmentLayer();
  renderTransformationPreview();
  renderContext(list);
  renderHistorySpotlight();
  renderEvents();

  if(s.selectedOccurrence && !list.some(x=>x.id===s.selectedOccurrence)){
    s.selectedOccurrence=null;
    renderDetails(null);
  }
}

function renderMetrics(list){
  $('#occurrenceCount').textContent=list.length;
  $('#subjectCount').textContent=new Set(list.map(x=>x.subjectRef)).size;
  $('#placeCount').textContent=new Set(list.map(x=>x.placeRef)).size;
  $('#eventCount').textContent=s.events.filter(e=>e.status!=='deprecated'&&(s.showSeed||e.status!=='seed')&&distance(e.period,s.year)<=s.eventWindow).length;
  $('#visibleBadge').textContent=list.length;
  $('#evidenceContext').textContent=list.length
    ? `${list.length} ${list.length===1?'registro visible':'registros visibles'} en ${formatYear(s.year)}.`
    : `No hay registros visibles en ${formatYear(s.year)} con estos filtros.`;
}

function renderCategorySummary(list){
  const box=$('#categorySummary');
  const counts=new Map();

  list.forEach(o=>{
    const subject=subj(o.subjectRef);
    const key=subject?.type || 'other';
    counts.set(key,(counts.get(key)||0)+1);
  });

  const order=['food_species','beverage','culinary_technique','processed_product'];
  box.innerHTML=order.map(kind=>`
    <button class="summary-card" data-kind="${kind}" type="button" data-summary-category="${kind}">
      <span>${esc(CATEGORY_LABELS[kind])}</span>
      <strong>${counts.get(kind)||0}</strong>
    </button>
  `).join('');

  $$('[data-summary-category]').forEach(button=>{
    button.addEventListener('click',()=>{
      setCategoryFilter(s.category===button.dataset.summaryCategory?'all':button.dataset.summaryCategory);
      render();
    });
  });
  syncTypeControls();
}

function renderList(list){
  const box=$('#occurrenceList');
  box.innerHTML='';

  if(!list.length){
    box.innerHTML='<p class="map-foot">No hay evidencias visibles. Cambia de fecha o abre Filtros para ampliar la búsqueda.</p>';
    return;
  }

  list
    .slice()
    .sort((a,b)=>subj(a.subjectRef).name.localeCompare(subj(b.subjectRef).name,'es'))
    .forEach(o=>{
      const subject=subj(o.subjectRef);
      const pl=place(o.placeRef);

      const button=document.createElement('button');
      button.type='button';
      button.className='evidence-card'+(o.id===s.selectedOccurrence?' active':'');
      const sm=statusMeta(o.status);
      button.innerHTML=`
        <span class="card-top">
          <i class="category-dot" data-kind="${esc(subject.type)}"></i>
          <strong>${esc(subject.name)}</strong>
          <em class="mini-status ${esc(sm.className)}">${esc(sm.label)}</em>
        </span>
        <span>${esc(OCC_LABELS[o.occurrenceType]||o.occurrenceType)} · ${esc(EVIDENCE_LABELS[o.evidenceType]||o.evidenceType)}</span>
        <small>${esc(pl.name)} · ${esc(o.period.display||`${formatYear(o.period.start)}–${formatYear(o.period.end)}`)}</small>
      `;
      button.addEventListener('click',()=>selectOccurrence(o.id,true));
      box.appendChild(button);
    });
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
  map.classList.toggle('compact-labels',s.labelMode==='auto'&&(innerWidth<760||list.length>8));
  map.classList.toggle('selected-labels',s.labelMode==='selected');

  list.forEach(o=>{
    const subject=subj(o.subjectRef);
    const pl=place(o.placeRef);
    if(!pl?.point) return;

    const [x,y]=project(pl.point.lon,pl.point.lat);
    const group=svg('g',{
      class:'occ-marker'+(o.id===s.selectedOccurrence?' active':''),
      transform:`translate(${x} ${y})`,
      tabindex:'0',
      role:'button',
      'aria-label':`${subject.name}: ${pl.name}`,
      'data-kind':subject.type
    });

    group.appendChild(svg('circle',{r:'14',class:'marker-halo'}));
    group.appendChild(svg('circle',{r:'6',class:'marker-core'}));

    const text=svg('text',{x:'10',y:'-9'});
    text.textContent=subject.name;
    group.appendChild(text);

    group.addEventListener('click',()=>selectOccurrence(o.id,true));
    group.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){
        event.preventDefault();
        selectOccurrence(o.id,true);
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
    .filter(c=>c.status!=='deprecated'&&(s.showSeed||c.status!=='seed')&&active(c.period,s.year))
    .forEach(c=>{
      const firstPlace=(c.placeRefs||[]).map(place).find(Boolean);
      if(!firstPlace?.point) return;
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
    .filter(d=>d.status!=='deprecated'&&(s.showSeed||d.status!=='seed')&&active(d.period,s.year))
    .filter(d=>{
      const safety=['hygiene','food_safety','public_health','regulation','quality_system'];
      return safety.includes(d.type) ? s.layers.safety : s.layers.developments;
    })
    .forEach(d=>{
      const firstPlace=(d.placeRefs||[]).map(place).find(Boolean);
      if(!firstPlace?.point) return;
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

  const candidates=s.developments
    .filter(d=>d.status!=='deprecated'&&(s.showSeed||d.status!=='seed'))
    .filter(d=>{
      const safety=['hygiene','food_safety','public_health','regulation','quality_system'].includes(d.type);
      return safety ? s.layers.safety : s.layers.developments;
    });

  const activeNow=candidates.filter(d=>active(d.period,s.year));
  const chosen=(activeNow.length?activeNow:candidates
    .slice()
    .sort((a,b)=>distance(a.period,s.year)-distance(b.period,s.year)))
    .slice(0,3);

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
      <em class="mini-status ${esc(sm.className)}">${esc(sm.label)} · ${(d.sourceRefs||[]).length} ${(d.sourceRefs||[]).length===1?'fuente':'fuentes'}</em>
    </button>`;
  }).join('');

  $$('[data-development-year]').forEach(button=>{
    button.addEventListener('click',()=>setYear(Number(button.dataset.developmentYear)));
  });
}

function renderContext(list){
  const title=$('#contextTitle');
  const text=$('#contextText');
  const box=$('#contextHighlights');

  if(!list.length){
    title.textContent='Un momento sin registros visibles';
    text.textContent='Con el corpus y los filtros actuales no hay evidencias activas para esta fecha.';
    box.innerHTML='<article class="context-card"><strong>Explora otra fecha</strong><span>Usa la línea temporal o amplía los filtros para recuperar evidencias.</span></article>';
    return;
  }

  const subjects=[...new Set(list.map(x=>subj(x.subjectRef)?.name).filter(Boolean))];
  const places=[...new Set(list.map(x=>place(x.placeRef)?.name).filter(Boolean))];
  const evidence=[...new Set(list.map(x=>EVIDENCE_LABELS[x.evidenceType]||x.evidenceType))];
  const reviewed=list.filter(x=>x.status==='reviewed'||x.status==='verified').length;
  const seed=list.filter(x=>x.status==='seed').length;

  title.textContent=`${formatYear(s.year)} · una instantánea del mundo alimentario`;
  text.textContent=`El Atlas muestra ${list.length} ${list.length===1?'registro':'registros'} asociados a ${subjects.length} ${subjects.length===1?'elemento gastronómico':'elementos gastronómicos'} y ${places.length} ${places.length===1?'lugar':'lugares'}.`;

  const cards=[
    ['Elementos visibles',subjects.slice(0,4).join(' · ')||'—'],
    ['Lugares representados',places.slice(0,4).join(' · ')||'—'],
    ['Tipos de evidencia',evidence.slice(0,4).join(' · ')||'—'],
    ['Estado del corpus',`${reviewed} revisados/verificados · ${seed} provisionales`]
  ];

  box.innerHTML=cards.map(([a,b])=>`<article class="context-card"><strong>${esc(a)}</strong><span>${esc(b)}</span></article>`).join('');
}


function renderHistorySpotlight(){
  const box=$('#historySpotlightList');
  if(!box) return;

  const available=s.subjects
    .filter(subject=>subject.status!=='deprecated')
    .map(subject=>{
      const items=subjectHistoryItems(subject.id);
      const occurrences=items.filter(x=>x.kind==='occurrence');
      const events=items.filter(x=>x.kind==='event');
      const developments=items.filter(x=>x.kind==='development');
      return {subject,items,occurrences,events,developments};
    })
    .filter(x=>x.occurrences.length>=2)
    .sort((a,b)=>{
      if(b.occurrences.length!==a.occurrences.length) return b.occurrences.length-a.occurrences.length;
      return a.subject.name.localeCompare(b.subject.name,'es');
    });

  if(!available.length){
    box.innerHTML='<p class="map-foot">Todavía no hay elementos con suficientes hitos revisados para construir un recorrido.</p>';
    return;
  }

  box.innerHTML=available.slice(0,6).map(({subject,items,occurrences,events,developments})=>{
    const first=items[0]?.period?.start;
    const last=items[items.length-1]?.period?.end;
    return `<button class="history-spotlight-card" type="button" data-history-subject="${esc(subject.id)}">
      <span class="history-spotlight-kicker">${esc(TYPE_LABELS[subject.type]||subject.type)}</span>
      <strong>Historia de ${esc(subject.name)}</strong>
      <p>${occurrences.length} ${occurrences.length===1?'evidencia':'evidencias'}${events.length?` · ${events.length} ${events.length===1?'evento':'eventos'}`:''}${developments.length?` · ${developments.length} ${developments.length===1?'transformación':'transformaciones'}`:''}</p>
      <small>${first!==undefined&&last!==undefined?`${esc(formatYear(first))} → ${esc(formatYear(last))}`:'Recorrido disponible'}</small>
      <em>Explorar recorrido →</em>
    </button>`;
  }).join('');

  $$('[data-history-subject]').forEach(button=>{
    button.addEventListener('click',()=>openHistory(button.dataset.historySubject));
  });
}

function renderEvents(){
  const box=$('#eventList');
  box.innerHTML='';

  const ev=s.events
    .filter(e=>e.status!=='deprecated'&&(s.showSeed||e.status!=='seed')&&distance(e.period,s.year)<=s.eventWindow)
    .sort((a,b)=>distance(a.period,s.year)-distance(b.period,s.year));

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
        <span>${(e.sourceRefs||[]).length} ${(e.sourceRefs||[]).length===1?'fuente':'fuentes'}</span>
      </div>
    `;
    box.appendChild(article);
  });
}

function selectOccurrence(id,openDrawer=false){
  s.selectedOccurrence=id;
  const o=s.occurrences.find(x=>x.id===id);
  render();
  renderDetails(o);

  if(openDrawer) openDetail();
}


function subjectHistoryItems(subjectId){
  const occurrences=s.occurrences
    .filter(o=>o.subjectRef===subjectId&&o.status!=='deprecated'&&(o.status==='reviewed'||o.status==='verified'))
    .map(o=>({kind:'occurrence',period:o.period,item:o}));

  const events=s.events
    .filter(e=>e.status!=='deprecated'&&(e.status==='reviewed'||e.status==='verified')&&(e.subjectRefs||[]).includes(subjectId))
    .map(e=>({kind:'event',period:e.period,item:e}));

  const developments=s.developments
    .filter(d=>d.status!=='deprecated'&&(d.status==='reviewed'||d.status==='verified')&&(d.impactSubjectRefs||[]).includes(subjectId))
    .map(d=>({kind:'development',period:d.period,item:d}));

  return [...occurrences,...events,...developments].sort((a,b)=>{
    if(a.period.start!==b.period.start) return a.period.start-b.period.start;
    return a.period.end-b.period.end;
  });
}

function historyContextNames(o){
  return (o.contextRefs||[])
    .map(contextById)
    .filter(c=>c&&c.status!=='deprecated')
    .map(c=>c.name);
}

function renderSubjectHistory(subjectId){
  const subject=subj(subjectId);
  if(!subject) return;

  const items=subjectHistoryItems(subjectId);
  const occurrenceCount=items.filter(x=>x.kind==='occurrence').length;
  const eventCount=items.filter(x=>x.kind==='event').length;
  const developmentCount=items.filter(x=>x.kind==='development').length;

  s.historySubject=subjectId;
  $('#historyTitle').textContent=`Historia de ${subject.name}`;
  $('#historySubtitle').textContent='Evidencias, procesos históricos y transformaciones documentados actualmente en el Atlas.';

  if(items.length){
    const first=items[0].period.start;
    const last=items[items.length-1].period.end;
    $('#historySummary').innerHTML=`
      <span><strong>${occurrenceCount}</strong> ${occurrenceCount===1?'evidencia':'evidencias'}</span>
      <i></i>
      <span><strong>${eventCount}</strong> ${eventCount===1?'evento':'eventos'}</span>
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
            ${o.certainty&&o.certainty!=='high'?`<span class="history-uncertainty">Certeza: ${esc(o.certainty)}</span>`:''}
            ${contexts.map(c=>`<span>${esc(c)}</span>`).join('')}
            <span>${(o.sourceRefs||[]).length} ${(o.sourceRefs||[]).length===1?'fuente':'fuentes'}</span>
          </div>
          ${o.certainty==='medium'?'<div class="history-caution">La evidencia o interpretación de este hito conserva incertidumbre explícita.</div>':''}
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
          <div class="history-card-head">
            <span class="history-kind event">EVENTO</span>
            <span class="status-badge ${esc(sm.className)}">${esc(sm.label)}</span>
          </div>
          <time>${esc(e.period.display||`${formatYear(e.period.start)}–${formatYear(e.period.end)}`)}</time>
          <h3>${esc(e.title)}</h3>
          <p>${esc(e.summary)}</p>
          <div class="history-meta">
            <span>${esc(EVENT_LABELS[e.eventType]||e.eventType||'Proceso histórico')}</span>
            ${e.certainty&&e.certainty!=='high'?`<span class="history-uncertainty">Certeza: ${esc(e.certainty)}</span>`:''}
            <span>${(e.sourceRefs||[]).length} ${(e.sourceRefs||[]).length===1?'fuente':'fuentes'}</span>
          </div>
          ${verificationHTML(e)}
          <button type="button" class="history-open-event" data-history-event="${esc(e.id)}">Ir al proceso histórico</button>
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
          <div class="history-card-head">
            <span class="history-kind development">TRANSFORMACIÓN</span>
            <span class="status-badge ${esc(sm.className)}">${esc(sm.label)}</span>
          </div>
          <time>${esc(d.period.display||`${formatYear(d.period.start)}–${formatYear(d.period.end)}`)}</time>
          <h3>${esc(d.name)}</h3>
          <p>${esc(d.summary)}</p>
          <div class="history-meta">
            <span>${esc(developmentTypeLabel(d.type))}</span>
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
      setYear(e.period.start);
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
      setYear(d.period.start);
      setTimeout(()=>$('#transformTitle')?.scrollIntoView({behavior:'smooth',block:'center'}),40);
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
    </div>
  `;

  $('#occurrenceDetail').innerHTML=`
    <span class="status-badge ${esc(occurrenceStatus.className)}">${esc(occurrenceStatus.label)}</span>
    <h3>${esc(pl.name)}</h3>
    <p>${esc(o.summary)}</p>
    <div class="detail-meta">
      <div><b>Intervalo</b><span>${esc(o.period.display||`${formatYear(o.period.start)}–${formatYear(o.period.end)}`)}</span></div>
      <div><b>Precisión</b><span>${esc(o.period.precision)}</span></div>
      <div><b>Qué documenta</b><span>${esc(OCC_LABELS[o.occurrenceType]||o.occurrenceType)}</span></div>
      <div><b>Evidencia</b><span>${esc(EVIDENCE_LABELS[o.evidenceType]||o.evidenceType)}</span></div>
      <div><b>Certeza</b><span>${esc(o.certainty)}</span></div>
      <div><b>Cartografía</b><span>${esc(pointPrecisionLabel(pl))}</span></div>
    </div>
    ${o.period.note?`<p class="evidence-note">${esc(o.period.note)}</p>`:''}
    ${verificationHTML(o)}
    <div class="detail-sources">
      <b>Fuentes del registro</b>
      ${sourceListHTML(o.sourceRefs||[])}
    </div>
  `;

  const relatedContexts=(o.contextRefs||[]).map(contextById).filter(c=>c&&c.status!=='deprecated');
  const relatedDevelopments=(o.developmentRefs||[]).map(developmentById).filter(d=>d&&d.status!=='deprecated');

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
  const transformationCount=historyItems.filter(x=>x.kind==='development').length;
  $('#subjectHistoryBtn').disabled=historyCount<2;
  $('#subjectHistoryBtn').textContent=historyCount<2
    ? 'Historia todavía insuficiente'
    : `Ver historia · ${historyCount} evidencias${eventCount?` + ${eventCount} evento${eventCount===1?'':'s'}`:''}${transformationCount?` + ${transformationCount} transformación${transformationCount===1?'':'es'}`:''}`;
  $('#subjectHistoryBtn').title=historyCount<2
    ? 'Se activará cuando este elemento tenga al menos dos registros históricos revisados.'
    : 'Abrir recorrido histórico documentado.';
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
  $$('#categoryLegend [data-category]').forEach(button=>{
    button.classList.toggle('active',button.dataset.category===s.category);
    button.setAttribute('aria-pressed',String(button.dataset.category===s.category));
  });

  if($('#subjectTypeFilter')){
    $('#subjectTypeFilter').value=s.category;
  }

  $$('[data-summary-category]').forEach(button=>{
    button.classList.toggle('active',button.dataset.summaryCategory===s.category);
    button.setAttribute('aria-pressed',String(button.dataset.summaryCategory===s.category));
  });
}

function setCategoryFilter(value){
  s.category=value||'all';
  syncTypeControls();
}

function resetFilters(){
  s.search='';
  s.evidence='all';
  s.occurrenceType='all';
  s.category='all';
  s.labelMode='auto';
  s.showSeed=true;

  $('#searchInput').value='';
  $('#subjectTypeFilter').value='all';
  $('#evidenceFilter').value='all';
  $('#occurrenceTypeFilter').value='all';
  $('#labelMode').value='auto';
  $('#seedToggle').checked=true;

  syncTypeControls();
  render();
}

function bind(){
  const min=s.config.timeline.minYear;
  const max=s.config.timeline.maxYear;

  $('#yearRange').addEventListener('input',e=>setYear(fromOrdinal(Number(e.target.value))));

  $$('[data-step]').forEach(button=>{
    button.addEventListener('click',()=>setYear(shiftYear(s.year,Number(button.dataset.step),min,max)));
  });

  $$('[data-jump-year]').forEach(button=>{
    button.addEventListener('click',()=>setYear(Number(button.dataset.jumpYear)));
  });

  $('#goYearBtn').addEventListener('click',()=>setYear(fromParts($('#yearMagnitude').value,$('#yearEra').value,min,max)));
  $('#yearMagnitude').addEventListener('keydown',e=>{if(e.key==='Enter') $('#goYearBtn').click()});

  $('#playStepSelect').addEventListener('change',e=>{
    s.playStep=Number(e.target.value)||50;
    if(s.playing) startTimer();
  });

  $('#playBtn').addEventListener('click',()=>{
    s.playing=!s.playing;
    $('#playBtn').textContent=s.playing?'❚❚':'▶';
    $('#playBtn').setAttribute('aria-label',s.playing?'Pausar tiempo':'Reproducir tiempo');
    if(s.playing) startTimer(); else stopTimer();
  });

  $('#searchToggleBtn').addEventListener('click',()=>{
    $('#quickSearch').classList.toggle('hidden');
    if(!$('#quickSearch').classList.contains('hidden')) $('#searchInput').focus();
  });

  const debouncedSearch=debounce(value=>{
    s.search=value;
    render();
  },160);

  $('#clearSearchBtn').addEventListener('click',()=>{
    debouncedSearch.cancel();
    s.search='';
    $('#searchInput').value='';
    render();
  });

  $('#searchInput').addEventListener('input',e=>{
    debouncedSearch(e.target.value);
  });

  $('#subjectTypeFilter').addEventListener('change',e=>{
    setCategoryFilter(e.target.value);
    render();
  });
  $('#evidenceFilter').addEventListener('change',e=>{s.evidence=e.target.value;render()});
  $('#occurrenceTypeFilter').addEventListener('change',e=>{s.occurrenceType=e.target.value;render()});
  $('#labelMode').addEventListener('change',e=>{s.labelMode=e.target.value;renderMarkers(occVisible())});
  $('#seedToggle').addEventListener('change',e=>{s.showSeed=e.target.checked;render()});
  $('#eventWindowSelect').addEventListener('change',e=>{s.eventWindow=Number(e.target.value)||100;renderMetrics(occVisible());renderEvents()});

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
  $('#openFiltersHeroBtn').addEventListener('click',openDrawer);
  $$('[data-close-drawer]').forEach(x=>x.addEventListener('click',closeDrawer));

  $$('[data-close-detail]').forEach(x=>x.addEventListener('click',closeDetail));
  $('#closeDetailBtn').addEventListener('click',closeDetail);
  $$('[data-close-history]').forEach(x=>x.addEventListener('click',closeHistory));
  $('#subjectHistoryBtn').addEventListener('click',()=>{
    const o=s.occurrences.find(x=>x.id===s.selectedOccurrence);
    if(o) openHistory(o.subjectRef);
  });

  $('#jumpMapBtn').addEventListener('click',()=>$('#mapSection').scrollIntoView({behavior:'smooth',block:'start'}));

  $$('#categoryLegend [data-category]').forEach(button=>{
    button.addEventListener('click',()=>{
      setCategoryFilter(button.dataset.category);
      render();
    });
  });

  $('#themeBtn').addEventListener('click',()=>applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
  $('#fullscreenBtn').addEventListener('click',fullscreen);

  $('#aboutBtn').addEventListener('click',()=>$('#aboutDialog').showModal());
  $('#aboutCloseBtn').addEventListener('click',()=>$('#aboutDialog').close());
  $('#methodBtn').addEventListener('click',()=>$('#aboutDialog').showModal());

  window.addEventListener('resize',()=>renderMarkers(occVisible()));

  document.addEventListener('visibilitychange',()=>{
    if(document.hidden&&s.playing){
      s.playing=false;
      stopTimer();
      $('#playBtn').textContent='▶';
    }
  });

  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){
      closeHistory();
      closeDrawer();
      closeLayers();
      closeDetail();
    }
  });
}

function startTimer(){
  stopTimer();
  s.timer=setInterval(()=>{
    if(s.year>=s.config.timeline.maxYear){
      s.playing=false;
      stopTimer();
      $('#playBtn').textContent='▶';
      return;
    }
    setYear(shiftYear(s.year,s.playStep,s.config.timeline.minYear,s.config.timeline.maxYear));
  },650);
}

function stopTimer(){
  if(s.timer){
    clearInterval(s.timer);
    s.timer=null;
  }
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
