import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllEducationalResources } from "@/actions/educational-resource/get-all-resources";
import { ResourcesDataTable } from "./client";

const EducationalResourcesPage = async () => {
    const { data: resources, error } = await getAllEducationalResources();

    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
            {/* Header Section */}
            <section className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Manage Educational Resources</h1>
                    <p className="text-gray-500 mt-1">View, edit, or remove published educational materials.</p>
                </div>
                <Link href="/admin/educational-resources/new">
                    <Button>New Resource</Button>
                </Link>
            </section>

            {/* Data Table Section */}
            {error ? (
                <div className="bg-red-50 text-red-500 p-4 rounded-md font-medium">Failed to load educational resources: {error}</div>
            ) : (
                <ResourcesDataTable data={resources || []} />
            )}
        </div>
    );
};

export default EducationalResourcesPage;