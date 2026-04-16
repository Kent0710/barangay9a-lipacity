import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllAnnouncements } from "@/actions/announcement/get-all-announcements";
import { AnnouncementsDataTable } from "./client";

const AdminAnnouncementsPage = async () => {
    // using a loose limit to pull all active announcements for the admin view
    const { data: announcements, error } = await getAllAnnouncements(1000);

    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
            {/* header section  */}
            <section className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Manage Announcements</h1>
                    <p className="text-gray-500 mt-1">View, edit, or remove published announcements.</p>
                </div>
                <Link href="/admin/announcements/new">
                    <Button>New Announcement</Button>
                </Link>
            </section>

            {error ? (
                <div className="bg-red-50 text-red-500 p-4 rounded-md font-medium">Failed to load announcements: {error}</div>
            ) : (
                <AnnouncementsDataTable data={announcements || []} />
            )}
        </div>
    );
};

export default AdminAnnouncementsPage;
