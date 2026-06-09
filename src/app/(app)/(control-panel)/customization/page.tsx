"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Sparkles, Wand2, X, ArrowRight, Palette,
    LayoutTemplate, Clock, Star, Trash2, Edit3
} from 'lucide-react';

// --- Types ---
interface CustomTemplate {
    id: string;
    name: string;
    createdAt: string;
    thumbnail?: string;
}

// --- Mock data (replace with real DB fetch later) ---
const MOCK_TEMPLATES: CustomTemplate[] = [
    { id: 'tpl_001', name: 'Tech Deep Dive', createdAt: '2026-06-05' },
    { id: 'tpl_002', name: 'Product Launch Banner', createdAt: '2026-06-08' },
];

// --- New Template Dialog ---
function NewTemplateDialog({
    onClose,
    onCreate,
}: {
    onClose: () => void;
    onCreate: (name: string) => void;
}) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleCreate = () => {
        const trimmed = name.trim();
        if (!trimmed) { setError('Please enter a name for your template.'); return; }
        if (trimmed.length < 3) { setError('Name must be at least 3 characters.'); return; }
        onCreate(trimmed);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 24 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="relative w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                    <Wand2 className="w-6 h-6 text-primary" />
                </div>

                <h2 className="text-xl font-bold text-foreground mb-1">New Custom Template</h2>
                <p className="text-sm text-muted-foreground mb-6">
                    Give your template a name to get started. You can always rename it later.
                </p>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                            Template Name
                        </label>
                        <input
                            autoFocus
                            type="text"
                            value={name}
                            onChange={(e) => { setName(e.target.value); setError(''); }}
                            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                            placeholder="e.g. My Article Cover"
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                        />
                        {error && (
                            <p className="text-xs text-destructive font-medium">{error}</p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl bg-muted border border-border text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreate}
                            disabled={!name.trim()}
                            className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
                        >
                            Create & Edit
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Template Card ---
function TemplateCard({
    template,
    onEdit,
    onDelete,
}: {
    template: CustomTemplate;
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(var(--primary),0.06)]"
        >
            {/* Preview area (16:9 thumbnail mockup) */}
            <div className="relative aspect-video bg-background border-b border-border overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary),0.08),transparent_60%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                        <LayoutTemplate className="w-8 h-8 text-primary" />
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Preview</span>
                    </div>
                </div>
                {/* Hover actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-3">
                    <button
                        onClick={onEdit}
                        className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center gap-1.5 hover:bg-primary/90 transition-colors"
                    >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                    </button>
                </div>
            </div>

            {/* Meta */}
            <div className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <h3 className="font-semibold text-foreground text-sm truncate">{template.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground/60" />
                        <span className="text-[11px] text-muted-foreground font-mono">{template.createdAt}</span>
                    </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                    <button
                        onClick={onEdit}
                        className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        title="Edit template"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        title="Delete template"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

// --- Main Page ---
export default function CustomizationPage() {
    const router = useRouter();
    const [showDialog, setShowDialog] = useState(false);
    const [templates, setTemplates] = useState<CustomTemplate[]>(MOCK_TEMPLATES);

    const handleCreate = (name: string) => {
        // Generate a unique ID (replace with DB creation later)
        const id = `tpl_${Date.now()}`;
        const newTemplate: CustomTemplate = {
            id,
            name,
            createdAt: new Date().toISOString().split('T')[0],
        };
        setTemplates((prev) => [newTemplate, ...prev]);
        setShowDialog(false);
        router.push(`/customization/${id}?name=${encodeURIComponent(name)}`);
    };

    const handleDelete = (id: string) => {
        setTemplates((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <>
            <div className="max-w-6xl mx-auto space-y-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
                            <Sparkles className="w-3 h-3" />
                            Custom Templates
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-foreground">
                            My <span className="text-primary italic">Creations.</span>
                        </h1>
                        <p className="text-muted-foreground max-w-lg leading-relaxed">
                            Build, refine and reuse your own premium thumbnail templates. Full control over every pixel.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowDialog(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 transition-all shadow-[0_4px_20px_rgba(var(--primary),0.15)] hover:shadow-[0_4px_30px_rgba(var(--primary),0.25)] self-start sm:self-auto shrink-0 group"
                    >
                        <Plus className="w-4 h-4" />
                        New Customization
                    </button>
                </div>

                {/* Stats Bar */}
                {templates.length > 0 && (
                    <div className="flex items-center gap-6 py-4 px-5 bg-card border border-border rounded-2xl">
                        <div className="flex items-center gap-2 text-sm">
                            <LayoutTemplate className="w-4 h-4 text-primary" />
                            <span className="font-bold text-foreground">{templates.length}</span>
                            <span className="text-muted-foreground">templates</span>
                        </div>
                        <div className="w-px h-4 bg-border" />
                        <div className="flex items-center gap-2 text-sm">
                            <Star className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">Ready to generate</span>
                        </div>
                        <div className="w-px h-4 bg-border" />
                        <div className="flex items-center gap-2 text-sm">
                            <Palette className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">Fully customizable</span>
                        </div>
                    </div>
                )}

                {/* Grid */}
                {templates.length > 0 ? (
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {templates.map((template) => (
                                <TemplateCard
                                    key={template.id}
                                    template={template}
                                    onEdit={() => router.push(`/customization/${template.id}?name=${encodeURIComponent(template.name)}`)}
                                    onDelete={() => handleDelete(template.id)}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-32 rounded-3xl border-2 border-dashed border-border bg-muted/20 text-center">
                        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
                            <Wand2 className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">No templates yet</h3>
                        <p className="text-sm text-muted-foreground max-w-xs mb-8">
                            Create your first custom template and start building premium visuals.
                        </p>
                        <button
                            onClick={() => setShowDialog(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            Create Your First Template
                        </button>
                    </div>
                )}
            </div>

            {/* Dialog */}
            <AnimatePresence>
                {showDialog && (
                    <NewTemplateDialog
                        onClose={() => setShowDialog(false)}
                        onCreate={handleCreate}
                    />
                )}
            </AnimatePresence>
        </>
    );
}