import Link from 'next/link';

export default function AuthCodeError() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white p-4">
            <div className="max-w-md w-full bg-[#111111] border border-white/10 rounded-2xl p-8 text-center shadow-2xl">
                <h1 className="text-3xl font-bold mb-4 text-red-500">Authentication Error</h1>
                <p className="text-white/60 mb-8 leading-relaxed">
                    We were unable to exchange your authentication code for a session. This usually happens due to a misconfiguration in the OAuth settings.
                </p>

                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8 text-left text-sm space-y-2">
                    <p className="font-semibold text-red-400">Common causes:</p>
                    <ul className="list-disc list-inside text-white/40">
                        <li>Incorrect Google Client Secret in Supabase Dashboard</li>
                        <li>Redirect URI mismatch in Google Cloud Console</li>
                        <li>Expired authentication code (try again)</li>
                    </ul>
                </div>

                <Link
                    href="/auth/login"
                    className="inline-block bg-white text-black font-semibold py-3 px-8 rounded-xl hover:bg-white/90 transition-all active:scale-[0.98]"
                >
                    Try Signing In Again
                </Link>
            </div>
        </div>
    );
}
