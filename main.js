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
    } else {
      visualLaptopStatus.textContent = 'Disconnected';
      visualLaptopStatus.style.color = 'var(--error)';
      laptopGlow.classList.remove('active');
      visualTunnelLine.classList.remove('active');
      visualTunnelPulse.style.display = 'none';
      ctrlToggleLaptop.classList.remove('active');
      ctrlToggleLaptop.querySelector('.btn-text').textContent = 'Open Laptop (Connect)';
    }

    // Sandbox container state
    if (sb.status === 'RUNNING') {
      visualContainerSub.textContent = 'Active Loop';
      containerGlow.classList.add('active');
      containerGlow.className = 'node-glow-wrapper container-glow active';
      ctrlStepLoop.disabled = false;
      ctrlTriggerBreaker.disabled = false;
      ctrlTriggerBudget.disabled = false;
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
    } else if (sb.status === 'TRIPPED') {
      visualContainerSub.textContent = 'Stopped';
      containerGlow.classList.remove('active');
      ctrlStepLoop.disabled = true;
      ctrlTriggerBreaker.disabled = true;
      ctrlTriggerBudget.disabled = true;
    } else if (sb.status === 'COMPLETED') {
      visualContainerSub.textContent = 'Resolved';
      containerGlow.classList.add('active');
      containerGlow.className = 'node-glow-wrapper container-glow active';
      containerGlow.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
      containerGlow.style.borderColor = 'var(--success)';
      ctrlStepLoop.disabled = true;
      ctrlTriggerBreaker.disabled = true;
      ctrlTriggerBudget.disabled = true;
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
