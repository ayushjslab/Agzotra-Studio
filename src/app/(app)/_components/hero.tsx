import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal, ArrowUpRight, Play, CheckCircle2 } from "lucide-react";

export default function Hero() {
  // Animation presets for sequential staggering
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: custom * 0.15 },
    } as const),
  };

  return (
    <section className="relative min-h-screen bg-[#0b0c10] pt-32 pb-24 px-6 md:px-12 overflow-hidden flex flex-col justify-center items-center">
      
      {/* Absolute Ambient Background Lights (OKLCH Purples) */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#a855f7]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-[#6366f1]/5 blur-[180px] rounded-full pointer-events-none" />
      
      {/* Subtle Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Text Copy & Call-To-Actions */}
        <div className="lg:col-span-6 flex flex-col text-center lg:text-left items-center lg:items-start">
          
          {/* Tagline Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12131a] border border-[#1a1b23] text-xs font-medium text-[#a855f7] mb-6 shadow-[0_0_15px_rgba(168,85,247,0.05)]"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Automated 16:9 Image Pipeline Engine</span>
          </motion.div>

          {/* Main Hero Hook */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-sans tracking-tight text-white leading-[1.1] mb-6"
          >
            Data into stunning <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a855f7] via-[#d8b4fe] to-[#6366f1]">
              visuals. Instantly.
            </span>
          </motion.h1>

          {/* Paragraph Sub-Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-base sm:text-lg text-neutral-400 max-w-xl mb-10 leading-relaxed font-normal"
          >
            Generate gorgeous feature-images, metadata thumbnails, and open-graph banners programmatically using React code templates. Built on ultra-fast edge infrastructure.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#0b0c10] text-sm font-semibold rounded-xl hover:bg-neutral-200 transition-all duration-200 shadow-[0_4px_25px_rgba(255,255,255,0.1)] group">
              Start Generating Free
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-[#12131a] border border-[#1a1b23] text-neutral-300 hover:text-white text-sm font-medium rounded-xl hover:bg-[#1a1b23] transition-colors duration-200">
              <Terminal className="w-4 h-4 text-neutral-500" />
              View API Specs
            </button>
          </motion.div>

          {/* Trust Framework Indicators */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex items-center gap-6 mt-12 text-xs text-neutral-500"
          >
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#a855f7]" /> Satori Core Backend</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#a855f7]" /> Cloudflare R2 Speed</span>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Interactive 16:9 Live Workspace Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="lg:col-span-6 w-full flex justify-center"
        >
          <div className="w-full max-w-[560px] aspect-[16/10.5] bg-[#12131a] border border-[#1a1b23] rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group">
            
            {/* Top Minimal Mac-Style Window Frame Bars */}
            <div className="flex items-center justify-between border-b border-[#1a1b23] pb-3 mb-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              </div>
              <div className="text-[11px] font-mono tracking-wider text-neutral-500 bg-[#0b0c10] px-3 py-0.5 rounded-md border border-[#1a1b23]">
                template_family / bento_glow
              </div>
              <div className="w-10" />
            </div>

            {/* Content Container (The actual 16:9 Screen Live Canvas Viewport) */}
            <div className="w-full aspect-[16/9] relative bg-[#0b0c10] border border-[#1a1b23] rounded-xl overflow-hidden shadow-inner flex flex-col justify-between p-6">
              
              {/* Internal Dynamic Preview Graphic Mockup */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#a855f71a,transparent_50%)]" />
              <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#6366f1]/10 blur-[40px] rounded-full" />
              
              {/* Generated Template UI details */}
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase bg-[#12131a] px-2 py-1 rounded border border-[#1a1b23]">
                  Engineering // 01
                </span>
                <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#a855f7] to-[#6366f1] opacity-80" />
              </div>

              <div className="space-y-2 relative z-10 max-w-[85%]">
                <div className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                  Building Agzotra Studio: The Future of Dynamic Images
                </div>
                <div className="text-[11px] text-neutral-400 font-medium">
                  By Agzotra Team • 5 min read
                </div>
              </div>

              {/* Grid accent line accents */}
              <div className="absolute right-4 bottom-4 flex items-center gap-1 opacity-40">
                <div className="w-1 h-3 bg-neutral-600 rounded-full" />
                <div className="w-1 h-5 bg-[#a855f7] rounded-full" />
                <div className="w-1 h-2 bg-neutral-600 rounded-full" />
              </div>
            </div>

            {/* Bottom Real-time Generation Feedback Info Bar */}
            <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-neutral-500">Pipeline Idle</span>
              </div>
              <div className="font-mono text-[11px] text-neutral-500">
                Render engine: <span className="text-white">142ms</span>
              </div>
            </div>

            {/* floating play decorative badge */}
            <div className="absolute inset-0 bg-[#0b0c10]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 rounded-2xl cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#a855f7] flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)] text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Play className="w-5 h-5 fill-white ml-0.5" />
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}