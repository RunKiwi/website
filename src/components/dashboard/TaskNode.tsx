import { Handle, Position } from '@xyflow/react';
import { Layers } from 'lucide-react';

export default function TaskNode({ data }: { data: any }) {
  return (
    <div className="px-5 py-4 shadow-xl rounded-2xl border border-[#E8823B]/50 bg-[#160d05] shadow-[0_0_30px_rgba(232,130,59,0.15)] w-[220px]">
      <Handle type="target" position={Position.Top} />
      
      <div className="flex items-center gap-3 mb-3 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-[#E8823B]/20 flex items-center justify-center text-[#E8823B] border border-[#E8823B]/30">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[#E8823B] font-bold">Epic Task</div>
          <div className="text-sm font-bold text-white leading-tight">{data.label}</div>
        </div>
      </div>
      
      <div className="w-full bg-black/40 rounded-full h-1.5 mt-2 border border-white/5 overflow-hidden relative z-10">
        <div className="bg-[#E8823B] h-1.5 rounded-full" style={{ width: `${data.progress}%` }}></div>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
