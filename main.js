// Kiwi Website Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  initSimulator();
  initQuickstartTabs();
  initCopyButtons();
  initCardGlowEffects();
});

// ==========================================
// 1. Hero Section 3D Canvas Orbit Animation
// ==========================================
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;

  // Set sizing
  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height - 50; // leave space for controls
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Simulation settings
  let simMode = 'loop'; // 'loop' or 'tunnel'
  const btnLoop = document.getElementById('btn-sim-run');
  const btnTunnel = document.getElementById('btn-sim-tunnel');

  if (btnLoop && btnTunnel) {
    btnLoop.addEventListener('click', () => {
      simMode = 'loop';
      btnLoop.classList.add('active');
      btnTunnel.classList.remove('active');
    });
    btnTunnel.addEventListener('click', () => {
      simMode = 'tunnel';
      btnTunnel.classList.add('active');
      btnLoop.classList.remove('active');
    });
  }

  // Interactive mouse gravity
  let mouse = { x: null, y: null, targetX: null, targetY: null };
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.targetX = e.clientX - rect.left;
    mouse.targetY = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => {
    mouse.targetX = null;
    mouse.targetY = null;
  });

  // Orbital particles parameters
  const particles = [];
  const particleCount = 45;
  const orbitRadiusX = 120;
  const orbitRadiusY = 50; // creates 3D tilt perspective
  const orbitTilt = -0.3; // radians of tilt

  // Main orbiting entities (Actor & Critic)
  const actor = { angle: 0, r: 16, color: '#8ce62c', label: 'Actor', glowColor: 'rgba(140, 230, 44, 0.4)' };
  const critic = { angle: Math.PI, r: 16, color: '#8b5cf6', label: 'Critic', glowColor: 'rgba(139, 92, 246, 0.4)' };

  // Generate minor swirling background elements (tests/code files)
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      angle: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.02,
      distanceScale: 0.5 + Math.random() * 0.7,
      size: 1.5 + Math.random() * 2.5,
      opacity: 0.3 + Math.random() * 0.5,
      color: Math.random() > 0.5 ? '#00f0ff' : '#ffffff'
    });
  }

  let localLaptopNode = { x: 50, y: 0 }; // relative positions computed in draw
  let cloudDaemonNode = { x: 0, y: 0 };
  let angle = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cloudDaemonNode.x = canvas.width / 2;
    cloudDaemonNode.y = canvas.height / 2 - 20;
    localLaptopNode.y = canvas.height - 40;

    // Smooth mouse coordinates interpolation
    if (mouse.targetX !== null) {
      if (mouse.x === null) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      }
    } else {
      mouse.x = null;
      mouse.y = null;
    }

    // 1. Draw grid backdrop (Subtle tech aesthetic)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 1;
    const gridSize = 30;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // 2. Draw Connection Tunnel if in 'tunnel' mode or default state
    const tunnelGlow = Math.sin(angle * 5) * 0.2 + 0.8;
    ctx.lineWidth = 2;
    if (simMode === 'tunnel') {
      ctx.strokeStyle = `rgba(0, 240, 255, ${0.4 * tunnelGlow})`;
      ctx.setLineDash([6, 4]);
    } else {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.setLineDash([4, 6]);
    }
    ctx.beginPath();
    ctx.moveTo(localLaptopNode.x, localLaptopNode.y);
    ctx.bezierCurveTo(
      localLaptopNode.x + 80, localLaptopNode.y - 120,
      cloudDaemonNode.x - 120, cloudDaemonNode.y + 120,
      cloudDaemonNode.x, cloudDaemonNode.y
    );
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // Draw tunnel packets (traveling dots)
    if (simMode === 'tunnel') {
      const t = (angle * 0.3) % 1.0;
      // Bezier point formula: B(t) = (1-t)^3 * P0 + 3(1-t)^2 * t * P1 + 3(1-t)*t^2 * P2 + t^3 * P3
      const cp1x = localLaptopNode.x + 80, cp1y = localLaptopNode.y - 120;
      const cp2x = cloudDaemonNode.x - 120, cp2y = cloudDaemonNode.y + 120;
      
      const px = Math.pow(1-t, 3)*localLaptopNode.x + 3*Math.pow(1-t, 2)*t*cp1x + 3*(1-t)*Math.pow(t, 2)*cp2x + Math.pow(t, 3)*cloudDaemonNode.x;
      const py = Math.pow(1-t, 3)*localLaptopNode.y + 3*Math.pow(1-t, 2)*t*cp1y + 3*(1-t)*Math.pow(t, 2)*cp2y + Math.pow(t, 3)*cloudDaemonNode.y;
      
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI*2);
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#00f0ff';
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }

    // 3. Draw Local Machine Representational Node
    ctx.fillStyle = '#0b0f19';
    ctx.strokeStyle = simMode === 'tunnel' ? 'var(--secondary)' : 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(localLaptopNode.x, localLaptopNode.y, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Laptop icon overlay inside circle
    ctx.fillStyle = simMode === 'tunnel' ? 'var(--secondary)' : 'var(--text-muted)';
    ctx.font = '10px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CLI', localLaptopNode.x, localLaptopNode.y);

    // 4. Draw Orbit Path Line (with tilt projection)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1.5;
    ctx.save();
    ctx.translate(cloudDaemonNode.x, cloudDaemonNode.y);
    ctx.rotate(orbitTilt);
    ctx.beginPath();
    ctx.ellipse(0, 0, orbitRadiusX, orbitRadiusY, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 5. Draw Orbiting Minor Particles (Sorted by depth approximation for 3D feel)
    particles.forEach(p => {
      p.angle += p.speed;
      
      // Calculate 3D position
      let x3d = Math.cos(p.angle) * orbitRadiusX * p.distanceScale;
      let y3d = Math.sin(p.angle) * orbitRadiusY * p.distanceScale;
      
      // Apply Tilt rotation matrix
      let rotatedX = x3d * Math.cos(orbitTilt) - y3d * Math.sin(orbitTilt);
      let rotatedY = x3d * Math.sin(orbitTilt) + y3d * Math.cos(orbitTilt);

      // Mouse interactive deflection
      let finalX = cloudDaemonNode.x + rotatedX;
      let finalY = cloudDaemonNode.y + rotatedY;

      if (mouse.x !== null) {
        const dx = mouse.x - finalX;
        const dy = mouse.y - finalY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 80) {
          const force = (80 - dist) * 0.15;
          finalX -= (dx / dist) * force;
          finalY -= (dy / dist) * force;
        }
      }

      // Draw particle
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      // scale size by relative depth (simulated y value in rotated frame)
      const scale = 0.5 + (rotatedY + orbitRadiusX) / (orbitRadiusX * 2);
      ctx.arc(finalX, finalY, p.size * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    });

    // 6. Draw Actor & Critic Nodes (orbiting 180 deg apart)
    actor.angle += 0.015;
    critic.angle += 0.015;

    [actor, critic].forEach(node => {
      let x3d = Math.cos(node.angle) * orbitRadiusX;
      let y3d = Math.sin(node.angle) * orbitRadiusY;
      
      let rx = x3d * Math.cos(orbitTilt) - y3d * Math.sin(orbitTilt);
      let ry = x3d * Math.sin(orbitTilt) + y3d * Math.cos(orbitTilt);

      let finalX = cloudDaemonNode.x + rx;
      let finalY = cloudDaemonNode.y + ry;

      // Mouse deflection
      if (mouse.x !== null) {
        const dx = mouse.x - finalX;
        const dy = mouse.y - finalY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          const force = (100 - dist) * 0.12;
          finalX -= (dx / dist) * force;
          finalY -= (dy / dist) * force;
        }
      }

      // Depth scaling for 3D depth illusion
      const zScale = 0.7 + (ry + orbitRadiusY) / (orbitRadiusY * 2) * 0.6; // scale between 0.7 and 1.3

      // Glow effect
      ctx.shadowBlur = 20 * zScale;
      ctx.shadowColor = node.color;
      ctx.fillStyle = node.glowColor;
      ctx.beginPath();
      ctx.arc(finalX, finalY, node.r * zScale * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Core Node
      ctx.shadowBlur = 0; // reset
      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.arc(finalX, finalY, node.r * zScale * 0.7, 0, Math.PI * 2);
      ctx.fill();

      // Draw text tags for Actor/Critic
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(11 * zScale)}px var(--font-heading)`;
      ctx.fillText(node.label, finalX, finalY - (node.r * zScale * 1.8));
    });

    // 7. Draw Cloud Sandbox Centerpiece
    const daemonPulse = Math.sin(angle * 3) * 3 + 24;
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(140, 230, 44, 0.3)';
    ctx.fillStyle = '#0b0f19';
    ctx.strokeStyle = 'var(--primary)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cloudDaemonNode.x, cloudDaemonNode.y, daemonPulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0; // reset

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px var(--font-heading)';
    ctx.fillText('Kiwi Daemon', cloudDaemonNode.x, cloudDaemonNode.y - 4);
    ctx.fillStyle = 'var(--primary)';
    ctx.font = '9px var(--font-mono)';
    ctx.fillText('SANDBOX', cloudDaemonNode.x, cloudDaemonNode.y + 10);

    angle += 0.05;
    animationFrameId = requestAnimationFrame(draw);
  }

  draw();
}

// ==========================================
// 2. Interactive Loop Simulator
// ==========================================
function initSimulator() {
  const toggleLaptop = document.getElementById('toggle-laptop');
  const tunnelLine = document.getElementById('connection-tunnel-line');
  const tunnelPulse = document.getElementById('tunnel-pulse');
  const tunnelLabel = document.getElementById('tunnel-label');
  const nodeLocal = document.getElementById('node-local');
  const statusLocal = document.getElementById('status-local');
  const statusCloud = document.getElementById('status-cloud');
  const terminalBadge = document.getElementById('terminal-badge');
  const logsContainer = document.getElementById('sim-terminal-logs');

  const btnGithub = document.getElementById('trigger-github');
  const btnDb = document.getElementById('trigger-db');
  const btnAws = document.getElementById('trigger-aws');

  const cacheGithub = document.getElementById('cache-github');
  const cacheDb = document.getElementById('cache-db');
  const cacheAws = document.getElementById('cache-aws');

  const steps = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3'),
    document.getElementById('step-4')
  ];

  if (!toggleLaptop) return;

  let isLaptopOpen = true;
  const cache = {
    GITHUB_TOKEN: { value: null, element: cacheGithub, text: 'GITHUB_TOKEN' },
    DATABASE_URL: { value: null, element: cacheDb, text: 'DATABASE_URL' },
    AWS_ACCESS_KEY: { value: null, element: cacheAws, text: 'AWS_SECRET' }
  };

  // Add line to terminal logs
  function log(text, type = 'info') {
    const row = document.createElement('div');
    row.className = `log-row ${type}`;
    row.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
    logsContainer.appendChild(row);
    logsContainer.scrollTop = logsContainer.scrollHeight;
  }

  // Update simulator visual state
  function updateState() {
    if (isLaptopOpen) {
      // Connect state
      toggleLaptop.classList.add('active');
      toggleLaptop.querySelector('.toggle-btn-text').textContent = 'Laptop Open (Connected)';
      nodeLocal.classList.remove('offline');
      statusLocal.textContent = 'Laptop Open';
      statusLocal.style.color = 'var(--secondary)';
      
      tunnelLine.classList.remove('offline');
      tunnelLine.style.background = 'repeating-linear-gradient(90deg, var(--secondary), var(--secondary) 8px, transparent 8px, transparent 16px)';
      tunnelPulse.style.display = 'block';
      tunnelLabel.textContent = 'HTTP/2 REVERSE TUNNEL';
      tunnelLabel.style.color = 'var(--secondary)';

      // Check if paused and resume if cached items are fine or we just reopened
      if (statusCloud.textContent.includes('PAUSED')) {
        statusCloud.textContent = 'Executing Loop';
        statusCloud.className = 'node-status running';
        terminalBadge.textContent = 'RUNNING';
        terminalBadge.className = 'terminal-status-badge';
        log('Client tunnel re-established. Resuming paused loop.', 'success');
        steps[2].classList.add('active');
      }

      // Enable secret buttons
      btnGithub.disabled = false;
      btnDb.disabled = false;
      btnAws.disabled = false;
    } else {
      // Disconnect state
      toggleLaptop.classList.remove('active');
      toggleLaptop.querySelector('.toggle-btn-text').textContent = 'Laptop Closed (Offline)';
      nodeLocal.classList.add('offline');
      statusLocal.textContent = 'Laptop Closed';
      statusLocal.style.color = 'var(--error)';
      
      tunnelLine.classList.add('offline');
      tunnelPulse.style.display = 'none';
      tunnelLabel.textContent = 'TUNNEL OFFLINE';
      tunnelLabel.style.color = 'var(--text-dim)';

      log('Laptop tunnel disconnected. Secure channel dropped.', 'warning');

      // Disable secret trigger buttons
      btnGithub.disabled = true;
      btnDb.disabled = true;
      btnAws.disabled = true;
    }
  }

  // Handle laptop toggle click
  toggleLaptop.addEventListener('click', () => {
    isLaptopOpen = !isLaptopOpen;
    updateState();
  });

  // Pull credentials simulation
  function pullSecret(secretKey) {
    if (!isLaptopOpen) return;
    
    // Highlight step 4
    steps.forEach(s => s.classList.remove('active'));
    steps[3].classList.add('active');
    
    log(`Daemon requesting credential: ${secretKey} from local client...`, 'tunnel');
    
    setTimeout(() => {
      if (!isLaptopOpen) return; // fail safe if closed fast
      
      // Update Cache State
      cache[secretKey].value = 'cached_value_xyz';
      const el = cache[secretKey].element;
      el.className = 'cache-slot cached';
      el.innerHTML = `${cache[secretKey].text}: <span class="val">Cached</span>`;
      
      log(`Local CLI client resolved ${secretKey} and piped securely.`, 'success');
      log(`Daemon stored ${secretKey} in-memory. Loop executing container tasks...`, 'info');
      
      // Return to running step highlight after 1s
      setTimeout(() => {
        steps[3].classList.remove('active');
        steps[2].classList.add('active');
      }, 1000);
    }, 800);
  }

  // Wire buttons
  btnGithub.addEventListener('click', () => pullSecret('GITHUB_TOKEN'));
  btnDb.addEventListener('click', () => pullSecret('DATABASE_URL'));
  btnAws.addEventListener('click', () => pullSecret('AWS_ACCESS_KEY'));

  // Run automated backdrop loop messages to simulate activity
  let runTicks = 0;
  setInterval(() => {
    runTicks++;
    if (runTicks === 1) {
      log('Local client synchronizing workspace to remote daemon daemon...', 'info');
      steps[0].classList.add('active');
    } else if (runTicks === 3) {
      log('Reverse tunnel handshake established on port 8080.', 'tunnel');
      steps[1].classList.add('active');
    } else if (runTicks === 5) {
      log('Starting compilation sandbox inside Docker container (golang:1.21-alpine)...', 'info');
      steps[2].classList.add('active');
    } else if (runTicks > 6 && runTicks % 8 === 0) {
      // Periodic execution logs
      if (statusCloud.textContent.includes('Executing')) {
        const tests = ['go test ./pkg/controller/...', 'go test ./cmd/kiwi/...', 'go build ./cmd/kiwid/...'];
        const randomTest = tests[Math.floor(Math.random() * tests.length)];
        log(`Running checks in Docker: \`${randomTest}\``, 'cmd');
        
        // Randomly simulate an un-cached secret request
        if (Math.random() > 0.6) {
          const uncachedKeys = Object.keys(cache).filter(k => cache[k].value === null);
          if (uncachedKeys.length > 0) {
            const keyToRequest = uncachedKeys[Math.floor(Math.random() * uncachedKeys.length)];
            
            if (isLaptopOpen) {
              pullSecret(keyToRequest);
            } else {
              // Laptop is closed! Fetch fails!
              log(`Daemon requires ${keyToRequest} for execution step. Caching lookup failed.`, 'warning');
              log(`Tunnel is offline. Suspending execution state.`, 'warning');
              statusCloud.textContent = 'PAUSED (Awaiting Resume)';
              statusCloud.className = 'node-status paused';
              terminalBadge.textContent = 'PAUSED';
              terminalBadge.className = 'terminal-status-badge paused';
              steps.forEach(s => s.classList.remove('active'));
            }
          }
        }
      } else {
        // Paused, waiting for client
        log('Daemon blocked: Awaiting client reconnect to resolve credentials.', 'warning');
      }
    }
  }, 2000);
}

