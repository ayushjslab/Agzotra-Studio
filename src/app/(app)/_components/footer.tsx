import React from "react";
import { motion } from "framer-motion";
import { Zap, Cpu, Layers, ExternalLink, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: "Templates", href: "#templates" },
      { name: "API Reference", href: "#api" },
      { name: "Pricing Tiers", href: "#pricing" },
      { name: "Satori Core Engine", href: "#" },
    ],
    Resources: [
      { name: "Documentation", href: "#" },
      { name: "Edge Framework Speed", href: "#" },
      { name: "Open Graph Spec Guide", href: "#" },
      { name: "System Status", href: "#" },
    ],
    Company: [
      { name: "About Studio", href: "#" },
      { name: "Brand Asset Kit", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
  };

  return (
    <footer className="relative bg-[#0b0c10] pt-20 pb-12 px-6 md:px-12 border-t border-[#1a1b23] overflow-hidden">
      
      {/* Subtle background ambient purple beam */}
      <div className="absolute right-[-10%] bottom-[-10%] w-[400px] h-[400px] bg-[#a855f7]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* UPPER ROW: HIGH-IMPACT LAST-STAGE CONVERSION HERO BLOCK */}
        <div className="relative w-full bg-gradient-to-br from-[#12131a] to-[#0c0d12] border border-[#1a1b23] rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-radial-gradient from-[#a855f7]/10 to-transparent blur-3xl pointer-events-none" />
          
          <div className="space-y-4 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-white">
              Ready to automate your visual infrastructure?
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Join thousands of developers and content platforms rendering ultra-high-resolution dynamic metadata layers seamlessly at the edge.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button className="w-full sm:w-auto relative group overflow-hidden rounded-xl p-[1px] focus:outline-none">
              <span className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#6366f1] rounded-xl transition-all duration-300" />
              <span className="relative flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-[11px] bg-[#0b0c10] text-sm font-semibold text-white transition-all duration-200 group-hover:bg-transparent">
                Open Workspace Dashboard
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>
        </div>

        {/* MIDDLE ROW: ARCHITECTURAL LINK GRID AND BRANDING MAP */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 lg:gap-6 pt-4">
          
          {/* Studio Brand Descriptor Column (Takes 2 blocks on wide screens) */}
          <div className="col-span-2 space-y-5">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#a855f7] to-[#6366f1] p-[1px]">
                <div className="w-full h-full bg-[#0b0c10] rounded-[7px] flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <span className="font-sans font-bold tracking-tight text-white text-base">
                Agzotra<span className="text-[#a855f7]">.</span>studio
              </span>
            </a>
            
            <p className="text-xs text-neutral-500 max-w-xs leading-relaxed font-normal">
              High-performance automated dynamic asset engines. Turning schema objects into gorgeous 16:9 canvas visuals instantly using optimized Satori & Resvg pipelines.
            </p>

            {/* Social Connect Icons */}
            <div className="flex items-center gap-3">
              {/* <a href="#" className="p-2 rounded-lg bg-[#12131a] border border-[#1a1b23] text-neutral-500 hover:text-white hover:border-neutral-700 transition-colors">
                <Twitter className="w-4 h-4 fill-current text-xs" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[#12131a] border border-[#1a1b23] text-neutral-500 hover:text-white hover:border-neutral-700 transition-colors">
                <Github className="w-4 h-4 text-xs" />
              </a> */}
            </div>
          </div>

          {/* Map through Link Directory trees */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1 space-y-4">
              <span className="text-[11px] font-mono tracking-widest text-white/50 uppercase block font-semibold">
                {category}
              </span>
              <ul className="space-y-2.5 text-xs">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-neutral-500 hover:text-white font-medium transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Infrastructure Health Indicator Meta Component */}
          <div className="col-span-1 space-y-4">
            <span className="text-[11px] font-mono tracking-widest text-white/50 uppercase block font-semibold">
              Global Health
            </span>
            <div className="bg-[#12131a] border border-[#1a1b23] p-3.5 rounded-xl space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All Node Networks Operational
              </div>
              <div className="text-[10px] font-mono text-neutral-600 leading-snug">
                Edge core compilation routing verified globally across 240+ global locations.
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: COPYRIGHT COMPLIANCE MATRIX */}
        <div className="pt-8 border-t border-[#1a1b23] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-600">
          <div>
            &copy; {currentYear} Agzotra Studio Inc. All rights specified.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-400 transition-colors">Privacy Architecture</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Terms of Protocol</a>
          </div>
        </div>

      </div>
    </footer>
  );
}