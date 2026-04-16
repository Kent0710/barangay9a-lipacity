import EducationalResourceCard from "./educational-resource-card";
import { getAllEducationalResources } from "@/actions/educational-resource/get-all-resources";

const EducationalResources = async () => {
    const { data: resources, error } = await getAllEducationalResources(6);

    return (
        <div className="flex flex-col items-center justify-center py-10 px-4 bg-gray-50">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Educational Resources
                </h2>
                <p className="text-gray-500 mt-2">
                    Guides and materials to help our community
                </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
                {error && (
                    <div className="w-full text-center text-red-500">
                        Failed to load educational resources: {error}
                    </div>
                )}
                
                {resources && resources.length > 0 ? (
                    resources.map((resource) => (
                        <EducationalResourceCard key={resource.id} resource={resource} />
                    ))
                ) : (
                    !error && <div className="text-gray-500">No educational resources available yet.</div>
                )}
            </div>
        </div>
    )
};

export default EducationalResources;
