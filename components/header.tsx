'use client'

import { useMemo } from "react";
import Link from "next/link";

const Header = () => {
    const navs = useMemo(() => [
        {
            label: "Home",
            href: "/home",
        },
        {
            label: "Digital Literacy",
            href: "/digital-literacy",
        },
        {
            label: "About Us",
            href: "/about",
        },
        {
            label: "Contact Us",
            href: "/contact",
        },
        {
            label: 'Admin',
            href: '/admin',
        }
    ], [])

    return (
        <div className="flex items-center justify-between px-[5rem] h-[10dvh]">
            {/* left section  */}
            <section>
                <p className="text-lg font-semibold">Barangay 9A</p>
            </section>


            {/* right section  */}
            <section>
                <nav>
                    <ul>
                        {navs.map((nav) => (
                            <li key={nav.href} className="inline-block ml-8">
                                <Link href={nav.href
                                    } className="text-sm font-medium text-gray-700 hover:text-gray-900">
                                    {nav.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>
        </div>
    )
};

export default Header;