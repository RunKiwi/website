'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  MarkerType,
  BackgroundVariant
} from '@xyflow/react';
import AgentNode from './AgentNode';
import TaskNode from './TaskNode';

// Custom node types
const nodeTypes = {
  agent: AgentNode,
  task: TaskNode,
};

// Initial nodes/edges mock generator
const generateMockData = () => {
  const nodes = [];
  const edges = [];
  
  const tasks = [
    { id: 't1', label: 'Migrate to NextAuth', x: 400, y: 300, progress: 85 },
    { id: 't2', label: 'Refactor Billing Service', x: 1200, y: 300, progress: 40 },
    { id: 't3', label: 'Optimize Docker Images', x: 400, y: 900, progress: 15 },
    { id: 't4', label: 'Sync Stripe Webhooks', x: 1200, y: 900, progress: 92 },
  ];

  tasks.forEach(t => {
    nodes.push({
      id: t.id,
      type: 'task',
      position: { x: t.x, y: t.y },
      data: { label: t.label, status: 'running', progress: t.progress },
    });
  });

  const agentsPerTask: Record<string, number> = {};
  
  // Create 48 agents and assign them evenly to tasks
  for (let i = 0; i < 48; i++) {
    const parentTask = tasks[i % tasks.length];
    agentsPerTask[parentTask.id] = (agentsPerTask[parentTask.id] || 0) + 1;
    
    // Position agents in a clean orbit around the task
    const index = agentsPerTask[parentTask.id];
    const total = 12; // 48 / 4 tasks = 12 agents per task
    const angle = (index / total) * Math.PI * 2;
    const radius = 280; // wide radius for no overlap
    
    // Center of the task node is roughly x+110, y+50 (since task node is 220x100ish)
    const taskCenterX = parentTask.x + 110;
    const taskCenterY = parentTask.y + 50;
    
    // Agent node is roughly 180x80
    const x = taskCenterX + Math.cos(angle) * radius - 90;
    const y = taskCenterY + Math.sin(angle) * radius - 40;
    
    const agentId = `agent-${i}`;
    const isActive = Math.random() > 0.3; // 70% active
    
    nodes.push({
      id: agentId,
      type: 'agent',
      position: { x, y },
      data: { 
        label: `Agent-${i.toString().padStart(3, '0')}`, 
        status: isActive ? 'active' : 'idle',
        cpu: isActive ? Math.floor(Math.random() * 80) + 10 : 0
      },
    });

    edges.push({
      id: `e-${parentTask.id}-${agentId}`,
      source: parentTask.id,
      target: agentId,
      type: 'default',
    });
  }

  return { nodes, edges };
};

export default function TopologyGraph() {
  const [data, setData] = useState({ nodes: [], edges: [] });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setData(generateMockData());
    setMounted(true);
  }, []);

  // Simulate live data updates
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        nodes: prev.nodes.map((node) => {
          if (node.type === 'agent' && node.data.status === 'active') {
            return {
              ...node,
              data: {
                ...node.data,
                cpu: Math.floor(Math.random() * 90) + 10,
              }
            };
          }
          return node;
        })
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <div className="w-full h-full bg-[#0B0C0A]">
      <ReactFlow
        nodes={data.nodes}
        edges={data.edges}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        fitView
        colorMode="dark"
        className="!bg-[#0B0C0A]"
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={2} color="#ffffff1a" />
        <Controls className="!bg-[#111310] !border-white/10 !text-white fill-white" />
      </ReactFlow>
    </div>
  );
}
