import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Layers, ShieldCheck, Zap, Cpu, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle glassmorphism background trigger on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Templates", href: "#templates", icon: Layers },
    { name: "API Docs", href: "#api", icon: Cpu },
    { name: "Pricing", href: "#pricing", icon: ShieldCheck },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-[#0b0c10]/70 backdrop-blur-xl border-[#1a1b23]"
            : "bg-transparent border-transparent"
        } py-4 px-6 md:px-12`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand Area */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#6366f1] p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-300">
              <div className="w-full h-full bg-[#0b0c10] rounded-[11px] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white group-hover:text-[#a855f7] transition-colors duration-300 fill-white/10" />
              </div>
            </div>
            <span className="font-sans font-bold tracking-tight text-white text-lg">
              Agzotra<span className="text-[#a855f7]">.</span>studio
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-[#12131a] border border-[#1a1b23] p-1.5 rounded-full">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white rounded-full transition-all duration-200 hover:bg-[#1a1b23] relative group"
                >
                  <Icon className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#a855f7] transition-colors duration-200" />
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Call to Action Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200">
              Sign In
            </button>
            <button className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none">
              <span className="absolute inset-0 bg-gradient-to-r from-[#a855f7] via-[#d8b4fe] to-[#6366f1] rounded-full transition-all duration-500 group-hover:rotate-180" />
              <span className="relative flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0b0c10] text-sm font-semibold text-white transition-all duration-200 group-hover:bg-transparent">
                Dashboard
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-400 hover:text-white p-1 transition-colors focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[73px] p-6 bg-[#0b0c10]/95 backdrop-blur-2xl border-b border-[#1a1b23] z-40 md:hidden flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#12131a] border border-[#1a1b23] text-neutral-300 hover:text-white font-medium"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#1a1b23] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#a855f7]" />
                    </div>
                    {link.name}
                  </a>
                );
              })}
            </div>
            
            <hr className="border-[#1a1b23]" />

            <div className="flex flex-col gap-3">
              <button className="w-full py-3 rounded-xl text-center bg-[#12131a] border border-[#1a1b23] text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                Sign In
              </button>
              <button className="w-full py-3 rounded-xl text-center bg-gradient-to-r from-[#a855f7] to-[#6366f1] text-sm font-semibold text-white shadow-[0_4px_20px_rgba(168,85,247,0.25)]">
                Go to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}