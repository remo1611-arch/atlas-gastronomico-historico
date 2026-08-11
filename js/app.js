import {toOrdinal,fromOrdinal,formatYear,shiftYear,active,distance,fromParts,parts,project} from './core.js';

const P={
 config:'./data/config.json',taxonomy:'./data/taxonomy.json',subjects:'./data/subjects.json',
 places:'./data/places.json',occurrences:'./data/occurrences.json',events:'./data/events.json',
 relationships:'./data/relationships.json',sources:'./data/sources.json',
 basemap:'./data/basemap/world_110m.geojson'
};
const s={config:null,taxonomy:null,subjects:[],places:[],occurrences:[],events:[],relationships:[],sources:[],basemap:null,
 year:1500,search:'',subjectType:'all',evidence:'all',occurrenceType:'all',showSeed:true,labelMode:'auto',
 selectedOccurrence:null,eventWindow:100,playStep:50,playing:false,timer:null};
const $=q=>document.querySelector(q), $$=q=>[...document.querySelectorAll(q)];
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=v=>String(v??'').normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();

async function j(url){const r=await fetch(url);if(!r.ok)throw new Error(`${url}: ${r.status}`);return r.json()}
async function load(){
 try{
  const [config,taxonomy,subjects,places,occurrences,events,relationships,sources,basemap]=await Promise.all(Object.values(P).map(j));
  Object.assign(s,{config,taxonomy,subjects,places,occurrences,events,relationships,sources,basemap});
  s.year=config.timeline.initialYear;s.playStep=config.timeline.playStep;s.eventWindow=config.timeline.eventWindowYears;
  fill();basemapRender();bind();setYear(s.year);$('#dataStatus').textContent=`${subjects.length} subjects · ${occurrences.length} ocurrencias seed`;
 }catch(e){
  console.error(e);$('#dataStatus').textContent='Error de carga';$('#mapMessage').classList.remove('hidden');
  $('#mapMessage').innerHTML='Abre la URL publicada en GitHub Pages o usa el servidor local de desarrollo.';
 }
}
function fill(){
 const sf=$('#subjectTypeFilter');s.taxonomy.subjectTypes.forEach(x=>sf.add(new Option(labelType(x),x)));
 const ef=$('#evidenceFilter');s.taxonomy.evidenceTypes.forEach(x=>ef.add(new Option(labelEvidence(x),x)));
 const of=$('#occurrenceTypeFilter');s.taxonomy.occurrenceTypes.forEach(x=>of.add(new Option(labelOcc(x),x)));
 const ps=$('#playStepSelect');s.config.timeline.playStepOptions.forEach(x=>ps.add(new Option(`${x} ${x===1?'año':'años'}/paso`,x)));ps.value=s.playStep;
 const ew=$('#eventWindowSelect');[25,50,100,250,500].forEach(x=>ew.add(new Option(`±${x} años`,x)));ew.value=s.eventWindow;
 $('#yearRange').min=toOrdinal(s.config.timeline.minYear);$('#yearRange').max=toOrdinal(s.config.timeline.maxYear);
 const th=getStore('agh_theme');applyTheme(th==='light'?'light':'dark');
}
function labelType(x){return({ingredient:'ingrediente',food_species:'especie alimentaria',dish:'plato',preparation:'preparación',beverage:'bebida',processed_product:'producto elaborado',culinary_technique:'técnica culinaria',preservation_method:'conservación',food_tool:'utensilio',foodway:'cultura/práctica alimentaria',meal_practice:'práctica de comida',culinary_institution:'institución gastronómica',historical_text:'texto histórico',recipe:'receta',trade_good:'mercancía alimentaria',other:'otro'})[x]||x}
function labelEvidence(x){return({archaeological:'arqueológica',archaeobotanical:'arqueobotánica',archaeozoological:'arqueozoológica',biomolecular:'biomolecular',genetic:'genética',textual:'textual',iconographic:'iconográfica',material_culture:'cultura material',legal:'legal',economic_record:'registro económico',ethnographic:'etnográfica',traditional:'tradicional',unknown:'sin validar'})[x]||x}
function labelOcc(x){return({archaeological_presence:'presencia arqueológica',cultivation:'cultivo',domestication_evidence:'evidencia de domesticación',production:'producción',consumption:'consumo',textual_attestation:'atestiguación textual',recipe_attestation:'receta documentada',trade:'comercio',introduction:'introducción',adoption:'adopción',regulation:'regulación',industrial_production:'producción industrial',traditional_attribution:'atribución tradicional',other:'otro'})[x]||x}
function subj(id){return s.subjects.find(x=>x.id===id)}function place(id){return s.places.find(x=>x.id===id)}
function occVisible(){
 const q=norm(s.search.trim());
 return s.occurrences.filter(o=>{
  if(!active(o.period,s.year))return false;if(!s.showSeed&&o.status==='seed')return false;
  if(s.evidence!=='all'&&o.evidenceType!==s.evidence)return false;if(s.occurrenceType!=='all'&&o.occurrenceType!==s.occurrenceType)return false;
  const subject=subj(o.subjectRef),pl=place(o.placeRef);if(!subject||!pl)return false;
  if(s.subjectType!=='all'&&subject.type!==s.subjectType)return false;
  if(q&&!norm([subject.name,subject.summary,subject.aliases?.join(' '),pl.name,o.summary,labelType(subject.type),labelEvidence(o.evidenceType),labelOcc(o.occurrenceType)].join(' ')).includes(q))return false;
  return true;
 });
}
function setYear(y){s.year=Math.max(s.config.timeline.minYear,Math.min(s.config.timeline.maxYear,y===0?1:y));$('#yearRange').value=toOrdinal(s.year);$('#yearDisplay').textContent=formatYear(s.year);const p=parts(s.year);$('#yearMagnitude').value=p.magnitude;$('#yearEra').value=p.era;render()}
function render(){const list=occVisible();renderMetrics(list);renderList(list);renderMarkers(list);renderEvents();if(s.selectedOccurrence&&!list.some(x=>x.id===s.selectedOccurrence)){s.selectedOccurrence=null;renderDetails(null)}}
function renderMetrics(list){$('#occurrenceCount').textContent=list.length;$('#subjectCount').textContent=new Set(list.map(x=>x.subjectRef)).size;$('#placeCount').textContent=new Set(list.map(x=>x.placeRef)).size;$('#eventCount').textContent=s.events.filter(e=>(s.showSeed||e.status!=='seed')&&distance(e.period,s.year)<=s.eventWindow).length;$('#visibleBadge').textContent=list.length}
function renderList(list){const box=$('#occurrenceList');box.innerHTML='';if(!list.length){box.innerHTML='<p class="disclaimer">No hay evidencias visibles para esta fecha y filtros.</p>';return}
 list.sort((a,b)=>subj(a.subjectRef).name.localeCompare(subj(b.subjectRef).name,'es')).forEach(o=>{const su=subj(o.subjectRef),pl=place(o.placeRef);const b=document.createElement('button');b.className='occ-item'+(o.id===s.selectedOccurrence?' active':'');b.type='button';b.innerHTML=`<strong>${esc(su.name)}</strong><span>${esc(labelOcc(o.occurrenceType))} · ${esc(labelEvidence(o.evidenceType))}</span><small>${esc(pl.name)} · ${esc(o.period.display||`${formatYear(o.period.start)}–${formatYear(o.period.end)}`)}</small>`;b.addEventListener('click',()=>selectOcc(o.id));box.appendChild(b)})}
