'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Copy, Moon, Sun, Sparkles, Terminal } from 'lucide-react';

interface MascotPose {
  id: string;
  name: string;
  badge: string;
  desc: string;
  svgCode: string;
  renderSvg: (size?: number) => React.ReactNode;
}

export default function LogoLabPage() {
  const [selectedId, setSelectedId] = useState<string>('pose-idle');
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'cream'>('dark');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const POSES: MascotPose[] = [
    // 1. Idle
    {
      id: 'pose-idle',
      name: '01 · Classic Idle (Core Brand Mark)',
      badge: 'Core Logo',
      desc: 'The official 8-bit Chunky Chibi Kiwi. Balanced, cute, iconic, and razor-sharp across all resolutions.',
      svgCode: `<svg viewBox="0 0 16 16" width="32" height="32" shape-rendering="crispEdges">\n  <rect x="5" y="2" width="5" height="1" fill="#88BC38"/>\n  <rect x="3" y="3" width="8" height="1" fill="#93C645"/>\n  <rect x="2" y="4" width="9" height="1" fill="#93C645"/>\n  <rect x="2" y="5" width="9" height="1" fill="#93C645"/>\n  <rect x="1" y="6" width="10" height="1" fill="#93C645"/>\n  <rect x="1" y="7" width="10" height="1" fill="#93C645"/>\n  <rect x="2" y="8" width="9" height="1" fill="#88BC38"/>\n  <rect x="2" y="9" width="9" height="1" fill="#78A832"/>\n  <rect x="3" y="10" width="7" height="1" fill="#6A962A"/>\n  <rect x="4" y="11" width="5" height="1" fill="#5A8222"/>\n  <rect x="7" y="4" width="2" height="2" fill="#111816"/>\n  <rect x="7" y="4" width="1" height="1" fill="#FFFFFF"/>\n  <rect x="11" y="5" width="3" height="2" fill="#FFAA28"/>\n  <rect x="14" y="6" width="1" height="1" fill="#E89115"/>\n  <rect x="4" y="12" width="2" height="2" fill="#FFAA28"/>\n  <rect x="3" y="13" width="3" height="1" fill="#FFAA28"/>\n  <rect x="8" y="12" width="2" height="2" fill="#FFAA28"/>\n  <rect x="7" y="13" width="3" height="1" fill="#FFAA28"/>\n</svg>`,
      renderSvg: (size = 32) => (
        <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
          <rect x="5" y="2" width="5" height="1" fill="#88BC38" />
          <rect x="3" y="3" width="8" height="1" fill="#93C645" />
          <rect x="2" y="4" width="9" height="1" fill="#93C645" />
          <rect x="2" y="5" width="9" height="1" fill="#93C645" />
          <rect x="1" y="6" width="10" height="1" fill="#93C645" />
          <rect x="1" y="7" width="10" height="1" fill="#93C645" />
          <rect x="2" y="8" width="9" height="1" fill="#88BC38" />
          <rect x="2" y="9" width="9" height="1" fill="#78A832" />
          <rect x="3" y="10" width="7" height="1" fill="#6A962A" />
          <rect x="4" y="11" width="5" height="1" fill="#5A8222" />
          <rect x="7" y="4" width="2" height="2" fill="#111816" />
          <rect x="7" y="4" width="1" height="1" fill="#FFFFFF" />
          <rect x="11" y="5" width="3" height="2" fill="#FFAA28" />
          <rect x="14" y="6" width="1" height="1" fill="#E89115" />
          <rect x="4" y="12" width="2" height="2" fill="#FFAA28" />
          <rect x="3" y="13" width="3" height="1" fill="#FFAA28" />
          <rect x="8" y="12" width="2" height="2" fill="#FFAA28" />
          <rect x="7" y="13" width="3" height="1" fill="#FFAA28" />
        </svg>
      ),
    },

    // 2. Vibing
    {
      id: 'pose-vibing',
      name: '02 · Vibing (Headphones & Shades)',
      badge: 'Live Run Companion',
      desc: 'Wearing neon pink/cyan retro headphones and shades, bobbing along to lo-fi while the agent codes.',
      svgCode: `<svg viewBox="0 0 16 16" width="32" height="32" shape-rendering="crispEdges">...</svg>`,
      renderSvg: (size = 32) => (
        <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
          <rect x="5" y="2" width="5" height="1" fill="#88BC38" />
          <rect x="3" y="3" width="8" height="1" fill="#93C645" />
          <rect x="2" y="4" width="9" height="1" fill="#93C645" />
          <rect x="2" y="5" width="9" height="1" fill="#93C645" />
          <rect x="1" y="6" width="10" height="1" fill="#93C645" />
          <rect x="1" y="7" width="10" height="1" fill="#93C645" />
          <rect x="2" y="8" width="9" height="1" fill="#88BC38" />
          <rect x="2" y="9" width="9" height="1" fill="#78A832" />
          <rect x="3" y="10" width="7" height="1" fill="#6A962A" />
          <rect x="11" y="5" width="3" height="2" fill="#FFAA28" />
          <rect x="14" y="6" width="1" height="1" fill="#E89115" />
          <rect x="4" y="12" width="2" height="2" fill="#FFAA28" />
          <rect x="3" y="13" width="3" height="1" fill="#FFAA28" />
          <rect x="8" y="12" width="2" height="2" fill="#FFAA28" />
          <rect x="7" y="13" width="3" height="1" fill="#FFAA28" />
          {/* Headphones */}
          <rect x="4" y="1" width="5" height="1" fill="#FF4D6D" />
          <rect x="3" y="2" width="1" height="3" fill="#FF4D6D" />
          <rect x="9" y="2" width="1" height="3" fill="#FF4D6D" />
          <rect x="2" y="4" width="1" height="3" fill="#00E5FF" />
          <rect x="9" y="4" width="1" height="3" fill="#00E5FF" />
          {/* Sunglasses */}
          <rect x="6" y="4" width="4" height="2" fill="#090D0B" />
          <rect x="6" y="4" width="1" height="1" fill="#00E5FF" />
          <rect x="8" y="4" width="1" height="1" fill="#00E5FF" />
        </svg>
      ),
    },

    // 3. Dancing / Celebrating
    {
      id: 'pose-dancing',
      name: '03 · Dancing / PR Merged Party',
      badge: 'Success State',
      desc: 'Wings up in victory with cheerful tapping feet celebrating a green test suite and merged PR.',
      svgCode: `<svg viewBox="0 0 16 16" width="32" height="32" shape-rendering="crispEdges">...</svg>`,
      renderSvg: (size = 32) => (
        <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
          <rect x="5" y="2" width="5" height="1" fill="#88BC38" />
          <rect x="3" y="3" width="8" height="1" fill="#93C645" />
          <rect x="2" y="4" width="9" height="1" fill="#93C645" />
          <rect x="2" y="5" width="9" height="1" fill="#93C645" />
          <rect x="1" y="6" width="10" height="1" fill="#93C645" />
          <rect x="1" y="7" width="10" height="1" fill="#93C645" />
          <rect x="2" y="8" width="9" height="1" fill="#88BC38" />
          <rect x="2" y="9" width="9" height="1" fill="#78A832" />
          <rect x="3" y="10" width="7" height="1" fill="#6A962A" />
          {/* Happy closed eye */}
          <rect x="7" y="4" width="3" height="1" fill="#111816" />
          <rect x="6" y="5" width="1" height="1" fill="#111816" />
          <rect x="10" y="5" width="1" height="1" fill="#111816" />
          {/* Beak */}
          <rect x="11" y="5" width="3" height="2" fill="#FFAA28" />
          <rect x="14" y="6" width="1" height="1" fill="#E89115" />
          {/* Dancing Feet */}
          <rect x="3" y="12" width="2" height="2" fill="#FFAA28" />
          <rect x="2" y="13" width="3" height="1" fill="#FFAA28" />
          <rect x="9" y="11" width="2" height="2" fill="#FFAA28" />
          <rect x="9" y="12" width="3" height="1" fill="#FFAA28" />
          {/* Raised Wings */}
          <rect x="1" y="4" width="1" height="2" fill="#88BC38" />
          <rect x="0" y="3" width="1" height="1" fill="#88BC38" />
        </svg>
      ),
    },

    // 4. Flying / Rocket Shipper
    {
      id: 'pose-flying',
      name: '04 · Flying (Jetpack Booster)',
      badge: 'Deployment Flow',
      desc: 'Equipped with dual rocket exhaust thrusters blasting off to deploy code straight to production.',
      svgCode: `<svg viewBox="0 0 16 16" width="32" height="32" shape-rendering="crispEdges">...</svg>`,
      renderSvg: (size = 32) => (
        <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
          <rect x="5" y="2" width="5" height="1" fill="#88BC38" />
          <rect x="3" y="3" width="8" height="1" fill="#93C645" />
          <rect x="2" y="4" width="9" height="1" fill="#93C645" />
          <rect x="2" y="5" width="9" height="1" fill="#93C645" />
          <rect x="1" y="6" width="10" height="1" fill="#93C645" />
          <rect x="1" y="7" width="10" height="1" fill="#93C645" />
          <rect x="2" y="8" width="9" height="1" fill="#88BC38" />
          <rect x="2" y="9" width="9" height="1" fill="#78A832" />
          <rect x="3" y="10" width="7" height="1" fill="#6A962A" />
          <rect x="7" y="4" width="2" height="2" fill="#111816" />
          <rect x="7" y="4" width="1" height="1" fill="#FFFFFF" />
          <rect x="11" y="5" width="3" height="2" fill="#FFAA28" />
          <rect x="14" y="6" width="1" height="1" fill="#E89115" />
          {/* Tucked Flying Feet */}
          <rect x="4" y="11" width="3" height="1" fill="#FFAA28" />
          <rect x="8" y="11" width="3" height="1" fill="#FFAA28" />
          {/* Jet Thruster Exhaust */}
          <rect x="0" y="5" width="2" height="2" fill="#3D5A12" />
          <rect x="0" y="7" width="1" height="3" fill="#FF4D6D" />
          <rect x="1" y="7" width="1" height="2" fill="#FFAA28" />
          <rect x="0" y="10" width="1" height="2" fill="#FFB703" />
        </svg>
      ),
    },

    // 5. Hacking / CRT Inspecting
    {
      id: 'pose-hacking',
      name: '05 · Architect Monocle Inspector',
      badge: 'Code Review Loop',
      desc: 'Equipped with a golden analysis monocle carefully inspecting AST diffs before opening a PR.',
      svgCode: `<svg viewBox="0 0 16 16" width="32" height="32" shape-rendering="crispEdges">...</svg>`,
      renderSvg: (size = 32) => (
        <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
          <rect x="5" y="2" width="5" height="1" fill="#88BC38" />
          <rect x="3" y="3" width="8" height="1" fill="#93C645" />
          <rect x="2" y="4" width="9" height="1" fill="#93C645" />
          <rect x="2" y="5" width="9" height="1" fill="#93C645" />
          <rect x="1" y="6" width="10" height="1" fill="#93C645" />
          <rect x="1" y="7" width="10" height="1" fill="#93C645" />
          <rect x="2" y="8" width="9" height="1" fill="#88BC38" />
          <rect x="2" y="9" width="9" height="1" fill="#78A832" />
          <rect x="3" y="10" width="7" height="1" fill="#6A962A" />
          <rect x="7" y="4" width="2" height="2" fill="#111816" />
          <rect x="7" y="4" width="1" height="1" fill="#FFFFFF" />
          <rect x="11" y="5" width="3" height="2" fill="#FFAA28" />
          <rect x="14" y="6" width="1" height="1" fill="#E89115" />
          <rect x="4" y="12" width="2" height="2" fill="#FFAA28" />
          <rect x="3" y="13" width="3" height="1" fill="#FFAA28" />
          <rect x="8" y="12" width="2" height="2" fill="#FFAA28" />
          <rect x="7" y="13" width="3" height="1" fill="#FFAA28" />
          {/* Golden Monocle */}
          <rect x="7" y="3" width="3" height="3" fill="none" stroke="#FFAA28" strokeWidth="0.8" />
          <rect x="10" y="6" width="1" height="1" fill="#FFAA28" />
        </svg>
      ),
    },

    // 6. Guarding
    {
      id: 'pose-guarding',
      name: '06 · 24h Sentinel (Emerald Shield)',
      badge: 'Telemetry Guard',
      desc: 'Holding an emerald crest guard shield during the post-merge observation window.',
      svgCode: `<svg viewBox="0 0 16 16" width="32" height="32" shape-rendering="crispEdges">...</svg>`,
      renderSvg: (size = 32) => (
        <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
          <rect x="5" y="2" width="5" height="1" fill="#88BC38" />
          <rect x="3" y="3" width="8" height="1" fill="#93C645" />
          <rect x="2" y="4" width="9" height="1" fill="#93C645" />
          <rect x="2" y="5" width="9" height="1" fill="#93C645" />
          <rect x="1" y="6" width="10" height="1" fill="#93C645" />
          <rect x="1" y="7" width="10" height="1" fill="#93C645" />
          <rect x="2" y="8" width="9" height="1" fill="#88BC38" />
          <rect x="2" y="9" width="9" height="1" fill="#78A832" />
          <rect x="3" y="10" width="7" height="1" fill="#6A962A" />
          <rect x="7" y="4" width="2" height="2" fill="#111816" />
          <rect x="7" y="4" width="1" height="1" fill="#FFFFFF" />
          <rect x="11" y="5" width="3" height="2" fill="#FFAA28" />
          <rect x="14" y="6" width="1" height="1" fill="#E89115" />
          <rect x="4" y="12" width="2" height="2" fill="#FFAA28" />
          <rect x="3" y="13" width="3" height="1" fill="#FFAA28" />
          <rect x="8" y="12" width="2" height="2" fill="#FFAA28" />
          <rect x="7" y="13" width="3" height="1" fill="#FFAA28" />
          {/* Shield */}
          <rect x="0" y="4" width="3" height="5" fill="#4FB477" />
          <rect x="1" y="5" width="1" height="3" fill="#FFFFFF" />
        </svg>
      ),
    },

    // 7. Sleeping / Standby
    {
      id: 'pose-sleeping',
      name: '07 · Sleeping / Standby Mode',
      badge: 'Idle / Offline',
      desc: 'Curled up snoozing with closed eyes and floating z Z bubbles during quiet repo hours.',
      svgCode: `<svg viewBox="0 0 16 16" width="32" height="32" shape-rendering="crispEdges">...</svg>`,
      renderSvg: (size = 32) => (
        <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
          <rect x="5" y="2" width="5" height="1" fill="#88BC38" />
          <rect x="3" y="3" width="8" height="1" fill="#93C645" />
          <rect x="2" y="4" width="9" height="1" fill="#93C645" />
          <rect x="2" y="5" width="9" height="1" fill="#93C645" />
          <rect x="1" y="6" width="10" height="1" fill="#93C645" />
          <rect x="1" y="7" width="10" height="1" fill="#93C645" />
          <rect x="2" y="8" width="9" height="1" fill="#88BC38" />
          <rect x="2" y="9" width="9" height="1" fill="#78A832" />
          <rect x="3" y="10" width="7" height="1" fill="#6A962A" />
          {/* Sleeping eye */}
          <rect x="7" y="5" width="3" height="1" fill="#111816" />
          <rect x="11" y="5" width="3" height="2" fill="#FFAA28" />
          <rect x="14" y="6" width="1" height="1" fill="#E89115" />
          <rect x="4" y="12" width="2" height="2" fill="#FFAA28" />
          <rect x="3" y="13" width="3" height="1" fill="#FFAA28" />
          <rect x="8" y="12" width="2" height="2" fill="#FFAA28" />
          <rect x="7" y="13" width="3" height="1" fill="#FFAA28" />
        </svg>
      ),
    },

    // 8. Micro Favicon Tile (32x32 App Icon)
    {
      id: 'pose-app-tile',
      name: '08 · App Icon Tile & Favicon (32×32)',
      badge: 'App Icon',
      desc: 'Framed inside a rounded squircle with subtle neon rim glow for tab icons and mobile app badges.',
      svgCode: `<svg viewBox="0 0 32 32" width="32" height="32" shape-rendering="crispEdges">...</svg>`,
      renderSvg: (size = 32) => (
        <svg viewBox="0 0 32 32" width={size} height={size} shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
          <rect width="32" height="32" rx="7" fill="#0B131A" />
          <rect width="30" height="30" x="1" y="1" rx="6" fill="none" stroke="#93C645" strokeWidth="1" strokeOpacity="0.3" />
          <g transform="translate(8, 8)">
            <rect x="5" y="2" width="5" height="1" fill="#88BC38" />
            <rect x="3" y="3" width="8" height="1" fill="#93C645" />
            <rect x="2" y="4" width="9" height="1" fill="#93C645" />
            <rect x="2" y="5" width="9" height="1" fill="#93C645" />
            <rect x="1" y="6" width="10" height="1" fill="#93C645" />
            <rect x="1" y="7" width="10" height="1" fill="#93C645" />
            <rect x="2" y="8" width="9" height="1" fill="#88BC38" />
            <rect x="2" y="9" width="9" height="1" fill="#78A832" />
            <rect x="3" y="10" width="7" height="1" fill="#6A962A" />
            <rect x="7" y="4" width="2" height="2" fill="#111816" />
            <rect x="7" y="4" width="1" height="1" fill="#FFFFFF" />
            <rect x="11" y="5" width="3" height="2" fill="#FFAA28" />
            <rect x="14" y="6" width="1" height="1" fill="#E89115" />
            <rect x="4" y="12" width="2" height="2" fill="#FFAA28" />
            <rect x="3" y="13" width="3" height="1" fill="#FFAA28" />
            <rect x="8" y="12" width="2" height="2" fill="#FFAA28" />
            <rect x="7" y="13" width="3" height="1" fill="#FFAA28" />
          </g>
        </svg>
      ),
    },
  ];

  const selectedPose = POSES.find(p => p.id === selectedId) || POSES[0];

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`min-h-screen ${previewTheme === 'cream' ? 'theme-cream bg-[#F7F6F0] text-[#131816]' : 'bg-[#060A0E] text-white'}`} style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
      
      {/* Top Header Bar */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 bg-inherit/95 backdrop-blur-md z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-xs font-mono opacity-60 hover:opacity-100 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back to main site
          </Link>
          <span className="opacity-20">|</span>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#93C645]" />
            <h1 className="font-bold text-sm tracking-tight">8-Bit Chunky Chibi Mascot &amp; Asset Studio</h1>
            <span className="text-[10px] font-mono bg-[#93C645]/15 text-[#93C645] px-2 py-0.5 rounded-full border border-[#93C645]/30">v4-6 Official Kit</span>
          </div>
        </div>

        {/* Global theme switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs opacity-60 hidden sm:inline">Preview Theme:</span>
          <button
            onClick={() => setPreviewTheme('dark')}
            className={`px-2.5 py-1 text-xs rounded font-mono flex items-center gap-1.5 border transition-all ${previewTheme === 'dark' ? 'border-[#93C645] bg-white/10 text-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
          >
            <Moon className="w-3.5 h-3.5" /> Dark
          </button>
          <button
            onClick={() => setPreviewTheme('cream')}
            className={`px-2.5 py-1 text-xs rounded font-mono flex items-center gap-1.5 border transition-all ${previewTheme === 'cream' ? 'border-[#2B5F1B] bg-black/10 text-black' : 'border-transparent opacity-60 hover:opacity-100'}`}
          >
            <Sun className="w-3.5 h-3.5" /> Paper Cream
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Poses Grid */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div>
              <h2 className="text-base font-bold tracking-tight">Chunky Chibi 8-Bit Poses</h2>
              <p className="text-xs opacity-60">Interactive actions, states, and icon sizes powered by the v4-6 Chunky Chibi sprite.</p>
            </div>
            <span className="text-xs font-mono opacity-50">{POSES.length} poses</span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {POSES.map(p => {
              const isSelected = p.id === selectedId;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-4 relative ${
                    isSelected
                      ? 'border-[#93C645] bg-white/10 shadow-[0_0_20px_rgba(147,198,69,0.22)] ring-1 ring-[#93C645]'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-sm tracking-tight">{p.name}</h3>
                      <span className="text-[10px] font-mono text-[#93C645] uppercase tracking-wider block mt-0.5">{p.badge}</span>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#93C645] text-black flex items-center justify-center text-xs font-bold shrink-0">
                        ✓
                      </span>
                    )}
                  </div>

                  {/* Icon Display Area */}
                  <div className="h-28 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center gap-6">
                    <div className="flex flex-col items-center gap-1">
                      {p.renderSvg(48)}
                      <span className="text-[9px] font-mono opacity-40">48px (3x)</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      {p.renderSvg(24)}
                      <span className="text-[9px] font-mono opacity-40">24px (1.5x)</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      {p.renderSvg(16)}
                      <span className="text-[9px] font-mono opacity-40">16px (1x)</span>
                    </div>
                  </div>

                  <p className="text-xs opacity-70 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Context Previews & Inspector */}
        <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
          
          {/* Active Detail Card */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#93C645] uppercase tracking-wider">Active Selection</span>
                <h2 className="text-lg font-bold tracking-tight">{selectedPose.name}</h2>
              </div>
              <button
                onClick={() => handleCopy(selectedPose.id, selectedPose.svgCode)}
                className="px-3 py-1 text-xs font-mono rounded bg-white/10 hover:bg-white/20 border border-white/10 flex items-center gap-1.5 transition-all"
              >
                {copiedId === selectedPose.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === selectedPose.id ? 'Copied SVG' : 'Copy SVG'}
              </button>
            </div>

            {/* Giant 8x Pixel Zoom Display */}
            <div className="h-44 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#93C645_1px,transparent_1px)] [background-size:12px_12px] opacity-10" />
              {selectedPose.renderSvg(128)}
              <span className="absolute bottom-2 right-3 text-[10px] font-mono opacity-40">Zoom 128px (8x scale)</span>
            </div>

            {/* Mock Header Navigation Preview */}
            <div>
              <span className="text-[11px] font-mono opacity-60 mb-2 block">1. Live Header Navbar Preview</span>
              <div className="p-3.5 rounded-xl border border-white/15 bg-black/50 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-white/10 border border-[#93C645]/30 flex items-center justify-center">
                    {selectedPose.renderSvg(18)}
                  </span>
                  <span className="font-bold text-sm font-mono tracking-tight">kiwi</span>
                </div>
                <div className="flex items-center gap-3 text-xs opacity-70">
                  <span>How it works</span>
                  <span>Features</span>
                  <span>Pricing</span>
                </div>
                <div className="px-3 py-1 rounded bg-[#234E14] text-white text-xs font-bold font-mono">
                  Get started
                </div>
              </div>
            </div>

            {/* Mock Terminal Window Preview */}
            <div>
              <span className="text-[11px] font-mono opacity-60 mb-2 block">2. Standing on Terminal Window Preview</span>
              <div className="relative pt-4">
                {/* Perched Mascot */}
                <div className="absolute top-0 right-6 z-10 flex items-end">
                  {selectedPose.renderSvg(24)}
                </div>
                <div className="p-4 rounded-xl border border-white/15 bg-black/80 font-mono text-xs shadow-xl">
                  <div className="flex items-center gap-1.5 mb-3 opacity-60">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E06A4E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E8A13B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4FB477]" />
                    <span className="text-[11px] ml-2">kiwi/job-42 · migrate-auth</span>
                  </div>
                  <div className="text-green-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>$ kiwi submit &quot;Migrate auth to Postgres&quot;</span>
                  </div>
                  <div className="text-neutral-400 mt-1 pl-4">✓ 128 tests green · opened PR #42</div>
                </div>
              </div>
            </div>

            {/* Asset Kit Ready Notice */}
            <div className="p-3.5 rounded-lg bg-[#93C645]/10 border border-[#93C645]/30 text-xs leading-relaxed">
              <strong className="text-[#93C645] block mb-1">Brand Kit Status:</strong>
              All Chunky Chibi SVG icons, React components, and multi-size assets are being organized into the dedicated asset repository kit.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
