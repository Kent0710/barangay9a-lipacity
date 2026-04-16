import Link from "next/link";
import { Database } from "@/database.types";
import { Globe } from "lucide-react";

interface EducationalResourceCardProps {
    resource: Database["public"]["Tables"]["educational_resource"]["Row"];
}

const EducationalResourceCard: React.FC<EducationalResourceCardProps> = ({ resource }) => {
    const { title, description, icon, slug } = resource;

    return (
        <Link 
            href={`/educational-resources/${slug}`} 
            className="flex flex-col items-center text-center px-6 py-10 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow gap-4 w-full h-full"
        >
            <div className="mb-2">
                {icon ? (
                    <span className="text-5xl drop-shadow-sm">{icon}</span>
                ) : (
                    <Globe className="w-12 h-12 text-sky-400 drop-shadow-sm" strokeWidth={1.5} />
                )}
            </div>
            
            <h3 className="font-bold text-[17px] text-green-800 tracking-tight leading-tight"> 
                {title} 
            </h3>
            
            <p className="text-slate-500 text-[13px] leading-relaxed"> 
                {description} 
            </p>
        </Link>
    );
};

export default EducationalResourceCard;
