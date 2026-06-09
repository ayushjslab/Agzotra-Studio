
export interface PatternProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
}

export default function Pattern({
    title = "Increase Your SEO",
    subtitle = "Grow DR with Easerank",
    backgroundImage = "https://images.unsplash.com/photo-1675198857086-e5a930f36495?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}: PatternProps) {
    return (
        <div
            className="relative w-full h-full overflow-hidden rounded-2xl"
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