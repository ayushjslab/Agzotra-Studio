import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Palette, Eye, ArrowRight, Grid3X3, Sparkles } from "lucide-react";

// Types for data configuration
interface Variation {
  id: string;
  name: string;
  bgClass: string;
  accentColor: string;
}

interface TemplateFamily {
  id: string;
  name: string;
  tagline: string;
  description: string;
  variations: Variation[];
}

export default function TemplatesCatalog() {
  // 1. Static Template Families Definition
  const templateFamilies: TemplateFamily[] = [
    {
      id: "bento-glow",
      name: "Bento Glow",
      tagline: "Modern structured grid with toxic luminescence",
      description: "Perfect for technical documentations, deep-dive feature releases, and developer tools.",
      variations: [
        { id: "bg-v1", name: "Deep Amethyst", bgClass: "from-[#12072B] via-[#0B0C10] to-[#0B0C10]", accentColor: "#a855f7" },
        { id: "bg-v2", name: "Cyber Lime", bgClass: "from-[#0D1F10] via-[#0B0C10] to-[#0B0C10]", accentColor: "#22c55e" },
        { id: "bg-v3", name: "Midnight Void", bgClass: "from-[#161920] via-[#0B0C10] to-[#010204]", accentColor: "#6366f1" },
      ],
    },
    {
      id: "chalk-minimal",
      name: "Chalk",
      tagline: "High-contrast monochrome blueprint style",
      description: "Tailored for brutalist frameworks, minimal essays, and raw typographic hierarchies.",
      variations: [
        { id: "ck-v1", name: "Slate Oxide", bgClass: "from-[#1A1A1A] to-[#0B0C10]", accentColor: "#ffffff" },
        { id: "ck-v2", name: "Crimson Bleed", bgClass: "from-[#2A080C] via-[#0B0C10] to-[#0B0C10]", accentColor: "#ef4444" },
      ],
    },
    {
      id: "geometric-pattern",
      name: "Pattern Core",
      tagline: "Algorithmic layout loops and clean math backdrops",
      description: "Engineered specifically for system architectures, benchmark stats, and API updates.",
      variations: [
        { id: "pt-v1", name: "Quantum Dusk", bgClass: "from-[#1E1B4B] via-[#0B0C10] to-[#0B0C10]", accentColor: "#818cf8" },
        { id: "pt-v2", name: "Solar Flare", bgClass: "from-[#2A1705] via-[#0B0C10] to-[#0B0C10]", accentColor: "#f97316" },
      ],
    },
  ];

  // 2. Interactive States
  const [selectedFamily, setSelectedFamily] = useState<TemplateFamily>(templateFamilies[0]);
  const [activeVariation, setActiveVariation] = useState<Variation>(templateFamilies[0].variations[0]);

  const handleFamilyChange = (family: TemplateFamily) => {
    setSelectedFamily(family);
    setActiveVariation(family.variations[0]); // Reset to first variation automatically
  };

  return (
    <section id="templates" className="relative bg-[#0b0c10] py-32 px-6 md:px-12 border-t border-[#1a1b23]">
      {/* Decorative ambient background accents */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-[#a855f7]/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-[300px] h-[300px] bg-[#6366f1]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#a855f7] uppercase tracking-widest mb-3">
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Engine Presets</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              Curated Layout Families<span className="text-[#a855f7]">.</span>
            </h2>
            <p className="text-neutral-400 mt-2 max-w-xl text-sm sm:text-base">
              Browse atomic template foundations. Each ecosystem comes loaded with programmatic background vectors and variant styles.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-[#12131a] border border-[#1a1b23] p-1 rounded-xl self-start md:self-auto">
            <span className="px-3 py-1.5 text-xs font-medium text-neutral-400 bg-[#1a1b23] rounded-lg text-white flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#a855f7]" /> Component-Driven
            </span>
          </div>
        </div>

        {/* CORE CONTAINER INTERACTIVE MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Structural Switcher Sidebar Control (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-[11px] font-mono tracking-wider text-neutral-500 px-1 uppercase">
              Select Template Structure
            </span>
            
            {templateFamilies.map((family) => {
              const isSelected = selectedFamily.id === family.id;
              return (
                <button
                  key={family.id}
                  onClick={() => handleFamilyChange(family)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative group flex items-start gap-4 ${
                    isSelected
                      ? "bg-[#12131a] border-[#a855f7]/40 shadow-[0_10px_30px_rgba(168,85,247,0.03)]"
                      : "bg-[#0c0d12] border-[#1a1b23] hover:border-neutral-800"
                  }`}
                >
                  {/* Selected Indicator Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="sidebarActiveIndicator"
                      className="absolute left-0 top-4 bottom-4 w-[3px] bg-[#a855f7] rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className={`p-2.5 rounded-xl border transition-colors ${
                    isSelected ? "bg-[#1a1b23] border-[#a855f7]/30 text-[#a855f7]" : "bg-[#12131a] border-[#1a1b23] text-neutral-500 group-hover:text-neutral-300"
                  }`}>
                    <Layers className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <h4 className={`font-semibold text-sm transition-colors ${isSelected ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"}`}>
                      {family.name}
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-2 font-normal leading-relaxed">
                      {family.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Production Rendering Engine Workspace Canvas Preview (8 Columns) */}
          <div className="lg:col-span-8 bg-[#12131a] border border-[#1a1b23] rounded-3xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col gap-6">
            
            {/* Top Control Settings Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1a1b23] pb-5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase block">Active Blueprint</span>
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  {selectedFamily.name}
                  <span className="text-xs font-mono py-0.5 px-2 bg-[#1a1b23] border border-[#262936] text-neutral-400 rounded-md font-normal">
                    {activeVariation.name}
                  </span>
                </h3>
              </div>

              {/* Dynamic Variation Swatches Picker */}
              <div className="flex flex-col sm:items-end gap-2">
                <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase flex items-center gap-1">
                  <Palette className="w-3 h-3 text-[#a855f7]" /> Dynamic Background Variations
                </span>
                <div className="flex items-center gap-2 bg-[#0b0c10] border border-[#1a1b23] p-1.5 rounded-xl">
                  {selectedFamily.variations.map((v) => {
                    const isActive = activeVariation.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setActiveVariation(v)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 border ${
                          isActive
                            ? "bg-[#1a1b23] border-neutral-700 text-white"
                            : "border-transparent text-neutral-500 hover:text-neutral-300"
                        }`}
                      >
                        <span 
                          className="w-2.5 h-2.5 rounded-full block border border-white/10" 
                          style={{ backgroundColor: v.accentColor }} 
                        />
                        {v.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* REAL-TIME 16:9 RENDER WORKSPACE LAYER */}
            <div className="w-full aspect-[16/9] bg-[#0b0c10] border border-[#1a1b23] rounded-2xl overflow-hidden relative group p-8 flex flex-col justify-between shadow-inner">
              
              {/* Dynamic Animated BG Gradient injected instantly via state toggle */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVariation.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`absolute inset-0 bg-gradient-to-tr ${activeVariation.bgClass}`}
                />
              </AnimatePresence>

              {/* Decorative Vector Mesh grid based on selection */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none mix-blend-overlay" />
              
              {/* Top Banner Content Rows */}
              <div className="flex items-start justify-between relative z-10 w-full">
                <div className="space-y-1.5">
                  <div className="h-2 w-12 rounded bg-neutral-700/40" />
                  <div className="text-[11px] font-mono tracking-wider text-neutral-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeVariation.accentColor }} />
                    agzotra_engine_v2.5.bin
                  </div>
                </div>
                <div className="px-3 py-1 bg-white/5 border border-white/10 backdrop-blur-md rounded-lg text-[10px] font-mono text-white/70">
                  1200 × 630 PNG
                </div>
              </div>

              {/* Dynamic Template Typography Layout Mockup */}
              <div className="relative z-10 max-w-[85%] space-y-4">
                <div className="space-y-2">
                  <div className="inline-block text-[10px] font-bold tracking-widest uppercase text-white/50 border-b border-white/20 pb-1">
                    Core Documentation Series
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                    Optimizing Edge Architectures for Automated Asset Pipelines
                  </h3>
                </div>
                
                {/* Author Metadata Footer */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-6 h-6 rounded-full bg-neutral-800 border border-white/20" />
                  <div className="text-xs text-white/60 font-medium">
                    Ayush Kumar <span className="text-white/30 mx-1">•</span> <span className="text-[11px] font-mono text-white/40">6 min read</span>
                  </div>
                </div>
              </div>

              {/* Ambient Bottom Right Soft Radial Spotlight */}
              <div 
                className="absolute right-[-10%] bottom-[-10%] w-[40%] h-[40%] rounded-full blur-[60px] opacity-20 transition-all duration-500" 
                style={{ backgroundColor: activeVariation.accentColor }}
              />
            </div>

            {/* Bottom Panel Description Meta Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs bg-[#0b0c10] border border-[#1a1b23] p-4 rounded-xl">
              <p className="text-neutral-500 max-w-md">
                {selectedFamily.description}
              </p>
              <button className="flex items-center justify-center gap-1.5 px-4 py-2 bg-white text-[#0b0c10] font-semibold rounded-lg hover:bg-neutral-200 transition-colors self-start sm:self-auto whitespace-nowrap">
                <Eye className="w-3.5 h-3.5" /> Customize Template
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}