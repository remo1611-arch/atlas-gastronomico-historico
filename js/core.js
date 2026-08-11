export function toOrdinal(year){
 const y=Math.round(Number(year));
 if(!Number.isFinite(y)||y===0) throw new RangeError('Año histórico no válido');
 return y>0?y-1:y;
}
export function fromOrdinal(o){
 const n=Math.round(Number(o));
 if(!Number.isFinite(n)) throw new RangeError('Ordinal no válido');
 return n>=0?n+1:n;
}
export function formatYear(y){return y<0?`${Math.abs(y)} a. C.`:`${y} d. C.`}
export function active(period,year){const y=toOrdinal(year);return toOrdinal(period.start)<=y&&toOrdinal(period.end)>=y}
export function distance(period,year){
 const y=toOrdinal(year),s=toOrdinal(period.start),e=toOrdinal(period.end);
 if(y<s)return s-y;if(y>e)return y-e;return 0;
}
export function fromParts(magnitude,era,minYear,maxYear){
 let n=Math.round(Math.abs(Number(magnitude)));
 if(!Number.isFinite(n)||n<1)n=1;
 let y=era==='BCE'?-n:n;
 if(y<minYear)y=minYear;if(y>maxYear)y=maxYear;
 return y===0?(era==='BCE'?-1:1):y;
}
export function parts(year){return {magnitude:Math.abs(year),era:year<0?'BCE':'CE'}}
export function project(lon,lat,w=1000,h=500){return[(Number(lon)+180)/360*w,(90-Number(lat))/180*h]}
