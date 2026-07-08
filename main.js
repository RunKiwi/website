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

  // Orbital parameters
  const orbitRadiusX = 140;
  const orbitRadiusY = 45;
  const orbitTilt = -0.22; // radians of tilt

  // Main orbiting loop particle
  const loopParticle = {
    angle: 0,
    speed: 0.02,
    r: 8,
    color: '#8ce62c',
    trail: [],
    maxTrailLen: 30
  };

  // Tunnel credentials particles
  const tunnelParticles = [
    { progress: 0, speed: 0.006, label: 'GITHUB_TOKEN', active: true },
    { progress: 0.35, speed: 0.007, label: 'AWS_SECRET', active: true },
    { progress: 0.7, speed: 0.005, label: 'DB_URL', active: true }
  ];

  let localLaptopNode = { x: 60, y: 0 };
  let cloudDaemonNode = { x: 0, y: 0 };
  let angle = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cloudDaemonNode.x = canvas.width / 2;
    cloudDaemonNode.y = canvas.height / 2 - 15;
    localLaptopNode.y = canvas.height - 40;

    // Smooth mouse coordinates
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

    // 1. Draw modern dot matrix grid background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    const spacing = 30;
    for (let x = spacing; x < canvas.width; x += spacing) {
      for (let y = spacing; y < canvas.height; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 2. Draw ambient background glows
    const backgroundGlow = ctx.createRadialGradient(
      cloudDaemonNode.x, cloudDaemonNode.y, 5,
      cloudDaemonNode.x, cloudDaemonNode.y, 160
    );
    backgroundGlow.addColorStop(0, 'rgba(140, 230, 44, 0.08)');
    backgroundGlow.addColorStop(0.5, 'rgba(0, 240, 255, 0.03)');
    backgroundGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = backgroundGlow;
    ctx.beginPath();
    ctx.arc(cloudDaemonNode.x, cloudDaemonNode.y, 160, 0, Math.PI * 2);
    ctx.fill();

    // 3. Draw connection tunnel (Sleek minimalist bezier rail)
    const showTunnel = simMode === 'tunnel';
    const cp1x = localLaptopNode.x + 100, cp1y = localLaptopNode.y - 120;
    const cp2x = cloudDaemonNode.x - 120, cp2y = cloudDaemonNode.y + 100;

    ctx.beginPath();
    ctx.moveTo(localLaptopNode.x, localLaptopNode.y);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, cloudDaemonNode.x, cloudDaemonNode.y);
    
    ctx.strokeStyle = showTunnel ? 'rgba(0, 240, 255, 0.3)' : 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = showTunnel ? 2.5 : 1.5;
    if (!showTunnel) {
      ctx.setLineDash([4, 6]);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. Draw credential packets flowing through the tunnel
    if (showTunnel) {
      tunnelParticles.forEach(p => {
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
        }

        const t = p.progress;
        const px = Math.pow(1-t, 3)*localLaptopNode.x + 3*Math.pow(1-t, 2)*t*cp1x + 3*(1-t)*Math.pow(t, 2)*cp2x + Math.pow(t, 3)*cloudDaemonNode.x;
        const py = Math.pow(1-t, 3)*localLaptopNode.y + 3*Math.pow(1-t, 2)*t*cp1y + 3*(1-t)*Math.pow(t, 2)*cp2y + Math.pow(t, 3)*cloudDaemonNode.y;

        // Draw packet glow
        const grad = ctx.createRadialGradient(px, py, 1, px, py, 8);
        grad.addColorStop(0, '#00f0ff');
        grad.addColorStop(0.5, 'rgba(0, 240, 255, 0.4)');
        grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw packet core dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();

        // Elegant tiny label next to packet
        ctx.font = '7px var(--font-mono)';
        ctx.fillStyle = 'rgba(0, 240, 255, 0.7)';
        ctx.textAlign = 'left';
        ctx.fillText(p.label, px + 6, py - 2);
      });
    }

    // 5. Draw Local CLI Node
    ctx.fillStyle = '#06070a';
    ctx.strokeStyle = showTunnel ? '#00f0ff' : 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(localLaptopNode.x, localLaptopNode.y, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = showTunnel ? '#00f0ff' : 'var(--text-muted)';
    ctx.font = 'bold 8px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CLI', localLaptopNode.x, localLaptopNode.y);

    // 6. Draw Orbit Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.save();
    ctx.translate(cloudDaemonNode.x, cloudDaemonNode.y);
    ctx.rotate(orbitTilt);
    ctx.beginPath();
    ctx.ellipse(0, 0, orbitRadiusX, orbitRadiusY, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 7. Calculate Orbit Position and Trails
    loopParticle.angle += loopParticle.speed;
    const cosAngle = Math.cos(loopParticle.angle);
    const sinAngle = Math.sin(loopParticle.angle);
    
    // Orbit relative coordinates (tilted)
    let x3d = cosAngle * orbitRadiusX;
    let y3d = sinAngle * orbitRadiusY;
    let rx = x3d * Math.cos(orbitTilt) - y3d * Math.sin(orbitTilt);
    let ry = x3d * Math.sin(orbitTilt) + y3d * Math.cos(orbitTilt);

    let finalX = cloudDaemonNode.x + rx;
    let finalY = cloudDaemonNode.y + ry;

    // Mouse gravity interactive deflection
    if (mouse.x !== null) {
      const dx = mouse.x - finalX;
      const dy = mouse.y - finalY;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 80) {
        const force = (80 - dist) * 0.12;
        finalX -= (dx / dist) * force;
        finalY -= (dy / dist) * force;
      }
    }

    // Capture trail position
    loopParticle.trail.push({ x: finalX, y: finalY, depth: sinAngle });
    if (loopParticle.trail.length > loopParticle.maxTrailLen) {
      loopParticle.trail.shift();
    }

    // Depth checks: is particle behind centerpiece (sinAngle < 0)?
    const isBehind = sinAngle < 0.1;

    // Draw function helpers for core & particle to support 3D occlusion
    function drawOrbitingParticle() {
      // Draw smooth trailing gradient brush
      if (loopParticle.trail.length > 1) {
        for (let i = 1; i < loopParticle.trail.length; i++) {
          const pt1 = loopParticle.trail[i - 1];
          const pt2 = loopParticle.trail[i];
          const alpha = (i / loopParticle.maxTrailLen) * 0.4;
          const scale = 0.5 + (pt2.depth + 1) / 2 * 0.6; // 3D thickness scaling
          
          ctx.strokeStyle = loopParticle.color;
          ctx.lineWidth = loopParticle.r * scale * (i / loopParticle.maxTrailLen) * 1.5;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1.0;
      }

      // Draw particle head
      const scale = 0.6 + (sinAngle + 1) / 2 * 0.6; // 3D size scaling
      const particleGlow = ctx.createRadialGradient(
        finalX, finalY, 1,
        finalX, finalY, loopParticle.r * 2.5 * scale
      );
      particleGlow.addColorStop(0, '#ffffff');
      particleGlow.addColorStop(0.3, loopParticle.color);
      particleGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = particleGlow;
      ctx.beginPath();
      ctx.arc(finalX, finalY, loopParticle.r * 2.5 * scale, 0, Math.PI * 2);
      ctx.fill();

      // Inner solid core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(finalX, finalY, 2.5 * scale, 0, Math.PI * 2);
      ctx.fill();

      // Simple label badge floating above particle
      ctx.fillStyle = 'rgba(6, 7, 10, 0.7)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      
      ctx.font = 'bold 8px var(--font-mono)';
      const labelText = 'Developer Loop';
      const labelW = ctx.measureText(labelText).width;
      
      // Draw simple capsule background
      ctx.beginPath();
      ctx.arc(finalX - labelW/2, finalY - 18 * scale, 5, Math.PI/2, Math.PI * 1.5);
      ctx.lineTo(finalX + labelW/2, finalY - 23 * scale);
      ctx.arc(finalX + labelW/2, finalY - 18 * scale, 5, Math.PI * 1.5, Math.PI / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(labelText, finalX, finalY - 15 * scale);
    }

    function drawCenterCore() {
      // Glow background for core
      const coreGlow = ctx.createRadialGradient(
        cloudDaemonNode.x, cloudDaemonNode.y, 1,
        cloudDaemonNode.x, cloudDaemonNode.y, 45
      );
      coreGlow.addColorStop(0, 'rgba(140, 230, 44, 0.25)');
      coreGlow.addColorStop(0.4, 'rgba(0, 240, 255, 0.1)');
      coreGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cloudDaemonNode.x, cloudDaemonNode.y, 45, 0, Math.PI * 2);
      ctx.fill();

      // Outer glassmorphic frame
      const centerPulse = Math.sin(angle * 2) * 1.5 + 24;
      ctx.fillStyle = 'rgba(11, 15, 26, 0.8)';
      ctx.strokeStyle = 'rgba(140, 230, 44, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cloudDaemonNode.x, cloudDaemonNode.y, centerPulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Concentric inner line
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cloudDaemonNode.x, cloudDaemonNode.y, centerPulse - 6, 0, Math.PI * 2);
      ctx.stroke();

      // Central pulsing core dot
      ctx.fillStyle = '#8ce62c';
      ctx.beginPath();
      ctx.arc(cloudDaemonNode.x, cloudDaemonNode.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Text identifiers
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px var(--font-heading)';
      ctx.textAlign = 'center';
      ctx.fillText('KIWI', cloudDaemonNode.x, cloudDaemonNode.y - 3);
      ctx.fillStyle = '#8ce62c';
      ctx.font = '7px var(--font-mono)';
      ctx.fillText('CLOUD', cloudDaemonNode.x, cloudDaemonNode.y + 7);
    }

    // 8. 3D Occlusion Drawing Sequence
    if (isBehind) {
      // Particle is in background: draw particle, then center core over it
      drawOrbitingParticle();
      drawCenterCore();
    } else {
      // Particle is in foreground: draw center core, then particle over it
      drawCenterCore();
      drawOrbitingParticle();
    }

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
