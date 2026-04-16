import Link from "next/link";
import Announcements from "@/components/home/announcements";
import EducationalResources from "@/components/educational-resources/educational-resources";

const HomePage = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative w-full h-[600px] flex items-center justify-center flex-col text-center overflow-hidden">
                {/* Background Image with Green Overlay */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
                    style={{ backgroundImage: "url('/images/barangay-hero.jpg')" }}
                >
                    <div className="absolute inset-0 bg-green-900/75"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-md">
                        Welcome to Barangay 9A
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-md">
                        Lipa City, Batangas
                    </h2>
                    <p className="text-lg md:text-xl text-white font-medium mb-10 max-w-2xl drop-shadow-md">
                        Building a Connected and Informed Community
                    </p>
                    
                    <Link 
                        href="#announcements" 
                        className="px-8 py-4 bg-white text-green-800 font-bold rounded-full text-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        View Announcements
                    </Link>
                </div>
            </section>

            <div id="announcements">
                <Announcements />
            </div>
            <EducationalResources />
        </div>
    )
};

export default HomePage;