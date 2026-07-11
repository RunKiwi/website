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

    // Logical (CSS-pixel) drawing dimensions. The backing store is scaled by
    // devicePixelRatio so the visualization stays crisp when enlarged, while all
    // draw math below works in logical pixels via `dims`.
    const dims = { w: 0, h: 0 };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dims.w = canvas.clientWidth;
      dims.h = canvas.clientHeight;
      canvas.width = Math.round(dims.w * dpr);
      canvas.height = Math.round(dims.h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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

    const coreX = () => dims.w / 2;
    const coreY = () => dims.h / 2;
    
    // Typed particle shapes for the ambient canvas visualization
    type GridParticle = { baseX: number; baseY: number; x: number; y: number; row: number; col: number; size: number; alpha: number };
    type OrbitParticle = { angle: number; size: number; alpha: number };
    type Stream = {
      progress: number; speed: number; startX: number; width: number; color: string;
      startY: () => number; controlX1: () => number; controlY1: () => number; controlX2: () => number; controlY2: () => number;
    };
    type LoopRing = { radius: number; maxRadius: number; alpha: number; speed: number };

    // 1. Ambient Background Grid Particles (Vector Field)
    const gridParticles: GridParticle[] = [];
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

    // 2. Tilted Orbit Ring Particles.
    // Radii are expressed as a fraction of the smaller canvas dimension so the
    // rings scale with the (now larger) hero canvas and fill the space.
    const minDim = () => Math.min(dims.w, dims.h);
    const orbitRings = [
      { radiusX: 0.42, radiusY: 0.13, tilt: -0.25, speed: 0.012, color: 'var(--primary)', count: 22, particles: [] as OrbitParticle[] },
      { radiusX: 0.30, radiusY: 0.095, tilt: 0.15, speed: -0.015, color: 'var(--secondary)', count: 16, particles: [] as OrbitParticle[] },
      { radiusX: 0.185, radiusY: 0.06, tilt: -0.1, speed: 0.02, color: '#ffffff', count: 10, particles: [] as OrbitParticle[] }
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
    const streams: Stream[] = [];
    for (let i = 0; i < 4; i++) {
      streams.push({
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.005,
        startX: -40,
        startY: () => dims.h + 40,
        controlX1: () => dims.w * 0.2,
        controlY1: () => dims.h * 0.7,
        controlX2: () => dims.w * 0.4,
        controlY2: () => dims.h * 0.2,
        color: 'rgba(0, 240, 255, 0.7)',
        width: Math.random() * 2 + 1
      });
    }

    // 4. Actor-Critic Loop Execution Rings
    const loopRings: LoopRing[] = [];
    let ringTimer = 0;
    let globalAngle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, dims.w, dims.h);
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
        const spacingX = dims.w / (gridCols - 1);
        const spacingY = dims.h / (gridRows - 1);
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
      const glowRadius = minDim() * 0.52;
      const radialGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, glowRadius);
      radialGlow.addColorStop(0, 'rgba(140, 230, 44, 0.06)');
      radialGlow.addColorStop(0.5, 'rgba(0, 240, 255, 0.03)');
      radialGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
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
          loopRings.push({ radius: 30, maxRadius: minDim() * 0.46, alpha: 0.6, speed: 1.4 });
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
        const rX = ring.radiusX * minDim();
        const rY = ring.radiusY * minDim();
        ctx.strokeStyle = `rgba(255, 255, 255, 0.03)`;
        ctx.lineWidth = 1;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ring.tilt);
        ctx.beginPath();
        ctx.ellipse(0, 0, rX, rY, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        ring.particles.forEach(p => {
          p.angle += ring.speed;
          const cosAngle = Math.cos(p.angle);
          const sinAngle = Math.sin(p.angle);

          const x3d = cosAngle * rX;
          const y3d = sinAngle * rY;
          const rx = x3d * Math.cos(ring.tilt) - y3d * Math.sin(ring.tilt);
          const ry = x3d * Math.sin(ring.tilt) + y3d * Math.cos(ring.tilt);

          const finalX = cx + rx;
          const finalY = cy + ry;

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

      // F. Draw Modern Cybernetic Pulsing Core (scales gently with canvas size)
      const coreScale = Math.max(1, minDim() / 420);
      const coreRadius = 25 * coreScale;
      const coreBreathing = Math.sin(globalAngle * 3.5) * 2 + coreRadius;
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
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      const innerBreathing = Math.sin(globalAngle * 2.5) * 1.5 + 14 * coreScale;
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
      ctx.arc(cx, cy, 3.5 * coreScale, 0, Math.PI * 2);
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
            <span className="badge-text">Control Plane for LLM Agents</span>
          </div>
          <h1 className="hero-title">
            Run agents like <span className="text-gradient">production</span>, not like a demo.
          </h1>
          <p className="hero-subtitle">
            Give your AI coding agents a safe place to work. Kiwi runs them in isolated sandboxes, keeps your secrets on your machine, streams every move live, and never loses a run.
          </p>

          <div className="hero-actions">
            <Link href="#quickstart" className="btn btn-primary" id="hero-primary-btn">
              Start a run
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="#how-it-works" className="btn btn-outline" id="hero-secondary-btn">See it live</Link>
          </div>

          <p className="hero-microcopy">
            Bring your own Anthropic key · self-hosted · no credit card
          </p>

          <div className="hero-cli-install">
            <div className="cli-container">
              <span className="cli-prompt" style={{ fontFamily: 'var(--font-fira-code), Consolas, Monaco, monospace' }}>$</span>
              <code className="cli-command" id="install-command-text" style={{ fontFamily: 'var(--font-fira-code), Consolas, Monaco, monospace' }}>git clone https://github.com/runkiwi/kiwi</code>
              <button
                className="cli-copy-btn"
                id="copy-install-btn"
                title="Copy to clipboard"
                aria-label="Copy clone command"
                onClick={() => navigator.clipboard.writeText('git clone https://github.com/runkiwi/kiwi')}
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
            <canvas ref={canvasRef} id="hero-canvas" aria-label="Animated visualization of Kiwi's Actor-Critic loop and just-in-time secret tunnel"></canvas>
            <div className="canvas-controls">
              <span className="control-label">Visualize:</span>
              <button
                className={`btn-control ${simulationMode === 'loop' ? 'active' : ''}`}
                onClick={() => setSimulationMode('loop')}
              >
                Actor–Critic Loop
              </button>
              <button
                className={`btn-control ${simulationMode === 'tunnel' ? 'active' : ''}`}
                onClick={() => setSimulationMode('tunnel')}
              >
                Secret Tunnel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
