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
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
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

  // Interactive mouse tracking
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

  // Generative Particle System Settings
  const coreX = () => canvas.width / 2;
  const coreY = () => canvas.height / 2;
  
  // 1. Ambient Background Grid Particles (Vector Field)
  const gridParticles = [];
  const gridRows = 12;
  const gridCols = 16;
  
  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridCols; c++) {
      gridParticles.push({
        baseX: 0,
        baseY: 0,
        x: 0,
        y: 0,
        row: r,
        col: c,
        size: Math.random() * 1 + 0.5,
        alpha: Math.random() * 0.2 + 0.05
      });
    }
  }

  // 2. Tilted Orbit Ring Particles
  const orbitRings = [
    { radiusX: 180, radiusY: 55, tilt: -0.25, speed: 0.012, color: 'var(--primary)', count: 18 },
    { radiusX: 130, radiusY: 40, tilt: 0.15, speed: -0.015, color: 'var(--secondary)', count: 12 },
    { radiusX: 80, radiusY: 25, tilt: -0.1, speed: 0.02, color: '#ffffff', count: 8 }
  ];

  // Initialize ring particle angles
  orbitRings.forEach(ring => {
    ring.particles = [];
    for (let i = 0; i < ring.count; i++) {
      ring.particles.push({
        angle: (i / ring.count) * Math.PI * 2,
        size: Math.random() * 2 + 1.5,
        alpha: Math.random() * 0.5 + 0.4
      });
    }
  });

  // 3. Flowing Secret Tunnel Streams
  const streams = [];
  const maxStreams = 4;
  for (let i = 0; i < maxStreams; i++) {
    streams.push({
      progress: Math.random(),
      speed: 0.005 + Math.random() * 0.005,
      startX: -40,
      startY: () => canvas.height + 40,
      controlX1: () => canvas.width * 0.2,
      controlY1: () => canvas.height * 0.7,
      controlX2: () => canvas.width * 0.4,
      controlY2: () => canvas.height * 0.2,
      color: 'rgba(0, 240, 255, 0.7)',
      width: Math.random() * 2 + 1
    });
  }

  // 4. Actor-Critic Loop Execution Rings
  const loopRings = [];
  let ringTimer = 0;

  let globalAngle = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    globalAngle += 0.01;

    const cx = coreX();
    const cy = coreY();

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

    // A. Draw & Warp Vector Dot Grid
    gridParticles.forEach(p => {
      // Calculate coordinates dynamically to fill parent canvas bounds
      const spacingX = canvas.width / (gridCols - 1);
      const spacingY = canvas.height / (gridRows - 1);
      p.baseX = p.col * spacingX;
      p.baseY = p.row * spacingY;

      // Mouse gravity repulsion
      let targetX = p.baseX;
      let targetY = p.baseY;

      if (mouse.x !== null) {
        const dx = mouse.x - p.baseX;
        const dy = mouse.y - p.baseY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          const force = (120 - dist) * 0.15;
          targetX -= (dx / dist) * force;
          targetY -= (dy / dist) * force;
        }
      }

      // Easing to current position
      p.x += (targetX - p.x) * 0.1;
      p.y += (targetY - p.y) * 0.1;

      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // B. Draw Background Ambient Glows
    const radialGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 220);
    radialGlow.addColorStop(0, 'rgba(140, 230, 44, 0.06)');
    radialGlow.addColorStop(0.5, 'rgba(0, 240, 255, 0.03)');
    radialGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radialGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, 220, 0, Math.PI * 2);
    ctx.fill();

    // C. Draw Credential Flow Streams (Tunnel mode)
    if (simMode === 'tunnel') {
      streams.forEach((stream, idx) => {
        stream.progress += stream.speed;
        if (stream.progress > 1) {
          stream.progress = 0;
        }

        const startX = stream.startX;
        const startY = stream.startY();
        const cp1x = stream.controlX1();
        const cp1y = stream.controlY1();
        const cp2x = stream.controlX2();
        const cp2y = stream.controlY2();

        // Draw flowing path ribbon behind particles
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
        ctx.lineWidth = stream.width;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, cx, cy);
        ctx.stroke();

        // Particle calculations (Bezier curve mapping)
        const t = stream.progress;
        const px = Math.pow(1-t, 3)*startX + 3*Math.pow(1-t, 2)*t*cp1x + 3*(1-t)*Math.pow(t, 2)*cp2x + Math.pow(t, 3)*cx;
        const py = Math.pow(1-t, 3)*startY + 3*Math.pow(1-t, 2)*t*cp1y + 3*(1-t)*Math.pow(t, 2)*cp2y + Math.pow(t, 3)*cy;

        // Draw particle head
        const grad = ctx.createRadialGradient(px, py, 1, px, py, 8);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, 'rgba(0, 240, 255, 0.8)');
        grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // D. Draw Actor-Critic Loop Execution Rings (Loop mode)
    if (simMode === 'loop') {
      ringTimer++;
      if (ringTimer % 80 === 0) {
        loopRings.push({ radius: 30, maxRadius: 180, alpha: 0.6, speed: 1.2 });
      }

      for (let i = loopRings.length - 1; i >= 0; i--) {
        const ring = loopRings[i];
        ring.radius += ring.speed;
        ring.alpha = 1 - (ring.radius / ring.maxRadius);

        if (ring.radius > ring.maxRadius) {
          loopRings.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(140, 230, 44, ${ring.alpha * 0.15})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 12]);
        ctx.beginPath();
        ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // E. Draw Concentric 3D Tilted Orbit Rings & Orbiting Nodes
    orbitRings.forEach(ring => {
      // Draw actual path ellipse tilted in 3D space
      ctx.strokeStyle = `rgba(255, 255, 255, 0.03)`;
      ctx.lineWidth = 1;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ring.tilt);
      ctx.beginPath();
      ctx.ellipse(0, 0, ring.radiusX, ring.radiusY, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Render tilted orbiting particles
      ring.particles.forEach(p => {
        p.angle += ring.speed;
        
        const cosAngle = Math.cos(p.angle);
        const sinAngle = Math.sin(p.angle);

        // Project coordinate using tilt matrix
        let x3d = cosAngle * ring.radiusX;
        let y3d = sinAngle * ring.radiusY;
        let rx = x3d * Math.cos(ring.tilt) - y3d * Math.sin(ring.tilt);
        let ry = x3d * Math.sin(ring.tilt) + y3d * Math.cos(ring.tilt);

        let finalX = cx + rx;
        let finalY = cy + ry;

        // Perspective scaling (sinAngle represents depth -1 to 1)
        const scale = 0.6 + (sinAngle + 1) / 2 * 0.6;
        const color = ring.color === 'var(--primary)' ? 'rgba(140, 230, 44, ' : 'rgba(0, 240, 255, ';

        // Render glowing particle node
        const glow = ctx.createRadialGradient(finalX, finalY, 0.5, finalX, finalY, p.size * 3 * scale);
        glow.addColorStop(0, '#ffffff');
        glow.addColorStop(0.3, `${color}${p.alpha})`);
        glow.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(finalX, finalY, p.size * 3 * scale, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    // F. Draw Modern Cybernetic Pulsing Core
    // Outer breathing circle
    const coreBreathing = Math.sin(globalAngle * 3.5) * 2 + 25;
    ctx.strokeStyle = 'rgba(140, 230, 44, 0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.arc(cx, cy, coreBreathing + 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Glassmorphic core ring
    ctx.fillStyle = 'rgba(11, 15, 26, 0.9)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Glowing core dots representing secure agent controls
    const innerBreathing = Math.sin(globalAngle * 2.5) * 1.5 + 14;
    const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, innerBreathing);
    coreGrad.addColorStop(0, '#8ce62c');
    coreGrad.addColorStop(0.4, 'rgba(140, 230, 44, 0.3)');
    coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, innerBreathing, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    ctx.fill();

    animationFrameId = requestAnimationFrame(draw);
  }

  draw();
}

// ==========================================
// 2. Interactive Loop Simulator
// ==========================================
function initSimulator() {
  const telemetrySandboxes = document.getElementById('telemetry-sandboxes');
  const telemetryTunnels = document.getElementById('telemetry-tunnels');
  const telemetryWarning = document.getElementById('telemetry-warning-indicator');
  const telemetryWarningText = document.getElementById('telemetry-warning-text');

  const sbSteelwing = document.getElementById('sb-steelwing');
  const sbMicrofish = document.getElementById('sb-microfish');
  const sbThreatmapper = document.getElementById('sb-threatmapper');

  const visualTitle = document.getElementById('visual-sandbox-title');
  const visualStatus = document.getElementById('visual-sandbox-status');
  const visualLaptopStatus = document.getElementById('visual-laptop-status');
  const visualTunnelLine = document.getElementById('visual-tunnel-line');
  const visualTunnelPulse = document.getElementById('visual-tunnel-pulse');
  const visualContainerSub = document.getElementById('visual-container-sub');

  const laptopGlow = document.getElementById('laptop-glow-indicator');
  const containerGlow = document.getElementById('container-glow-indicator');

  const mLaptopStatus = document.getElementById('m-laptop-status');
  const mTunnelLine = document.getElementById('m-tunnel-line');
  const mTunnelPulse = document.getElementById('m-tunnel-pulse');
  const mContainerSub = document.getElementById('m-container-sub');
  const mLaptopGlow = document.getElementById('m-laptop-glow');
  const mContainerGlow = document.getElementById('m-container-glow');

  const slotGithub = document.getElementById('slot-github');
  const slotDb = document.getElementById('slot-db');
  const slotAws = document.getElementById('slot-aws');

  const budgetFill = document.getElementById('visual-budget-fill');
  const budgetSpent = document.getElementById('visual-budget-spent');
  const breakerStatus = document.getElementById('visual-breaker-status');
  const breakerText = document.getElementById('visual-breaker-text');

  const ctrlToggleLaptop = document.getElementById('ctrl-toggle-laptop');
  const ctrlStepLoop = document.getElementById('ctrl-step-loop');
  const ctrlTriggerBreaker = document.getElementById('ctrl-trigger-breaker');
  const ctrlTriggerBudget = document.getElementById('ctrl-trigger-budget');
  const ctrlClearLogs = document.getElementById('ctrl-clear-logs');
  const logsWindow = document.getElementById('console-logs-content');

  if (!sbSteelwing) return;

  // 1. Simulator Workspace States
  const sandboxes = {
    steelwing: {
      task: 'task-3831',
      title: 'steelwing (TDD loop)',
      desc: 'Fix division by zero inside Divide()',
      tech: 'Golang • Docker v1.21',
      status: 'RUNNING', // RUNNING, PAUSED, COMPLETED, TRIPPED
      budgetSpent: 1.50,
      budgetLimit: 10.00,
      breakerStatus: 'STABLE', // STABLE, TRIPPED
      cache: {
        GITHUB_TOKEN: 'cached',
        DATABASE_URL: 'empty',
        AWS_SECRET: 'empty'
      },
      laptopOpen: true,
      logs: [
        { text: 'Initializing task-3831 sandbox context...', type: 'info' },
        { text: 'Local CLI tunnel established. Handshake complete.', type: 'tunnel' },
        { text: 'Golang compiler environment loaded in Docker container.', type: 'success' },
        { text: 'Executing tests: `go test ./pkg/math...` - Output: FAILED (Division by zero)', type: 'cmd' },
        { text: 'Actor editing codebase math_utils.go (L43: add guard check).', type: 'info' }
      ]
    },
    microfish: {
      task: 'task-3832',
      title: 'microfish (secrets tunnel)',
      desc: 'Upload credentials & test S3 pipeline',
      tech: 'Python • Boto3 Sandbox',
      status: 'PAUSED',
      budgetSpent: 0.45,
      budgetLimit: 5.00,
      breakerStatus: 'STABLE',
      cache: {
        GITHUB_TOKEN: 'cached',
        DATABASE_URL: 'empty',
        AWS_SECRET: 'empty'
      },
      laptopOpen: false,
      logs: [
        { text: 'Task 3832 state restored from db checkpoints.', type: 'info' },
        { text: 'Boto3 client attempting initialization inside sandbox...', type: 'info' },
        { text: 'Sandbox requests credentials vault: AWS_SECRET', type: 'tunnel' },
        { text: 'Cache lookup failed. Requesting credentials via local tunnel...', type: 'warning' },
        { text: 'Tunnel is offline (Laptop closed). Cannot resolve AWS_SECRET.', type: 'warning' },
        { text: 'Task state: PAUSED. Waiting for client CLI to reconnect.', type: 'warning' }
      ]
    },
    threatmapper: {
      task: 'task-3833',
      title: 'threatmapper (safety cap)',
      desc: 'Loop refactoring & security checks',
      tech: 'Node.js • Scanner Engine',
      status: 'RUNNING',
      budgetSpent: 8.80,
      budgetLimit: 10.00,
      breakerStatus: 'STABLE',
      cache: {
        GITHUB_TOKEN: 'cached',
        DATABASE_URL: 'cached',
        AWS_SECRET: 'empty'
      },
      laptopOpen: true,
      logs: [
        { text: 'Task 3833 sandbox container initialized successfully.', type: 'info' },
        { text: 'Multiplexed reverse tunnels connected on port 8080.', type: 'tunnel' },
        { text: 'Pulled GITHUB_TOKEN and DATABASE_URL on-demand.', type: 'success' },
        { text: 'Executing checks: `npm run security-scan` inside sandbox container.', type: 'cmd' },
        { text: 'Analyzing dependency tree files for high CVE alerts...', type: 'info' }
      ]
    }
  };

  let activeSandboxKey = 'steelwing';

  // 2. Diagnostic logging
  function log(sandboxKey, text, type = 'info') {
    const timeStr = new Date().toLocaleTimeString();
    const cleanLog = { text: `[${timeStr}] ${text}`, type };
    sandboxes[sandboxKey].logs.push(cleanLog);

    if (sandboxKey === activeSandboxKey) {
      appendLogToWindow(cleanLog);
    }
  }

  function appendLogToWindow(logItem) {
    const row = document.createElement('div');
    row.className = `log-row ${logItem.type}`;
    row.textContent = logItem.text;
    logsWindow.appendChild(row);
    logsWindow.scrollTop = logsWindow.scrollHeight;
  }

  // 3. UI Synchronization
  function updateUI() {
    const sb = sandboxes[activeSandboxKey];

    // Update headers and titles
    visualTitle.textContent = `SANDBOX: ${sb.task} (${activeSandboxKey})`;
    visualStatus.textContent = sb.status;
    visualStatus.className = `v-status-pill ${sb.status.toLowerCase()}`;
    
    // Laptop state
    if (sb.laptopOpen) {
      visualLaptopStatus.textContent = 'Connected';
      visualLaptopStatus.style.color = 'var(--secondary)';
      laptopGlow.classList.add('active');
      visualTunnelLine.classList.add('active');
      visualTunnelPulse.style.display = 'block';
      ctrlToggleLaptop.classList.add('active');
      ctrlToggleLaptop.querySelector('.btn-text').textContent = 'Close Laptop (Disconnect)';

      // Mobile
      mLaptopStatus.textContent = 'Connected';
      mLaptopStatus.style.color = 'var(--secondary)';
      mLaptopGlow.classList.add('active');
      mTunnelLine.classList.add('active');
      mTunnelPulse.style.display = 'block';
    } else {
      visualLaptopStatus.textContent = 'Disconnected';
      visualLaptopStatus.style.color = 'var(--error)';
      laptopGlow.classList.remove('active');
      visualTunnelLine.classList.remove('active');
      visualTunnelPulse.style.display = 'none';
      ctrlToggleLaptop.classList.remove('active');
      ctrlToggleLaptop.querySelector('.btn-text').textContent = 'Open Laptop (Connect)';

      // Mobile
      mLaptopStatus.textContent = 'Disconnected';
      mLaptopStatus.style.color = 'var(--error)';
      mLaptopGlow.classList.remove('active');
      mTunnelLine.classList.remove('active');
      mTunnelPulse.style.display = 'none';
    }

    // Sandbox container state
    if (sb.status === 'RUNNING') {
      visualContainerSub.textContent = 'Active Loop';
      containerGlow.classList.add('active');
      containerGlow.className = 'node-glow-wrapper container-glow active';
      ctrlStepLoop.disabled = false;
      ctrlTriggerBreaker.disabled = false;
      ctrlTriggerBudget.disabled = false;

      // Mobile
      mContainerSub.textContent = 'Active Loop';
      mContainerGlow.classList.add('active');
      mContainerGlow.className = 'node-glow-wrapper-mobile container-glow active';
    } else if (sb.status === 'PAUSED') {
      visualContainerSub.textContent = 'Paused';
      containerGlow.classList.add('active');
      containerGlow.className = 'node-glow-wrapper container-glow active';
      // yellow pulse border for paused container
      containerGlow.style.boxShadow = '0 0 15px rgba(245, 158, 11, 0.4)';
      containerGlow.style.borderColor = 'var(--warning)';
      ctrlStepLoop.disabled = true;
      ctrlTriggerBreaker.disabled = true;
      ctrlTriggerBudget.disabled = true;

      // Mobile
      mContainerSub.textContent = 'Paused';
      mContainerGlow.classList.add('active');
      mContainerGlow.className = 'node-glow-wrapper-mobile container-glow active';
      mContainerGlow.style.boxShadow = '0 0 15px rgba(245, 158, 11, 0.4)';
      mContainerGlow.style.borderColor = 'var(--warning)';
    } else if (sb.status === 'TRIPPED') {
      visualContainerSub.textContent = 'Stopped';
      containerGlow.classList.remove('active');
      ctrlStepLoop.disabled = true;
      ctrlTriggerBreaker.disabled = true;
      ctrlTriggerBudget.disabled = true;

      // Mobile
      mContainerSub.textContent = 'Stopped';
      mContainerGlow.classList.remove('active');
    } else if (sb.status === 'COMPLETED') {
      visualContainerSub.textContent = 'Resolved';
      containerGlow.classList.add('active');
      containerGlow.className = 'node-glow-wrapper container-glow active';
      containerGlow.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
      containerGlow.style.borderColor = 'var(--success)';
      ctrlStepLoop.disabled = true;
      ctrlTriggerBreaker.disabled = true;
      ctrlTriggerBudget.disabled = true;

      // Mobile
      mContainerSub.textContent = 'Resolved';
      mContainerGlow.classList.add('active');
      mContainerGlow.className = 'node-glow-wrapper-mobile container-glow active';
      mContainerGlow.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
      mContainerGlow.style.borderColor = 'var(--success)';
    }

    // Cache vaults
    [
      { key: 'GITHUB_TOKEN', el: slotGithub },
      { key: 'DATABASE_URL', el: slotDb },
      { key: 'AWS_SECRET', el: slotAws }
    ].forEach(item => {
      const state = sb.cache[item.key];
      if (state === 'cached') {
        item.el.className = 'cache-pill cached';
        item.el.textContent = `${item.key}: Cached`;
      } else {
        item.el.className = 'cache-pill empty';
        item.el.textContent = `${item.key}: Empty`;
      }
    });

    // Budget Cap
    const spentPercent = (sb.budgetSpent / sb.budgetLimit) * 100;
    budgetFill.style.width = `${spentPercent}%`;
    budgetSpent.textContent = `$${sb.budgetSpent.toFixed(2)} Spent`;
    document.querySelector('.metrics-grid .metric-box:nth-child(2) .m-progress-labels span:nth-child(2)').textContent = `$${sb.budgetLimit.toFixed(2)} Limit`;

    // Circuit Breaker
    if (sb.breakerStatus === 'STABLE') {
      breakerStatus.className = 'm-breaker-status status-stable';
      breakerText.textContent = 'STABLE (No loops)';
    } else {
      breakerStatus.className = 'm-breaker-status status-alert';
      breakerText.textContent = 'TRIPPED (Recursion)';
    }

    // Populate log entries
    logsWindow.innerHTML = '';
    sb.logs.forEach(logItem => {
      appendLogToWindow(logItem);
    });

    // Update global telemetry dashboard headers
    let liveTunnels = 0;
    let hasAlerts = false;
    Object.keys(sandboxes).forEach(k => {
      if (sandboxes[k].laptopOpen) liveTunnels++;
      if (sandboxes[k].breakerStatus === 'TRIPPED' || sandboxes[k].budgetSpent >= sandboxes[k].budgetLimit) {
        hasAlerts = true;
      }
      
      // Update sidebar list items badge states
      const badge = document.getElementById(`sb-badge-${k}`);
      if (badge) {
        badge.className = `sb-badge ${sandboxes[k].status.toLowerCase()}`;
        badge.textContent = sandboxes[k].status;
      }
    });
    telemetryTunnels.textContent = `${liveTunnels} / 3 Connected`;
    
    if (hasAlerts) {
      telemetryWarning.style.display = 'flex';
      telemetryWarningText.textContent = 'ALERT DETECTED';
    } else {
      telemetryWarning.style.display = 'none';
    }
  }

  // 4. Sidebar Workspace Navigation
  [
    { btn: sbSteelwing, key: 'steelwing' },
    { btn: sbMicrofish, key: 'microfish' },
    { btn: sbThreatmapper, key: 'threatmapper' }
  ].forEach(item => {
    item.btn.addEventListener('click', () => {
      document.querySelectorAll('.sandbox-item').forEach(el => el.classList.remove('active'));
      item.btn.classList.add('active');
      activeSandboxKey = item.key;
      updateUI();
    });
  });

  // 5. Laptop Connection Toggle Trigger
  ctrlToggleLaptop.addEventListener('click', () => {
    const sb = sandboxes[activeSandboxKey];
    sb.laptopOpen = !sb.laptopOpen;

    if (sb.laptopOpen) {
      log(activeSandboxKey, 'Local client re-established tunnel stream.', 'tunnel');
      if (sb.status === 'PAUSED') {
        sb.status = 'RUNNING';
        log(activeSandboxKey, 'Resuming paused sandbox execution thread.', 'success');
      }
    } else {
      log(activeSandboxKey, 'Laptop tunnel connection severed (Laptop Closed).', 'warning');
      if (sb.status === 'RUNNING') {
        // Check if required secrets are cached
        const missingKey = Object.keys(sb.cache).find(k => sb.cache[k] === 'empty');
        if (missingKey) {
          // If we need a secret but tunnel is dead, pause!
          sb.status = 'PAUSED';
          log(activeSandboxKey, `Daemon lookup failed for: ${missingKey}. Reverse tunnel offline.`, 'warning');
          log(activeSandboxKey, 'Task state paused. Daemon awaiting tunnel reconnection.', 'warning');
        } else {
          log(activeSandboxKey, 'All required credentials cached in-memory. Execution loops continue headless.', 'success');
        }
      }
    }
    updateUI();
  });

  // 6. Step Agent TDD Loop Trigger
  ctrlStepLoop.addEventListener('click', () => {
    const sb = sandboxes[activeSandboxKey];
    if (sb.status !== 'RUNNING') return;

    // Check budget limit
    if (sb.budgetSpent >= sb.budgetLimit) {
      sb.status = 'PAUSED';
      log(activeSandboxKey, 'Budget limit reached. Pausing loop.', 'warning');
      updateUI();
      return;
    }

    sb.budgetSpent += 0.50; // loop step overhead cost

    // Mock TDD Step iteration logs
    const stepsPool = [
      { text: '[ACTOR] Evaluating test logs. Editing main code block...', type: 'info' },
      { text: '[SANDBOX] Docker compiling codebase... compilation success.', type: 'cmd' },
      { text: '[SANDBOX] Spawning Docker Go check: `go test ./...`', type: 'cmd' }
    ];
    
    stepsPool.forEach((s, idx) => {
      setTimeout(() => {
        log(activeSandboxKey, s.text, s.type);
        if (idx === stepsPool.length - 1) {
          // Finish step
          if (Math.random() > 0.6) {
            sb.status = 'COMPLETED';
            log(activeSandboxKey, '[CRITIC] TDD Loop verification PASSED. Compiler exit: 0. Tests passed.', 'success');
            log(activeSandboxKey, 'Task RESOLVED. Saving fixed codebase ZIP archive.', 'success');
          } else {
            log(activeSandboxKey, '[CRITIC] Compiler stdout matched failure: nil pointer check. Refining diff.', 'warning');
          }
          updateUI();
        }
      }, idx * 400);
    });
  });

  // 7. Safety: Trigger Circuit Breaker Crash
  ctrlTriggerBreaker.addEventListener('click', () => {
    const sb = sandboxes[activeSandboxKey];
    if (sb.status !== 'RUNNING') return;

    log(activeSandboxKey, '[ACTOR] Pushing modified loop statements.', 'info');
    log(activeSandboxKey, '[SANDBOX] Running: `go test ./pkg/...`', 'cmd');
    
    setTimeout(() => {
      log(activeSandboxKey, '[CRITIC] Test output matched previous failure signature (Loop #3).', 'warning');
      log(activeSandboxKey, '[SAFETY] Infinite loop recursion alert tripped by identical test failures!', 'warning');
      sb.breakerStatus = 'TRIPPED';
      sb.status = 'TRIPPED';
      log(activeSandboxKey, 'Circuit Breaker TRIPPED. Docker container killed to prevent CPU/token drainage.', 'warning');
      updateUI();
    }, 800);
  });

  // 8. Safety: Trigger Budget Exhaustion
  ctrlTriggerBudget.addEventListener('click', () => {
    const sb = sandboxes[activeSandboxKey];
    if (sb.status !== 'RUNNING') return;

    sb.budgetSpent = sb.budgetLimit;
    log(activeSandboxKey, `[BUDGET] Cost threshold exceeded: $${sb.budgetSpent.toFixed(2)} spent.`, 'warning');
    sb.status = 'PAUSED';
    log(activeSandboxKey, 'Safety Cap triggered: Budget limit exceeded. Pausing container execution.', 'warning');
    updateUI();
  });

  // 9. Clear Logs
  ctrlClearLogs.addEventListener('click', () => {
    sandboxes[activeSandboxKey].logs = [{ text: 'Logs cleared.', type: 'info' }];
    updateUI();
  });

  // 10. Background polling loop simulating network credential requests
  setInterval(() => {
    Object.keys(sandboxes).forEach(k => {
      const sb = sandboxes[k];
      if (sb.status === 'RUNNING') {
        // Randomly simulate requesting credentials
        if (Math.random() > 0.8) {
          const emptyKeys = Object.keys(sb.cache).filter(key => sb.cache[key] === 'empty');
          if (emptyKeys.length > 0) {
            const keyNeeded = emptyKeys[Math.floor(Math.random() * emptyKeys.length)];
            log(k, `Daemon requests remote vault credential: ${keyNeeded}`, 'tunnel');
            
            if (sb.laptopOpen) {
              // Resolve
              setTimeout(() => {
                sb.cache[keyNeeded] = 'cached';
                log(k, `CLI client resolved ${keyNeeded} over tunnel. Storing in cache.`, 'success');
                updateUI();
              }, 600);
            } else {
              // Pause execution
              setTimeout(() => {
                sb.status = 'PAUSED';
                log(k, `Cache vault lookup failed for: ${keyNeeded}. Reverse tunnel is offline.`, 'warning');
                log(k, `Task execution state paused. Awaiting CLI client resume.`, 'warning');
                updateUI();
              }, 600);
            }
          }
        }
      }
    });
  }, 4000);

  // Initialize
  updateUI();
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
