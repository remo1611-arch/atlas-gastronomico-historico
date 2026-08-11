import {toOrdinal,fromOrdinal,formatYear,shiftYear,active,distance,fromParts,parts,project} from './core.js?v=0.1.0-alpha.4';

const P={
  config:'./data/config.json?v=0.1.0-alpha.4',
  taxonomy:'./data/taxonomy.json?v=0.1.0-alpha.4',
  subjects:'./data/subjects.json?v=0.1.0-alpha.4',
  places:'./data/places.json?v=0.1.0-alpha.4',
  occurrences:'./data/occurrences.json?v=0.1.0-alpha.4',
  events:'./data/events.json?v=0.1.0-alpha.4',
  relationships:'./data/relationships.json?v=0.1.0-alpha.4',
  contexts:'./data/contexts.json?v=0.1.0-alpha.4',
  developments:'./data/developments.json?v=0.1.0-alpha.4',
  sources:'./data/sources.json?v=0.1.0-alpha.4',
  basemap:'./data/basemap/world_110m.geojson?v=0.1.0-alpha.4'
};

const s={
  config:null,taxonomy:null,subjects:[],places:[],occurrences:[],events:[],relationships:[],contexts:[],developments:[],sources:[],basemap:null,
  year:1500,search:'',subjectType:'all',evidence:'all',occurrenceType:'all',showSeed:true,labelMode:'auto',
  selectedOccurrence:null,eventWindow:100,playStep:50,playing:false,timer:null,category:'all',layers:{gastronomy:true,contexts:true,developments:true,safety:true}
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
}

function subj(id){return s.subjects.find(x=>x.id===id)}
function place(id){return s.places.find(x=>x.id===id)}

function occVisible(){
  if(!s.layers.gastronomy) return [];
  const q=norm(s.search.trim());

  return s.occurrences.filter(o=>{
    if(!active(o.period,s.year)) return false;
    if(!s.showSeed && o.status==='seed') return false;
    if(s.evidence!=='all' && o.evidenceType!==s.evidence) return false;
    if(s.occurrenceType!=='all' && o.occurrenceType!==s.occurrenceType) return false;

    const subject=subj(o.subjectRef);
    const pl=place(o.placeRef);
    if(!subject || !pl) return false;

    if(s.subjectType!=='all' && subject.type!==s.subjectType) return false;
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
  renderMarkers(list);
  renderContextLayer();
  renderDevelopmentLayer();
  renderContext(list);
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
  $('#eventCount').textContent=s.events.filter(e=>(s.showSeed||e.status!=='seed')&&distance(e.period,s.year)<=s.eventWindow).length;
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
      s.category=s.category===button.dataset.summaryCategory?'all':button.dataset.summaryCategory;
      syncLegend();
      render();
    });
  });
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
      button.innerHTML=`
        <span class="card-top">
          <i class="category-dot" data-kind="${esc(subject.type)}"></i>
          <strong>${esc(subject.name)}</strong>
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
    .filter(c=>(s.showSeed||c.status!=='seed')&&active(c.period,s.year))
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
    .filter(d=>(s.showSeed||d.status!=='seed')&&active(d.period,s.year))
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

  title.textContent=`${formatYear(s.year)} · una instantánea del mundo alimentario`;
  text.textContent=`El prototipo muestra ${list.length} ${list.length===1?'evidencia':'evidencias'} asociadas a ${subjects.length} ${subjects.length===1?'elemento gastronómico':'elementos gastronómicos'} y ${places.length} ${places.length===1?'lugar':'lugares'}.`;

  const cards=[
    ['Elementos visibles',subjects.slice(0,4).join(' · ')||'—'],
    ['Lugares representados',places.slice(0,4).join(' · ')||'—'],
    ['Tipos de evidencia',evidence.slice(0,4).join(' · ')||'—'],
    ['Estado del corpus','Datos provisionales de demostración; verificación histórica pendiente de G2.']
  ];

  box.innerHTML=cards.map(([a,b])=>`<article class="context-card"><strong>${esc(a)}</strong><span>${esc(b)}</span></article>`).join('');
}

function renderEvents(){
  const box=$('#eventList');
  box.innerHTML='';

  const ev=s.events
    .filter(e=>(s.showSeed||e.status!=='seed')&&distance(e.period,s.year)<=s.eventWindow)
    .sort((a,b)=>distance(a.period,s.year)-distance(b.period,s.year));

  if(!ev.length){
    box.innerHTML='<p class="map-foot">No hay procesos semilla en esta ventana temporal.</p>';
    return;
  }

  ev.forEach(e=>{
    const article=document.createElement('article');
    article.className='event-card';
    article.innerHTML=`
      <span class="event-date">${esc(e.period.display||`${formatYear(e.period.start)}–${formatYear(e.period.end)}`)}</span>
      <strong>${esc(e.title)}</strong>
      <p>${esc(e.summary)}</p>
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
    return;
  }

  const subject=subj(o.subjectRef);
  const pl=place(o.placeRef);

  $('#detailCategory').textContent=TYPE_LABELS[subject.type]||subject.type;
  $('#detailTitle').textContent=subject.name;
  $('#detailSubtitle').textContent=subject.summary;

  $('#subjectDetail').innerHTML=`
    <span class="provisional-badge">Dato provisional</span>
    <h3>${esc(subject.name)}</h3>
    <p>${esc(subject.summary)}</p>
    <div class="detail-meta">
      <div><b>Tipo</b><span>${esc(TYPE_LABELS[subject.type]||subject.type)}</span></div>
      <div><b>Nombres alternativos</b><span>${esc((subject.aliases||[]).join(', ')||'—')}</span></div>
    </div>
  `;

  $('#occurrenceDetail').innerHTML=`
    <span class="provisional-badge">Registro histórico no verificado</span>
    <h3>${esc(pl.name)}</h3>
    <p>${esc(o.summary)}</p>
    <div class="detail-meta">
      <div><b>Intervalo</b><span>${esc(o.period.display||`${formatYear(o.period.start)}–${formatYear(o.period.end)}`)}</span></div>
      <div><b>Precisión</b><span>${esc(o.period.precision)}</span></div>
      <div><b>Qué documenta</b><span>${esc(OCC_LABELS[o.occurrenceType]||o.occurrenceType)}</span></div>
      <div><b>Evidencia</b><span>${esc(EVIDENCE_LABELS[o.evidenceType]||o.evidenceType)}</span></div>
      <div><b>Certeza</b><span>${esc(o.certainty)}</span></div>
      <div><b>Fuentes</b><span>${o.sourceRefs?.length?`${o.sourceRefs.length} vinculadas`:'Pendientes de G2'}</span></div>
    </div>
  `;

  const relatedContexts=(o.contextRefs||[]).map(contextById).filter(Boolean);
  const relatedDevelopments=(o.developmentRefs||[]).map(developmentById).filter(Boolean);

  const contextSection=$('#historicalContextSection');
  const developmentSection=$('#developmentContextSection');

  if(relatedContexts.length){
    contextSection.classList.remove('hidden');
    $('#historicalContextDetail').innerHTML=relatedContexts.map(c=>`
      <div class="detail-meta"><div><b>${esc(c.name)}</b><span>${esc(c.summary)}</span></div></div>
    `).join('');
  }else{
    contextSection.classList.add('hidden');
    $('#historicalContextDetail').innerHTML='';
  }

  if(relatedDevelopments.length){
    developmentSection.classList.remove('hidden');
    $('#developmentContextDetail').innerHTML=relatedDevelopments.map(d=>`
      <div class="detail-meta"><div><b>${esc(d.name)}</b><span>${esc(d.summary)}</span></div></div>
    `).join('');
  }else{
    developmentSection.classList.add('hidden');
    $('#developmentContextDetail').innerHTML='';
  }

  $('#subjectHistoryBtn').disabled=true;
  $('#subjectHistoryBtn').title='Se activará cuando un elemento tenga varias ocurrencias históricas verificadas.';
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

