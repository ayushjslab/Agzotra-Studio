import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
    const { origin } = new URL(request.url);
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });

    if (error || !data.url) {
        return NextResponse.json({ error: 'Failed to initiate Google login' }, { status: 500 });
    }

    // Redirect to Google's consent screen
    return NextResponse.redirect(data.url);
}
