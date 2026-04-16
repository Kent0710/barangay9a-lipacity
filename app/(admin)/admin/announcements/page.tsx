import Link from "next/link";
import { Button } from "@/components/ui/button";

const AdminAnnouncementsPage = () => {
    return (
        <div>
            {/* header section  */}
            <section className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Manage Announcements</h1>
                <Link href="/admin/announcements/new">
                    <Button>New Announcement</Button>
                </Link>
            </section>
        </div>
    );
};

export default AdminAnnouncementsPage;
