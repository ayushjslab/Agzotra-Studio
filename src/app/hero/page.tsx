"use client";

import { useEffect, useState, ComponentType } from "react";

type HeroProps = {
  name: string;
};

export default function Page() {
    const [RemoteHero, setRemoteHero] = useState<ComponentType<HeroProps>  | null>(null);
    const [error, setError] = useState<string | null>(null);
    async function getCommitHash() {
        const res = await fetch(
            "https://api.github.com/repos/ayushjslab/Agzotra-Studio/commits/main"
        );

        const data = await res.json();

        return data.sha.substring(0, 7);
    }
    useEffect(() => {
        const loadRemoteComponent = async () => {
            try {
                // Using the latest commit hash (2cb4ca2) to bypass jsDeliv CDN caching
                const commitHash = await getCommitHash();
                const url = `https://cdn.jsdelivr.net/gh/ayushjslab/Agzotra-Studio@${commitHash}/dist/Hero.js`;

                const mod = await Function(`return import("${url}")`)();

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

    const [userName, setUserName] = useState("Ayush");

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
        <div className="min-h-screen bg-black p-12 text-white">
            <div className="mb-12">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-40">
                    Set Dynamic Name
                </label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all w-full max-w-md"
                />
            </div>

            <div className="border border-dashed border-white/20 rounded-3xl p-12 flex items-center justify-center bg-white/5">
                <RemoteHero name={userName} />
            </div>
        </div>
    );
}