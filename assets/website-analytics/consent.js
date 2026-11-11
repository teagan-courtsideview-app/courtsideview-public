(() => {
    const measurementId = "G-SBRQ697MGD";
    const settingsButton = document.querySelector('[data-cv-analytics-choices]');
    if (!/^G-[A-Z0-9]{10}$/.test(measurementId) || !settingsButton) return;

    const productionOrigin = 'https://www.courtsideviewapp.com';
    const marketingPage = document.currentScript?.dataset.collect === 'true';
    const collectOnThisPage = marketingPage && location.origin === productionOrigin;
    const browserOptOut = navigator.globalPrivacyControl === true
        || ['1', 'yes'].includes(navigator.doNotTrack)
        || ['1', 'yes'].includes(window.doNotTrack);
    const storageKey = 'courtsideview.analytics-consent.v1';
    const lifetimeSeconds = 180 * 24 * 60 * 60;
    const disabledFlag = `ga-disable-${measurementId}`;
    const denied = {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
    };

    function readChoice() {
        try {
            const stored = JSON.parse(localStorage.getItem(storageKey));
            if (!stored || !['allowed', 'rejected'].includes(stored.choice)
                || !Number.isFinite(stored.savedAt)) return null;
            const age = Date.now() - stored.savedAt;
            return age >= 0 && age < lifetimeSeconds * 1000 ? stored.choice : null;
        } catch {
            return null;
        }
    }

    function saveChoice(choice) {
        try {
            localStorage.setItem(storageKey, JSON.stringify({ choice, savedAt: Date.now() }));
            return true;
        } catch {
            return false;
        }
    }

    const panel = document.createElement('section');
    panel.id = 'cv-analytics-panel';
    panel.className = 'cv-analytics-panel';
    panel.setAttribute('aria-labelledby', 'cv-analytics-title');
    panel.hidden = true;
    panel.innerHTML = `
        <p id="cv-analytics-title" class="cv-analytics-title" role="heading" aria-level="2" tabindex="-1">Privacy choices</p>
        <p class="cv-analytics-description">Allow Google Analytics to count visits to our public marketing pages. You can change this choice anytime. <a href="/privacy">Privacy policy</a></p>
        <p class="cv-analytics-status" role="status"></p>
        <div class="cv-analytics-actions">
            <button type="button" data-reject>Reject analytics</button>
            <button type="button" data-allow>Allow analytics</button>
            <button type="button" data-close hidden>Close</button>
        </div>
    `;

    const title = panel.querySelector('.cv-analytics-title');
    const description = panel.querySelector('.cv-analytics-description');
    const status = panel.querySelector('.cv-analytics-status');
    const rejectButton = panel.querySelector('[data-reject]');
    const allowButton = panel.querySelector('[data-allow]');
    const closeButton = panel.querySelector('[data-close]');
    const spacer = document.createElement('div');
    spacer.className = 'cv-analytics-spacer';
    spacer.setAttribute('aria-hidden', 'true');
    document.body.append(panel, spacer);

    let choice = readChoice();
    let googleTag;
    let openedFromSettings = false;
    let choiceIsPageOnly = false;

    function setPanelOpen(open) {
        const restoreFocus = !open && openedFromSettings;
        panel.hidden = !open;
        settingsButton.setAttribute('aria-expanded', String(open));
        if (open && openedFromSettings) title.focus();
        if (!open) openedFromSettings = false;
        if (restoreFocus) settingsButton.focus({ preventScroll: true });
    }

    function clearAnalyticsCookies(includeHostOnly = true) {
        if (location.origin !== productionOrigin) return;
        const cookieNames = ['_ga', `_ga_${measurementId.slice(2)}`];
        for (const name of cookieNames) {
            const expired = `${name}=; Max-Age=0; Path=/; Secure; SameSite=Lax`;
            if (includeHostOnly) document.cookie = expired;
            document.cookie = `${expired}; Domain=${location.hostname}`;
            document.cookie = `${expired}; Domain=courtsideviewapp.com`;
        }
    }

    function stopAnalytics(reload) {
        window[disabledFlag] = true;
        clearAnalyticsCookies();
        if (!googleTag) return;
        googleTag.remove();
        if (reload) location.reload();
    }

    function startAnalytics() {
        if (!collectOnThisPage || browserOptOut || choice !== 'allowed' || googleTag) return;

        // Remove cookies from the earlier domain-scoped configuration before the tag can read them.
        clearAnalyticsCookies(false);
        const canonical = document.querySelector('link[rel="canonical"]');
        const pathname = canonical ? new URL(canonical.href).pathname : location.pathname;
        const pageView = {
            page_location: `${productionOrigin}${pathname}`,
            page_referrer: '',
        };
        window[disabledFlag] = false;
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }

        gtag('consent', 'default', denied);
        gtag('consent', 'update', { analytics_storage: 'granted' });
        const measurementSettings = {
            ...pageView,
            send_page_view: false,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
            cookie_domain: 'none',
            cookie_expires: lifetimeSeconds,
            cookie_update: false,
            cookie_flags: 'SameSite=Lax;Secure',
            ignore_referrer: true,
        };
        // Apply sanitized context and cookie settings before the tag initializes.
        gtag('set', measurementSettings);
        gtag('js', new Date());
        gtag('config', measurementId, measurementSettings);
        gtag('event', 'page_view', { ...pageView, send_to: measurementId });

        googleTag = document.createElement('script');
        googleTag.async = true;
        googleTag.referrerPolicy = 'no-referrer';
        googleTag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.append(googleTag);
    }

    function choose(nextChoice) {
        const saved = saveChoice(nextChoice);
        if (!saved) {
            status.textContent = 'Your browser couldn’t save your choice. Analytics is off on this page.';
            choice = 'rejected';
            choiceIsPageOnly = true;
            stopAnalytics(false);
            return;
        }

        choice = nextChoice;
        choiceIsPageOnly = false;
        status.textContent = '';
        setPanelOpen(false);
        if (choice === 'allowed') {
            if (googleTag && window[disabledFlag]) location.reload();
            else startAnalytics();
        } else {
            stopAnalytics(true);
        }
    }

    function syncChoice() {
        if (browserOptOut || choiceIsPageOnly) return;
        const savedChoice = readChoice();
        if (savedChoice === choice) return;
        choice = savedChoice;
        if (!openedFromSettings) setPanelOpen(!choice && marketingPage);
        if (choice === 'allowed') startAnalytics();
        else stopAnalytics(true);
    }

    rejectButton.addEventListener('click', () => choose('rejected'));
    allowButton.addEventListener('click', () => choose('allowed'));
    closeButton.addEventListener('click', () => setPanelOpen(false));
    settingsButton.addEventListener('click', () => {
        openedFromSettings = true;
        closeButton.hidden = false;
        if (browserOptOut) {
            status.textContent = 'Analytics is off because your browser sent a privacy preference.';
        }
        setPanelOpen(true);
    });
    panel.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && openedFromSettings) setPanelOpen(false);
    });
    window.addEventListener('storage', (event) => {
        if (event.key === storageKey || event.key === null) syncChoice();
    });
    window.addEventListener('pageshow', syncChoice);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') syncChoice();
    });

    settingsButton.setAttribute('aria-controls', panel.id);
    settingsButton.hidden = false;
    new ResizeObserver(() => {
        spacer.style.height = `${panel.offsetHeight}px`;
    }).observe(panel);

    if (browserOptOut) {
        description.hidden = true;
        allowButton.hidden = true;
        rejectButton.hidden = true;
        if (choice === 'allowed') saveChoice('rejected');
        stopAnalytics(false);
        setPanelOpen(false);
    } else {
        setPanelOpen(!choice && marketingPage);
        if (choice === 'allowed') startAnalytics();
        else stopAnalytics(false);
    }
})();
