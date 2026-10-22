import { useEffect, useRef, useState, type ReactNode } from "react";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import "./viewer-account.css";
import cvMark from "./assets/approved-cv-mark.svg";
import googleMark from "./assets/google-sign-in-mark.png";
import appleMark from "./assets/apple-sign-in-logo-white.png";
import { onViewerAuthenticationRequired } from "./viewerFetch";

export function verifiedViewer(user: User | null): boolean {
  return !!user && user.is_anonymous !== true && !!user.email_confirmed_at;
}

/** Never forward arbitrary return URLs or callback credentials. */
export function viewerReturnPath(path: string): string | null {
  return /^\/(?:v|fanview-next\/v)\/[A-Za-z0-9_-]{1,200}\/?$/.test(path) ? path : null;
}

export function ViewerAccountGate({ client, children }: { client: SupabaseClient; children: ReactNode }) {
  const [status, setStatus] = useState<"loading" | "guest" | "ready" | "error" | "expired">("loading");
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const returnPath = viewerReturnPath(window.location.pathname);
  const generation = useRef(0);
  async function refresh(background = false) {
    const request = ++generation.current;
    if (!background) setStatus("loading");
    const update = (next: typeof status) => { if (request === generation.current) setStatus(next); };
    try {
      const { data, error } = await client.auth.getSession();
      if (error) throw error;
      if (!data.session || data.session.user.is_anonymous) { update("guest"); return; }
      const result = await client.auth.getUser();
      if (result.error) {
        if (result.error.status === 401 || result.error.status === 403) { update("expired"); return; }
        throw result.error;
      }
      update(verifiedViewer(result.data.user) ? "ready" : "guest");
    } catch { update("error"); }
  }
  async function signInAgain() {
    ++generation.current;
    setBusy(true);
    try {
      // Supabase removes this browser's auth session only. Match/local app data is untouched.
      const { error } = await client.auth.signOut({ scope: "local" });
      if (error) throw error;
      setMode("signin"); setStatus("guest"); setMessage("Sign in again to return to this match.");
    } catch { setMessage("We couldn’t reset this sign-in session. Check your connection and try again."); }
    finally { setBusy(false); }
  }
  useEffect(() => {
    let alive = true;
    void refresh();
    const stopAuthRequired = onViewerAuthenticationRequired(() => {
      ++generation.current;
      setStatus("expired");
    });
    const { data } = client.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        ++generation.current; setStatus("guest"); setMode("signin"); return;
      }
      // Refresh identity without unmounting a playing match for normal token renewal.
      queueMicrotask(() => { if (alive) void refresh(event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION"); });
    });
    return () => { alive = false; ++generation.current; stopAuthRequired(); data.subscription.unsubscribe(); };
  }, [client]);
  const displayParams = new URLSearchParams();
  for (const key of ['scoreboard','scoreboardSize','display','scoreSize','scoreboardLayout','scoreLayout','layout','scoreboardPosition','position','scoreboardAutomatic','automatic']) {
    const value = new URLSearchParams(window.location.search).get(key);
    if (value && /^[a-z0-9_-]{1,30}$/i.test(value)) displayParams.set(key, value);
  }
  const redirectTo = returnPath ? `${window.location.origin}${returnPath}${displayParams.size ? '?' + displayParams : ''}` : null;
  async function oauth(provider: "google" | "apple") {
    if (!redirectTo || busy) return;
    setBusy(true); setMessage("");
    try {
      const { error } = await client.auth.signInWithOAuth({ provider, options: { redirectTo } });
      if (error) throw error;
    } catch { setMessage("We couldn’t open sign-in. Try again or use email."); }
    finally { setBusy(false); }
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (busy || !redirectTo) return;
    setBusy(true); setMessage("");
    try {
      if (mode === "signup") {
        try { sessionStorage.setItem('courtsideview_viewer_return', returnPath!); } catch {}
        const { error } = await client.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: redirectTo } });
        if (error) throw error;
        setPassword("");
        setMessage("Check your email to confirm your account. Then return to this match and sign in. Your match link stays here.");
        setMode("signin");
        await refresh();
      } else {
        const { data, error } = await client.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        setPassword("");
        if (!verifiedViewer(data.user)) setMessage("Confirm your email before watching. Open the confirmation email, then sign in again.");
        await refresh();
      }
    } catch { setMessage(mode === "signin" ? "We couldn’t sign you in. Check your email and password, confirm your email, or try again." : "We couldn’t create your account. Try again, or sign in if you already have an account."); }
    finally { setBusy(false); }
  }
  if (status === "ready") return <>{children}</>;
  return <main className="viewer-account"><section className="viewer-account__card" aria-labelledby="account-title">
    <div className="viewer-account__brand"><img src={cvMark} alt="CourtsideView" width="64" height="47"/><span>FanView</span></div>
    <h1 id="account-title">{status === "loading" ? "Getting your match ready" : "Watch every point with FanView"}</h1>
    {status === "loading" ? <p role="status">Checking your account…</p> : status === "error" || status === "expired" ? <><p role="alert">{status === "expired" ? "Your sign-in has expired. Sign in again to return to this match." : "We couldn’t check your account. Check your connection and try again."}</p><button disabled={busy} onClick={() => void refresh()}>Try again</button><button disabled={busy} onClick={() => void signInAgain()}>Sign in again</button></> : !redirectTo ? <p role="alert">This match link is incomplete. Open the original FanView link to continue.</p> : <>
      <p>Create your account to watch this match and stay connected to every point. You can also broadcast your games with FanView in the CourtsideView app. We’ll keep this match ready for you.</p>
      <div className="viewer-account__providers"><button className="viewer-account__google" disabled={busy} onClick={() => void oauth("google")}><img src={googleMark} alt="" width="20" height="20"/>Continue with Google</button><button className="viewer-account__apple" disabled={busy} onClick={() => void oauth("apple")}><img src={appleMark} alt="" width="20" height="24"/>Continue with Apple</button></div>
      <div className="viewer-account__modes"><button disabled={busy} aria-pressed={mode === "signin"} onClick={() => { setMode("signin"); setMessage(""); }}>Sign in</button><button disabled={busy} aria-pressed={mode === "signup"} onClick={() => { setMode("signup"); setMessage(""); }}>Create account</button></div>
      <form onSubmit={submit}><label>Email<input required type="email" autoComplete="email" value={email} disabled={busy} onChange={e => setEmail(e.target.value)} /></label><label>Password<input required type="password" minLength={mode === "signup" ? 8 : undefined} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} disabled={busy} onChange={e => setPassword(e.target.value)} /></label><button className="viewer-account__primary" disabled={busy} type="submit">{busy ? "Please wait…" : mode === "signup" ? "Create account to watch" : "Sign in to watch"}</button></form>
      <p className="viewer-account__legal">By continuing, you agree to our <a href="/terms.html">Terms</a> and <a href="/privacy.html">Privacy Policy</a>.</p>
    </>}
    {message && <p role="status">{message}</p>}
    <a className="viewer-account__home" href="/">Back to CourtsideView</a>
  </section></main>;
}
