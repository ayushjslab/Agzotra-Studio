"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Terminal, Copy, Check, Code, Shield, Network } from "lucide-react";

export default function ApiPlayground() {
  const [activeTab, setActiveTab] = useState<"curl" | "nextjs" | "python">("curl");
  const [copied, setCopied] = useState(false);

  // Raw code string variants mapped by state
  const codeBlocks = {
    curl: `curl -X POST "https://api.agzotra.studio/v1/generate" \\
  -H "Authorization: Bearer az_secret_live_x9k2" \\
  -H "Content-Type: application/json" \\
  -d '{
    "templateId": "bento-glow",
    "variation": "deep-purple",
    "data": {
      "title": "Optimizing Edge Architectures",
      "author": "Ayush Kumar"
    }
  }'`,
    nextjs: `// App Router API Route / Route Handler
export async function POST(req: Request) {
  const res = await fetch("https://api.agzotra.studio/v1/generate", {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${process.env.AGZOTRA_SECRET_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      templateId: "bento-glow",
      variation: "deep-purple",
      data: { title: "Optimizing Edge Architectures" }
    })
  });

  const data = await res.json();
  return Response.json(data);
}`,
    python: `import requests

url = "https://api.agzotra.studio/v1/generate"
headers = {
    "Authorization": "Bearer az_secret_live_x9k2",
    "Content-Type": "application/json"
}
payload = {
    "templateId": "bento-glow",
    "variation": "deep-purple",
    "data": {
        "title": "Optimizing Edge Architectures"
    }
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeBlocks[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api" className="relative bg-background py-32 px-6 md:px-12 border-t border-border">
      {/* Background glow effects to keep the ambient OKLCH aesthetic consistent */}
      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* LEFT COLUMN: Technical Value Prop & Endpoint Architecture (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest bg-card border border-border px-3 py-1.5 rounded-full">
            <Cpu className="w-3.5 h-3.5" />
            <span>Developer SDK Framework</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
            Automate asset rendering at scale<span className="text-primary">.</span>
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Integrate dynamic visual layers natively into your application lifecycle. Our REST framework turns schema objects into optimized social assets instantly.
          </p>

          {/* Core Feature Matrix Points */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex gap-3 items-start">
              <div className="p-1.5 rounded-lg bg-card border border-border text-primary mt-0.5">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-foreground text-sm font-semibold">Sub-150ms Compilations</h4>
                <p className="text-xs text-muted-foreground">Satori and Resvg native compilation layer running entirely at the network edge.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="p-1.5 rounded-lg bg-card border border-border text-primary mt-0.5">
                <Network className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-foreground text-sm font-semibold">Streaming Storage Integrations</h4>
                <p className="text-xs text-muted-foreground">Automatically dispatches resulting binaries instantly to Cloudflare R2 or Cloudinary buckets.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="p-1.5 rounded-lg bg-card border border-border text-emerald-500 mt-0.5">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-foreground text-sm font-semibold">Granular Token Guards</h4>
                <p className="text-xs text-muted-foreground">Scope specific secrets exclusively to internal microservices or public workflows.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Dark Terminal Playground (7 Columns) */}
        <div className="lg:col-span-7 bg-card border border-border rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

          {/* Terminal Controls Bar */}
          <div className="bg-background px-4 py-3 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-3">
              {/* Language Switcher Tab Hooks */}
              {(["curl", "nextjs", "python"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs font-mono font-medium transition-colors ${activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {tab === "curl" ? "cURL" : tab === "nextjs" ? "Next.js" : "Python"}
                </button>
              ))}
            </div>

            {/* Clipboard Trigger Button */}
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
              title="Copy Code Snippet"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Actual Code Shell Layer */}
          <div className="p-5 font-mono text-[13px] leading-relaxed text-foreground/80 bg-background overflow-x-auto min-h-[260px] relative">
            <AnimatePresence mode="wait">
              <motion.pre
                key={activeTab}
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.15 }}
                className="whitespace-pre"
              >
                {/* Simple Custom Syntax Highlight Mapping for visual brilliance */}
                {codeBlocks[activeTab].split("\n").map((line, idx) => (
                  <div key={idx} className="table-row">
                    <span className="table-cell pr-4 text-muted-foreground/40 select-none text-right w-6 text-[11px]">{idx + 1}</span>
                    <span className="table-cell">
                      {line.split(/(".*?"|https:\/\/.*?(?=\s|")|\bPOST\b)/g).map((part, pIdx) => {
                        if (part.startsWith('"') && part.endsWith('"')) {
                          return <span key={pIdx} className="text-emerald-400">{part}</span>;
                        }
                        if (part.startsWith("https://")) {
                          return <span key={pIdx} className="text-[#6366f1] underline">{part}</span>;
                        }
                        if (part === "POST") {
                          return <span key={pIdx} className="text-secondary font-bold">{part}</span>;
                        }
                        return <span key={pIdx}>{part}</span>;
                      })}
                    </span>
                  </div>
                ))}
              </motion.pre>
            </AnimatePresence>
          </div>

          {/* Terminal Bottom Simulated JSON Response Panel */}
          <div className="bg-background border-t border-border p-4 font-mono text-[11px]">
            <div className="text-muted-foreground mb-2 flex items-center gap-1.5">
              <Code className="w-3 h-3 text-emerald-500" />
              <span>Expected API Payload JSON Response (201 Created)</span>
            </div>
            <pre className="text-muted-foreground bg-card p-3 rounded-lg border border-border overflow-x-auto">
              {`{
  "success": true,
  "imageId": "img_84hf92nslk",
  "url": "https://cdn.agzotra.studio/generated/img_84hf92nslk.png",
  "meta": { "creditsRemaining": 482, "generationTimeMs": 142 }
}`}
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
}