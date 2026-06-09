import React from 'react';
import { TEMPLATE_REGISTRY } from '@/config/templates';
import { ArrowUpRight, Sparkles, Layout, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

interface TemplateItemProps {
    component: React.ElementType;
    name: string;
    id: string;
    description: string;
    category: string;
}

const TemplateItem = ({
    component: Component,
    name,
    id,
    description,
    category
}: TemplateItemProps) => {
    return (
        <div className="group relative flex flex-col gap-4">
            {/* Template Container */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c0e] shadow-2xl transition-all duration-500 group-hover:border-purple-500/50 group-hover:shadow-purple-500/10">
                {/* Scaled Preview Wrapper */}
                <div className="absolute inset-0 origin-top-left transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                    <div className="w-[1200px] h-[675px] scale-[0.28] sm:scale-[0.35] md:scale-[0.28] lg:scale-[0.4] xl:scale-[0.5] origin-top-left pointer-events-none">
                        <Component />
                    </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Link
                        href={`/templates/${category}/${id}`}
                        className="translate-y-4 transition-transform duration-300 group-hover:translate-y-0 px-6 py-2.5 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:scale-105 active:scale-95"
                    >
                        Use Template
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Metadata */}
            <div className="px-2">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-white text-lg tracking-tight">{name}</h3>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                        <Layout className="w-3 h-3 text-purple-400" />
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{category.replace('-', ' ')}</span>
                    </div>
                </div>
                <p className="text-sm text-neutral-500 line-clamp-1">{description}</p>
            </div>
        </div>
    );
};

export default async function TemplateCategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;
    const categoryData = TEMPLATE_REGISTRY[category];

    if (!categoryData) {
        return (
            <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-8">
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-4">Category Not Found</h1>
                    <p className="text-neutral-500 mb-8">The template category you are looking for does not exist.</p>
                    <Link href="/templates" className="px-6 py-2.5 bg-white text-black font-bold rounded-full">
                        Back to Templates
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090b] text-white p-8 md:p-12 lg:p-16">
            {/* Background Decorative Element */}
            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-purple-600/5 blur-[120px] -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <header className="mb-12 md:mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <Sparkles className="w-5 h-5 text-purple-500" />
                        </div>
                        <span className="text-sm font-bold text-purple-500 uppercase tracking-[0.2em]">{categoryData.name}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                        {categoryData.name} <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-purple-400">Library</span>
                    </h1>
                    <p className="text-neutral-500 text-lg max-w-2xl leading-relaxed">
                        {categoryData.description}
                    </p>
                </header>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                    {categoryData.templates.map((template) => (
                        <TemplateItem
                            key={template.id}
                            id={template.id}
                            name={template.name}
                            component={template.component}
                            description={template.description}
                            category={category}
                        />
                    ))}
                </div>

                {/* Empty State / Coming Soon */}
                <div className="mt-16 pt-16 border-t border-white/5 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500 text-sm">
                        <MousePointer2 className="w-4 h-4" />
                        More templates arriving every week
                    </div>
                </div>
            </div>
        </div>
    );
}