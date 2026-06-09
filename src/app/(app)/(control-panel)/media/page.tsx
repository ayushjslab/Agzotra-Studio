import { Metadata } from 'next';
import React from 'react';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Media Library | Agzotra Studio',
    description: 'Browse and manage your generated visual assets.',
};

const MediaPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <ImageIcon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-bold text-primary uppercase tracking-[0.2em]">Media Library</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                    Your <span className="text-transparent bg-clip-text bg-linear-to-r from-foreground to-primary">Assets</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                    Manage and browse all your generated thumbnails and uploaded assets in one place.
                </p>
            </header>

            <div className="w-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-border rounded-3xl bg-muted/30">
                <div className="p-4 bg-primary/10 rounded-full mb-6">
                    <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <h3 className="text-xl font-bold mb-2">No assets found</h3>
                <p className="text-muted-foreground text-center max-w-xs px-4">
                    Head over to the templates section to generate your first high-performance thumbnail.
                </p>
                <button className="mt-8 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:scale-105 transition-transform">
                    Browse Templates
                </button>
            </div>
        </div>
    )
}

export default MediaPage