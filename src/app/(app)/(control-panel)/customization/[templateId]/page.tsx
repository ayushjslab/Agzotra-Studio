"use client";

import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Type, Palette, Image as ImageIcon, Tag, ArrowLeft,
    Download, Eye, Wand2, RotateCcw,
    Plus, X, Check, Sparkles, AlignLeft, AlignCenter, AlignRight,
    Bold, Italic, Zap, Layers, Monitor
} from 'lucide-react';
import Link from 'next/link';

// ─── Types ───────────────────────────────────────────────────────────────────

type ContentPosition =
    | 'top-left' | 'top-center' | 'top-right'
    | 'center'
    | 'bottom-left' | 'bottom-center' | 'bottom-right';

interface Badge {
    id: string;
    text: string;
    color: string;
    bg: string;
}

interface TemplateConfig {
    title: string;
    subtitle: string;
    author: string;
    readTime: string;
    bgImageUrl: string;
    bgColor: string;
    gradientFrom: string;
    gradientTo: string;
    gradientAngle: number;
    titleColor: string;
    subtitleColor: string;
    titleAlign: 'left' | 'center' | 'right';
    titleBold: boolean;
    titleItalic: boolean;
    contentPosition: ContentPosition;
    badges: Badge[];
    overlayOpacity: number;
    borderRadius: number;
    accentColor: string;
    showAuthor: boolean;
    showReadTime: boolean;
    containerStyle: 'minimal' | 'bento' | 'split' | 'centered';
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_CONFIG: TemplateConfig = {
    title: 'Your Stunning Article Title Goes Here',
    subtitle: 'A brief description that captures the essence of your content in one or two compelling lines.',
    author: 'Your Name',
    readTime: '5 min read',
    bgImageUrl: '',
    bgColor: '#0b0c10',
    gradientFrom: '#12072B',
    gradientTo: '#0b0c10',
    gradientAngle: 135,
    titleColor: '#ffffff',
    subtitleColor: 'rgba(255,255,255,0.65)',
    titleAlign: 'left',
    titleBold: true,
    titleItalic: false,
    contentPosition: 'bottom-left',
    badges: [{ id: '1', text: 'Engineering', color: '#a855f7', bg: 'rgba(168,85,247,0.15)' }],
    overlayOpacity: 0.5,
    borderRadius: 16,
    accentColor: '#a855f7',
    showAuthor: true,
    showReadTime: true,
    containerStyle: 'bento',
};

const PRESET_GRADIENTS = [
    { label: 'Amethyst', from: '#12072B', to: '#0b0c10' },
    { label: 'Midnight', from: '#020617', to: '#0f172a' },
    { label: 'Inferno', from: '#450a0a', to: '#0b0c10' },
    { label: 'Ocean', from: '#062036', to: '#0b0c10' },
    { label: 'Forest', from: '#052e16', to: '#0b0c10' },
    { label: 'Slate', from: '#1e293b', to: '#0f172a' },
];

const BADGE_PRESETS = [
    { text: 'Engineering', color: '#a855f7', bg: 'rgba(168,85,247,0.15)' },
    { text: 'AI & ML', color: '#06b6d4', bg: 'rgba(6,182,212,0.15)' },
    { text: 'Tutorial', color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
    { text: 'Opinion', color: '#f97316', bg: 'rgba(249,115,22,0.15)' },
    { text: 'News', color: '#eab308', bg: 'rgba(234,179,8,0.15)' },
    { text: 'Design', color: '#ec4899', bg: 'rgba(236,72,153,0.15)' },
];

// ─── Position → CSS classes ───────────────────────────────────────────────────

// Maps position key → [justify (vertical), items (horizontal)]
const POSITION_STYLES: Record<ContentPosition, { justify: string; items: string; text: string }> = {
    'top-left': { justify: 'justify-start', items: 'items-start', text: 'text-left' },
    'top-center': { justify: 'justify-start', items: 'items-center', text: 'text-center' },
    'top-right': { justify: 'justify-start', items: 'items-end', text: 'text-right' },
    'center': { justify: 'justify-center', items: 'items-center', text: 'text-center' },
    'bottom-left': { justify: 'justify-end', items: 'items-start', text: 'text-left' },
    'bottom-center': { justify: 'justify-end', items: 'items-center', text: 'text-center' },
    'bottom-right': { justify: 'justify-end', items: 'items-end', text: 'text-right' },
};

// ─── Utility UI Components ────────────────────────────────────────────────────

function SectionTitle({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
    return (
        <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                <Icon className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                {label}
            </span>
        </div>
    );
}

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <label className="text-sm text-muted-foreground">{label}</label>
            <div className="flex items-center gap-2">
                <input
                    type="color"
                    value={value.startsWith('#') ? value : '#ffffff'}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-8 h-8 rounded-lg border border-border cursor-pointer bg-transparent overflow-hidden"
                />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-24 px-2 py-1 bg-background border border-border rounded-lg text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
            </div>
        </div>
    );
}

function SliderInput({ label, value, min, max, step = 1, unit = '', onChange }: {
    label: string; value: number; min: number; max: number;
    step?: number; unit?: string; onChange: (v: number) => void;
}) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-xs">
                <label className="text-muted-foreground">{label}</label>
                <span className="font-mono text-foreground font-medium">{value}{unit}</span>
            </div>
            <input
                type="range"
                min={min} max={max} step={step} value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1.5 rounded-full accent-primary cursor-pointer"
            />
        </div>
    );
}

