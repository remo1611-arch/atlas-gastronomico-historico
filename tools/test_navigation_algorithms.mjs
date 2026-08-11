import fs from 'node:fs';
import assert from 'node:assert/strict';
import {toOrdinal,fromOrdinal} from '../js/core.js';

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

const names=['parseExperienceRoute','temporalSnapCandidate','temporalStepTarget'];
const source=names.map(extractFunction).join('\n');
const make=new Function('toOrdinal','fromOrdinal',`${source}; return {${names.join(',')}};`);
const api=make(toOrdinal,fromOrdinal);

assert.deepEqual(api.parseExperienceRoute('#historias'),{view:'histories'});
assert.deepEqual(api.parseExperienceRoute('#historia/story_wine/3'),{view:'histories',storyId:'story_wine',scene:2});
assert.deepEqual(api.parseExperienceRoute('#atlas/evidencia/occ_wine_areni_4000_bce'),{view:'explore',kind:'occurrence',ref:'occ_wine_areni_4000_bce'});
assert.deepEqual(api.parseExperienceRoute('#atlas/hito/development/pasteurization_wine_1863_1865'),{view:'explore',kind:'development',ref:'pasteurization_wine_1863_1865'});
assert.deepEqual(api.parseExperienceRoute('#atlas/fecha/-6000'),{view:'explore',year:-6000});

const ranged={key:'occurrence:r',kind:'occurrence',period:{start:100,end:200},item:{id:'r'}};
let snap=api.temporalSnapCandidate(ranged,150);
assert.equal(snap.snapYear,150);
assert.equal(snap.contains,true);
snap=api.temporalSnapCandidate(ranged,250);
assert.equal(snap.snapYear,200);
assert.equal(snap.contains,false);

const items=[
  {key:'occurrence:a',period:{start:100,end:100},item:{id:'a'}},
  {key:'occurrence:b',period:{start:100,end:120},item:{id:'b'}},
  {key:'development:c',period:{start:200,end:200},item:{id:'c'}},
];
assert.equal(api.temporalStepTarget(items,1,110,'occurrence:a').key,'occurrence:b');
assert.equal(api.temporalStepTarget(items,1,110,'occurrence:b').key,'development:c');
assert.equal(api.temporalStepTarget(items,-1,110,'occurrence:b').key,'occurrence:a');
assert.equal(api.temporalStepTarget(items,-1,110,'occurrence:a'),null);

console.log('NAVIGATION ALGORITHMS: PASS · 12 assertions');
