import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const source=readFileSync(new URL('../../auth-confirm.js',import.meta.url),'utf8');
function fixture(returnUrl){
 const elements=Object.fromEntries(['title','message','guidance','confirm','open-app'].map(id=>[id,{hidden:false,href:id==='open-app'?'courtsideview://':undefined,setAttribute(name,value){this[name]=value;},addEventListener(name,fn){this[name]=fn;}}]));
 let requests=0;const history=[];
 runInNewContext(source,{URLSearchParams,AbortController,setTimeout,clearTimeout,window:{location:{hash:'#token_hash=synthetic_test_credential_12345',pathname:'/auth/confirm'},history:{replaceState(...args){history.push(args);}}},document:{getElementById:id=>elements[id]},sessionStorage:{getItem:()=>returnUrl},fetch:async()=>{requests++;return {ok:true,json:async()=>({user:{email_confirmed_at:'2026-11-11',is_anonymous:false}})};}});
 return {elements,history,requests:()=>requests};
}
test('verified guest match return keeps the guarded URL and does not demand another login',async()=>{
 const f=fixture('/v/synthetic-game');assert.equal(f.requests(),0);
 assert.equal(f.history[0][2],'/auth/confirm');
 await f.elements.confirm.click();
 assert.equal(f.elements['open-app'].href,'/v/synthetic-game');
 assert.equal(f.elements.guidance.textContent,'Your email is confirmed. Return to your match.');
 assert.equal(f.elements['open-app'].hidden,false);
 await f.elements.confirm.click();assert.equal(f.requests(),1);
});
for(const url of ['https://example.com/','//example.com/v/game','/v/game?token=private','/live/game#private'])test(`rejects non-allowlisted continuation ${url}`,async()=>{
 const f=fixture(url);await f.elements.confirm.click();assert.equal(f.elements['open-app'].href,'courtsideview://');assert.equal(f.requests(),1);
});
