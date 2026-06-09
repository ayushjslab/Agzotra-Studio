"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Server, Activity, ArrowRight, Gauge, Layers3 } from "lucide-react";

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  // Dynamic calculations based on billing cycle states
  const priceMultiplier = billingCycle === "annual" ? 0.8 : 1; // 20% discount

  return (
    <section id="pricing" className="relative bg-background py-32 px-6 md:px-12 border-t border-border">
      {/* Decorative ambient background flares */}
      <div className="absolute left-1/2 bottom-[-10%] -translate-x-1/2 w-[700px] h-[350px] bg-primary/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADER BLOCK */}
        <div className="flex flex-col items-center text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest bg-card border border-border px-3 py-1.5 rounded-full">
            <Gauge className="w-3.5 h-3.5" />
            <span>Resource Allocation Scales</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground font-sans max-w-2xl leading-tight">
            Predictable metrics. <br />
            Built for hyper-growth<span className="text-primary">.</span>
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base max-w-lg">
            Choose a scale that perfectly aligns with your automated publishing pipelines or developer endpoints. No hidden runtime surprises.
          </p>

          {/* Billing Toggle Control Switcher */}
          <div className="flex items-center gap-1 bg-card border border-border p-1 rounded-xl mt-6">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${billingCycle === "monthly" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${billingCycle === "annual" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Annual Save 20%
            </button>
          </div>
        </div>

        {/* METRICS & PRICING SPLIT CARD MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* LEFT CONTAINER: Mock Real-time Analytics System Performance Card (7 Columns) */}
          <div className="lg:col-span-7 bg-card border border-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_25px_50px_rgba(0,0,0,0.4)]">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase block">Workspace Dashboard View</span>
                  <h3 className="text-foreground font-bold text-lg flex items-center gap-2">
                    Generation Credit Metrics
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-[11px] font-mono text-emerald-400">
                  <Activity className="w-3 h-3 animate-pulse" /> Live Pipeline Stream
                </div>
              </div>

              {/* Progress Bar Visualization Module */}
              <div className="space-y-3 bg-background border border-border p-5 rounded-2xl">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Current Token Pool Billing Cycle</span>
                  <span className="text-foreground font-medium">84,192 / 100,000 PNGs</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden border border-border">
                  <div className="h-full w-[84%] bg-gradient-to-r from-primary/60 to-primary rounded-full" />
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed pt-1">
                  Credits automatically refresh on the 1st of every month. API overages transition smoothly into auto-scale buffers.
                </p>
              </div>

              {/* System Cluster Specs Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="bg-background border border-border p-4 rounded-xl space-y-1">
                  <span className="text-muted-foreground block">Avg Edge Speed</span>
                  <span className="text-foreground font-bold text-sm">142ms / asset</span>
                </div>
                <div className="bg-background border border-border p-4 rounded-xl space-y-1">
                  <span className="text-muted-foreground block">Satori Core Load</span>
                  <span className="text-emerald-400 font-bold text-sm">0.02% Idle</span>
                </div>
                <div className="bg-background border border-border p-4 rounded-xl space-y-1">
                  <span className="text-muted-foreground block">Global CDN Node</span>
                  <span className="text-foreground font-bold text-sm">Cloudflare R2</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#1a1b23] mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-primary">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-foreground text-xs font-semibold">Enterprise Scale Testing Available</h4>
                  <p className="text-[11px] text-muted-foreground">Need over 1 million generations monthly?</p>
                </div>
              </div>
              <button className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors self-end sm:self-auto group">
                Contact Infrastructure <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* RIGHT CONTAINER: Premium Structural Pricing Offer Card (5 Columns) */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-3xl p-[1px]">
            {/* Animated underlying layout gradient border line */}
            <span className="absolute inset-0 bg-gradient-to-b from-primary/40 via-border to-border rounded-3xl" />

            <div className="relative w-full h-full bg-card rounded-[23px] p-6 sm:p-8 flex flex-col justify-between">

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase bg-primary/10 text-primary border border-primary/20 rounded-md">
                    Studio Pro Access
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">Most Popular Bundle</span>
                </div>

                {/* Price Display Layout Row */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2 text-foreground">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight font-sans">
                      ${Math.round(49 * priceMultiplier)}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground font-mono">/ month</span>
                  </div>
                  {billingCycle === "annual" && (
                    <span className="text-[11px] text-primary font-mono block font-medium">Billed annually ($470/year)</span>
                  )}
                </div>

                <hr className="border-border" />

                {/* Core Pack Features Checklist */}
                <ul className="space-y-3 text-sm text-foreground/80 font-normal">
                  <li className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span><strong>100,000</strong> image generations / mo</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>All Library Template Families included</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>Developer Token API Key Access</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>Instant streaming to custom Cloudflare R2</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>Priority background compilation routing</span>
                  </li>
                </ul>
              </div>

              {/* Major Action Conversion Button Hook */}
              <div className="mt-8 pt-6 border-t border-border">
                <button className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 transition-all shadow-[0_4px_25px_rgba(var(--primary),0.05)] group">
                  Deploy Workspace Engine
                  <Layers3 className="w-4 h-4 text-primary-foreground" />
                </button>
                <span className="text-[10px] text-center block text-muted-foreground mt-3 font-mono">
                  Cancel subscription or alter scales at any point.
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}