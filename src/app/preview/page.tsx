"use client";

import { useSearchParams } from "next/navigation";
import ThumbnailTemplate from "../(app)/(control-panel)/templates/thumbnail";
import { Suspense } from "react";

function PreviewContent() {
    const searchParams = useSearchParams();

    const props = {
        title: searchParams.get("title") || undefined,
        subtitle: searchParams.get("subtitle") || undefined,
        tag: searchParams.get("tag") || undefined,
        layout: (searchParams.get("layout") as any) || undefined,
        variant: (searchParams.get("variant") as any) || undefined,
        highlightColor: searchParams.get("highlightColor") || undefined,
        showBlurGlow: searchParams.get("showBlurGlow") === "true",
    };

    return (
        <div id="thumbnail-card" className="w-[1200px] h-[630px] overflow-hidden bg-black">
            <ThumbnailTemplate {...props} />
        </div>
    );
}

export default function PreviewPage() {
    return (
        <Suspense fallback={<div>Loading preview...</div>}>
            <PreviewContent />
        </Suspense>
    );
}
