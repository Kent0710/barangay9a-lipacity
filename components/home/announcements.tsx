import AnnouncementCard from "./announcement-card";
import { getAllAnnouncements } from "@/actions/announcement/get-all-announcements";

const Announcements = async () => {
    const { data: announcements, error } = await getAllAnnouncements(6);

    return (
        <div className="flex flex-col items-center justify-center py-10 px-4">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Barangay Announcements
                </h2>
                <p className="text-gray-500 mt-2">
                    Stay updated with the latest news and events
                </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
                {error && (
                    <div className="w-full text-center text-red-500">
                        Failed to load announcements: {error}
                    </div>
                )}
                
                {announcements && announcements.length > 0 ? (
                    announcements.map((announcement) => (
                        <AnnouncementCard key={announcement.id} announcement={announcement} />
                    ))
                ) : (
                    !error && <div className="text-gray-500">No announcements available yet.</div>
                )}
            </div>
        </div>
    )
};

export default Announcements;