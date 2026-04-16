import { createClient } from "@/lib/supabase/server";
import { Megaphone, BookOpen, Calendar } from "lucide-react";

export default async function OverviewPage() {
    const supabase = await createClient();
    
    const { count: announcementCount } = await supabase
        .from("announcement")
        .select('*', { count: 'exact', head: true });
        
    const { count: resourceCount } = await supabase
        .from("educational_resource")
        .select('*', { count: 'exact', head: true });

    const todayDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-gray-500 font-medium">Welcome to Barangay 9A Admin Panel</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Announcements Card */}
                <div className="flex items-center gap-6 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-green-50 text-pink-600">
                        <Megaphone className="w-10 h-10" fill="currentColor" strokeWidth={1} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-green-900">{announcementCount || 0}</span>
                        <span className="text-gray-500 text-sm font-medium mt-1">Total Announcements</span>
                    </div>
                </div>

                {/* Educational Resources Card */}
                <div className="flex items-center gap-6 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-green-50 text-blue-500">
                        <BookOpen className="w-10 h-10" fill="currentColor" strokeWidth={1} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-green-900">{resourceCount || 0}</span>
                        <span className="text-gray-500 text-sm font-medium mt-1">Educational Resources</span>
                    </div>
                </div>

                {/* Today's Date Card */}
                <div className="flex items-center gap-6 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-green-50 text-blue-400">
                        <Calendar className="w-10 h-10" fill="currentColor" strokeWidth={1} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-green-900">{todayDate}</span>
                        <span className="text-gray-500 text-sm font-medium mt-1">Today&apos;s Date</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
