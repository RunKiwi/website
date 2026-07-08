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

  // Interactive mouse deflection
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

  // Telemetry HUD Elements floating in background
  const telemetryLines = [
    { text: '[SYS_DAEMON_OK]', x: 30, y: 40, speed: 0.1, alpha: 0.3 },
    { text: '[TDD_CRITIC_ACTIVE]', x: 30, y: 60, speed: 0.15, alpha: 0.2 },
    { text: '[TUNNEL_SECURE_HTTP2]', x: 260, y: 260, speed: 0.08, alpha: 0.25 },
    { text: '[BUDGET_CAP: $10.00]', x: 280, y: 40, speed: 0.05, alpha: 0.3 },
    { text: '[ALIGNMENT_LOOP_RUNNING]', x: 120, y: 320, speed: 0.12, alpha: 0.2 }
  ];

  // Orbital particles parameters
  const particles = [];
  const particleCount = 35;
  const orbitRadiusX = 135;
  const orbitRadiusY = 55; // 3D tilt perspective
  const orbitTilt = -0.25; // radians of tilt

  // Main Orbiting Nodes with Trails
  const actor = { 
    angle: 0, 
    r: 10, 
    color: '#8ce62c', 
    label: 'Actor', 
    trail: [], 
    dashPhase: 0,
    pulseSize: 0
  };
  
  const critic = { 
    angle: Math.PI, 
    r: 10, 
    color: '#8b5cf6', 
    label: 'Critic', 
    trail: [], 
    dashPhase: 0,
    pulseSize: 0
  };

  // Generate modern tech code particles (tiny crosshairs / dots)
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      angle: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.012,
      distanceScale: 0.6 + Math.random() * 0.6,
      size: 1.5 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.4,
      color: Math.random() > 0.5 ? '#00f0ff' : '#8ce62c',
      type: Math.random() > 0.7 ? 'cross' : 'dot'
    });
  }

  let localLaptopNode = { x: 50, y: 0 };
  let cloudDaemonNode = { x: 0, y: 0 };
  let angle = 0;
  let daemonRotation = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cloudDaemonNode.x = canvas.width / 2;
    cloudDaemonNode.y = canvas.height / 2 - 20;
    localLaptopNode.y = canvas.height - 40;

    // Interpolate mouse coordinates
    if (mouse.targetX !== null) {
      if (mouse.x === null) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      }
    } else {
      mouse.x = null;
      mouse.y = null;
    }

    // 1. Draw Grid Backdrop (Subtle Tech Coordinate System)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
    ctx.lineWidth = 1;
    const gridSize = 40;
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

    // 2. Draw HUD Background Telemetry Text
    ctx.font = '9px var(--font-mono)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    telemetryLines.forEach(line => {
      ctx.fillStyle = `rgba(140, 230, 44, ${line.alpha * (0.6 + Math.sin(angle * line.speed * 2) * 0.4)})`;
      ctx.fillText(line.text, line.x, line.y);
    });

    // 3. Draw Rotating Faint Background Concentric Rings (Tech radar look)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 1.2;
    ctx.save();
    ctx.translate(cloudDaemonNode.x, cloudDaemonNode.y);
    ctx.rotate(orbitTilt);
    
    // Static concentric paths
    [90, 160, 220].forEach((r, idx) => {
      ctx.beginPath();
      if (idx % 2 === 0) {
        ctx.setLineDash([4, 12]);
      } else {
        ctx.setLineDash([2, 6]);
      }
      ctx.ellipse(0, 0, r, r * 0.4, 0, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.restore();
    ctx.setLineDash([]); // Reset

    // 4. Draw Connection Tunnel (Sine-wave glowing wire)
    const activeTunnel = simMode === 'tunnel';
    
    // Tunnel core wire
    ctx.beginPath();
    ctx.moveTo(localLaptopNode.x, localLaptopNode.y);
    const cp1x = localLaptopNode.x + 80, cp1y = localLaptopNode.y - 120;
    const cp2x = cloudDaemonNode.x - 120, cp2y = cloudDaemonNode.y + 120;
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, cloudDaemonNode.x, cloudDaemonNode.y);
    
    ctx.strokeStyle = activeTunnel ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 4;
    ctx.stroke();
    
    ctx.strokeStyle = activeTunnel ? '#00f0ff' : 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw wavy sine wave wrapping around the tunnel path
    if (activeTunnel) {
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      const waveSegments = 40;
      for (let i = 0; i <= waveSegments; i++) {
        const t = i / waveSegments;
        // Bezier points
        const bx = Math.pow(1-t, 3)*localLaptopNode.x + 3*Math.pow(1-t, 2)*t*cp1x + 3*(1-t)*Math.pow(t, 2)*cp2x + Math.pow(t, 3)*cloudDaemonNode.x;
        const by = Math.pow(1-t, 3)*localLaptopNode.y + 3*Math.pow(1-t, 2)*t*cp1y + 3*(1-t)*Math.pow(t, 2)*cp2y + Math.pow(t, 3)*cloudDaemonNode.y;
        
        // Offset normal to curve
        const waveOffset = Math.sin(t * Math.PI * 8 - angle * 4) * 6;
        
        // Approximation of normal vector by forward point
        const tNext = Math.min(1, t + 0.01);
        const bxNext = Math.pow(1-tNext, 3)*localLaptopNode.x + 3*Math.pow(1-tNext, 2)*tNext*cp1x + 3*(1-tNext)*Math.pow(tNext, 2)*cp2x + Math.pow(tNext, 3)*cloudDaemonNode.x;
        const byNext = Math.pow(1-tNext, 3)*localLaptopNode.y + 3*Math.pow(1-tNext, 2)*tNext*cp1y + 3*(1-tNext)*Math.pow(tNext, 2)*cp2y + Math.pow(tNext, 3)*cloudDaemonNode.y;
        
        const dx = bxNext - bx;
        const dy = byNext - by;
        const len = Math.sqrt(dx*dx + dy*dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        
        if (i === 0) {
          ctx.moveTo(bx + nx * waveOffset, by + ny * waveOffset);
        } else {
          ctx.lineTo(bx + nx * waveOffset, by + ny * waveOffset);
        }
      }
      ctx.stroke();
    }

    // Traveling glowing packet streams
    if (activeTunnel) {
      const packetCount = 2;
      for (let pIndex = 0; pIndex < packetCount; pIndex++) {
        const offset = pIndex / packetCount;
        const t = (angle * 0.15 + offset) % 1.0;
        
        // Find position on Bezier
        const px = Math.pow(1-t, 3)*localLaptopNode.x + 3*Math.pow(1-t, 2)*t*cp1x + 3*(1-t)*Math.pow(t, 2)*cp2x + Math.pow(t, 3)*cloudDaemonNode.x;
        const py = Math.pow(1-t, 3)*localLaptopNode.y + 3*Math.pow(1-t, 2)*t*cp1y + 3*(1-t)*Math.pow(t, 2)*cp2y + Math.pow(t, 3)*cloudDaemonNode.y;

        // Radial glow grad for packet
        const grad = ctx.createRadialGradient(px, py, 1, px, py, 12);
        grad.addColorStop(0, '#00f0ff');
        grad.addColorStop(0.3, 'rgba(0, 240, 255, 0.6)');
        grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 12, 0, Math.PI*2);
        ctx.fill();
        
        // Core pulse dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI*2);
        ctx.fill();
      }
    }

    // 5. Draw Local Laptop Node
    ctx.fillStyle = '#090e17';
    ctx.strokeStyle = activeTunnel ? '#00f0ff' : 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(localLaptopNode.x, localLaptopNode.y, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Outer spinning bracket for laptop
    ctx.strokeStyle = activeTunnel ? 'rgba(0, 240, 255, 0.4)' : 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.save();
    ctx.translate(localLaptopNode.x, localLaptopNode.y);
    ctx.rotate(-angle * 0.5);
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    ctx.setLineDash([]); // Reset

    // Local Node inner text HUD labels
    ctx.fillStyle = activeTunnel ? '#00f0ff' : 'var(--text-dim)';
    ctx.font = 'bold 9px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CLI', localLaptopNode.x, localLaptopNode.y);

    // 6. Draw Orbit Path Ellipse (Modern 3D tilting grid)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    ctx.save();
    ctx.translate(cloudDaemonNode.x, cloudDaemonNode.y);
    ctx.rotate(orbitTilt);
    ctx.beginPath();
    ctx.ellipse(0, 0, orbitRadiusX, orbitRadiusY, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 7. Draw Swirling Minor Telemetry Particles
    particles.forEach(p => {
      p.angle += p.speed;
      
      let x3d = Math.cos(p.angle) * orbitRadiusX * p.distanceScale;
      let y3d = Math.sin(p.angle) * orbitRadiusY * p.distanceScale;
      
      let rx = x3d * Math.cos(orbitTilt) - y3d * Math.sin(orbitTilt);
      let ry = x3d * Math.sin(orbitTilt) + y3d * Math.cos(orbitTilt);

      let finalX = cloudDaemonNode.x + rx;
      let finalY = cloudDaemonNode.y + ry;

      // Mouse interaction magnetic push
      if (mouse.x !== null) {
        const dx = mouse.x - finalX;
        const dy = mouse.y - finalY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 60) {
          const force = (60 - dist) * 0.18;
          finalX -= (dx / dist) * force;
          finalY -= (dy / dist) * force;
        }
      }

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      const zScale = 0.6 + (ry + orbitRadiusX) / (orbitRadiusX * 2) * 0.6;
      
      if (p.type === 'cross') {
        // Draw crosshair particle
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(finalX - 3 * zScale, finalY);
        ctx.lineTo(finalX + 3 * zScale, finalY);
        ctx.moveTo(finalX, finalY - 3 * zScale);
        ctx.lineTo(finalX, finalY + 3 * zScale);
        ctx.stroke();
      } else {
        // Draw tiny circle particle
        ctx.beginPath();
        ctx.arc(finalX, finalY, p.size * zScale * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
    });

    // 8. Actor & Critic Orbit Entities & Motion Trails
    actor.angle += 0.016;
    critic.angle += 0.016;

    [actor, critic].forEach(node => {
      let x3d = Math.cos(node.angle) * orbitRadiusX;
      let y3d = Math.sin(node.angle) * orbitRadiusY;
      
      let rx = x3d * Math.cos(orbitTilt) - y3d * Math.sin(orbitTilt);
      let ry = x3d * Math.sin(orbitTilt) + y3d * Math.cos(orbitTilt);

      let finalX = cloudDaemonNode.x + rx;
      let finalY = cloudDaemonNode.y + ry;

      // Mouse interaction
      if (mouse.x !== null) {
        const dx = mouse.x - finalX;
        const dy = mouse.y - finalY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 90) {
          const force = (90 - dist) * 0.14;
          finalX -= (dx / dist) * force;
          finalY -= (dy / dist) * force;
        }
      }

      // Track trail history for ghosting motion trails
      node.trail.push({ x: finalX, y: finalY });
      if (node.trail.length > 12) {
        node.trail.shift();
      }

      const zScale = 0.7 + (ry + orbitRadiusY) / (orbitRadiusY * 2) * 0.6;

      // Draw Motion Trail Paths
      if (node.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(node.trail[0].x, node.trail[0].y);
        for (let j = 1; j < node.trail.length; j++) {
          ctx.lineTo(node.trail[j].x, node.trail[j].y);
        }
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2 * zScale;
        ctx.globalAlpha = 0.15;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }

      // HUD crosshairs outer ring
      node.dashPhase += 0.02;
      ctx.strokeStyle = node.color;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      ctx.save();
      ctx.translate(finalX, finalY);
      ctx.rotate(node.dashPhase);
      ctx.beginPath();
      ctx.arc(0, 0, (node.r + 6) * zScale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      ctx.setLineDash([]); // Reset

      // Pulse ring expansion
      node.pulseSize = (node.pulseSize + 0.3) % 18;
      ctx.strokeStyle = node.color;
      ctx.globalAlpha = (18 - node.pulseSize) / 18 * 0.4;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(finalX, finalY, (node.r + node.pulseSize) * zScale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      // Glow Gradient Center Circle
      const glowGrad = ctx.createRadialGradient(finalX, finalY, 1, finalX, finalY, node.r * 2 * zScale);
      glowGrad.addColorStop(0, '#ffffff');
      glowGrad.addColorStop(0.3, node.color);
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(finalX, finalY, node.r * 1.8 * zScale, 0, Math.PI * 2);
      ctx.fill();

      // Small solid core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(finalX, finalY, 3 * zScale, 0, Math.PI * 2);
      ctx.fill();

      // Custom HUD text tag for Actor/Critic
      ctx.font = `bold ${Math.round(9 * zScale)}px var(--font-mono)`;
      ctx.fillStyle = node.color;
      const textWidth = ctx.measureText(node.label).width;
      
      // Draw small card background for text label
      ctx.fillStyle = 'rgba(6, 7, 10, 0.85)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(finalX - textWidth/2 - 4, finalY - (node.r * zScale * 2.3) - 6, textWidth + 8, 12, 3);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, finalX, finalY - (node.r * zScale * 2.3));
    });

    // 9. Draw Alignment Vector Link (Connecting Actor & Critic)
    const actorPos = actor.trail[actor.trail.length - 1];
    const criticPos = critic.trail[critic.trail.length - 1];
    if (actorPos && criticPos) {
      ctx.strokeStyle = 'rgba(140, 230, 44, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(actorPos.x, actorPos.y);
      ctx.lineTo(criticPos.x, criticPos.y);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Center tick mark on vector line
      const mx = (actorPos.x + criticPos.x) / 2;
      const my = (actorPos.y + criticPos.y) / 2;
      ctx.fillStyle = '#8ce62c';
      ctx.font = '8px var(--font-mono)';
      ctx.fillText('ALIGN_VEC', mx, my - 6);
    }

    // 10. Draw Cloud Daemon (Concentric high-tech rings & pulsing centerpiece)
    daemonRotation += 0.005;
    
    // Radial back glow for cloud
    const cloudGlow = ctx.createRadialGradient(cloudDaemonNode.x, cloudDaemonNode.y, 1, cloudDaemonNode.x, cloudDaemonNode.y, 50);
    cloudGlow.addColorStop(0, 'rgba(140, 230, 44, 0.18)');
    cloudGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = cloudGlow;
    ctx.beginPath();
    ctx.arc(cloudDaemonNode.x, cloudDaemonNode.y, 50, 0, Math.PI*2);
    ctx.fill();

    // Concentric ticking bracket 1
    ctx.strokeStyle = 'rgba(140, 230, 44, 0.3)';
    ctx.lineWidth = 1.2;
    ctx.save();
    ctx.translate(cloudDaemonNode.x, cloudDaemonNode.y);
    ctx.rotate(daemonRotation);
    ctx.beginPath();
    ctx.arc(0, 0, 32, 0, Math.PI * 0.4);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 32, Math.PI, Math.PI * 1.4);
    ctx.stroke();
    ctx.restore();

    // Concentric ticking bracket 2 (opposite spin)
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
    ctx.save();
    ctx.translate(cloudDaemonNode.x, cloudDaemonNode.y);
    ctx.rotate(-daemonRotation * 1.5);
    ctx.beginPath();
    ctx.setLineDash([2, 5]);
    ctx.arc(0, 0, 26, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    ctx.setLineDash([]);

    // Central core circular node
    const corePulseSize = Math.sin(angle * 2) * 2 + 18;
    ctx.fillStyle = '#06070a';
    ctx.strokeStyle = '#8ce62c';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cloudDaemonNode.x, cloudDaemonNode.y, corePulseSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Core pulsing dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cloudDaemonNode.x, cloudDaemonNode.y, 4, 0, Math.PI * 2);
    ctx.fill();

    // Central node textual HUD
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px var(--font-heading)';
    ctx.textAlign = 'center';
    ctx.fillText('KIWI_D', cloudDaemonNode.x, cloudDaemonNode.y - 4);
    ctx.fillStyle = '#8ce62c';
    ctx.font = 'bold 7px var(--font-mono)';
    ctx.fillText('SANDBOX', cloudDaemonNode.x, cloudDaemonNode.y + 8);

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