function basemapRender(){const layer=$('#basemapLayer');layer.innerHTML='';for(const f of s.basemap.features){const d=geom(f.geometry);if(!d)continue;const p=svg('path',{d,class:'country'});layer.appendChild(p)}}
function ring(c){let out='',prev=null;c.forEach((p,i)=>{const [x,y]=project(p[0],p[1]);const cross=prev!==null&&Math.abs(p[0]-prev)>180;out+=`${i===0||cross?' M':' L'}${x.toFixed(2)},${y.toFixed(2)}`;prev=p[0]});return out+' Z'}
function geom(g){if(!g)return'';if(g.type==='Polygon')return g.coordinates.map(ring).join(' ');if(g.type==='MultiPolygon')return g.coordinates.flatMap(p=>p.map(ring)).join(' ');return''}
function svg(n,a={}){const e=document.createElementNS('http://www.w3.org/2000/svg',n);Object.entries(a).forEach(([k,v])=>e.setAttribute(k,v));return e}
function renderMarkers(list){const l=$('#occurrenceLayer');l.innerHTML='';const map=$('#worldMap');map.classList.toggle('compact-labels',s.labelMode==='auto'&&(innerWidth<700||list.length>8));map.classList.toggle('selected-labels',s.labelMode==='selected');
 list.forEach(o=>{const su=subj(o.subjectRef),pl=place(o.placeRef);if(!pl?.point)return;const [x,y]=project(pl.point.lon,pl.point.lat);const g=svg('g',{class:'occ-marker'+(o.id===s.selectedOccurrence?' active':''),transform:`translate(${x} ${y})`,tabindex:'0',role:'button','aria-label':`${su.name}: ${pl.name}`});g.append(svg('circle',{r:'6'}));const t=svg('text',{x:'9',y:'-7'});t.textContent=su.name;g.append(t);g.addEventListener('click',()=>selectOcc(o.id));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectOcc(o.id)}});l.appendChild(g)})}
