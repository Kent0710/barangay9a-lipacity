"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Home, User } from "lucide-react";

const AdminHeader = () => {
    return (
        <div className="flex items-center justify-between h-[8dvh] px-8 bg-white shadow-sm border-b shrink-0 z-10 relative">
            {/* left  */}
            <section className="flex items-center gap-2">
                <Home className="w-6 h-6 text-green-600" />
                <p className="text-xl font-bold text-green-700">Admin Panel</p>
            </section>
            <section className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                    <User className="w-4 h-4" />
                    <span>Admin</span>
                </div>
                <Link href="/home" className="text-sm font-semibold text-green-700 hover:text-green-800">
                    View Site
                </Link>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 h-8 px-4 text-xs font-semibold rounded-md">
                    Logout
                </Button>
            </section>
        </div>
    );
};

export default AdminHeader;
