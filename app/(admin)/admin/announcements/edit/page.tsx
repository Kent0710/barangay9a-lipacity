'use client'

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateAnnouncement } from "@/actions/announcement/update-announcement";
import { getAnnouncementById } from "@/actions/announcement/get-announcement-by-id";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const EditAnnouncementForm = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

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

            setTitle(data.title || "");
            setDescription(data.description || "");
            setCategory(data.category || "");
            
            if (data.date) {
                const d = new Date(data.date);
                d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
                setDate(d.toISOString().slice(0, 16));
            }
            
            setIsLoading(false);
        };

        fetchAnnouncement();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        
        setError(null);
        setIsSaving(true);
        
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("date", date);

            const res = await updateAnnouncement(id, formData);

            if (res?.error) {
                setError(res.error);
            }
        } catch (err) {
            console.error("Error updating announcement:", err);
            setError("Something went wrong");
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) {
        return <div className="p-8 flex justify-center text-gray-500">Loading announcement details...</div>;
    }

    return (
        <div className="flex h-full w-full flex-col p-6 lg:p-12 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Announcement</h1>
                <p className="text-gray-500 mt-2">
                    Update the details for this announcement below.
                </p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 space-y-6">
                {error && <div className="text-sm font-medium text-red-500 bg-red-50 p-3 rounded-md">{error}</div>}
                
                <div className="space-y-6 bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-base font-semibold">Title</Label>
                        <Input 
                            id="title" 
                            type="text" 
                            className="h-12"
                            placeholder="e.g. Free Medical Mission" 
                            required 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-base font-semibold">Description</Label>
                        <Input 
                            id="description" 
                            type="text" 
                            className="h-12"
                            placeholder="Enter announcement details..." 
                            required 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-base font-semibold">Category</Label>
                            <Input 
                                id="category" 
                                type="text"
                                className="h-12" 
                                placeholder="e.g. Health, Meeting, Activity" 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-base font-semibold">Date</Label>
                            <Input 
                                id="date" 
                                type="datetime-local" 
                                className="h-12"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 pt-4">
                    <Button type="button" variant="outline" size="lg" onClick={() => router.push('/admin/announcements')} disabled={isSaving}>
                        Cancel
                    </Button>
                    <Button type="submit" size="lg" className="px-8" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </div>
    )
};

const AdminAnnouncementEditPage = () => {
    return (
        <Suspense fallback={<div className="p-8">Loading...</div>}>
            <EditAnnouncementForm />
        </Suspense>
    )
};

export default AdminAnnouncementEditPage;