import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import type { SupabaseClient, User } from '@supabase/supabase-js';
import { configureViewerRequests, viewerFetch } from './viewerFetch';
import { ViewerAccountGate, verifiedViewer, viewerReturnPath } from './ViewerAccountGate';
afterEach(()=>{cleanup();vi.unstubAllGlobals();});
const verified={id:'viewer',email_confirmed_at:'2026-10-21',is_anonymous:false} as User;
function client(user: User|null, failed=false){return {auth:{getSession:vi.fn().mockResolvedValue({data:{session:user?{user}:null},error:failed?new Error('offline'):null}),getUser:vi.fn().mockResolvedValue({data:{user},error:null}),onAuthStateChange:vi.fn(()=>({data:{subscription:{unsubscribe:vi.fn()}}})),signOut:vi.fn().mockResolvedValue({error:null}),signInWithOAuth:vi.fn().mockResolvedValue({error:null}),signInWithPassword:vi.fn().mockResolvedValue({data:{user:verified},error:null}),signUp:vi.fn().mockResolvedValue({data:{user:null},error:null})}};}
describe('viewer account boundary',()=>{
 it('accepts only verified non-anonymous identities',()=>{expect(verifiedViewer(verified)).toBe(true);expect(verifiedViewer({...verified,is_anonymous:true})).toBe(false);expect(verifiedViewer({...verified,email_confirmed_at:undefined})).toBe(false);expect(verifiedViewer(null)).toBe(false);});
 it('rejects external, nested and credential-bearing return targets',()=>{expect(viewerReturnPath('/v/match-123')).toBe('/v/match-123');expect(viewerReturnPath('/fanview-next/v/abc')).toBe('/fanview-next/v/abc');for(const path of ['https://evil.com','//evil.com','/v/../admin','/v/a?next=https://evil.com','/v/a#access_token=x','/admin'])expect(viewerReturnPath(path)).toBeNull();});
 it('does not mount viewer while loading or anonymous',async()=>{window.history.replaceState({},'', '/v/match-123');render(<ViewerAccountGate client={client({...verified,is_anonymous:true}) as unknown as SupabaseClient}><div>Private match</div></ViewerAccountGate>);expect(screen.queryByText('Private match')).not.toBeInTheDocument();await screen.findByText('Create account to watch');expect(screen.queryByText('Private match')).not.toBeInTheDocument();});
 it('mounts viewer after server identity validation',async()=>{const c=client(verified);render(<ViewerAccountGate client={c as unknown as SupabaseClient}><div>Private match</div></ViewerAccountGate>);await screen.findByText('Private match');expect(c.auth.getUser).toHaveBeenCalled();});
 it('provides retry after account check fails',async()=>{const c=client(null,true);render(<ViewerAccountGate client={c as unknown as SupabaseClient}>Private match</ViewerAccountGate>);await screen.findByRole('alert');c.auth.getSession.mockResolvedValue({data:{session:null},error:null});fireEvent.click(screen.getByText('Try again'));await screen.findByText('Create account to watch');});
 it('retains match path for provider sign-in',async()=>{window.history.replaceState({},'', '/v/match-123');const c=client(null);render(<ViewerAccountGate client={c as unknown as SupabaseClient}>Private match</ViewerAccountGate>);fireEvent.click(await screen.findByText('Continue with Google'));await waitFor(()=>expect(c.auth.signInWithOAuth).toHaveBeenCalledWith({provider:'google',options:{redirectTo:window.location.origin+'/v/match-123'}}));});
});

it('recovers a rejected session by clearing only local auth',async()=>{
 const c=client(verified);c.auth.getUser.mockResolvedValue({data:{user:null},error:{status:401}});
 render(<ViewerAccountGate client={c as unknown as SupabaseClient}>Private match</ViewerAccountGate>);
 fireEvent.click(await screen.findByText('Sign in again'));
 await screen.findByText('Sign in to watch');
 expect(c.auth.signOut).toHaveBeenCalledWith({scope:'local'});
 expect(screen.queryByText('Private match')).not.toBeInTheDocument();
});
it('keeps the viewer mounted while a normal token refresh validates',async()=>{
 const c=client(verified);let authEvent: (event:string)=>void=()=>{};
 c.auth.onAuthStateChange=vi.fn((callback:any)=>{authEvent=callback;return {data:{subscription:{unsubscribe:vi.fn()}}};}) as any;
 render(<ViewerAccountGate client={c as unknown as SupabaseClient}><div>Private match</div></ViewerAccountGate>);
 await screen.findByText('Private match');
 c.auth.getUser.mockImplementation(()=>new Promise(()=>{}));
 await act(async()=>authEvent('TOKEN_REFRESHED'));
 expect(screen.getByText('Private match')).toBeInTheDocument();
});
it('worker 401 removes the viewer and offers sign-in recovery',async()=>{
 const c=client(verified);render(<ViewerAccountGate client={c as unknown as SupabaseClient}>Private match</ViewerAccountGate>);
 await screen.findByText('Private match');configureViewerRequests(async()=>'expired','https://worker.example');
 vi.stubGlobal('fetch',vi.fn().mockResolvedValue(new Response('',{status:401})));
 await act(async()=>{await viewerFetch('https://worker.example/play/match').catch(()=>{});});
 expect(screen.queryByText('Private match')).not.toBeInTheDocument();
 expect(screen.getByText('Sign in again')).toBeInTheDocument();
});
