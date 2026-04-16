

'use client'

import { useState } from "react";
import { createNewAnnouncement } from "@/actions/announcement/create-new-announcement";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// For creating new announcements
const AdminAnnouncementsNew = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("date", date);

            const res = await createNewAnnouncement(formData);

            if (res?.error) {
                setError(res.error);
            }
        } catch (err) {
            console.error("Error creating announcement:", err);
            setError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex h-full w-full flex-col p-6 lg:p-12 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">New Announcement</h1>
                <p className="text-gray-500 mt-2">
                    Create a new announcement for the barangay. Fill out the details below to broadcast it.
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

                <div className="flex items-center pt-4">
                    <Button type="submit" size="lg" className="w-full md:w-auto px-8" disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create Announcement"}
                    </Button>
                </div>
            </form>
        </div>
    )
};

export default AdminAnnouncementsNew;