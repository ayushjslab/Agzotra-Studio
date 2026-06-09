"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Layers, ShieldCheck, Zap, Cpu, ChevronRight } from "lucide-react";
import Link from "next/link";

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled
          ? "bg-background/70 backdrop-blur-xl border-border"
          : "bg-transparent border-transparent"
          } py-4 px-6 md:px-12`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo Brand Area */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 p-[1px] shadow-[0_0_20px_rgba(var(--primary),0.2)] group-hover:shadow-[0_0_25px_rgba(var(--primary),0.4)] transition-all duration-300">
              <div className="w-full h-full bg-background rounded-[11px] flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary fill-primary/10" />
              </div>
            </div>
            <span className="font-sans font-bold tracking-tight text-foreground text-lg">
              Agzotra<span className="text-primary">.</span>studio
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-muted/50 border border-border p-1.5 rounded-full">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-full transition-all duration-200 hover:bg-muted relative group"
                >
                  <Icon className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-primary transition-colors duration-200" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Call to Action Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              Sign In
            </button>
            <Link href="/dashboard" className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none">
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-primary rounded-full transition-all duration-500 group-hover:rotate-180" />
              <span className="relative flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-background text-sm font-semibold text-foreground transition-all duration-200 group-hover:bg-transparent group-hover:text-primary-foreground">
                Dashboard
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-foreground p-1 transition-colors focus:outline-none"
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
            className="fixed inset-x-0 top-[73px] p-6 bg-background/95 backdrop-blur-2xl border-b border-border z-40 md:hidden flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border text-foreground/80 hover:text-foreground font-medium"
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <hr className="border-border" />

            <div className="flex flex-col gap-3">
              <button className="w-full py-3 rounded-xl text-center bg-card border border-border text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Sign In
              </button>
              <Link href="/dashboard" className="w-full py-3 rounded-xl text-center bg-gradient-to-r from-primary to-primary/60 text-sm font-semibold text-primary-foreground shadow-[0_4px_20px_rgba(var(--primary),0.25)]">
                Go to Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}