import { Database } from "@/database.types";

interface AnnouncementCardProps {
    announcement: Database["public"]["Tables"]["announcement"]["Row"];
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
    const { title, description, date, category } = announcement;
    
    // Parse date if available, otherwise fallback
    const announcementDate = date ? new Date(date) : new Date();
    const day = announcementDate.getDate().toString().padStart(2, '0');
    const month = announcementDate.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = announcementDate.getFullYear();

    return (
        <div className="flex w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Left Date Panel */}
            <div className="flex flex-col items-center justify-center bg-green-600 px-6 py-6 text-white min-w-[120px]">
                <span className="text-4xl font-bold">{day}</span>
                <span className="text-lg font-semibold mt-1">{month}</span>
                <span className="text-sm mt-1">{year}</span>
            </div>

            {/* Right Content Panel */}
            <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-green-900">
                        {title || "Untitled Announcement"}
                    </h3>
                    <span className="rounded-full bg-green-700 px-3 py-1 text-xs font-semibold text-white">
                        New
                    </span>
                </div>
                
                <p className="mt-4 flex-1 text-gray-600 text-sm leading-relaxed">
                    {description || "No description provided."}
                </p>

                <div className="mt-6">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                        {category || "General"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementCard;