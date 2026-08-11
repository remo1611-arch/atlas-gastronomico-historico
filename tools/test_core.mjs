import assert from 'node:assert/strict';
import {toOrdinal,fromOrdinal,formatYear,active,distance,fromParts,parts} from '../js/core.js';
let n=0;const eq=(a,b)=>{assert.equal(a,b);n++};
eq(toOrdinal(-1),-1);eq(toOrdinal(1),0);eq(fromOrdinal(-1),-1);eq(fromOrdinal(0),1);
eq(formatYear(-44),'44 a. C.');eq(formatYear(1500),'1500 d. C.');
eq(active({start:-10,end:10},1),true);eq(distance({start:-10,end:-1},1),1);
eq(fromParts(500,'BCE',-12000,2026),-500);eq(fromParts(500,'CE',-12000,2026),500);
assert.deepEqual(parts(-500),{magnitude:500,era:'BCE'});n++;
console.log(`CORE: PASS · ${n} aserciones`);
