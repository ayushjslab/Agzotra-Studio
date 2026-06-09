import React from 'react';

export interface ThumbnailTemplateProps {
  title?: string;
  subtitle?: string;
  tag?: string;
  layout?: 'split-left' | 'centered' | 'split-right';
  variant?: 'midnight' | 'cyber' | 'sunset';
  highlightColor?: string;
  showBlurGlow?: boolean;
}

type Props = {
  innerRef?: React.RefObject<HTMLDivElement | null>;
};


export default function ThumbnailTemplate({
  title = "MASTERING REACT IN 2026",
  subtitle = "Advanced architecture patterns explained simply",
  tag = "TUTORIAL",
  layout = "split-left",
  variant = "cyber",
  highlightColor = "#3b82f6", // Blue-500
  showBlurGlow = true,
  innerRef,
}: ThumbnailTemplateProps & Props) {

  // Background theme presets
  const themes = {
    midnight: "bg-slate-950 text-slate-50 border-slate-800",
    cyber: "bg-neutral-950 text-neutral-50 border-neutral-800",
    sunset: "bg-zinc-950 text-zinc-50 border-zinc-900",
  };

  // Alignment layouts
  const layouts = {
    "split-left": "text-left items-start justify-center max-w-[65%]",
    "centered": "text-center items-center justify-center max-w-[85%] mx-auto",
    "split-right": "text-right items-end justify-center max-w-[65%] ml-auto",
  };

  return (

    <div
      ref={innerRef}
      className={`relative w-full aspect-video overflow-hidden border shadow-2xl p-12 flex select-none ${themes[variant]}`}
      style={{ contentVisibility: 'auto' }}
    >
      {/* Background Decorative Gradients & Glows */}
      {variant === 'cyber' && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_40%,#000_40%,transparent_100%)] opacity-40" />
          {showBlurGlow && (
            <div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-[100px]"
              style={{ backgroundColor: highlightColor }}
            />
          )}
        </>
      )}

      {variant === 'midnight' && (
        <div className="absolute inset-0 bg-linear-to-tr from-slate-950 via-slate-900 to-indigo-950/40" />
      )}

      {variant === 'sunset' && (
        <>
          <div className="absolute inset-0 bg-linear-to-b from-neutral-950 via-neutral-950 to-orange-950/20" />
          {showBlurGlow && (
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-96 h-40 bg-orange-600/10 rounded-full blur-[80px]" />
          )}
        </>
      )}

      {/* Content Wrapper */}
      <div className={`relative z-10 flex flex-col w-full h-full ${layouts[layout]}`}>

        {/* Dynamic Badge / Category */}
        {tag && (
          <span
            className="px-3 py-1 text-xs font-black tracking-widest rounded-md uppercase mb-4 text-white shadow-sm animate-fade-in"
            style={{ backgroundColor: highlightColor }}
          >
            {tag}
          </span>
        )}

        {/* Core Headline with forced balancing */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-balance">
          {title.split(' ').map((word, i) => {
            // Automatically stylize the final word or specific trigger words with the accent configuration
            const isLast = i === title.split(' ').length - 1;
            return (
              <span
                key={i}
                style={isLast ? { color: highlightColor } : undefined}
                className={isLast ? 'brightness-125 font-black drop-shadow-sm' : ''}
              >
                {word}{' '}
              </span>
            );
          })}
        </h1>

        {/* Supporting Subtitle */}
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg md:text-xl text-neutral-400 font-medium max-w-xl leading-relaxed text-balance">
            {subtitle}
          </p>
        )}

      </div>

      {/* Outer Framing Accent Border */}
      <div
        className="absolute inset-0 border-2 rounded-xl pointer-events-none opacity-5"
        style={{ borderColor: highlightColor }}
      />
    </div>

  );
}