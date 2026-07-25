const PROFILE_KEY = 'courtsideview.fanview.community.profile.v1';
const MAX_MESSAGE_LENGTH = 240;
const AVATAR_COLORS = ['#6D5CE7', '#0F8F76', '#D34C72', '#B25B19', '#2E6BC7', '#8647A8'];

const demoMessages = [
  {
    id: 'welcome',
    type: 'system',
    body: 'You’re cheering with the FanView community. Keep it positive and match-day friendly.',
  },
  {
    id: 'm1',
    name: 'Maya’s Mom',
    relationship: 'Family',
    body: 'Let’s go 14s Blue! Great energy to start this set 💗',
    time: '2:14',
    color: '#D34C72',
  },
  {
    id: 'm2',
    name: 'Coach T',
    relationship: 'Coach',
    body: 'Love the communication after that long rally. Keep talking!',
    time: '2:15',
    color: '#0F8F76',
    badge: 'Coach',
  },
  {
    id: 'm3',
    name: 'Uncle Jay',
    relationship: 'Family',
    body: 'Watching from Ohio — that block was huge! 🔥',
    time: '2:16',
    color: '#2E6BC7',
    reactions: [{ emoji: '🔥', count: 4 }, { emoji: '👏', count: 2 }],
  },
  {
    id: 'm4',
    name: 'Liv',
    relationship: 'Teammate',
    body: 'ACE!! 🏐',
    time: '2:17',
    color: '#6D5CE7',
    reactions: [{ emoji: '🙌', count: 6 }],
  },
];

function escapeHtml(value) {
  const node = document.createElement('div');
  node.textContent = String(value ?? '');
  return node.innerHTML;
}

function initials(value) {
  return String(value || 'Fan')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('') || 'FV';
}

function readStoredProfile() {
  try {
    const value = JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null');
    if (!value || typeof value !== 'object') return null;
    if (!String(value.name || '').trim()) return null;
    return {
      name: String(value.name).trim().slice(0, 32),
      relationship: String(value.relationship || 'Fan').slice(0, 16),
      color: String(value.color || AVATAR_COLORS[0]),
    };
  } catch {
    return null;
  }
}

function storeProfile(profile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // The profile is a convenience only. Chat can still work without storage.
  }
}

function nowLabel() {
  return new Intl.DateTimeFormat([], { hour: 'numeric', minute: '2-digit' }).format(new Date());
}

class FanViewCommunity extends HTMLElement {
  constructor() {
    super();
    this._open = false;
    this._profile = readStoredProfile();
    this._messages = demoMessages.map((message) => ({ ...message }));
    this._config = {
      title: 'Cheering Section',
      subtitle: '18 cheering together',
      startOpen: false,
      demo: true,
    };
    this._toastTimer = null;
  }

  connectedCallback() {
    if (this.dataset.rendered === 'true') return;
    this.dataset.rendered = 'true';
    this.render();
    this.bind();
    this.setOpen(this._config.startOpen || this.hasAttribute('start-open'));
  }

  configure(config = {}) {
    this._config = { ...this._config, ...config };
    if (config.demoProfile && !this._profile) {
      this._profile = {
        name: String(config.demoProfile.name || 'Courtside Fan').slice(0, 32),
        relationship: String(config.demoProfile.relationship || 'Family').slice(0, 16),
        color: String(config.demoProfile.color || AVATAR_COLORS[0]),
      };
    }
    if (!this.isConnected) return;
    this.render();
    this.bind();
    this.setOpen(Boolean(this._config.startOpen));
  }

  render() {
    this.innerHTML = `
      <button class="fv-community-launcher" type="button" aria-haspopup="dialog" aria-expanded="false">
        <span class="fv-community-launcher-icon" aria-hidden="true">💬</span>
        <span>Cheer together</span>
        <span class="fv-community-launcher-count" aria-label="18 people cheering">18</span>
      </button>
      <div class="fv-community-scrim" data-open="false"></div>
      <section class="fv-community-panel" role="dialog" aria-modal="true" aria-labelledby="fv-community-title" data-open="false">
        <header class="fv-community-header">
          <div>
            <div class="fv-community-eyebrow"><span class="fv-community-live-dot"></span> Live community</div>
            <h2 class="fv-community-title" id="fv-community-title">${escapeHtml(this._config.title)}</h2>
            <div class="fv-community-subtitle">${escapeHtml(this._config.subtitle)}</div>
          </div>
          <button class="fv-community-close" type="button" aria-label="Close community chat">×</button>
        </header>
        <div class="fv-community-guideline">
          <span class="fv-community-guideline-icon" aria-hidden="true">♡</span>
          <span><strong>Cheer kindly.</strong> No player criticism or personal information.</span>
        </div>
        <div class="fv-community-stage">
          ${this.renderJoin()}
          <div class="fv-community-feed" role="log" aria-live="polite" aria-relevant="additions">
            <div class="fv-community-day">Live match chat</div>
            ${this._messages.map((message) => this.renderMessage(message)).join('')}
          </div>
          <div class="fv-community-toast" role="status" aria-live="polite" data-show="false"></div>
        </div>
        ${this.renderComposer()}
      </section>
    `;
  }

