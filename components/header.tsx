'use client'

import { useMemo, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navs = useMemo(() => [
        {
            label: "Home",
            href: "/",
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
        <header className="relative bg-white z-50">
            <div className="flex items-center justify-between px-6 md:px-[5rem] h-[10dvh] shadow-sm md:shadow-none border-b md:border-none">
                {/* left section  */}
                <section>
                    <p className="text-lg font-semibold">Barangay 9A</p>
                </section>

                {/* right section - Desktop Nav */}
                <section className="hidden md:block">
                    <nav>
                        <ul>
                            {navs.map((nav) => (
                                <li key={nav.href} className="inline-block ml-8">
                                    <Link href={nav.href} className="text-sm font-medium text-gray-700 hover:text-gray-900">
                                        {nav.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </section>

                {/* right section - Mobile Menu Toggle */}
                <section className="md:hidden flex items-center">
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-700 hover:text-gray-900 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </section>
            </div>

            {/* Mobile Nav Overlay */}
            {isMobileMenuOpen && (
                <nav className="md:hidden absolute top-[10dvh] left-0 w-full bg-white shadow-xl border-b">
                    <ul className="flex flex-col px-6 py-4">
                        {navs.map((nav) => (
                            <li key={nav.href} className="py-3 border-b border-gray-100 last:border-none">
                                <Link 
                                    href={nav.href} 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-base font-medium text-gray-700 hover:text-green-700"
                                >
                                    {nav.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    )
};

export default Header;