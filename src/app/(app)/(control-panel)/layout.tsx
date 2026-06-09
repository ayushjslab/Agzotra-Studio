import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export default function ControlPanelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex bg-background text-foreground h-screen overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto bg-background text-foreground">
                    <div className="mx-auto p-4 md:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </ThemeProvider>
    );
}
