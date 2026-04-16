'use client'

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Megaphone, BookOpen, Settings } from "lucide-react";

export default function AdminSidebar() {
    const pathname = usePathname();

    const navs = useMemo(() => [
        {
            label: "Overview",
            href: "/admin/overview",
            icon: LayoutDashboard
        },
        {
            label: "Announcements",
            href: "/admin/announcements",
            icon: Megaphone
        },
        {
            label: "Educational Resources",
            href: "/admin/educational-resources",
            icon: BookOpen
        },
        {
            label: "Settings",
            href: "/admin/settings",
            icon: Settings
        },
    ], [])

    return (
        <aside className="w-64 bg-white border-r flex flex-col pt-4 min-h-full shrink-0">
            <nav className="flex-1">
                <ul className="flex flex-col gap-1">
                    {navs.map((nav) => {
                        const isActive = pathname.startsWith(nav.href);
                        const Icon = nav.icon;
                        
                        return (
                            <li key={nav.href}>
                                <Link 
                                    href={nav.href} 
                                    className={`flex items-center gap-3 py-3 px-6 text-sm font-semibold transition-colors
                                        ${isActive 
                                            ? "bg-green-50 text-green-700 border-l-4 border-green-600" 
                                            : "text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:text-gray-700"
                                        }
                                    `}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                                    {nav.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    )
};