  renderJoin() {
    const hidden = this._profile ? ' hidden' : '';
    return `
      <form class="fv-community-join"${hidden}>
        <div class="fv-community-join-mark" aria-hidden="true">🙌</div>
        <h3>Join the verified chat</h3>
        <p>Quick cheers are open to everyone. Free-text chat is for verified adults invited by the team host.</p>
        <div class="fv-community-field">
          <label for="fv-community-name">Your display name</label>
          <input id="fv-community-name" name="name" maxlength="32" autocomplete="nickname" placeholder="Example: Falcon Fan" required />
        </div>
        <div class="fv-community-field">
          <label for="fv-community-email">Email for a one-time verification code</label>
          <input id="fv-community-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required />
        </div>
        <label class="fv-community-terms"><input name="adult" type="checkbox" required /> I’m an adult and agree to keep chat supportive and match-day appropriate.</label>
        <button class="fv-community-join-button" type="submit">Preview verified chat</button>
        <div class="fv-community-terms">QA prototype: no code is sent and your email is not saved. Production will require a real one-time code and team invitation. Hosts can remove messages and viewers can report concerns.</div>
      </form>
    `;
  }

  renderMessage(message) {
    if (message.type === 'system') {
      return `<div class="fv-community-system">${escapeHtml(message.body)}</div>`;
    }
    const own = message.own ? 'true' : 'false';
    const badge = message.badge || message.relationship;
    const reactions = Array.isArray(message.reactions) && message.reactions.length
      ? `<div class="fv-community-reaction-row">${message.reactions.map((reaction) => `
          <button class="fv-community-reaction-chip" type="button" aria-label="${escapeHtml(reaction.count)} ${escapeHtml(reaction.emoji)} reactions">
            <span aria-hidden="true">${escapeHtml(reaction.emoji)}</span><span>${Number(reaction.count) || 1}</span>
          </button>`).join('')}</div>`
      : '';
    return `
      <article class="fv-community-message" data-message-id="${escapeHtml(message.id)}" data-own="${own}">
        <div class="fv-community-avatar" style="--avatar-color:${escapeHtml(message.color || AVATAR_COLORS[0])}">${escapeHtml(initials(message.name))}</div>
        <div>
          <div class="fv-community-message-head">
            <span class="fv-community-name">${escapeHtml(message.name)}</span>
            <span class="fv-community-role">${escapeHtml(badge || 'Fan')}</span>
            <time class="fv-community-time">${escapeHtml(message.time || '')}</time>
            <button class="fv-community-message-actions" type="button" data-message-actions="${escapeHtml(message.id)}" aria-label="Report or block options for ${escapeHtml(message.name)}">•••</button>
          </div>
          <div class="fv-community-bubble">${escapeHtml(message.body)}</div>
        </div>
        ${reactions}
      </article>
    `;
  }

  renderComposer() {
    const disabled = this._profile ? '' : ' disabled';
    return `
      <form class="fv-community-compose">
        <div class="fv-community-cheers" aria-label="Quick cheers">
          ${['👏', '💗', '🔥', '🙌', '🏐', '💪'].map((emoji) => `
            <button class="fv-community-cheer" type="button" data-cheer="${emoji}" aria-label="Send ${emoji} cheer">${emoji}</button>
          `).join('')}
        </div>
        <div class="fv-community-composer-row">
          <input class="fv-community-composer" maxlength="${MAX_MESSAGE_LENGTH}" placeholder="${this._profile ? 'Cheer on the team…' : 'Verify to join chat'}" aria-label="Community message"${disabled} />
          <button class="fv-community-send" type="submit" aria-label="Send message"${disabled}>➤</button>
        </div>
        <div class="fv-community-composer-meta">
          <span>Match-day chat closes with FanView</span>
          <span class="fv-community-character-count">0/${MAX_MESSAGE_LENGTH}</span>
        </div>
      </form>
    `;
  }