// ==========================================
// 3. Quickstart Guides Tab Navigation
// ==========================================
function initQuickstartTabs() {
  const tabServer = document.getElementById('tab-server');
  const tabClient = document.getElementById('tab-client');
  const panelServer = document.getElementById('panel-server');
  const panelClient = document.getElementById('panel-client');

  if (!tabServer || !tabClient) return;

  tabServer.addEventListener('click', () => {
    tabServer.classList.add('active');
    tabClient.classList.remove('active');
    panelServer.classList.add('active');
    panelClient.classList.remove('active');
  });

  tabClient.addEventListener('click', () => {
    tabClient.classList.add('active');
    tabServer.classList.remove('active');
    panelClient.classList.add('active');
    panelServer.classList.remove('active');
  });
}

// ==========================================
// 4. Copy-to-Clipboard Buttons
// ==========================================
function initCopyButtons() {
  const copyButtons = [
    { btnId: 'copy-install-btn', textId: 'install-command-text', tooltipId: 'copy-tooltip-text' },
    { btnId: 'copy-server-code', contentId: 'code-content-server' },
    { btnId: 'copy-client-code', contentId: 'code-content-client' }
  ];

  copyButtons.forEach(setup => {
    const btn = document.getElementById(setup.btnId);
    if (!btn) return;

    btn.addEventListener('click', () => {
      let copyText = '';
      if (setup.textId) {
        copyText = document.getElementById(setup.textId).innerText;
      } else if (setup.contentId) {
        copyText = document.getElementById(setup.contentId).innerText;
      }

      navigator.clipboard.writeText(copyText).then(() => {
        // Handle visual feedback
        const tooltip = setup.tooltipId ? document.getElementById(setup.tooltipId) : null;
        if (tooltip) {
          const originalText = tooltip.textContent;
          tooltip.textContent = 'Copied!';
          setTimeout(() => {
            tooltip.textContent = originalText;
          }, 1500);
        } else {
          // General console button text update
          const originalHTML = btn.innerHTML;
          btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copied!
          `;
          setTimeout(() => {
            btn.innerHTML = originalHTML;
          }, 1500);
        }
      }).catch(err => {
        console.error('Failed to copy code: ', err);
      });
    });
  });
}

// ==========================================
// 5. Hover Glowing Boundary Matrix Effects
// ==========================================
function initCardGlowEffects() {
  const cards = document.querySelectorAll('.feature-card, .simulator-controls-card, .simulator-screen-card, .cta-container');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}
