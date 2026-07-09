'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [simulationMode, setSimulationMode] = useState<'loop' | 'tunnel'>('loop');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Interactive mouse tracking
    const mouse = { x: null as number | null, y: null as number | null, targetX: null as number | null, targetY: null as number | null };
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.targetX = null;
      mouse.targetY = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const coreX = () => canvas.width / 2;
    const coreY = () => canvas.height / 2;
    
    // 1. Ambient Background Grid Particles (Vector Field)
    const gridParticles: any[] = [];
    const gridRows = 12;
    const gridCols = 16;
    
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        gridParticles.push({
          baseX: 0, baseY: 0, x: 0, y: 0, row: r, col: c,
          size: Math.random() * 1 + 0.5,
          alpha: Math.random() * 0.2 + 0.05
        });
      }
    }

    // 2. Tilted Orbit Ring Particles
    const orbitRings = [
      { radiusX: 180, radiusY: 55, tilt: -0.25, speed: 0.012, color: 'var(--primary)', count: 18, particles: [] as any[] },
      { radiusX: 130, radiusY: 40, tilt: 0.15, speed: -0.015, color: 'var(--secondary)', count: 12, particles: [] as any[] },
      { radiusX: 80, radiusY: 25, tilt: -0.1, speed: 0.02, color: '#ffffff', count: 8, particles: [] as any[] }
    ];

    orbitRings.forEach(ring => {
      for (let i = 0; i < ring.count; i++) {
        ring.particles.push({
          angle: (i / ring.count) * Math.PI * 2,
          size: Math.random() * 2 + 1.5,
          alpha: Math.random() * 0.5 + 0.4
        });
      }
    });

    // 3. Flowing Secret Tunnel Streams
    const streams: any[] = [];
    for (let i = 0; i < 4; i++) {
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
    const loopRings: any[] = [];
    let ringTimer = 0;
    let globalAngle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      globalAngle += 0.01;

      const cx = coreX();
      const cy = coreY();

      if (mouse.targetX !== null && mouse.targetY !== null) {
        if (mouse.x === null || mouse.y === null) {
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

      // A. Draw Grid
      gridParticles.forEach(p => {
        const spacingX = canvas.width / (gridCols - 1);
        const spacingY = canvas.height / (gridRows - 1);
        p.baseX = p.col * spacingX;
        p.baseY = p.row * spacingY;

        let targetX = p.baseX;
        let targetY = p.baseY;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.baseX;
          const dy = mouse.y - p.baseY;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 120) {
            const force = (120 - dist) * 0.15;
            targetX -= (dx / dist) * force;
            targetY -= (dy / dist) * force;
          }
        }

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
      if (simulationMode === 'tunnel') {
        streams.forEach((stream) => {
          stream.progress += stream.speed;
          if (stream.progress > 1) stream.progress = 0;

          const startX = stream.startX;
          const startY = stream.startY();
          const cp1x = stream.controlX1();
          const cp1y = stream.controlY1();
          const cp2x = stream.controlX2();
          const cp2y = stream.controlY2();

          ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
          ctx.lineWidth = stream.width;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, cx, cy);
          ctx.stroke();

          const t = stream.progress;
          const px = Math.pow(1-t, 3)*startX + 3*Math.pow(1-t, 2)*t*cp1x + 3*(1-t)*Math.pow(t, 2)*cp2x + Math.pow(t, 3)*cx;
          const py = Math.pow(1-t, 3)*startY + 3*Math.pow(1-t, 2)*t*cp1y + 3*(1-t)*Math.pow(t, 2)*cp2y + Math.pow(t, 3)*cy;

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
      if (simulationMode === 'loop') {
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

      // E. Draw Concentric 3D Tilted Orbit Rings
      orbitRings.forEach(ring => {
        ctx.strokeStyle = `rgba(255, 255, 255, 0.03)`;
        ctx.lineWidth = 1;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ring.tilt);
        ctx.beginPath();
        ctx.ellipse(0, 0, ring.radiusX, ring.radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        ring.particles.forEach(p => {
          p.angle += ring.speed;
          const cosAngle = Math.cos(p.angle);
          const sinAngle = Math.sin(p.angle);

          let x3d = cosAngle * ring.radiusX;
          let y3d = sinAngle * ring.radiusY;
          let rx = x3d * Math.cos(ring.tilt) - y3d * Math.sin(ring.tilt);
          let ry = x3d * Math.sin(ring.tilt) + y3d * Math.cos(ring.tilt);

          let finalX = cx + rx;
          let finalY = cy + ry;

          const scale = 0.6 + (sinAngle + 1) / 2 * 0.6;
          const color = ring.color === 'var(--primary)' ? 'rgba(140, 230, 44, ' : 'rgba(0, 240, 255, ';

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
      const coreBreathing = Math.sin(globalAngle * 3.5) * 2 + 25;
      ctx.strokeStyle = 'rgba(140, 230, 44, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(cx, cy, coreBreathing + 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(11, 15, 26, 0.9)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

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
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [simulationMode]);

  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge" id="hero-announcement-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">Open Source Control Plane</span>
          </div>
          <h1 className="hero-title">
            The Secure <span className="text-gradient">Agentic Control</span> Plane
          </h1>
          <p className="hero-subtitle">
            Orchestrate multi-agent workflows with ecosystem tools (Aider, Claude) using pluggable sandboxes and secure Enterprise Vault credential injection. Deploy complex data analysis and coding workloads safely in the cloud.
          </p>
          
          <div className="hero-actions">
            <Link href="#simulator-section" className="btn btn-primary" id="hero-primary-btn">
              See Kiwi In Action
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="#quickstart" className="btn btn-outline" id="hero-secondary-btn">View Quickstart</Link>
          </div>

          <div className="hero-cli-install">
            <div className="cli-container">
              <span className="cli-prompt" style={{ fontFamily: 'var(--font-fira-code), Consolas, Monaco, monospace' }}>$</span>
              <code className="cli-command" id="install-command-text" style={{ fontFamily: 'var(--font-fira-code), Consolas, Monaco, monospace' }}>go install github.com/runkiwi/kiwi/cmd/kiwi@latest</code>
              <button 
                className="cli-copy-btn" 
                id="copy-install-btn" 
                title="Copy to clipboard" 
                aria-label="Copy installation command"
                onClick={() => navigator.clipboard.writeText('go install github.com/runkiwi/kiwi/cmd/kiwi@latest')}
              >
                <svg className="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span className="copy-tooltip" id="copy-tooltip-text">Copy</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="canvas-wrapper">
            <div className="canvas-glow"></div>
            <canvas ref={canvasRef} id="hero-canvas" aria-label="Interactive 3D particle visualization of the Kiwi orchestration layer and ecosystem agents"></canvas>
            <div className="canvas-controls">
              <span className="control-label">Simulation:</span>
              <button 
                className={`btn-control ${simulationMode === 'loop' ? 'active' : ''}`}
                onClick={() => setSimulationMode('loop')}
              >
                Multi-Agent Loop
              </button>
              <button 
                className={`btn-control ${simulationMode === 'tunnel' ? 'active' : ''}`}
                onClick={() => setSimulationMode('tunnel')}
              >
                Vault Injection
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
