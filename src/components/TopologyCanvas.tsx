'use client';

import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

export default function TopologyCanvas() {
  return (
    <section className="dashboard-section py-24 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <Reveal as="div" className="section-header text-center mb-16 max-w-3xl mx-auto">
          <span className="text-indigo-400 font-mono text-sm tracking-wider uppercase mb-4 block">Topology Canvas</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Interactive DAG Visualization</h2>
          <p className="text-gray-400 text-lg md:text-xl">
            As the Orchestrator plans out the task, the Topology Canvas maps the dependencies in real-time. Follow the dependency chain until every node lights up green.
          </p>
        </Reveal>

        <Reveal as="div" className="relative w-full max-w-5xl mx-auto h-[500px] bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
          {/* SVG Lines connecting nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {/* From Root to sub-tasks */}
            <path d="M 500 80 C 500 150, 250 150, 250 200" stroke="#333" strokeWidth="2" fill="none" />
            <path d="M 500 80 C 500 150, 500 150, 500 200" stroke="#333" strokeWidth="2" fill="none" />
            <path d="M 500 80 C 500 150, 750 150, 750 200" stroke="#333" strokeWidth="2" fill="none" />
            
            {/* From sub-tasks to Final PR */}
            <path d="M 250 280 C 250 350, 500 350, 500 420" stroke="#333" strokeWidth="2" fill="none" />
            <path d="M 500 280 C 500 350, 500 350, 500 420" stroke="#333" strokeWidth="2" fill="none" />
            <path d="M 750 280 C 750 350, 500 350, 500 420" stroke="#333" strokeWidth="2" fill="none" />
          </svg>

          {/* Root Node */}
          <motion.div 
            className="absolute left-1/2 top-[40px] -translate-x-1/2 w-64 bg-gray-900 border-2 border-indigo-500 rounded-lg p-4 z-10 flex flex-col items-center shadow-[0_0_15px_rgba(99,102,241,0.5)]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-xs font-mono text-indigo-400 mb-1">Epic #4421</span>
            <span className="font-semibold text-center text-sm">Implement OAuth Login Flow</span>
            <span className="mt-2 text-[10px] bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded-full uppercase tracking-wide">Planner Active</span>
          </motion.div>

          {/* Sub-Task 1 */}
          <motion.div 
            className="absolute left-[250px] top-[200px] -translate-x-1/2 w-56 bg-gray-900 border border-green-500 rounded-lg p-3 z-10 flex flex-col items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-xs font-mono text-gray-500 mb-1">T-4421-A</span>
            <span className="text-center text-sm mb-2 text-gray-300">Google OAuth Provider</span>
            <span className="text-[10px] bg-green-900/50 text-green-400 px-2 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Resolved
            </span>
          </motion.div>

          {/* Sub-Task 2 */}
          <motion.div 
            className="absolute left-1/2 top-[200px] -translate-x-1/2 w-56 bg-gray-900 border border-blue-500 rounded-lg p-3 z-10 flex flex-col items-center shadow-[0_0_10px_rgba(59,130,246,0.3)]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-xs font-mono text-gray-500 mb-1">T-4421-B</span>
            <span className="text-center text-sm mb-2 text-white">GitHub OAuth Provider</span>
            <span className="text-[10px] bg-blue-900/50 text-blue-400 px-2 py-1 rounded-full uppercase tracking-wide flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
              Running...
            </span>
          </motion.div>

          {/* Sub-Task 3 */}
          <motion.div 
            className="absolute left-[750px] top-[200px] -translate-x-1/2 w-56 bg-gray-900 border border-yellow-500 rounded-lg p-3 z-10 flex flex-col items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-xs font-mono text-gray-500 mb-1">T-4421-C</span>
            <span className="text-center text-sm mb-2 text-gray-300">Session JWT Middleware</span>
            <span className="text-[10px] bg-yellow-900/50 text-yellow-400 px-2 py-1 rounded-full uppercase tracking-wide">
              Paused (Needs Env)
            </span>
          </motion.div>

          {/* Final PR Node */}
          <motion.div 
            className="absolute left-1/2 top-[420px] -translate-x-1/2 w-64 bg-[#0a0a0a] border border-gray-700 rounded-lg p-4 z-10 flex flex-col items-center opacity-50"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.5 }}
            transition={{ delay: 1.0 }}
          >
            <span className="text-xs font-mono text-gray-500 mb-1">Merge Gate</span>
            <span className="font-semibold text-center text-sm text-gray-400">Generate Pull Request</span>
            <span className="mt-2 text-[10px] bg-gray-800 text-gray-500 px-2 py-1 rounded-full uppercase tracking-wide">Awaiting Dependencies</span>
          </motion.div>

        </Reveal>
      </div>
    </section>
  );
}
