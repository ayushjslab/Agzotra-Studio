"use client";

import { useEffect, useState, ComponentType } from "react";

export default function Page() {
    const [RemoteHero, setRemoteHero] = useState<ComponentType | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRemoteComponent = async () => {
            try {
                // Use a dynamic import via Function to bypass build-time checks
                const mod = await Function(
                    'return import("https://cdn.jsdelivr.net/gh/ayushjslab/Agzotra-Studio@main/dist/Hero.js")'
                )();

                if (mod.default) {
                    setRemoteHero(() => mod.default);
                } else {
                    setError("No default export found in the remote component.");
                }
            } catch (err) {
                console.error("Failed to load remote component:", err);
                setError("Failed to load the remote component from GitHub.");
            }
        };

        loadRemoteComponent();
    }, []);

    if (error) {
        return <div className="text-red-500 p-8 font-bold">{error}</div>;
    }

    if (!RemoteHero) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white/40 animate-pulse text-xl tracking-widest uppercase font-bold">
                    Fetching Remote Component...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <RemoteHero />
        </div>
    );
}