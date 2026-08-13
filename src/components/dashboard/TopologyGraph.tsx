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
  Node,
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

// Initial nodes/edges mock generator.
//
// One org's daemon leases and executes one task at a time (pkg/session is the only
// execution loop; there is no per-task fan-out of many agents). So this shows several
// orgs' daemons each running their own single task in parallel, not one task split
// across a swarm of agents — that used to be 48 agents orbiting 4 tasks and it was
// never a real shape of the system.
const generateMockData = () => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const tasks = [
    { id: 't1', label: 'Migrate to NextAuth', x: 400, y: 300, progress: 85 },
    { id: 't2', label: 'Refactor Billing Service', x: 1200, y: 300, progress: 40 },
    { id: 't3', label: 'Optimize Docker Images', x: 400, y: 900, progress: 15 },
    { id: 't4', label: 'Sync Stripe Webhooks', x: 1200, y: 900, progress: 92 },
  ];

  tasks.forEach((t, i) => {
    nodes.push({
      id: t.id,
      type: 'task',
      position: { x: t.x, y: t.y },
      data: { label: t.label, status: 'running', progress: t.progress },
    });

    // Exactly one daemon per task — the real cardinality.
    const agentId = `agent-${i}`;
    nodes.push({
      id: agentId,
      type: 'agent',
      position: { x: t.x + 20, y: t.y + 220 },
      data: {
        label: `daemon-${(i + 1).toString().padStart(3, '0')}`,
        status: 'active',
        cpu: Math.floor(Math.random() * 60) + 20,
      },
    });

    edges.push({
      id: `e-${t.id}-${agentId}`,
      source: t.id,
      target: agentId,
      type: 'default',
    });
  });

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
