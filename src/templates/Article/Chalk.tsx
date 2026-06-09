import React from "react";

export interface ChalkProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
}

export default function Chalk({
    title = "Increase Your SEO",
    subtitle = "Grow DR with Easerank",
    backgroundImage = "https://images.unsplash.com/photo-1590031703807-e18fd24e6036?q=80&w=1170&auto=format&fit=crop",
}: ChalkProps) {
    return (
        <div
            className="relative w-full aspect-video overflow-hidden rounded-2xl"
        >
            {/* Background */}
            <img
                src={backgroundImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center justify-center px-20">
                <div className="max-w-4xl text-center">
                    <h1 className="text-7xl font-black leading-[0.9] tracking-tight text-white">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="mt-6 max-w-2xl mx-auto text-xl leading-relaxed text-zinc-200">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}