// ─── 7-Position Grid Picker ───────────────────────────────────────────────────

// Visual 3×3 grid: center-left and center-right omitted → 7 positions
const POSITION_GRID: (ContentPosition | null)[][] = [
    ['top-left', 'top-center', 'top-right'],
    [null, 'center', null],
    ['bottom-left', 'bottom-center', 'bottom-right'],
];

const POSITION_LABELS: Record<ContentPosition, string> = {
    'top-left': 'Top Left',
    'top-center': 'Top Center',
    'top-right': 'Top Right',
    'center': 'Center',
    'bottom-left': 'Bottom Left',
    'bottom-center': 'Bottom Center',
    'bottom-right': 'Bottom Right',
};

function PositionPicker({
    value, onChange,
}: { value: ContentPosition; onChange: (v: ContentPosition) => void }) {
    return (
        <div className="space-y-2">
            <div className="grid grid-cols-3 gap-1.5 p-2 bg-background border border-border rounded-xl">
                {POSITION_GRID.map((row, rowIdx) =>
                    row.map((pos, colIdx) => {
                        if (!pos) {
                            return (
                                <div
                                    key={`empty-${rowIdx}-${colIdx}`}
                                    className="h-8 rounded-lg bg-muted/20 border border-dashed border-border/40"
                                />
                            );
                        }
                        const isActive = value === pos;
                        return (
                            <button
                                key={pos}
                                title={POSITION_LABELS[pos]}
                                onClick={() => onChange(pos)}
                                className={`h-8 rounded-lg border transition-all duration-150 flex items-center justify-center ${isActive
                                        ? 'bg-primary border-primary shadow-[0_0_8px_rgba(var(--primary),0.4)]'
                                        : 'bg-muted/40 border-border hover:bg-muted hover:border-primary/30'
                                    }`}
                            >
                                <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-primary-foreground' : 'bg-muted-foreground/50'}`} />
                            </button>
                        );
                    })
                )}
            </div>
            <p className="text-[11px] text-muted-foreground text-center font-medium">
                {POSITION_LABELS[value]}
            </p>
        </div>
    );
}

// ─── Live Preview Canvas ──────────────────────────────────────────────────────

