/**
 * Security Demo — Commit & Secure OWASP Workshop
 *
 * This script powers both interactive labs:
 *   Lab 1: "The Leak" — OWASP A02 (Cryptographic Failures)
 *   Lab 2: "Fix the Config" — OWASP A05 (Security Misconfiguration)
 *
 * No frameworks — just vanilla JavaScript!
 */

// ==============================================
// LAB 1 DATA: Project files (insecure & secure)
// ==============================================

const FILES = [
  {
    name: 'app.js',
    icon: '📄',
    hasSecret: false,
    insecure: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to our API');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    secure: null // same content — no secrets here
  },
  {
    name: 'config.js',
    icon: '⚙️',
    hasSecret: true,
    secretType: 'DATABASE PASSWORD',
    insecure: `module.exports = {
  database: {
    host: 'db.example.com',
    port: 5432,
    user: 'admin',
    password: '<secret>SuperSecret_DB_Pass!2024</secret>',
    name: 'production_db'
  }
};`,
    secure: `module.exports = {
  database: {
    host: <safe>process.env.DB_HOST</safe>,
    port: <safe>process.env.DB_PORT</safe>,
    user: <safe>process.env.DB_USER</safe>,
    password: <safe>process.env.DB_PASSWORD</safe>,
    name: <safe>process.env.DB_NAME</safe>
  }
};`
  },
  {
    name: 'api-handler.js',
    icon: '🔗',
    hasSecret: true,
    secretType: 'API KEY',
    insecure: `const API_KEY = '<secret>sk_live_a1b2c3d4e5f6g7h8i9j0</secret>';

async function fetchPaymentData(userId) {
  const response = await fetch(
    'https://api.stripe.com/v1/charges',
    {
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`
      }
    }
  );
  return response.json();
}

module.exports = { fetchPaymentData };`,
    secure: `const API_KEY = <safe>process.env.STRIPE_API_KEY</safe>;

