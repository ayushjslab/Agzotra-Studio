import { createSupabaseServerClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Key, Layout, Code, Activity, ChevronRight, Zap } from 'lucide-react';

export default async function DashboardPage() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] -z-10"></div>

            <div className="max-w-6xl mx-auto">
                <header className="mb-16">
                    <h1 className="text-5xl font-bold tracking-tight mb-4">
                        Agzotra <span className="text-purple-500 text-gradient bg-clip-text">Studio</span>
                    </h1>
                    <p className="text-white/40 text-lg max-w-2xl">
                        Welcome back, <span className="text-white">{user?.email?.split('@')[0]}</span>. Your high-performance thumbnail generation engine is ready.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Quick Actions */}
                    <Link href="/dashboard/templates" className="group">
                        <div className="h-full bg-[#111111] border border-white/10 p-8 rounded-3xl hover:border-purple-500/50 transition-all shadow-xl hover:shadow-purple-500/5">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Layout className="text-purple-500" />
                            </div>
                            <h2 className="text-xl font-bold mb-2 flex items-center justify-between">
                                Browse Templates
                                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                            </h2>
                            <p className="text-white/40 text-sm leading-relaxed">
                                Choose from our prebuilt dynamic templates or create your own custom layouts.
                            </p>
                        </div>
                    </Link>

                    <Link href="/dashboard/keys" className="group">
                        <div className="h-full bg-[#111111] border border-white/10 p-8 rounded-3xl hover:border-blue-500/50 transition-all shadow-xl hover:shadow-blue-500/5">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Key className="text-blue-500" />
                            </div>
                            <h2 className="text-xl font-bold mb-2 flex items-center justify-between">
                                API Keys
                                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                            </h2>
                            <p className="text-white/40 text-sm leading-relaxed">
                                Generate and manage your secret keys to access the generation engine programmatically.
                            </p>
                        </div>
                    </Link>

                    {/* Docs / Stats */}
                    <div className="bg-linear-to-br from-purple-600 to-blue-700 p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                                <Zap className="text-white" />
                            </div>
                            <h2 className="text-xl font-bold mb-2 text-white">Fast Integration</h2>
                            <p className="text-white/80 text-sm leading-relaxed">
                                Use our simple POST API to generate thumbnails in milliseconds and store them in Cloudflare R2.
                            </p>
                        </div>
                        <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60">
                            <Activity className="w-4 h-4 animate-pulse" />
                            Engine Online
                        </div>
                    </div>
                </div>

                {/* Integration Preview */}
                <section className="mt-16 bg-[#111111] border border-white/10 rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Code className="text-purple-500 w-5 h-5" />
                        <h2 className="font-bold">Integration Guide</h2>
                    </div>
                    <div className="bg-black/50 rounded-2xl p-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-white/60">
                            <span className="text-purple-400">POST</span> /api/generate{'\n'}
                            <span className="text-blue-400">Authorization</span>: Bearer agz_your_api_key{'\n'}
                            {'\n'}
                            {'{'}{'\n'}
                            <span className="text-white">  "template_id"</span>: <span className="text-green-400">"modern-gradient"</span>,{'\n'}
                            <span className="text-white">  "dynamic_data"</span>: {'{'}{'\n'}
                            <span className="text-white">    "title"</span>: <span className="text-green-400">"Hello World"</span>,{'\n'}
                            <span className="text-white">    "subtitle"</span>: <span className="text-green-400">"Dynamic generation is here"</span>{'\n'}
                            <span className="text-white">  {'}'}</span>{'\n'}
                            {'}'}
                        </pre>
                    </div>
                </section>
            </div>
        </div>
    );
}
