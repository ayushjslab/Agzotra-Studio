import { Metadata } from 'next';
import React from 'react';
import { Activity, Zap, CreditCard } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Usage & Billing | Agzotra Studio',
    description: 'Track your image generation metrics and subscription status.',
};

const UsagePage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-bold text-primary uppercase tracking-[0.2em]">Usage & Billing</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                    System <span className="text-transparent bg-clip-text bg-linear-to-r from-foreground to-primary">Metrics</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                    Track your generation credits, API calls, and subscription status in real-time.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="p-8 rounded-3xl bg-card border border-border">
                    <div className="flex items-center justify-between mb-8">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <Zap className="w-6 h-6 text-primary" />
                        </div>
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">Active</span>
                    </div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Generation Credits</h3>
                    <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-4xl font-black">942</span>
                        <span className="text-muted-foreground font-medium">/ 1,000</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-[94.2%] h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                    </div>
                </div>

                <div className="p-8 rounded-3xl bg-card border border-border">
                    <div className="flex items-center justify-between mb-8">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <CreditCard className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Current Plan</h3>
                    <div className="text-3xl font-black mb-1">Pro Studio</div>
                    <p className="text-muted-foreground text-sm font-medium mb-6">Renews on July 12, 2026</p>
                    <button className="w-full py-3 border border-primary/30 text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors text-sm">
                        Manage Subscription
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UsagePage