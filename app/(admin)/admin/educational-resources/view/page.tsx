'use client'

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getEducationalResourceById } from "@/actions/educational-resource/get-resource-by-id";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Database } from "@/database.types";

type EducationalResource = Database["public"]["Tables"]["educational_resource"]["Row"];

const ViewEducationalResourceDetails = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();

    const [resource, setResource] = useState<EducationalResource | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            router.push("/admin/educational-resources");
            return;
        }

        const fetchResource = async () => {
            const { data, error } = await getEducationalResourceById(id);
            
            if (error || !data) {
                setError(error || "Resource not found");
                setIsLoading(false);
                return;
            }

            setResource(data);
            setIsLoading(false);
        };

        fetchResource();
    }, [id, router]);

    if (isLoading) {
        return <div className="p-8 flex justify-center text-gray-500">Loading resource details...</div>;
    }

    if (error || !resource) {
        return (
            <div className="p-8 text-center space-y-4">
                <div className="text-red-500 bg-red-50 p-4 rounded-md">{error}</div>
                <Link href="/admin/educational-resources">
                    <Button variant="outline">Back to Resources</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full p-6 lg:p-12 max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Resource Preview</h1>
                    <p className="text-gray-500 mt-2">Preview of how this module looks to citizens.</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/admin/educational-resources">
                        <Button variant="outline">Back</Button>
                    </Link>
                    <Link href={`/admin/educational-resources/edit?id=${resource.id}`}>
                        <Button>Edit Resource</Button>
                    </Link>
                </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 border border-gray-200 w-full shadow-sm">
                <header className="space-y-4 mb-8 pb-8 border-b border-gray-100">
                    {resource.icon && (
                        <div className="inline-flex items-center justify-center p-3 bg-gray-50 rounded-2xl shadow-sm border border-gray-100 text-4xl mb-2">
                            {resource.icon}
                        </div>
                    )}
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                        {resource.title}
                    </h1>
                    <p className="text-xl text-gray-500">
                        {resource.description}
                    </p>
                </header>

                <article className="prose prose-green lg:prose-xl max-w-none">
                    <ReactMarkdown>{resource.content}</ReactMarkdown>
                </article>
            </div>
        </div>
    );
};

const AdminEducationalResourceViewPage = () => {
    return (
        <Suspense fallback={<div className="p-8 flex justify-center text-gray-500">Loading...</div>}>
            <ViewEducationalResourceDetails />
        </Suspense>
    )
};

export default AdminEducationalResourceViewPage;