"use client";

import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import ThumbnailTemplate, { ThumbnailTemplateProps } from "./thumbnail";
import { Link, ExternalLink, Copy, Check } from "lucide-react";

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ThumbnailTemplateProps>({
    title: "MASTERING REACT IN 2026",
    subtitle: "Advanced architecture patterns explained simply",
    tag: "TUTORIAL",
    layout: "split-left",
    variant: "cyber",
    highlightColor: "#3b82f6",
    showBlurGlow: true,
  });

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const downloadImage = async () => {
    if (!ref.current) return;
    const dataUrl = await htmlToImage.toPng(ref.current, {
      cacheBust: true,
      pixelRatio: 2,
    });
    const link = document.createElement("a");
    link.download = "thumbnail.png";
    link.href = dataUrl;
    link.click();
  };

  const handleGenerateAndUpload = async () => {
    setLoading(true);
    setImageUrl(null);
    try {
      const response = await fetch("/api/image-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Failed to upload to Cloudflare R2");
      }

      const result = await response.json();
      setImageUrl(result.url);
    } catch (error: any) {
      console.error("Error generating thumbnail:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (imageUrl) {
      navigator.clipboard.writeText(imageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={handleGenerateAndUpload}
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 flex items-center gap-2"
          >
            {loading ? "Processing..." : "Generate & Save to Cloudflare R2"}
          </button>

          <button
            onClick={downloadImage}
            className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-xl transition-all shadow-lg"
          >
            Local Download
          </button>
        </div>

        {/* R2 Result Area */}
        {imageUrl && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                <Link className="w-5 h-5" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Live Cloudflare R2 URL</span>
                <span className="text-sm text-emerald-600 truncate max-w-md">{imageUrl}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="p-2 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Open
              </a>
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className="mb-8 p-4 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-xl animate-pulse flex items-center gap-3">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
          <span>Generating high-quality image and uploading to Cloudflare R2...</span>
        </div>
      )}

      {/* Editor Simulation (Simple inputs for demo) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="space-y-1">
          <label className="text-xs font-bold text-neutral-500 uppercase">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={e => setData({ ...data, title: e.target.value })}
            className="w-full p-2 border rounded-lg bg-white"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-neutral-500 uppercase">Subtitle</label>
          <input
            type="text"
            value={data.subtitle}
            onChange={e => setData({ ...data, subtitle: e.target.value })}
            className="w-full p-2 border rounded-lg bg-white"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-neutral-500 uppercase">Tag</label>
          <input
            type="text"
            value={data.tag}
            onChange={e => setData({ ...data, tag: e.target.value })}
            className="w-full p-2 border rounded-lg bg-white"
          />
        </div>
      </div>

      {/* ONLY THIS AREA WILL BE CAPTURED LOCALLY */}
      <div className="mt-6 w-full max-w-4xl mx-auto p-4">
        <ThumbnailTemplate {...data} innerRef={ref} />
      </div>
    </div>
  );
}