function selectOcc(id){s.selectedOccurrence=id;const o=s.occurrences.find(x=>x.id===id);render();renderDetails(o)}
function renderDetails(o){if(!o){$('#subjectDetail').innerHTML='<h2>Selecciona una evidencia</h2><p>Verás aquí el alimento, técnica, bebida, producto o práctica asociada.</p>';$('#occurrenceDetail').innerHTML='<h2>Sin selección</h2><p>El Atlas distinguirá lugar, intervalo, tipo de evidencia, certeza y fuentes.</p>';return}
 const su=subj(o.subjectRef),pl=place(o.placeRef);$('#subjectDetail').innerHTML=`<span class="seed">SEED</span><h2>${esc(su.name)}</h2><p>${esc(su.summary)}</p><div class="meta-grid"><div class="meta"><b>Tipo</b><span>${esc(labelType(su.type))}</span></div><div class="meta"><b>Aliases</b><span>${esc((su.aliases||[]).join(', ')||'—')}</span></div></div>`;
 $('#occurrenceDetail').innerHTML=`<span class="seed">SEED · no verificado</span><h2>${esc(pl.name)}</h2><p>${esc(o.summary)}</p><div class="meta-grid"><div class="meta"><b>Intervalo</b><span>${esc(o.period.display||`${formatYear(o.period.start)}–${formatYear(o.period.end)}`)}</span></div><div class="meta"><b>Precisión</b><span>${esc(o.period.precision)}</span></div><div class="meta"><b>Ocurrencia</b><span>${esc(labelOcc(o.occurrenceType))}</span></div><div class="meta"><b>Evidencia</b><span>${esc(labelEvidence(o.evidenceType))}</span></div><div class="meta"><b>Certeza</b><span>${esc(o.certainty)}</span></div><div class="meta"><b>Fuentes</b><span>${o.sourceRefs?.length?o.sourceRefs.length:'pendientes G2'}</span></div></div>`}
function renderEvents(){const box=$('#eventList');box.innerHTML='';const ev=s.events.filter(e=>(s.showSeed||e.status!=='seed')&&distance(e.period,s.year)<=s.eventWindow).sort((a,b)=>distance(a.period,s.year)-distance(b.period,s.year));if(!ev.length){box.innerHTML='<p class="disclaimer">No hay eventos semilla en esta ventana.</p>';return}ev.forEach(e=>{const d=document.createElement('article');d.className='event-item';d.innerHTML=`<span>${esc(e.period.display||`${formatYear(e.period.start)}–${formatYear(e.period.end)}`)}</span><strong>${esc(e.title)}</strong><p>${esc(e.summary)}</p>`;box.appendChild(d)})}
function bind(){const min=s.config.timeline.minYear,max=s.config.timeline.maxYear;$('#yearRange').addEventListener('input',e=>setYear(fromOrdinal(Number(e.target.value))));$$('[data-step]').forEach(b=>b.addEventListener('click',()=>setYear(shiftYear(s.year,Number(b.dataset.step),min,max))));
 $('#goYearBtn').addEventListener('click',()=>setYear(fromParts($('#yearMagnitude').value,$('#yearEra').value,min,max)));$('#yearMagnitude').addEventListener('keydown',e=>{if(e.key==='Enter')$('#goYearBtn').click()});
 $('#playStepSelect').addEventListener('change',e=>{s.playStep=Number(e.target.value)||50;if(s.playing)startTimer()});$('#playBtn').addEventListener('click',()=>{s.playing=!s.playing;$('#playBtn').textContent=s.playing?'❚❚':'▶';if(s.playing)startTimer();else stopTimer()});
 $('#searchInput').addEventListener('input',e=>{s.search=e.target.value;render()});$('#subjectTypeFilter').addEventListener('change',e=>{s.subjectType=e.target.value;render()});$('#evidenceFilter').addEventListener('change',e=>{s.evidence=e.target.value;render()});$('#occurrenceTypeFilter').addEventListener('change',e=>{s.occurrenceType=e.target.value;render()});$('#labelMode').addEventListener('change',e=>{s.labelMode=e.target.value;renderMarkers(occVisible())});$('#seedToggle').addEventListener('change',e=>{s.showSeed=e.target.checked;render()});$('#eventWindowSelect').addEventListener('change',e=>{s.eventWindow=Number(e.target.value)||100;renderMetrics(occVisible());renderEvents()});
 $('#resetFiltersBtn').addEventListener('click',()=>{s.search='';s.subjectType=s.evidence=s.occurrenceType='all';$('#searchInput').value='';$('#subjectTypeFilter').value=$('#evidenceFilter').value=$('#occurrenceTypeFilter').value='all';render()});
 $('#themeBtn').addEventListener('click',()=>applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));$('#fullscreenBtn').addEventListener('click',full);window.addEventListener('resize',()=>renderMarkers(occVisible()));document.addEventListener('visibilitychange',()=>{if(document.hidden&&s.playing){s.playing=false;stopTimer();$('#playBtn').textContent='▶'}})}
function startTimer(){stopTimer();s.timer=setInterval(()=>{if(s.year>=s.config.timeline.maxYear){s.playing=false;stopTimer();$('#playBtn').textContent='▶';return}setYear(shiftYear(s.year,s.playStep,s.config.timeline.minYear,s.config.timeline.maxYear))},650)}function stopTimer(){if(s.timer){clearInterval(s.timer);s.timer=null}}
function getStore(k){try{return localStorage.getItem(k)}catch{return null}}function setStore(k,v){try{localStorage.setItem(k,v)}catch{}}
function applyTheme(t){document.documentElement.dataset.theme=t;setStore('agh_theme',t);$('#themeBtn').textContent=t==='dark'?'☀':'☾'}
async function full(){try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();else await document.exitFullscreen()}catch{}}
load();
