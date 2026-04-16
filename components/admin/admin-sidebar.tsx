'use client'

import { useMemo } from "react";
import Link from "next/link";

const AdminSidebar = () => {
    const navs = useMemo(() => [
        {
            label: "Overview",
            href: "/admin/overview",
        },
        {
            label: "Announcements",
            href: "/admin/announcements",
        },
        {
            label: "Educational Resources",
            href: "/admin/educational-resources",
        },
        {
            label: "Settings",
            href: "/admin/settings",
        },
    ], [])

    return (
        <nav className="px-[2rem] w-[15%]">
            <ul>
                {navs.map((nav) => (
                    <li key={nav.href} className="mb-4">
                        <Link href={nav.href
                            } className="font-medium">
                            {nav.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
};

export default AdminSidebar;