  bind() {
    this.querySelector('.fv-community-launcher')?.addEventListener('click', () => this.setOpen(true));
    this.querySelector('.fv-community-close')?.addEventListener('click', () => this.setOpen(false));
    this.querySelector('.fv-community-scrim')?.addEventListener('click', () => this.setOpen(false));
    this.querySelector('.fv-community-join')?.addEventListener('submit', (event) => this.join(event));
    this.querySelector('.fv-community-compose')?.addEventListener('submit', (event) => this.send(event));
    this.querySelector('.fv-community-composer')?.addEventListener('input', (event) => {
      const count = this.querySelector('.fv-community-character-count');
      if (count) count.textContent = `${event.target.value.length}/${MAX_MESSAGE_LENGTH}`;
    });
    this.querySelectorAll('[data-cheer]').forEach((button) => {
      button.addEventListener('click', () => this.sendCheer(button.dataset.cheer));
    });
    this.querySelectorAll('[data-message-actions]').forEach((button) => {
      button.addEventListener('click', () => {
        this.showToast('Report and block controls open here in the production build.');
      });
    });
    this.addEventListener('keydown', this.onKeydown);
  }

  onKeydown = (event) => {
    if (event.key === 'Escape' && this._open) this.setOpen(false);
  };

  setOpen(open) {
    this._open = Boolean(open);
    this.querySelector('.fv-community-panel')?.setAttribute('data-open', String(this._open));
    this.querySelector('.fv-community-scrim')?.setAttribute('data-open', String(this._open));
    this.querySelector('.fv-community-launcher')?.setAttribute('aria-expanded', String(this._open));
    if (this._open) {
      requestAnimationFrame(() => {
        const target = this._profile
          ? this.querySelector('.fv-community-composer')
          : this.querySelector('#fv-community-name');
        target?.focus();
      });
    }
  }

  join(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim().replace(/\s+/g, ' ').slice(0, 32);
    const email = String(data.get('email') || '').trim();
    const adult = data.get('adult') === 'on';
    if (name.length < 2) {
      this.showToast('Choose a display name with at least two characters.');
      return;
    }
    if (!email.includes('@') || !adult) {
      this.showToast('Enter your email and confirm you’re an adult.');
      return;
    }
    const colorIndex = Array.from(name).reduce((total, char) => total + char.charCodeAt(0), 0) % AVATAR_COLORS.length;
    this._profile = { name, relationship: 'Verified adult', color: AVATAR_COLORS[colorIndex] };
    storeProfile(this._profile);
    this.render();
    this.bind();
    this.setOpen(true);
    this.showToast(`Welcome, ${name}. Let’s cheer kindly!`);
  }

  send(event) {
    event.preventDefault();
    if (!this._profile) return;
    const input = this.querySelector('.fv-community-composer');
    const body = String(input?.value || '').trim().replace(/\s+/g, ' ').slice(0, MAX_MESSAGE_LENGTH);
    if (!body) return;
    this._messages.push({
      id: `local-${Date.now()}`,
      name: this._profile.name,
      relationship: this._profile.relationship,
      body,
      time: nowLabel(),
      color: this._profile.color,
      own: true,
    });
    this.render();
    this.bind();
    this.setOpen(true);
    requestAnimationFrame(() => {
      const feed = this.querySelector('.fv-community-feed');
      if (feed) feed.scrollTop = feed.scrollHeight;
      this.querySelector('.fv-community-composer')?.focus();
    });
  }

  sendCheer(emoji) {
    if (!emoji) return;
    this.showToast(`${emoji} sent to everyone cheering`);
    this.dispatchEvent(new CustomEvent('fanview-cheer', {
      bubbles: true,
      detail: { emoji, shareId: this._config.shareId || '' },
    }));
  }

  showToast(message) {
    const toast = this.querySelector('.fv-community-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.dataset.show = 'true';
    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.dataset.show = 'false';
    }, 2200);
  }
}

if (!customElements.get('fanview-community')) {
  customElements.define('fanview-community', FanViewCommunity);
}

export { FanViewCommunity };
