import { describe, expect, it, vi } from 'vitest';
import { drawPresentationFrame } from './presentationFrame';
import type { FanViewMatch } from '../../fanview-spa/src/adapters/contracts';
const match: FanViewMatch = {
  home: {name:'Falcons',score:14,color:'#001020'}, away:{name:'Canaries',score:12,color:'#001030'},
  setNumber:5,totalSets:5,setTarget:15,homeSetsWon:2,awaySetsWon:2,isLive:true,isComplete:false,updatedAt:'',
  completedSets:[{setNumber:1,homeScore:25,awayScore:20},{setNumber:2,homeScore:20,awayScore:25},{setNumber:3,homeScore:26,awayScore:24},{setNumber:4,homeScore:22,awayScore:25}],
};
function render(layout:'full-score'|'score-bar'|'minimal', width=390,height=844) {
  const writes:Array<{text:string,color:string,x:number,y:number,maxWidth?:number}>=[];
  const values:Record<string,unknown>={fillStyle:'',measureText:(text:string)=>({width:text.length*5})};
  values.fillText=(text:string,x:number,y:number,maxWidth?:number)=>writes.push({text,color:String(values.fillStyle),x,y,maxWidth});
  const context=new Proxy(values,{get:(obj,key)=>obj[String(key)] ?? vi.fn(),set:(obj,key,value)=>{obj[String(key)]=value;return true;}});
  const canvas={width,height,getContext:()=>context} as unknown as HTMLCanvasElement;
  const source={readyState:2,videoWidth:1280,videoHeight:720} as HTMLVideoElement;
  drawPresentationFrame(canvas,source,undefined,match,3,layout,'bottom-center','standard');
  return writes;
}
describe('actual canvas scoreboard information parity',()=>{
  it.each(['full-score','score-bar'] as const)('%s retains totals, every completed set, and the correct winner',layout=>{
    const writes=render(layout); const text=writes.map(x=>x.text);
    expect(text).toContain('SETS 2–2');
    expect(text).toEqual(expect.arrayContaining(['S1 25 W–20','S2 20–25 W','S3 26 W–24','S4 22–25 W']));
    expect(text.some(x=>x.includes('…')&&x.startsWith('S'))).toBe(false);
    for(const write of writes.filter(x=>/^S[1-4] /.test(x.text))){ expect(write.x).toBeGreaterThan(0);expect(write.x).toBeLessThan(390);expect(write.y).toBeGreaterThan(0);expect(write.y).toBeLessThan(844);expect(write.maxWidth).toBeGreaterThan(0); }
  });
  it('keeps minimal current-set scores readable for dark team colors without adding history',()=>{
    const writes=render('minimal'); expect(writes.find(x=>x.text==='14')?.color).toBe('#FFFFFF');expect(writes.find(x=>x.text==='12')?.color).toBe('#FFFFFF');
    expect(writes.map(x=>x.text)).toContain('SET 5');expect(writes.some(x=>x.text.startsWith('S1 '))).toBe(false);
  });
  it('retains all five completed sets at full time',()=>{
    match.isComplete=true; match.completedSets!.push({setNumber:5,homeScore:15,awayScore:12});
    try { for(const layout of ['score-bar','full-score'] as const) expect(render(layout,844,390).map(x=>x.text)).toContain('S5 15 W–12'); }
    finally { match.completedSets!.pop();match.isComplete=false; }
  });
});
