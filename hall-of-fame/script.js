/**
 * Commit & Secure — Hall of Fame Client Application
 * OWASP JIS University Workshop 2026
 *
 * Handles live contributor data rendering, GitHub avatar loading with fallback,
 * real-time search, theme filtering with count pills, animated counters,
 * and high-resolution SVG badge preview modal with one-click Markdown embed copy.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------------
    // DOM Elements
    // ------------------------------------------------------------------------
    const grid = document.getElementById('contributors-grid');
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const statContributors = document.getElementById('stat-contributors');
    const statBadges = document.getElementById('stat-badges');

    // Counts on theme pills
    const countAll = document.getElementById('count-all');
    const countCream = document.getElementById('count-cream');
    const countHacker = document.getElementById('count-hacker');
    const countCorporate = document.getElementById('count-corporate');
    const countRetro = document.getElementById('count-retro');

    // Modal elements
    const modal = document.getElementById('badge-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBadgeImg = document.getElementById('modal-badge-img');
    const modalContributorName = document.getElementById('modal-contributor-name');
    const modalEmbedCode = document.getElementById('modal-embed-code');
    const modalCopyBtn = document.getElementById('modal-copy-btn');
    const copyBtnText = document.getElementById('copy-btn-text');

    // ------------------------------------------------------------------------
    // State
    // ------------------------------------------------------------------------
    let contributors = [];
    let currentFilter = 'all';
    let currentSearch = '';

    // Theme emoji & label map
    const themeMetadata = {
        cream: { icon: '🍦', label: 'Cream' },
        hacker: { icon: '💻', label: 'Hacker' },
        corporate: { icon: '🏢', label: 'Corporate' },
        retro: { icon: '🕹️', label: 'Retro' }
    };

    // ------------------------------------------------------------------------
    // Fetch and Load Contributor Data
    // ------------------------------------------------------------------------
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('data.json not loaded');
            }
            return response.json();
        })
        .then(data => {
            contributors = Array.isArray(data) ? data : [];
            updateCounts();
            updateStats();
            renderCards();
        })
        .catch(err => {
            console.log('Notice: data.json not found or empty:', err.message);
            renderEmptyState();
        });

    // ------------------------------------------------------------------------
    // Render Functions
    // ------------------------------------------------------------------------
    function renderCards() {
        if (!grid) return;
        grid.innerHTML = '';

        const query = currentSearch.toLowerCase().trim();
        const filtered = contributors.filter(c => {
            const matchesTheme = currentFilter === 'all' || (c.theme || '').toLowerCase() === currentFilter;
            const matchesSearch = !query || 
                (c.name || '').toLowerCase().includes(query) ||
                (c.github || '').toLowerCase().includes(query);
            return matchesTheme && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🔍</div>
                    <h3>No Contributors Found</h3>
                    <p>No verified contributors matched your current search or theme filter.</p>
                </div>
            `;
            return;
        }

        filtered.forEach((c, index) => {
            const card = document.createElement('div');
            card.className = 'contributor-card';
            card.style.transitionDelay = `${Math.min(index * 40, 400)}ms`;

            const rawTheme = (c.theme || 'corporate').toLowerCase();
            const themeInfo = themeMetadata[rawTheme] || { icon: '🛡️', label: rawTheme };
            const cleanGithub = (c.github || 'unknown').replace(/^@/, '');
            const avatarUrl = `https://github.com/${cleanGithub}.png?size=140`;
            const initials = getInitials(c.name || cleanGithub);
            const badgePath = c.badge || `../badges/generated/${cleanGithub}.svg`;
            const portfolioUrl = c.website || `https://${cleanGithub}.github.io/owasp-jisu-commit-and-secure-workshop-2026/`;

            card.innerHTML = `
                <div class="card-top-row">
                    <div class="avatar-container">
                        <img class="contributor-avatar" 
                             src="${avatarUrl}" 
                             alt="${c.name || cleanGithub}" 
                             loading="lazy"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                        <div class="avatar-fallback" style="display: none;">${initials}</div>
                        <div class="verified-halo" title="OWASP Verified Contributor">✓</div>
                    </div>
                    <div class="card-tags">
                        <span class="theme-badge ${rawTheme}">
                            <span>${themeInfo.icon}</span>
                            <span>${themeInfo.label}</span>
                        </span>
                        <span class="owasp-tag">MEMBER 2026</span>
                    </div>
                </div>

                <div class="card-info">
                    <h3 class="contributor-name">${escapeHtml(c.name || 'Anonymous')}</h3>
                    <a href="https://github.com/${cleanGithub}" target="_blank" rel="noopener noreferrer" class="contributor-github">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                        @${escapeHtml(cleanGithub)}
                    </a>
                </div>

                <div class="card-actions">
                    <a href="${escapeHtml(portfolioUrl)}" target="_blank" rel="noopener noreferrer" class="btn-card btn-portfolio">
                        <span>🌐</span>
                        <span>Portfolio</span>
                    </a>
                    <button class="btn-card btn-badge-view" 
                            data-github="${escapeHtml(cleanGithub)}" 
                            data-name="${escapeHtml(c.name || cleanGithub)}" 
                            data-badge="${escapeHtml(badgePath)}">
                        <span>🎖️</span>
                        <span>View Badge</span>
                    </button>
                </div>
            `;

            grid.appendChild(card);

            // Animate card entrance
            setTimeout(() => {
                card.classList.add('visible');
            }, 15);
        });

        // Attach event listeners to badge view buttons
        grid.querySelectorAll('.btn-badge-view').forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.dataset.name;
                const github = btn.dataset.github;
                const badge = btn.dataset.badge;
                openBadgeModal(name, github, badge);
            });
        });
    }

    function renderEmptyState() {
        if (!grid) return;
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🚀</div>
                <h3>Hall of Fame is Warming Up!</h3>
                <p>Be the first developer to complete the workshop, submit your Pull Request, and claim your place in the Hall of Fame.</p>
                <a href="../#quick-start" class="btn-cta">Start the Workshop →</a>
            </div>
        `;
    }

    // ------------------------------------------------------------------------
    // Search & Filter Listeners
    // ------------------------------------------------------------------------
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            if (clearSearchBtn) {
                clearSearchBtn.classList.toggle('hidden', currentSearch.length === 0);
            }
            renderCards();
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                currentSearch = '';
                clearSearchBtn.classList.add('hidden');
                searchInput.focus();
                renderCards();
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.theme;
            renderCards();
        });
    });

    // ------------------------------------------------------------------------
    // Counts & Stats
    // ------------------------------------------------------------------------
    function updateCounts() {
        if (!countAll) return;
        countAll.textContent = contributors.length;

        const counts = { cream: 0, hacker: 0, corporate: 0, retro: 0 };
        contributors.forEach(c => {
            const t = (c.theme || '').toLowerCase();
            if (counts[t] !== undefined) counts[t]++;
        });

        if (countCream) countCream.textContent = counts.cream;
        if (countHacker) countHacker.textContent = counts.hacker;
        if (countCorporate) countCorporate.textContent = counts.corporate;
        if (countRetro) countRetro.textContent = counts.retro;
    }

    function updateStats() {
        const total = contributors.length;
        animateNumber(statContributors, 0, total, 900);
        animateNumber(statBadges, 0, total, 900);
    }

    function animateNumber(element, start, end, duration) {
        if (!element || end === 0) {
            if (element) element.textContent = end;
            return;
        }
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // ------------------------------------------------------------------------
    // Badge Modal Management
    // ------------------------------------------------------------------------
    function openBadgeModal(name, github, badgePath) {
        if (!modal) return;
        modalContributorName.textContent = `${name}'s Badge`;
        modalBadgeImg.src = badgePath;

        const rawUrl = `https://raw.githubusercontent.com/arceuzvx/owasp-jisu-commit-and-secure-workshop-2026/main/badges/generated/${github}.svg`;
        const embedSnippet = `<a href="https://github.com/arceuzvx/owasp-jisu-commit-and-secure-workshop-2026"><img src="${rawUrl}" width="280" alt="${name}'s Contributor Badge" /></a>`;
        modalEmbedCode.value = embedSnippet;

        modalCopyBtn.classList.remove('copied');
        copyBtnText.textContent = '📋 Copy Markdown';

        modal.classList.remove('hidden');
    }

    function closeBadgeModal() {
        if (modal) modal.classList.add('hidden');
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeBadgeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeBadgeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeBadgeModal();
    });

    if (modalCopyBtn) {
        modalCopyBtn.addEventListener('click', () => {
            if (!modalEmbedCode) return;
            navigator.clipboard.writeText(modalEmbedCode.value).then(() => {
                modalCopyBtn.classList.add('copied');
                copyBtnText.textContent = '✅ Copied!';
                setTimeout(() => {
                    modalCopyBtn.classList.remove('copied');
                    copyBtnText.textContent = '📋 Copy Markdown';
                }, 2000);
            }).catch(err => {
                console.error('Clipboard copy failed:', err);
            });
        });
    }

    // ------------------------------------------------------------------------
    // Utilities
    // ------------------------------------------------------------------------
    function getInitials(name) {
        if (!name) return 'OW';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }

    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
});
