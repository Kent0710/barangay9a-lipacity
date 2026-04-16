'use client'

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAnnouncementById } from "@/actions/announcement/get-announcement-by-id";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AnnouncementCard from "@/components/home/announcement-card";
import { Database } from "@/database.types";

type Announcement = Database["public"]["Tables"]["announcement"]["Row"];

const ViewAnnouncementDetails = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();

    const [announcement, setAnnouncement] = useState<Announcement | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            router.push("/admin/announcements");
            return;
        }

        const fetchAnnouncement = async () => {
            const { data, error } = await getAnnouncementById(id);
            
            if (error || !data) {
                setError(error || "Announcement not found");
                setIsLoading(false);
                return;
            }

            setAnnouncement(data);
            setIsLoading(false);
        };

        fetchAnnouncement();
    }, [id, router]);

    if (isLoading) {
        return <div className="p-8 flex justify-center text-gray-500">Loading announcement details...</div>;
    }

    if (error || !announcement) {
        return (
            <div className="p-8 text-center space-y-4">
                <div className="text-red-500 bg-red-50 p-4 rounded-md">{error}</div>
                <Link href="/admin/announcements">
                    <Button variant="outline">Back to Announcements</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full p-6 lg:p-12 max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Announcement Details</h1>
                    <p className="text-gray-500 mt-2">Preview of how this announcement looks to citizens.</p>
                </div>
                <Link href="/admin/announcements">
                    <Button variant="outline">Back</Button>
                </Link>
            </div>
            
            <div className="bg-gray-50 rounded-xl py-12 px-4 md:px-8 border border-gray-200 flex justify-center w-full">
                <AnnouncementCard announcement={announcement} />
            </div>

            <div className="flex items-center gap-4">
                <Link href={`/admin/announcements/edit?id=${announcement.id}`}>
                    <Button>Edit Announcement</Button>
                </Link>
            </div>
        </div>
    );
};

const AdminAnnouncementViewPage = () => {
    return (
        <Suspense fallback={<div className="p-8 flex justify-center text-gray-500">Loading...</div>}>
            <ViewAnnouncementDetails />
        </Suspense>
    )
};

export default AdminAnnouncementViewPage;