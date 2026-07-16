'use client';

import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

export default function TopologyCanvas() {
  return (
    <section id="topology" className="simulator-section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">Topology Canvas</span>
          <h2 className="section-title">Interactive DAG Visualization</h2>
          <p className="section-subtitle">
            As the Orchestrator plans out the task, the Topology Canvas maps the dependencies in real-time. Follow the dependency chain until every node lights up green.
          </p>
        </Reveal>

        <Reveal as="div" className="control-console" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="console-glow"></div>
          
          <div className="console-telemetry-bar" style={{ justifyContent: 'space-between' }}>
            <div className="telemetry-item">
              <span className="t-dot active"></span>
              <span className="t-label">DAG Planner:</span>
              <span className="t-value text-gradient">ACTIVE</span>
            </div>
            <div className="mockup-browser-url" style={{ fontFamily: 'var(--custom-font-mono)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              Epic #4421 Execution Graph
            </div>
          </div>
          
          <div className="console-body" style={{ position: 'relative', height: '540px', background: 'var(--bg-inset)', display: 'block', overflow: 'hidden' }}>
            
            {/* SVG Lines connecting nodes */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
              {/* From Root to sub-tasks */}
              <path d="M 500 110 C 500 180, 250 180, 250 230" stroke="var(--border)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              <path d="M 500 110 C 500 180, 500 180, 500 230" stroke="var(--border)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              <path d="M 500 110 C 500 180, 750 180, 750 230" stroke="var(--border)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              
              {/* From sub-tasks to Final PR */}
              <path d="M 250 310 C 250 380, 500 380, 500 450" stroke="var(--border)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              <path d="M 500 310 C 500 380, 500 380, 500 450" stroke="var(--border)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              <path d="M 750 310 C 750 380, 500 380, 500 450" stroke="var(--border)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
            </svg>

            {/* Root Node */}
            <motion.div 
              style={{ position: 'absolute', left: '50%', top: '50px', transform: 'translateX(-50%)', width: '280px', background: 'var(--bg-card)', border: '1px solid var(--primary)', borderRadius: '12px', padding: '16px', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 0 20px var(--primary-glow)' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--custom-font-mono)', color: 'var(--primary)', marginBottom: '4px' }}>Epic #4421</span>
              <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)', textAlign: 'center' }}>Implement OAuth Login Flow</span>
              <span style={{ marginTop: '12px', fontSize: '0.65rem', background: 'var(--primary-glow)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Planner Active</span>
            </motion.div>

            {/* Sub-Task 1 */}
            <motion.div 
              style={{ position: 'absolute', left: '250px', top: '230px', transform: 'translateX(-50%)', width: '220px', background: 'var(--bg-panel)', border: '1px solid var(--success)', borderRadius: '12px', padding: '16px', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span style={{ fontSize: '0.7rem', fontFamily: 'var(--custom-font-mono)', color: 'var(--text-muted)', marginBottom: '4px' }}>T-4421-A</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', textAlign: 'center', marginBottom: '12px' }}>Google OAuth Provider</span>
              <span style={{ fontSize: '0.65rem', background: 'rgba(79, 180, 119, 0.15)', color: 'var(--success)', padding: '4px 10px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Resolved
              </span>
            </motion.div>

            {/* Sub-Task 2 */}
            <motion.div 
              style={{ position: 'absolute', left: '500px', top: '230px', transform: 'translateX(-50%)', width: '220px', background: 'var(--bg-card)', border: '1px solid var(--primary)', borderRadius: '12px', padding: '16px', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 0 15px var(--primary-glow)' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span style={{ fontSize: '0.7rem', fontFamily: 'var(--custom-font-mono)', color: 'var(--text-muted)', marginBottom: '4px' }}>T-4421-B</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', textAlign: 'center', marginBottom: '12px' }}>GitHub OAuth Provider</span>
              <span style={{ fontSize: '0.65rem', background: 'var(--primary-glow)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', animation: 'pulse-dot 1.5s infinite alternate' }}></div>
                Running...
              </span>
            </motion.div>

            {/* Sub-Task 3 */}
            <motion.div 
              style={{ position: 'absolute', left: '750px', top: '230px', transform: 'translateX(-50%)', width: '220px', background: 'var(--bg-panel)', border: '1px solid var(--warning)', borderRadius: '12px', padding: '16px', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span style={{ fontSize: '0.7rem', fontFamily: 'var(--custom-font-mono)', color: 'var(--text-muted)', marginBottom: '4px' }}>T-4421-C</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', textAlign: 'center', marginBottom: '12px' }}>Session JWT Middleware</span>
              <span style={{ fontSize: '0.65rem', background: 'rgba(232, 161, 59, 0.15)', color: 'var(--warning)', padding: '4px 10px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Paused (Needs Env)
              </span>
            </motion.div>

            {/* Final PR Node */}
            <motion.div 
              style={{ position: 'absolute', left: '500px', top: '450px', transform: 'translateX(-50%)', width: '260px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.6 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ delay: 1.0 }}
            >
              <span style={{ fontSize: '0.7rem', fontFamily: 'var(--custom-font-mono)', color: 'var(--text-dim)', marginBottom: '4px' }}>Merge Gate</span>
              <span style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '12px' }}>Generate Pull Request</span>
              <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', padding: '4px 10px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Awaiting Dependencies</span>
            </motion.div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
