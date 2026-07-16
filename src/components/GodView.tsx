'use client';

import { useState, useEffect } from 'react';
import { Reveal } from './Reveal';

type TaskStatus = 'RUNNING' | 'PAUSED' | 'RESOLVED' | 'QUEUED';

type Task = {
  id: string;
  name: string;
  status: TaskStatus;
  logs: string[];
};

const initialTasks: Task[] = [
  { id: 'T-381', name: 'Refactor Auth Middleware', status: 'RUNNING', logs: ['[system] Provisioning sandboxed container...', '[system] Mounting git worktree (22ms)...', '$ go test ./pkg/auth'] },
  { id: 'T-382', name: 'Migrate User Schema', status: 'PAUSED', logs: ['[system] Executing migration script...', '[system] Reverse tunnel offline.', 'Waiting for CLI reconnection to resolve DATABASE_URL...'] },
  { id: 'T-383', name: 'Update Payment Webhook', status: 'RUNNING', logs: ['[system] Sandbox active.', '$ npm run build', 'Build successful. Running integration tests...'] },
  { id: 'T-384', name: 'Fix Memory Leak', status: 'RESOLVED', logs: ['[actor] Patch applied.', '[critic] Review passed. Cost: $0.42', '[system] Changes synced to local worktree. Container destroyed.'] },
  { id: 'T-385', name: 'Add Rate Limiting', status: 'RUNNING', logs: ['[actor] Generating token bucket implementation...', '$ go test ./pkg/ratelimit -bench=.', 'Benchmark passed.'] },
  { id: 'T-386', name: 'Sync Stripe Webhooks', status: 'QUEUED', logs: ['[system] Waiting for available concurrency slot...'] },
];

const logSnippets = [
  '[actor] Reading documentation for Stripe API...',
  '[critic] Diff rejected: Missing nil check on pointer.',
  '$ go test ./... -v',
  '[system] Requesting STRIPE_SECRET_KEY over encrypted tunnel...',
  '[system] Credentials received and cached in-memory.',
  '[actor] Writing patch to payment_handler.go',
  'Test run successful. 0 failures.',
];

export default function GodView() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Background random logs generator to make the grid feel alive
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prev => prev.map(task => {
        if (task.status !== 'RUNNING') return task;
        
        // 30% chance to add a new log to a running task
        if (Math.random() > 0.7) {
          const newLog = logSnippets[Math.floor(Math.random() * logSnippets.length)];
          const updatedLogs = [...task.logs, newLog];
          if (updatedLogs.length > 5) updatedLogs.shift(); // Keep last 5 logs
          return { ...task, logs: updatedLogs };
        }
        return task;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="god-view" className="py-24 bg-[#0a0a0a] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <Reveal as="div" className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-blue-400 font-mono text-sm tracking-wider uppercase mb-4 block">The God View</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Massive Swarm Parallelization</h2>
          <p className="text-gray-400 text-lg md:text-xl">
            Watch the Orchestrator break down your epic into 50+ concurrent tasks. Every agent runs in its own isolated git worktree, streaming logs live back to the control plane.
          </p>
        </Reveal>

        <Reveal as="div" className="bg-[#111] border border-gray-800 rounded-xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-gray-800 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-mono text-green-500 text-sm">SWARM CLUSTER: ONLINE</span>
            </div>
            <div className="flex gap-6 font-mono text-sm text-gray-400">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> 3 RUNNING</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> 1 PAUSED</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-500"></span> 1 QUEUED</div>
            </div>
          </div>

          {/* Terminal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div key={task.id} className="bg-black border border-gray-800 rounded-lg overflow-hidden flex flex-col h-64 shadow-lg group hover:border-gray-600 transition-colors">
                {/* Terminal Header */}
                <div className="bg-[#1a1a1a] px-4 py-2 border-b border-gray-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-mono text-xs">{task.id}</span>
                    <span className="text-sm font-medium text-gray-300 truncate max-w-[120px]">{task.name}</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-1 rounded-sm uppercase tracking-wider
                    ${task.status === 'RUNNING' ? 'bg-blue-900/50 text-blue-400 border border-blue-800' : 
                      task.status === 'PAUSED' ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-800' :
                      task.status === 'RESOLVED' ? 'bg-green-900/50 text-green-400 border border-green-800' :
                      'bg-gray-800 text-gray-400'
                    }`}>
                    {task.status}
                  </span>
                </div>
                {/* Terminal Body */}
                <div className="p-4 flex-1 font-mono text-xs text-gray-400 flex flex-col justify-end overflow-hidden relative">
                  {task.status === 'RUNNING' && <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-blue-900/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>}
                  <div className="space-y-1">
                    {task.logs.map((log, idx) => (
                      <div key={idx} className={`${idx === task.logs.length - 1 ? 'text-gray-200' : 'opacity-70'} truncate`}>
                        {log}
                      </div>
                    ))}
                    {task.status === 'RUNNING' && (
                      <div className="text-blue-400 animate-pulse mt-1">█</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