function syncLegend(){
  $$('#categoryLegend [data-category]').forEach(button=>{
    button.classList.toggle('active',button.dataset.category===s.category);
  });
}

function resetFilters(){
  s.search='';
  s.subjectType='all';
  s.evidence='all';
  s.occurrenceType='all';
  s.category='all';

  $('#searchInput').value='';
  $('#subjectTypeFilter').value='all';
  $('#evidenceFilter').value='all';
  $('#occurrenceTypeFilter').value='all';
  syncLegend();
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

  $('#clearSearchBtn').addEventListener('click',()=>{
    s.search='';
    $('#searchInput').value='';
    render();
  });

  $('#searchInput').addEventListener('input',e=>{
    s.search=e.target.value;
    render();
  });

  $('#subjectTypeFilter').addEventListener('change',e=>{s.subjectType=e.target.value;render()});
  $('#evidenceFilter').addEventListener('change',e=>{s.evidence=e.target.value;render()});
  $('#occurrenceTypeFilter').addEventListener('change',e=>{s.occurrenceType=e.target.value;render()});
  $('#labelMode').addEventListener('change',e=>{s.labelMode=e.target.value;renderMarkers(occVisible())});
  $('#seedToggle').addEventListener('change',e=>{s.showSeed=e.target.checked;render()});
  $('#eventWindowSelect').addEventListener('change',e=>{s.eventWindow=Number(e.target.value)||100;renderMetrics(occVisible());renderEvents()});

  $('#resetFiltersBtn').addEventListener('click',resetFilters);
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

  $('#jumpMapBtn').addEventListener('click',()=>$('#mapSection').scrollIntoView({behavior:'smooth',block:'start'}));

  $$('#categoryLegend [data-category]').forEach(button=>{
    button.addEventListener('click',()=>{
      s.category=button.dataset.category;
      syncLegend();
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
