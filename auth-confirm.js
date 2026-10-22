/* No analytics, persistent storage, external scripts, or credentials in logs. */
(() => {
  const params = new URLSearchParams(window.location.hash.slice(1));
  let token = params.get('token_hash');
  // Remove the email credential before the user follows any other link.
  window.history.replaceState(null, '', window.location.pathname);
  const title = document.getElementById('title');
  const message = document.getElementById('message');
  const guidance = document.getElementById('guidance');
  const confirm = document.getElementById('confirm');
  const openApp = document.getElementById('open-app');
  let pending = false;
  let completed = false;
  function unavailable(text) {
    token = null;
    title.textContent = 'Let’s get you a new link.';
    message.textContent = text;
    guidance.textContent = 'Return to “Check your inbox” in CourtsideView and resend the verification email. If you already confirmed your email, sign in with your email and password.';
    confirm.hidden = true;
    openApp.hidden = false;
  }
  if (!token || !/^[A-Za-z0-9_-]{20,512}$/.test(token)) {
    unavailable('This confirmation link is missing or incomplete. Open the button in your latest CourtsideView email.');
    return;
  }
  confirm.addEventListener('click', async () => {
    if (pending || completed || !token) return;
    pending = true;
    confirm.disabled = true;
    confirm.textContent = 'Confirming…';
    message.textContent = 'We’re securely confirming your email address.';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      // Explicit button press avoids email scanners consuming a one-time link.
      const response = await fetch('https://gnzhdhagvahylcjmyeeh.supabase.co/auth/v1/verify', {
        method: 'POST', signal: controller.signal, credentials: 'omit', cache: 'no-store', referrerPolicy: 'no-referrer',
        headers: { 'Content-Type': 'application/json', apikey: 'sb_publishable_91GTH_Tp2G0vGseUYUp9og_YtM-qlG0' },
        body: JSON.stringify({ token_hash: token, type: 'email' }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 429) throw new Error('rate-limit');
        if (response.status >= 500) throw new Error('unavailable');
        unavailable('This link has expired or has already been used.');
        return;
      }
      if (!data?.user?.email_confirmed_at || data.user.is_anonymous) throw new Error('unconfirmed');
      // Do not save the returned browser session or put tokens in the app URL.
      // The originating app establishes its own session with the user's credentials.
      completed = true;
      token = null;
      title.textContent = 'You’re in. Email confirmed.';
      message.textContent = 'Welcome to CourtsideView. Your email is verified and your account is ready for the next step.';
      guidance.textContent = 'Return to CourtsideView on your phone. If the “Check your inbox” screen is open, it will continue automatically. If you closed the app, sign in with the email and password you chose.';
      // Same-origin web signup can return to its original watch link after verification.
      let viewerReturn = null;
      try { viewerReturn = sessionStorage.getItem('courtsideview_viewer_return'); } catch {}
      if (viewerReturn && /^\/(?:v|fanview-next\/v)\/[A-Za-z0-9_-]{1,200}\/?$/.test(viewerReturn)) {
        guidance.textContent = 'Your email is confirmed. Return to your match and sign in to start watching.';
        openApp.href = viewerReturn;
        openApp.textContent = 'Return to my match';
        openApp.setAttribute('aria-label', 'Return to my FanView match');
      }
      confirm.hidden = true;
      openApp.hidden = false;
    } catch (error) {
      title.textContent = 'Let’s try that again.';
      message.textContent = error?.message === 'rate-limit'
        ? 'Please wait a minute before trying again.'
        : 'We couldn’t confirm your email yet. Check your connection and try again. If the link was already used, return to the app and sign in.';
      confirm.textContent = 'Try again';
      openApp.hidden = false;
    } finally {
      clearTimeout(timeout);
      pending = false;
      confirm.disabled = false;
    }
  });
})();
