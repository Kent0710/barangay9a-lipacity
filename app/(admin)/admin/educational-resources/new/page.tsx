'use client'

import { useState } from "react";
import { createEducationalResource } from "@/actions/educational-resource/create-resource";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AdminEducationalResourceNew = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [slug, setSlug] = useState("");
    const [icon, setIcon] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Helper to auto-generate slug from title
    const handleTitleChange = (val: string) => {
        setTitle(val)
        // only auto-fill if user hasn't explicitly customized slug yet
        if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) {
            setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("slug", slug);
            formData.append("icon", icon);
            formData.append("content", content);

            const res = await createEducationalResource(formData);

            if (res?.error) {
                setError(res.error);
            }
        } catch (err) {
            console.error("Error creating educational resource:", err);
            setError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex h-full w-full flex-col p-6 lg:p-12 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">New Educational Resource</h1>
                <p className="text-gray-500 mt-2">
                    Create a new learning module for the barangay using Markdown.
                </p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 space-y-6">
                {error && <div className="text-sm font-medium text-red-500 bg-red-50 p-3 rounded-md">{error}</div>}
                
                <div className="space-y-6 bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-base font-semibold">Title</Label>
                            <Input 
                                id="title" 
                                type="text" 
                                className="h-12"
                                placeholder="e.g. Internet Basics" 
                                required 
                                value={title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug" className="text-base font-semibold">URL Slug</Label>
                            <Input 
                                id="slug" 
                                type="text"
                                className="h-12" 
                                placeholder="e.g. internet-basics" 
                                required
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-base font-semibold">Short Description</Label>
                        <Input 
                            id="description" 
                            type="text" 
                            className="h-12"
                            placeholder="A brief summary for the catalog card..." 
                            required 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="icon" className="text-base font-semibold">Icon (Emoji)</Label>
                        <Input 
                            id="icon" 
                            type="text"
                            className="h-12 w-full md:w-32 text-2xl text-center" 
                            placeholder="🌐" 
                            maxLength={5}
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                        />
                        <p className="text-sm text-gray-500">Just paste an emoji characterizing the lesson.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content" className="text-base font-semibold">Content (Markdown)</Label>
                        <textarea 
                            id="content" 
                            className="flex min-h-[300px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="## What is the internet?&#10;Write your markdown here..." 
                            required 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center pt-4">
                    <Button type="submit" size="lg" className="w-full md:w-auto px-8" disabled={isLoading}>
                        {isLoading ? "Publishing..." : "Publish Resource"}
                    </Button>
                </div>
            </form>
        </div>
    )
};

export default AdminEducationalResourceNew;