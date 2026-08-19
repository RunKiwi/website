'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitMerge, Eye, Activity as ActivityIcon, Shield, ShieldAlert, GitCommit, CheckCircle2 } from 'lucide-react';
import { Reveal } from './Reveal';

type SequenceState = 'MERGED' | 'WATCHING' | 'CHECKING' | 'VERDICT';

export default function Activity() {
  const [phase, setPhase] = useState<SequenceState>('MERGED');
  const [checkingIdx, setCheckingIdx] = useState(0);
  const [verdict, setVerdict] = useState<'VERIFIED' | 'REGRESSION'>('VERIFIED');
  const [key, setKey] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (phase === 'MERGED') {
      timeout = setTimeout(() => {
        setPhase('WATCHING');
      }, 2000);
    } else if (phase === 'WATCHING') {
      timeout = setTimeout(() => {
        setPhase('CHECKING');
        setCheckingIdx(0);
      }, 2500);
    } else if (phase === 'CHECKING') {
      if (checkingIdx < 3) {
        timeout = setTimeout(() => {
          setCheckingIdx(prev => prev + 1);
        }, 1200);
      } else {
        timeout = setTimeout(() => {
          setPhase('VERDICT');
          setVerdict(Math.random() > 0.3 ? 'VERIFIED' : 'REGRESSION');
        }, 1000);
      }
    } else if (phase === 'VERDICT') {
      timeout = setTimeout(() => {
        setPhase('MERGED');
        setKey(k => k + 1);
      }, 4000);
    }

    return () => clearTimeout(timeout);
  }, [phase, checkingIdx]);

  return (
    <section id="activity" className="activity-section theme-dark">
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow" style={{ color: 'var(--primary)' }}>Post-merge</span>
          <h2 className="section-title text-gradient">The 24-hour guard.</h2>
          <p className="section-subtitle">
            Merging is just the beginning. Kiwi watches the landed commit for 24 hours, checking for reverts, CI regressions, and telemetry drops. It doesn&rsquo;t assume the job is done until the commit holds in production.
          </p>
        </Reveal>

        <Reveal as="div" className="activity-visual">
          <div className="activity-card backdrop-blur-xl border border-white/10 bg-[#070C12]/80 rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl relative overflow-hidden" style={{ minHeight: '380px' }}>
            <div className="glow-bg-primary opacity-10 absolute top-0 right-0"></div>
            
            <AnimatePresence mode="wait">
              {phase === 'MERGED' && (
                <motion.div 
                  key={`merged-${key}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="flex flex-col items-center justify-center h-64 gap-6"
                >
                  <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <GitMerge className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold font-heading text-white">Pull Request Merged</h3>
                    <p className="text-[var(--text-muted)] font-mono text-sm mt-2">commit 8f9a2c3 landed in main</p>
                  </div>
                </motion.div>
              )}

              {phase === 'WATCHING' && (
                <motion.div 
                  key={`watching-${key}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="flex flex-col items-center justify-center h-64 gap-6"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-16 h-16 rounded-full bg-[var(--primary-glow)] flex items-center justify-center border border-[var(--border-glow)]"
                  >
                    <Eye className="w-8 h-8 text-[var(--primary)]" />
                  </motion.div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold font-heading text-white">Observation Window Open</h3>
                    <p className="text-[var(--text-muted)] font-mono text-sm mt-2">watching for 24 hours</p>
                  </div>
                </motion.div>
              )}

              {phase === 'CHECKING' && (
                <motion.div 
                  key={`checking-${key}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col h-64 justify-center px-4 md:px-12"
                >
                  <h3 className="text-lg font-bold font-heading text-white mb-6 text-center">Checking Signals</h3>
                  
                  <div className="flex flex-col gap-4">
                    <SignalCheck label="Merged revert?" active={checkingIdx >= 1} icon={<GitCommit className="w-5 h-5" />} />
                    <SignalCheck label="Check run status?" active={checkingIdx >= 2} icon={<CheckCircle2 className="w-5 h-5" />} />
                    <SignalCheck label="Telemetry regression? (opt-in)" active={checkingIdx >= 3} icon={<ActivityIcon className="w-5 h-5" />} />
                  </div>
                </motion.div>
              )}

              {phase === 'VERDICT' && (
                <motion.div 
                  key={`verdict-${key}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="flex flex-col items-center justify-center h-64 gap-6"
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center border ${verdict === 'VERIFIED' ? 'bg-[#4FB477]/20 border-[#4FB477]/40 text-[#4FB477]' : 'bg-[var(--error)]/20 border-[var(--error)]/40 text-[var(--error)]'}`}>
                    {verdict === 'VERIFIED' ? <Shield className="w-10 h-10" /> : <ShieldAlert className="w-10 h-10" />}
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold font-heading text-white">
                      {verdict === 'VERIFIED' ? 'Verified' : 'Regression Detected'}
                    </h3>
                    <p className="text-[var(--text-muted)] font-mono text-sm mt-3">
                      {verdict === 'VERIFIED' ? 'All signals clear for 24h window' : 'Revert or test failure detected'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="absolute bottom-4 left-0 w-full flex justify-center">
              <div className="flex gap-2">
                {(['MERGED', 'WATCHING', 'CHECKING', 'VERDICT'] as const).map((p) => (
                  <div key={p} className={`h-1.5 rounded-full transition-all duration-500 ${phase === p ? 'w-8 bg-[var(--primary)]' : 'w-2 bg-white/20'}`}></div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SignalCheck({ label, active, icon }: { label: string; active: boolean; icon: React.ReactNode }) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-500 ${active ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-white/5 text-[var(--text-dim)]'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${active ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5'}`}>
          {icon}
        </div>
        <span className="font-medium font-heading">{label}</span>
      </div>
      <div className="font-mono text-xs">
        {active ? (
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-[var(--success)] flex items-center gap-1"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--success)]"></span>
            CLEARED
          </motion.span>
        ) : (
          <span className="text-[var(--text-dim)]">WAITING</span>
        )}
      </div>
    </div>
  );
}
