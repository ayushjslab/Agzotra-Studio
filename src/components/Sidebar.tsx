'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Library,
    Image,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    CreditCard,
    User,
    Sun,
    Moon,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Templates', href: '/templates', icon: Library },
    { name: 'Media', href: '/media', icon: Image },
    { name: 'Usage', href: '/usage', icon: BarChart3 },
];

const bottomItems = [
    { name: 'Account', href: '/account', icon: User },
    { name: 'Billing', href: '/billing', icon: CreditCard },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    return (
        <aside
            className={cn(
                "relative h-screen transition-all duration-300 ease-in-out flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-sidebar-border/50">
                {!isCollapsed && (
                    <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
                        Agzotra
                    </span>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 rounded-lg bg-sidebar-accent/50 hover:bg-sidebar-accent transition-colors text-sidebar-foreground/70 hover:text-sidebar-foreground"
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(var(--primary),0.1)]"
                                    : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                            )}
                        >
                            <item.icon size={20} className={cn(isActive ? "text-primary" : "group-hover:scale-110 transition-transform")} />
                            {!isCollapsed && <span className="font-medium">{item.name}</span>}
                            {isActive && !isCollapsed && (
                                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                            )}
                            {isCollapsed && (
                                <div className="absolute left-14 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-border">
                                    {item.name}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="px-3 py-4 border-t border-sidebar-border/50 space-y-1">
                {bottomItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200 group relative"
                    >
                        <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                        {!isCollapsed && <span className="font-medium">{item.name}</span>}
                        {isCollapsed && (
                            <div className="absolute left-14 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-border">
                                {item.name}
                            </div>
                        )}
                    </Link>
                ))}

                {/* Theme Toggle */}
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200 group relative"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    {!isCollapsed && <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
                    {isCollapsed && (
                        <div className="absolute left-14 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-border">
                            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                        </div>
                    )}
                </button>

                {/* Logout */}
                {!isCollapsed && (
                    <div className="mt-4 p-4 rounded-2xl bg-sidebar-accent/30 border border-sidebar-border">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-primary to-primary/60 flex items-center justify-center font-bold text-sm text-primary-foreground">
                                JD
                            </div>
                            <div>
                                <p className="text-xs font-bold text-sidebar-foreground">John Doe</p>
                                <p className="text-[10px] text-sidebar-foreground/50 uppercase tracking-wider font-bold">Pro Plan</p>
                            </div>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent/50 hover:bg-destructive/10 text-sidebar-foreground/60 hover:text-destructive transition-all text-xs font-bold ring-1 ring-sidebar-border">
                            <LogOut size={14} />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
};
