import fs from 'node:fs';
import assert from 'node:assert/strict';
import {toOrdinal,fromOrdinal,formatYear} from '../js/core.js';

const app=fs.readFileSync(new URL('../js/app.js',import.meta.url),'utf8');

function extractFunction(name){
  const token=`function ${name}(`;
  const start=app.indexOf(token);
  assert.notEqual(start,-1,`No se encontró ${name}`);
  const brace=app.indexOf('{',start);
  let depth=0;
  for(let i=brace;i<app.length;i++){
    if(app[i]==='{') depth++;
    else if(app[i]==='}'){
      depth--;
      if(depth===0) return app.slice(start,i+1);
    }
  }
  throw new Error(`Función sin cierre: ${name}`);
}

const names=[
  'precisionLabel',
  'periodSpanYears',
  'formatTemporalSpan',
  'periodSemantics',
  'historyGapLabel'
];

const source=names.map(extractFunction).join('\n');
const PRECISION_LABELS={
  exact:'Exacta',year:'Año',decade:'Década',century:'Siglo',
  millennium:'Milenio',range:'Intervalo',phase:'Fase',
  before:'Anterior a',after:'Posterior a',circa:'Aproximada',unknown:'Desconocida'
};
const make=new Function(
  'toOrdinal','fromOrdinal','formatYear','PRECISION_LABELS',
  `${source}; return {${names.join(',')}};`
);
const api=make(toOrdinal,fromOrdinal,formatYear,PRECISION_LABELS);

const item=(start,end,precision)=>({period:{start,end,precision,display:'x'}});

// No-year-zero duration.
assert.equal(api.periodSpanYears({start:-1,end:1}),1);

// Point vs ranges.
assert.equal(api.periodSemantics(item(1492,1492,'year')).mode,'point');
assert.equal(api.periodSemantics(item(1492,1700,'range')).mode,'range');
assert.equal(api.periodSemantics(item(-4650,-4450,'circa')).mode,'circa');
assert.equal(api.periodSemantics(item(-6000,-5000,'millennium')).mode,'broad');

// Gaps use previous end, not previous start.
assert.equal(
  api.historyGapLabel(
    {period:{start:100,end:200}},
    {period:{start:250,end:300}}
  ),
  '≈ 50 años desde el final del hito anterior'
);

// Overlap is not turned into a negative gap.
assert.equal(
  api.historyGapLabel(
    {period:{start:100,end:300}},
    {period:{start:250,end:400}}
  ),
  'Se solapa temporalmente con el hito anterior'
);

console.log('G3 CHRONOLOGY ALGORITHM: PASS · 6 assertions');
