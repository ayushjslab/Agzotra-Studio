import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Agzotra Studio</h1>
      <p className="text-white/60 mb-8 text-center max-w-md">
        The most powerful dynamic thumbnail engine for creators.
      </p>
      <a
        href="/login"
        className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-white/90 transition-all text-sm uppercase tracking-widest"
      >
        Get Started
      </a>
    </div>
  )
}