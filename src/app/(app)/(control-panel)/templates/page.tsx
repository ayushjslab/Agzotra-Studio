"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon, Sparkles, Layers } from "lucide-react";
import { CATEGORY } from "@/config/categories";

export default function TemplatesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
          <Sparkles className="w-3 h-3" />
          Template Library
        </div>
        <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Choose Your <span className="text-primary italic">Vibe.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Select a category to explore professional templates designed for high performance and visual impact.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {CATEGORY.map((item) => (
          <Link
            key={item.id}
            href={`/templates/${item.id}`}
            className="group relative h-[400px] overflow-hidden rounded-3xl bg-card border border-border/50 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-white/10 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                    {item.count} Templates
                  </span>
                  <div className="flex gap-1">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-primary/20 text-[10px] font-bold text-primary-foreground/90 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-3xl font-black text-white tracking-tight group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="text-zinc-300 text-sm max-w-sm line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 flex items-center gap-2 text-white font-bold text-sm tracking-tighter uppercase group/btn">
                Explore Category
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all group-hover/btn:bg-primary group-hover/btn:translate-x-2">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Decorative Icons */}
            <div className="absolute top-6 right-6 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 opacity-0 transition-all group-hover:opacity-100 group-hover:rotate-12 translate-y-4 group-hover:translate-y-0 text-white">
              <ImageIcon className="w-5 h-5" />
            </div>
          </Link>
        ))}

        {/* Coming Soon Case */}
        <div className="group relative h-[400px] overflow-hidden rounded-3xl bg-muted/30 border border-dashed border-border/50 flex flex-items-center justify-center p-12 text-center flex-col space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground transition-all duration-500 group-hover:bg-primary/20 group-hover:text-primary group-hover:rotate-12">
            <Layers className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">Custom Request?</h3>
            <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
              Need a specific template style for your niche? Let us know.
            </p>
          </div>
          <button className="px-6 py-2 rounded-xl bg-muted text-muted-foreground text-xs font-bold uppercase tracking-wider transition-all hover:bg-primary hover:text-white">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}