async function fetchPaymentData(userId) {
  if (!API_KEY) {
    throw new Error('STRIPE_API_KEY is not set');
  }
  const response = await fetch(
    'https://api.stripe.com/v1/charges',
    {
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`
      }
    }
  );
  return response.json();
}

module.exports = { fetchPaymentData };`
  },
  {
    name: 'auth.js',
    icon: '🔑',
    hasSecret: true,
    secretType: 'JWT SECRET',
    insecure: `const jwt = require('jsonwebtoken');
const JWT_SECRET = '<secret>my-ultra-secret-jwt-key-never-share</secret>';

function generateToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { generateToken, verifyToken };`,
    secure: `const jwt = require('jsonwebtoken');
const JWT_SECRET = <safe>process.env.JWT_SECRET</safe>;

function generateToken(user) {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not set');
  }
  return jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { generateToken, verifyToken };`
  },
  {
    name: '.env',
    icon: '🔒',
    hasSecret: false,
    insecure: `DB_HOST=db.example.com
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=SuperSecret_DB_Pass!2024
STRIPE_API_KEY=sk_live_a1b2c3d4e5f6g7h8i9j0
JWT_SECRET=my-ultra-secret-jwt-key-never-share`,
    secure: null // shown with overlay in secure mode
  },
  {
    name: '.gitignore',
    icon: '🚫',
    hasSecret: false,
    insecure: `node_modules/
dist/
*.log`,
    secure: `node_modules/
dist/
*.log
.env
*.key
*.pem
secrets/`
  }
];

// ==============================================
// LAB 2 DATA: Misconfigurations
// ==============================================

const MISCONFIGS = [
  {
    id: 'debug',
    icon: '🐛',
    title: 'Debug Mode is ON',
    points: 15,
    impact: `<span style="color:#ef4444">Error: Cannot read property 'id' of undefined</span>
    at UserController.getProfile (<span style="color:#eab308">/var/www/app/controllers/user.js:47:22</span>)
    at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)

<span style="color:#9ca3af">Database connection:</span> <span style="color:#ef4444">postgres://admin:SuperSecret_DB_Pass!2024@db.example.com:5432/production_db</span>
<span style="color:#9ca3af">Server internal IP:</span> <span style="color:#ef4444">10.0.3.47</span>
<span style="color:#9ca3af">Node version:</span> v18.17.0
<span style="color:#9ca3af">Express version:</span> 4.18.2`,
    fix: 'Set DEBUG=false and NODE_ENV=production before deploying.'
  },
  {
    id: 'env-committed',
    icon: '📋',
    title: '.env File is Committed to Git',
    points: 20,
    impact: `<span style="color:#9ca3af"># .env (visible in repository)</span>
<span style="color:#ef4444">DB_PASSWORD=SuperSecret_DB_Pass!2024</span>
<span style="color:#ef4444">STRIPE_API_KEY=sk_live_a1b2c3d4e5f6g7h8i9j0</span>
<span style="color:#ef4444">JWT_SECRET=my-ultra-secret-jwt-key-never-share</span>
<span style="color:#ef4444">ADMIN_PASSWORD=admin123</span>

<span style="color:#9ca3af">Anyone with repo access can read these credentials.</span>`,
    fix: 'Add .env to .gitignore, then run: git rm --cached .env'
  },
  {
    id: 'gitignore',
    icon: '📝',
    title: '.gitignore is Missing Entries',
    points: 15,
    impact: `<span style="color:#9ca3af">$ git ls-files</span>
<span style="color:#ef4444">ssl/server.key</span>          <span style="color:#9ca3af">← private SSL key</span>
<span style="color:#ef4444">ssl/server.pem</span>          <span style="color:#9ca3af">← SSL certificate</span>
<span style="color:#ef4444">secrets/aws-creds.json</span>  <span style="color:#9ca3af">← AWS credentials</span>
<span style="color:#ef4444">config/prod.env</span>         <span style="color:#9ca3af">← production secrets</span>

<span style="color:#9ca3af">All of these files are tracked by Git and pushed to the remote.</span>`,
    fix: 'Add *.key, *.pem, and secrets/ to your .gitignore file.'
  },
  {
    id: 'default-creds',
    icon: '🔓',
    title: 'Default Admin Credentials Active',
    points: 20,
    impact: `<span style="color:#9ca3af">POST /api/login</span>
<span style="color:#9ca3af">Request body:</span>
{
  "username": <span style="color:#ef4444">"admin"</span>,
  "password": <span style="color:#ef4444">"admin123"</span>
}

<span style="color:#22c55e">✓ 200 OK — Login successful</span>
<span style="color:#9ca3af">Role: SUPER_ADMIN | Full database access granted</span>`,
    fix: 'Change default credentials. Enforce strong passwords and enable MFA.'
  },
  {
    id: 'verbose-errors',
    icon: '💬',
    title: 'Verbose Error Messages in Production',
    points: 15,
    impact: `<span style="color:#ef4444">500 Internal Server Error</span>

<span style="color:#9ca3af">Framework:</span> Express 4.18.2
<span style="color:#9ca3af">Runtime:</span>   Node.js v18.17.0
<span style="color:#9ca3af">OS:</span>        Ubuntu 22.04 LTS
<span style="color:#9ca3af">File:</span>      /var/www/app/routes/payments.js:128
<span style="color:#9ca3af">Stack:</span>     TypeError: Cannot destructure property 'amount'
             at processPayment (/var/www/app/services/billing.js:45:12)

<span style="color:#9ca3af">Attackers use this info to find known vulnerabilities in your stack.</span>`,
    fix: 'Use generic error pages in production. Log details server-side only.'
  },
  {
    id: 'frontend-keys',
    icon: '🌐',
    title: 'API Keys in Frontend JavaScript',
    points: 15,
    impact: `<span style="color:#9ca3af">// Browser DevTools → Network tab → Request Headers</span>

GET /api/data HTTP/1.1
Host: api.example.com
<span style="color:#ef4444">Authorization: Bearer sk_live_a1b2c3d4e5f6g7h8i9j0</span>
<span style="color:#ef4444">X-API-Secret: my-ultra-secret-jwt-key-never-share</span>

<span style="color:#9ca3af">// Anyone can open DevTools (F12) and copy these keys.</span>
<span style="color:#9ca3af">// View Source also reveals them in bundled JavaScript.</span>`,
    fix: 'Route API calls through your server. Never expose keys in client-side code.'
  }
];

// ==============================================
// INITIALIZATION
// ==============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Tab Switching ----
  const tabs = document.querySelectorAll('.tab');
  const labs = document.querySelectorAll('.lab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      labs.forEach(l => l.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  // ================================
  // LAB 1: The Leak
  // ================================

  const fileTree = document.getElementById('file-tree');
  const codeHeader = document.getElementById('code-header');
  const codeFilename = document.getElementById('code-filename');
  const codeContent = document.getElementById('code-content');
  const alertBanner = document.getElementById('alert-banner');
  const alertIcon = document.getElementById('alert-icon');
  const alertText = document.getElementById('alert-text');
  const secureToggle = document.getElementById('secure-toggle');
  const timelineSteps = document.querySelectorAll('.timeline-step');

  let selectedFile = null;       // currently selected file index
  let isSecureMode = false;      // toggle state
  let timelineTriggered = false; // only animate timeline once

  // Build the file tree from our data
  FILES.forEach((file, index) => {
    const item = document.createElement('div');
    item.className = 'file-item' + (file.hasSecret ? ' has-secret' : '');
    item.innerHTML = `<span class="file-icon">${file.icon}</span>${file.name}`;
    item.addEventListener('click', () => selectFile(index));
    fileTree.appendChild(item);
  });

  /**
   * selectFile — display a file's contents in the code viewer
   */
  function selectFile(index) {
    selectedFile = index;
    const file = FILES[index];

    // Update active state in tree
    document.querySelectorAll('.file-item').forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });

    // Update filename header
    codeFilename.textContent = file.name;

    // Render the file content
    renderFileContent(file);

    // Show alert if file has a secret (and we're in insecure mode)
    if (file.hasSecret && !isSecureMode) {
      showAlert('danger', `⚠️ SECRET DETECTED: ${file.secretType}`);
      // Trigger the timeline animation the first time a secret is found
      if (!timelineTriggered) {
        timelineTriggered = true;
        animateTimeline();
      }
    } else if (file.hasSecret && isSecureMode) {
      showAlert('safe', '✅ Secrets are safe — stored in .env, blocked by .gitignore');
    } else {
      hideAlert();
    }
  }

  /**
   * renderFileContent — display code with secret highlighting or safe values
   */
  function renderFileContent(file) {
    let content;

    if (isSecureMode && file.secure) {
      content = file.secure;
    } else if (isSecureMode && file.name === '.env') {
      // In secure mode, .env is shown as blocked
      content = file.insecure;
      const html = escapeHtml(content);
      codeContent.innerHTML =
        `<code><span class="env-blocked">${html}</span></code>` +
        `<span class="gitignore-badge">Blocked by .gitignore</span>`;
      return;
    } else {
      content = file.insecure;
    }

    // Process custom tags for highlighting
    let html = escapeHtml(content);

    // Replace our <secret> tags with highlighted spans
    // Since we escaped the HTML, the tags are now &lt;secret&gt; etc.
    html = html.replace(/&lt;secret&gt;(.*?)&lt;\/secret&gt;/g,
      '<span class="secret">$1</span>');

    // Replace <safe> tags with green highlighted spans
    html = html.replace(/&lt;safe&gt;(.*?)&lt;\/safe&gt;/g,
      '<span class="safe-value">$1</span>');

    codeContent.innerHTML = `<code>${html}</code>`;
  }

  /**
   * showAlert — display the alert banner
   */
  function showAlert(type, text) {
    alertBanner.classList.remove('hidden', 'danger', 'safe');
    alertBanner.classList.add(type);
    alertIcon.textContent = type === 'danger' ? '⚠️' : '✅';
    alertText.textContent = text;
  }

  function hideAlert() {
    alertBanner.classList.add('hidden');
  }

  /**
   * animateTimeline — reveal timeline steps one by one
   */
  function animateTimeline() {
    timelineSteps.forEach((step, i) => {
      setTimeout(() => {
        step.classList.add('visible');
      }, i * 1200);
    });
  }

  /**
   * Secure toggle — switch between insecure and secure views
   */
  secureToggle.addEventListener('change', () => {
    isSecureMode = secureToggle.checked;

    // Re-render the current file if one is selected
    if (selectedFile !== null) {
      selectFile(selectedFile);
    }
  });

  // ================================
  // LAB 2: Fix the Config
  // ================================

  const configGrid = document.getElementById('config-grid');
  const scoreBar = document.getElementById('score-bar');
  const scoreValue = document.getElementById('score-value');
  const celebration = document.getElementById('celebration');

  let currentScore = 0;
  const fixedState = {}; // track which cards are fixed

  // Build the config cards
  MISCONFIGS.forEach(config => {
    fixedState[config.id] = false;

    const card = document.createElement('div');
    card.className = 'config-card';
    card.id = `card-${config.id}`;

    card.innerHTML = `
      <div class="config-card-header">
        <div class="config-card-title">
          <span class="card-icon">${config.icon}</span>
          <h4>${config.title}</h4>
        </div>
        <div class="status-dot" id="dot-${config.id}"></div>
      </div>
      <div class="config-card-body">
        <span class="points-badge">+${config.points} points</span>
        <button class="impact-toggle" data-id="${config.id}">View Impact ▾</button>
        <div class="impact-content" id="impact-${config.id}">${config.impact}</div>
        <div class="fix-row">
          <button class="fix-btn" id="fix-${config.id}" data-id="${config.id}">
            Fix It
          </button>
        </div>
        <div class="fix-description" id="fixdesc-${config.id}">
          ✅ ${config.fix}
        </div>
      </div>
    `;

    configGrid.appendChild(card);
  });

  // Impact toggle — expand/collapse
  document.querySelectorAll('.impact-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const content = document.getElementById(`impact-${id}`);
      const isOpen = content.classList.toggle('open');
      btn.textContent = isOpen ? 'Hide Impact ▴' : 'View Impact ▾';
    });
  });

  // Fix button — toggle fixed state
  document.querySelectorAll('.fix-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const config = MISCONFIGS.find(c => c.id === id);
      const isFixed = fixedState[id];

      if (isFixed) {
        // Un-fix
        fixedState[id] = false;
        currentScore -= config.points;
        btn.textContent = 'Fix It';
        btn.classList.remove('fixed');
        document.getElementById(`dot-${id}`).classList.remove('fixed');
        document.getElementById(`fixdesc-${id}`).classList.remove('visible');
      } else {
        // Fix
        fixedState[id] = true;
        currentScore += config.points;
        btn.textContent = 'Undo';
        btn.classList.add('fixed');
        document.getElementById(`dot-${id}`).classList.add('fixed');
        document.getElementById(`fixdesc-${id}`).classList.add('visible');
      }

      updateScore();
    });
  });

  /**
   * updateScore — animate the score bar and check for celebration
   */
  function updateScore() {
    const pct = currentScore;

    // Animate the number
    scoreValue.textContent = pct;

    // Update bar width
    scoreBar.style.width = pct + '%';

    // Update colors based on score
    if (pct < 40) {
      scoreBar.style.background = 'var(--red)';
      scoreValue.style.color = 'var(--red)';
    } else if (pct < 75) {
      scoreBar.style.background = 'var(--yellow)';
      scoreValue.style.color = 'var(--yellow)';
    } else if (pct < 100) {
      scoreBar.style.background = 'var(--orange)';
      scoreValue.style.color = 'var(--orange)';
    } else {
      scoreBar.style.background = 'var(--green)';
      scoreValue.style.color = 'var(--green)';
    }

    // Celebration at 100
    if (pct >= 100) {
      celebration.classList.remove('hidden');
    } else {
      celebration.classList.add('hidden');
    }
  }

  // ================================
  // UTILITIES
  // ================================

  /**
   * escapeHtml — prevent XSS by escaping HTML entities
   */
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

});
