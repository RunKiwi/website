import { Handle, Position } from '@xyflow/react';
import { Cpu, Terminal } from 'lucide-react';

export default function AgentNode({ data }: { data: any }) {
  const isActive = data.status === 'active';
  
  return (
    <div className={`px-4 py-3 shadow-md rounded-xl border ${isActive ? 'bg-[#0B150A] border-[#8CE62C] shadow-[0_0_15px_rgba(140,230,44,0.15)]' : 'bg-[#111310] border-white/10'} w-[180px]`}>
      <Handle type="target" position={Position.Top} />
      
      <div className="flex items-center gap-2 mb-2 relative z-10">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-[#8CE62C]/20 text-[#8CE62C]' : 'bg-white/5 text-gray-400'}`}>
          <Terminal className="w-4 h-4" />
        </div>
        <div>
          <div className="text-sm font-bold text-white">{data.label}</div>
          <div className="text-[10px] uppercase tracking-wider text-gray-500">Agent Node</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs border-t border-white/5 pt-2 mt-2 relative z-10">
        <div className="flex items-center gap-1 text-gray-400">
          <Cpu className="w-3 h-3" /> CPU
        </div>
        <div className={isActive ? 'text-[#8CE62C] font-mono' : 'text-gray-500 font-mono'}>
          {data.cpu}%
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
