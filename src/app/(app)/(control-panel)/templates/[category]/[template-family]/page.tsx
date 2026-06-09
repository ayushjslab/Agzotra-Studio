import dynamic from 'next/dynamic';
import { ArrowUpRight, Sparkles, Layout, MousePointer2 } from 'lucide-react';
import Link from 'next/link';
import { PATTERN_BG_IMAGES } from '@/bg-images/article-templates/pattern';
import { CHALK_BG_IMAGES } from '@/bg-images/article-templates/chalk';

const DynamicPattern = dynamic(() => import('@/templates/Article-Templates/Pattern'));
const DynamicChalk = dynamic(() => import('@/templates/Article-Templates/Chalk'));

const BG_IMAGES_MAP: Record<string, Record<string, string>> = {
    'pattern': PATTERN_BG_IMAGES,
    'chalk': CHALK_BG_IMAGES,
};

const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
    'pattern': DynamicPattern,
    'chalk': DynamicChalk,
};

interface TemplateVariationItemProps {
    component: React.ElementType;
    backgroundImage: string;
    index: number;
}

const TemplateVariationItem = ({
    component: Component,
    backgroundImage,
    index
}: TemplateVariationItemProps) => {
    return (
        <div className="group relative flex flex-col gap-4">
            {/* Template Container */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-card shadow-2xl transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-primary/10">
                {/* Scaled Preview Wrapper */}
                <div className="absolute inset-0 origin-top-left transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                    <div className="w-[1200px] h-[675px] scale-[0.28] sm:scale-[0.35] md:scale-[0.28] lg:scale-[0.4] xl:scale-[0.5] origin-top-left pointer-events-none">
                        <Component backgroundImage={backgroundImage} />
                    </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                        className="translate-y-4 transition-transform duration-300 group-hover:translate-y-0 px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-full flex items-center gap-2 hover:scale-105 active:scale-95"
                    >
                        Use Variation {index + 1}
                        <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default async function TemplateFamilyPage({
    params,
}: {
    params: Promise<{ category: string; 'template-family': string }>;
}) {
    const { category, 'template-family': templateFamily } = await params;
    const bgImages = BG_IMAGES_MAP[templateFamily];
    const Component = COMPONENT_MAP[templateFamily];

    if (!bgImages || !Component) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-4">Template Family Not Found</h1>
                    <p className="text-muted-foreground mb-8">The template family you are looking for does not exist.</p>
                    <Link href={`/templates/${category}`} className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-full">
                        Back to Category
                    </Link>
                </div>
            </div>
        );
    }

    const images = Object.values(bgImages);

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
                        <span className="text-sm font-bold text-primary uppercase tracking-[0.2em]">{templateFamily} Family</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                        {templateFamily.charAt(0).toUpperCase() + templateFamily.slice(1)} <span className="text-transparent bg-clip-text bg-linear-to-r from-foreground to-primary">Variations</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                        Choose the perfect background pattern for your {templateFamily} feature image.
                    </p>
                </header>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                    {images.map((img, index) => (
                        <TemplateVariationItem
                            key={index}
                            index={index}
                            component={Component}
                            backgroundImage={img}
                        />
                    ))}
                </div>

                {/* Empty State / Coming Soon */}
                <div className="mt-16 pt-16 border-t border-border/50 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border text-muted-foreground text-sm">
                        <MousePointer2 className="w-4 h-4" />
                        Customizing backgrounds coming soon
                    </div>
                </div>
            </div>
        </div>
    );
}