function TemplatePreview({ config }: { config: TemplateConfig }) {
    const pos = POSITION_STYLES[config.contentPosition];
    const badgeJustify = pos.text === 'text-center' ? 'justify-center' : pos.text === 'text-right' ? 'justify-end' : 'justify-start';

    const bgStyle: React.CSSProperties = config.bgImageUrl
        ? {
            backgroundImage: `linear-gradient(${config.gradientAngle}deg, ${config.gradientFrom}ee, ${config.gradientTo}bb), url(${config.bgImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: config.bgColor,
        }
        : {
            backgroundImage: `linear-gradient(${config.gradientAngle}deg, ${config.gradientFrom}, ${config.gradientTo})`,
            backgroundColor: config.bgColor,
        };

    return (
        <div
            className="w-full aspect-video relative overflow-hidden"
            style={{ ...bgStyle, borderRadius: `${config.borderRadius}px` }}
        >
            {/* Noise texture */}
            <div className="absolute inset-0 opacity-[0.025] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIvPjwvc3ZnPg==')]" />

            {/* Accent glow */}
            <div
                className="absolute top-0 right-0 w-1/2 h-1/2 blur-[80px] rounded-full opacity-25 pointer-events-none"
                style={{ backgroundColor: config.accentColor }}
            />

            {/* Content block — positioned via flexbox */}
            <div className={`absolute inset-0 flex flex-col p-10 ${pos.justify} ${pos.items}`}>
                <div className={`flex flex-col gap-3 max-w-[80%] ${pos.text}`}>
                    {/* Badges */}
                    {config.badges.length > 0 && (
                        <div className={`flex flex-wrap gap-2 ${badgeJustify}`}>
                            {config.badges.map((b) => (
                                <span
                                    key={b.id}
                                    className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                                    style={{ color: b.color, backgroundColor: b.bg, borderColor: `${b.color}40` }}
                                >
                                    {b.text}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h1
                        className="text-4xl leading-tight"
                        style={{
                            color: config.titleColor,
                            fontWeight: config.titleBold ? 800 : 500,
                            fontStyle: config.titleItalic ? 'italic' : 'normal',
                            textAlign: config.titleAlign,
                        }}
                    >
                        {config.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base leading-relaxed" style={{ color: config.subtitleColor, textAlign: config.titleAlign }}>
                        {config.subtitle}
                    </p>

                    {/* Author / Read time */}
                    {(config.showAuthor || config.showReadTime) && (
                        <div className={`flex items-center gap-4 text-xs ${badgeJustify}`} style={{ color: config.subtitleColor }}>
                            {config.showAuthor && (
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
                                        style={{ backgroundColor: config.accentColor, color: '#fff' }}
                                    >
                                        {config.author.charAt(0)}
                                    </div>
                                    <span className="font-medium">{config.author}</span>
                                </div>
                            )}
                            {config.showAuthor && config.showReadTime && <span className="opacity-40">•</span>}
                            {config.showReadTime && <span className="font-medium">{config.readTime}</span>}
                        </div>
                    )}
                </div>
            </div>

            {/* Canvas size label */}
            <div className="absolute top-5 right-6 flex items-center gap-2 z-10">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.accentColor }} />
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-40" style={{ color: config.titleColor }}>
                    1200 × 630
                </span>
            </div>

            {/* Position indicator dots (subtle overlay) */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                {POSITION_GRID.map((row, ri) =>
                    row.map((pos_item, ci) => (
                        <div
                            key={`dot-${ri}-${ci}`}
                            className={`flex items-center justify-center ${ri === 0 ? 'items-start' : ri === 2 ? 'items-end' : 'items-center'} ${ci === 0 ? 'justify-start' : ci === 2 ? 'justify-end' : 'justify-center'}`}
                        >
                            {pos_item && (
                                <div
                                    className={`w-1.5 h-1.5 rounded-full transition-all ${config.contentPosition === pos_item ? 'bg-white scale-150 shadow-sm' : 'bg-white/30'}`}
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

// ─── Badge Manager ────────────────────────────────────────────────────────────

function BadgeManager({ badges, onChange }: { badges: Badge[]; onChange: (b: Badge[]) => void }) {
    const [newText, setNewText] = useState('');
    const [newColor, setNewColor] = useState('#a855f7');

    const addBadge = () => {
        if (!newText.trim()) return;
        const bg = newColor + '26'; // ~15% opacity
        onChange([...badges, { id: Date.now().toString(), text: newText.trim(), color: newColor, bg }]);
        setNewText('');
    };

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
                {BADGE_PRESETS.map((preset) => (
                    <button
                        key={preset.text}
                        onClick={() => onChange([...badges, { id: Date.now().toString(), ...preset }])}
                        className="px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all hover:scale-105"
                        style={{ color: preset.color, backgroundColor: preset.bg, borderColor: `${preset.color}40` }}
                    >
                        + {preset.text}
                    </button>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addBadge()}
                    placeholder="Custom badge text..."
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
                <input
                    type="color" value={newColor} onChange={(e) => setNewColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-border cursor-pointer bg-transparent"
                    title="Badge color"
                />
                <button
                    onClick={addBadge}
                    className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-3.5 h-3.5" />
                </button>
            </div>
            {badges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {badges.map((badge) => (
                        <div
                            key={badge.id}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold"
                            style={{ color: badge.color, backgroundColor: badge.bg, borderColor: `${badge.color}40` }}
                        >
                            {badge.text}
                            <button
                                onClick={() => onChange(badges.filter((b) => b.id !== badge.id))}
                                className="hover:opacity-60 transition-opacity"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!value)}
            className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${value ? 'bg-primary' : 'bg-muted border border-border'}`}
        >
            <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${value ? 'left-5' : 'left-0.5'}`}
            />
        </button>
    );
}

// ─── Main Editor ──────────────────────────────────────────────────────────────

export default function TemplateCustomizationPage() {
    const searchParams = useSearchParams();
    const templateName = searchParams.get('name') ?? 'Untitled Template';

    const [config, setConfig] = useState<TemplateConfig>(DEFAULT_CONFIG);
    const [activePanel, setActivePanel] = useState<'text' | 'design' | 'background' | 'badges'>('text');
    const [saved, setSaved] = useState(false);

    const update = useCallback(<K extends keyof TemplateConfig>(key: K, value: TemplateConfig[K]) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
    }, []);

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
    const handleReset = () => setConfig(DEFAULT_CONFIG);

    const panels = [
        { id: 'text' as const, label: 'Text', icon: Type },
        { id: 'design' as const, label: 'Design', icon: Palette },
        { id: 'background' as const, label: 'Background', icon: ImageIcon },
        { id: 'badges' as const, label: 'Badges', icon: Tag },
    ];

    return (
        <div className="flex flex-col h-full max-h-[calc(100vh-4rem)]">
            {/* ── Top Bar ── */}
            <div className="flex items-center justify-between gap-4 mb-6 shrink-0">
                <div className="flex items-center gap-3">
                    <Link href="/customization" className="p-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            <Wand2 className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">Editor</span>
                        </div>
                        <h1 className="text-lg font-bold text-foreground leading-tight truncate max-w-64">{templateName}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handleReset} className="p-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground transition-colors" title="Reset to defaults">
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-sm font-semibold text-muted-foreground hover:text-foreground rounded-xl transition-colors">
                        <Eye className="w-4 h-4" /> Preview
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-sm font-semibold text-muted-foreground hover:text-foreground rounded-xl transition-colors">
                        <Download className="w-4 h-4" /> Export
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 transition-all shadow-[0_4px_20px_rgba(var(--primary),0.15)]"
                    >
                        {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Sparkles className="w-4 h-4" /> Save</>}
                    </button>
                </div>
            </div>

            {/* ── Editor Body ── */}
            <div className="flex gap-5 flex-1 overflow-hidden min-h-0">

                {/* LEFT: Controls Panel */}
                <div className="w-80 shrink-0 flex flex-col overflow-hidden">
                    {/* Tab switcher */}
                    <div className="flex gap-1 p-1 bg-card border border-border rounded-2xl mb-4 shrink-0">
                        {panels.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActivePanel(id)}
                                className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${activePanel === id
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Panel content */}
                    <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-6">

                        {/* ── TEXT PANEL ── */}
                        {activePanel === 'text' && (
                            <div className="space-y-4">

                                {/* Content Position */}
                                <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
                                    <SectionTitle icon={Layers} label="Content Position" />
                                    <PositionPicker
                                        value={config.contentPosition}
                                        onChange={(v) => update('contentPosition', v)}
                                    />
                                </div>

                                {/* Title */}
                                <div className="bg-card border border-border rounded-2xl p-4 space-y-4">
                                    <SectionTitle icon={Type} label="Title" />
                                    <textarea
                                        value={config.title}
                                        onChange={(e) => update('title', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none leading-relaxed"
                                        placeholder="Enter your title..."
                                    />
                                    {/* Formatting controls */}
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        <span className="text-xs text-muted-foreground mr-1">Align</span>
                                        {(['left', 'center', 'right'] as const).map((a) => {
                                            const icons = { left: AlignLeft, center: AlignCenter, right: AlignRight };
                                            const Icon = icons[a];
                                            return (
                                                <button
                                                    key={a}
                                                    onClick={() => update('titleAlign', a)}
                                                    className={`p-2 rounded-lg transition-colors ${config.titleAlign === a ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
                                                >
                                                    <Icon className="w-3.5 h-3.5" />
                                                </button>
                                            );
                                        })}
                                        <div className="w-px h-4 bg-border mx-1" />
                                        <button
                                            onClick={() => update('titleBold', !config.titleBold)}
                                            className={`p-2 rounded-lg transition-colors ${config.titleBold ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
                                        >
                                            <Bold className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => update('titleItalic', !config.titleItalic)}
                                            className={`p-2 rounded-lg transition-colors ${config.titleItalic ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
                                        >
                                            <Italic className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    <ColorPicker label="Title color" value={config.titleColor} onChange={(v) => update('titleColor', v)} />
                                </div>

                                {/* Subtitle */}
                                <div className="bg-card border border-border rounded-2xl p-4 space-y-4">
                                    <SectionTitle icon={AlignLeft} label="Subtitle" />
                                    <textarea
                                        value={config.subtitle}
                                        onChange={(e) => update('subtitle', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none leading-relaxed"
                                        placeholder="Enter your subtitle..."
                                    />
                                    <ColorPicker label="Subtitle color" value={config.subtitleColor} onChange={(v) => update('subtitleColor', v)} />
                                </div>

                                {/* Author & Meta */}
                                <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
                                    <SectionTitle icon={Zap} label="Author & Meta" />
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm text-muted-foreground">Show Author</label>
                                        <Toggle value={config.showAuthor} onChange={(v) => update('showAuthor', v)} />
                                    </div>
                                    {config.showAuthor && (
                                        <input
                                            value={config.author}
                                            onChange={(e) => update('author', e.target.value)}
                                            className="w-full px-3 py-2 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
                                            placeholder="Author name..."
                                        />
                                    )}
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm text-muted-foreground">Show Read Time</label>
                                        <Toggle value={config.showReadTime} onChange={(v) => update('showReadTime', v)} />
                                    </div>
                                    {config.showReadTime && (
                                        <input
                                            value={config.readTime}
                                            onChange={(e) => update('readTime', e.target.value)}
                                            className="w-full px-3 py-2 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
                                            placeholder="e.g. 5 min read"
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ── DESIGN PANEL ── */}
                        {activePanel === 'design' && (
                            <div className="space-y-4">
                                <div className="bg-card border border-border rounded-2xl p-4 space-y-4">
                                    <SectionTitle icon={Palette} label="Accent Color" />
                                    <ColorPicker label="Accent" value={config.accentColor} onChange={(v) => update('accentColor', v)} />
                                </div>

                                <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
                                    <SectionTitle icon={Layers} label="Layout Style" />
                                    <div className="grid grid-cols-2 gap-2">
                                        {(['minimal', 'bento', 'split', 'centered'] as const).map((style) => (
                                            <button
                                                key={style}
                                                onClick={() => update('containerStyle', style)}
                                                className={`py-2.5 rounded-xl text-xs font-bold capitalize transition-all border ${config.containerStyle === style
                                                        ? 'bg-primary text-primary-foreground border-primary'
                                                        : 'bg-muted text-muted-foreground border-border hover:text-foreground'
                                                    }`}
                                            >
                                                {style}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-card border border-border rounded-2xl p-4 space-y-4">
                                    <SectionTitle icon={Monitor} label="Shape & Canvas" />
                                    <SliderInput label="Border Radius" value={config.borderRadius} min={0} max={32} step={2} unit="px" onChange={(v) => update('borderRadius', v)} />
                                    <SliderInput label="Overlay Opacity" value={Math.round(config.overlayOpacity * 100)} min={0} max={100} unit="%" onChange={(v) => update('overlayOpacity', v / 100)} />
                                </div>
                            </div>
                        )}

                        {/* ── BACKGROUND PANEL ── */}
                        {activePanel === 'background' && (
                            <div className="space-y-4">
                                <div className="bg-card border border-border rounded-2xl p-4 space-y-4">
                                    <SectionTitle icon={ImageIcon} label="Background Image" />
                                    <input
                                        value={config.bgImageUrl}
                                        onChange={(e) => update('bgImageUrl', e.target.value)}
                                        className="w-full px-3 py-2 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 font-mono"
                                        placeholder="https://example.com/bg.jpg"
                                    />
                                    <p className="text-[11px] text-muted-foreground">
                                        Paste any public image URL. The gradient blends on top.
                                    </p>
                                </div>

                                <div className="bg-card border border-border rounded-2xl p-4 space-y-4">
                                    <SectionTitle icon={Palette} label="Gradient" />
                                    <div className="grid grid-cols-3 gap-2">
                                        {PRESET_GRADIENTS.map((preset) => (
                                            <button
                                                key={preset.label}
                                                onClick={() => { update('gradientFrom', preset.from); update('gradientTo', preset.to); }}
                                                className="flex flex-col items-center gap-1.5"
                                            >
                                                <div
                                                    className="w-full h-10 rounded-xl border-2 border-transparent hover:border-primary transition-all"
                                                    style={{ background: `linear-gradient(135deg, ${preset.from}, ${preset.to})` }}
                                                />
                                                <span className="text-[10px] text-muted-foreground">{preset.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="space-y-3 pt-1">
                                        <ColorPicker label="From" value={config.gradientFrom} onChange={(v) => update('gradientFrom', v)} />
                                        <ColorPicker label="To" value={config.gradientTo} onChange={(v) => update('gradientTo', v)} />
                                        <ColorPicker label="Fallback" value={config.bgColor} onChange={(v) => update('bgColor', v)} />
                                        <SliderInput label="Gradient Angle" value={config.gradientAngle} min={0} max={360} unit="°" onChange={(v) => update('gradientAngle', v)} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── BADGES PANEL ── */}
                        {activePanel === 'badges' && (
                            <div className="space-y-4">
                                <div className="bg-card border border-border rounded-2xl p-4 space-y-4">
                                    <SectionTitle icon={Tag} label="Badges & Labels" />
                                    <BadgeManager badges={config.badges} onChange={(b) => update('badges', b)} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: Live Preview */}
                <div className="flex-1 flex flex-col gap-4 overflow-hidden min-h-0">
                    <div className="flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Live Preview — 1200 × 630 px</span>
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">
                            Position: {POSITION_LABELS[config.contentPosition]}
                        </span>
                    </div>

                    {/* Canvas wrapper */}
                    <div className="flex-1 bg-card border border-border rounded-2xl p-4 overflow-hidden flex items-center justify-center min-h-0">
                        <div className="w-full max-w-3xl">
                            <motion.div
                                key={`${config.contentPosition}-${config.title.length}`}
                                initial={{ opacity: 0.75 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.12 }}
                            >
                                <TemplatePreview config={config} />
                            </motion.div>
                        </div>
                    </div>

                    <div className="shrink-0 flex items-center justify-between text-[11px] text-muted-foreground font-mono px-1">
                        <span>Changes reflect instantly in the preview</span>
                        <span>Export quality: 1200 × 630 PNG</span>
                    </div>
                </div>
            </div>
        </div>
    );
}