import React from 'react';
import { TEMPLATE_REGISTRY } from '@/config/templates';
import { ArrowUpRight, Sparkles, Layout, MousePointer2 } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category } = await params;
    const categoryData = TEMPLATE_REGISTRY[category];
    return {
        title: `${categoryData?.name || 'Category'} Templates | Agzotra Studio`,
        description: categoryData?.description || 'Browse high-performance dynamic image templates.',
    };
}

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
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-card shadow-2xl transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-primary/10">
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
                        className="translate-y-4 transition-transform duration-300 group-hover:translate-y-0 px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-full flex items-center gap-2 hover:scale-105 active:scale-95"
                    >
                        Use Template
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Metadata */}
            <div className="px-2">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-foreground text-lg tracking-tight">{name}</h3>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-muted border border-border">
                        <Layout className="w-3 h-3 text-primary" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{category.replace('-', ' ')}</span>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>
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
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-4">Category Not Found</h1>
                    <p className="text-muted-foreground mb-8">The template category you are looking for does not exist.</p>
                    <Link href="/templates" className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-full">
                        Back to Templates
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-8 md:p-12 lg:p-16">
            {/* Background Decorative Element */}
            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <header className="mb-12 md:mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-sm font-bold text-primary uppercase tracking-[0.2em]">{categoryData.name}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                        {categoryData.name} <span className="text-transparent bg-clip-text bg-linear-to-r from-foreground to-primary">Library</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
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
                <div className="mt-16 pt-16 border-t border-border/50 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border text-muted-foreground text-sm">
                        <MousePointer2 className="w-4 h-4" />
                        More templates arriving every week
                    </div>
                </div>
            </div>
        </div>
    );
}