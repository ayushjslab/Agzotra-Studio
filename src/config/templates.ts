import dynamic from 'next/dynamic';

export interface Template {
    id: string;
    name: string;
    description: string;
    component: any;
}

export interface TemplateCategory {
    id: string;
    name: string;
    description: string;
    templates: Template[];
}

export const TEMPLATE_REGISTRY: Record<string, TemplateCategory> = {
    'article-templates': {
        id: 'article-templates',
        name: 'Article Templates',
        description: 'Designed for high conversion and readability.',
        templates: [
            {
                id: 'pattern',
                name: 'Pattern',
                description: 'Ultra-modern bento grid layout with customizable glows and neon accents.',
                component: dynamic(() => import('@/templates/Article-Templates/Pattern')),
            },
            {
                id: 'chalk',
                name: 'Chalk',
                description: 'Artisanal hand-drawn feel with chalk textures and sketch aesthetics.',
                component: dynamic(() => import('@/templates/Article-Templates/Chalk')),
            },
        ],
    },
    'thumbnail': {
        id: 'thumbnail',
        name: 'Thumbnails',
        description: 'Eye-catching thumbnails for your videos and articles.',
        templates: [
            {
                id: 'tech',
                name: 'Tech',
                description: 'Modern tech-focused thumbnail design.',
                component: dynamic(() => import('@/templates/thumbnail/Tech')),
            },
            {
                id: 'zen',
                name: 'Zen',
                description: 'Clean and minimal zen-inspired thumbnail.',
                component: dynamic(() => import('@/templates/thumbnail/Zen')),
            },
        ],
    },
};
