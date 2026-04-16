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
            className="flex flex-col items-center justify-center px-6 py-12 overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all gap-5 w-full sm:w-[320px]"
        >
            <div className="mb-2">
                {icon ? (
                    <span className="text-7xl drop-shadow-sm">{icon}</span>
                ) : (
                    <Globe className="w-14 h-14 text-sky-400 drop-shadow-sm" strokeWidth={1.5} />
                )}
            </div>
            
            <h3 className="text-center font-bold text-lg text-green-800 tracking-tight"> 
                {title} 
            </h3>
            
            <p className="text-center text-slate-600 leading-relaxed"> 
                {description} 
            </p>
        </Link>
    );
};

export default EducationalResourceCard;
