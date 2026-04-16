import AnnouncementCard from "./announcement-card";
import { Database } from "@/database.types";

type Announcement = Database["public"]["Tables"]["announcement"]["Row"];

const DUMMY_ANNOUNCEMENTS: Announcement[] = [
    {
        id: "1",
        author_id: "user-1",
        title: "Free Digital Literacy Training",
        description: "Join our free computer and internet training every Saturday at the Barangay Hall. Open to all residents, especially senior citizens. No experience needed!",
        date: "2026-02-06T08:00:00Z",
        category: "Training"
    },
    {
        id: "2",
        author_id: "user-2",
        title: "Community Clean-up Drive",
        description: "Let's work together to keep our barangay clean and green. Please bring your own cleaning materials. Refreshments will be provided after the activity.",
        date: "2026-04-20T07:00:00Z",
        category: "Environment"
    },
    {
        id: "3",
        author_id: "user-1",
        title: "Health Center Vaccination Schedule",
        description: "Flu and pneumonia vaccines are available this coming week at the Barangay Health Center. Priority goes to children under 5 and adults over 60.",
        date: "2026-04-25T09:00:00Z",
        category: "Health"
    },
    {
        id: "4",
        author_id: "user-3",
        title: "Barangay Fiesta Celebration",
        description: "Join us for our annual fiesta celebration on May 15th! There will be food stalls, games, and live entertainment. Don't miss out on the fun!",
        date: "2026-05-15T12:00:00Z",
        category: "Event"
    }
];

const Announcements = () => {
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
                {DUMMY_ANNOUNCEMENTS.map((announcement) => (
                    <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
            </div>
        </div>
    )
};

export default Announcements;