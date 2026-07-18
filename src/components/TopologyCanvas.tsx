'use client';

import { Reveal } from './Reveal';
import dynamic from 'next/dynamic';

const TopologyGraph = dynamic(() => import('./dashboard/TopologyGraph'), { ssr: false });

export default function TopologyCanvas() {
  return (
    <section id="topology" className="simulator-section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">The architecture</span>
          <h2 className="section-title">Control plane plans. Data plane pulls.</h2>
          <p className="section-subtitle">
            The Control Plane never reaches into your network. Your daemon polls it over outbound HTTPS, leases a worker only once its dependencies are green, and executes in a sandbox next door. Watch the DAG light up as the swarm works it.
          </p>
        </Reveal>

        <Reveal as="div" className="control-console" style={{ maxWidth: '1200px', margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
          <div className="console-glow"></div>
          
          <div className="console-telemetry-bar" style={{ justifyContent: 'space-between', background: '#090A08' }}>
            <div className="telemetry-item">
              <span className="t-dot active"></span>
              <span className="t-label">Daemon heartbeat:</span>
              <span className="t-value text-gradient">POLLING · OUTBOUND HTTPS</span>
            </div>
            <div className="mockup-browser-url" style={{ fontFamily: 'var(--custom-font-mono)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              org · us-east-1
            </div>
          </div>
          
          <div className="console-body" style={{ position: 'relative', height: '650px', background: '#0B0C0A', display: 'block', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
              <TopologyGraph />
            </div>
            
            {/* UI Overlay */}
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 10, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '16px', fontFamily: 'var(--custom-font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#8CE62C' }}></div>
                AI Agent
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#E8823B' }}></div>
                Epic Task
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
