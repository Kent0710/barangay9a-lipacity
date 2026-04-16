import EducationalResourceCard from "./educational-resource-card";
import { getAllEducationalResources } from "@/actions/educational-resource/get-all-resources";

const EducationalResources = async () => {
    const { data: resources, error } = await getAllEducationalResources(10);

    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-[#f4f9f1]">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-green-900">
                    Learn Digital Skills
                </h2>
                <p className="text-gray-600 mt-4">
                    Free resources to help you use technology with confidence
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
                {error && (
                    <div className="col-span-full text-center text-red-500">
                        Failed to load educational resources: {error}
                    </div>
                )}
                
                {resources && resources.length > 0 ? (
                    resources.map((resource) => (
                        <EducationalResourceCard key={resource.id} resource={resource} />
                    ))
                ) : (
                    !error && <div className="col-span-full text-center text-gray-500">No educational resources available yet.</div>
                )}
            </div>
        </div>
    )
};

export default EducationalResources;
