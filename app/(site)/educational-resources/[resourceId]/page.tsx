import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

// In the future, this will be: 
// const SingleEducationalResourcePage = async ({ params }: { params: { resourceId: string } }) => {
//   const resource = await getResourceBySlug(params.resourceId);
//   Then you would use An external package like <ReactMarkdown>{resource.content}</ReactMarkdown> inside the prose div.

const SingleEducationalResourcePage = () => {
    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto space-y-8">
                
                {/* Navigation */}
                <Link href="/educational-resources" className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center">
                    ← Back to Resources
                </Link>

                {/* Header */}
                <header className="space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-4xl mb-2">
                        🌐
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                        Internet Basics
                    </h1>
                    <p className="text-xl text-gray-500">
                        Learn how to use the internet safely and confidently
                    </p>
                </header>

                <hr className="border-gray-200" />

                {/* 
                    Main Content 
                    Note: If using @tailwindcss/typography and react-markdown, 
                    this entire section below would just be:
                    <div className="prose prose-green max-w-none">
                       <ReactMarkdown>{resource.content}</ReactMarkdown>
                    </div>
                */}
                <article className="space-y-10 text-gray-700 leading-relaxed text-lg">
                    
                    {/* Standard Text Section */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">What is the Internet?</h2>
                        <p>
                            The internet is like a giant library that connects computers all around the world. It lets you find information, talk to people, watch videos, and do many other things - all from your phone or computer!
                        </p>
                        <p>
                            Think of it as a big network of roads that connect different places. Instead of cars traveling on these roads, it&apos;s information that travels from one computer to another.
                        </p>
                    </section>

                    {/* Callout / Information Box */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                        <h4 className="flex items-center text-blue-900 font-bold mb-2">
                            💡 Did You Know?
                        </h4>
                        <p className="text-blue-800 text-base">
                            The internet is used by billions of people every day. In the Philippines alone, millions of Filipinos use the internet for work, school, and staying connected with family.
                        </p>
                    </div>

                    {/* Numbered List Section */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">How to Connect to the Internet</h2>
                        <p>There are different ways to connect to the internet:</p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">1</div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Mobile Data (Using Your Phone)</h3>
                                    <p className="mt-1 text-base">If you have a smartphone with a SIM card and load, you can connect to the internet anywhere there&apos;s a signal. Just turn on your &quot;Mobile Data&quot; in your phone settings.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">2</div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Wi-Fi (Wireless Connection)</h3>
                                    <p className="mt-1 text-base">Wi-Fi lets you connect to the internet without using your mobile data. You can find Wi-Fi at home, in the barangay hall, malls, and other public places. Just look for the Wi-Fi symbol and connect!</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Warning Callout Box */}
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
                        <h4 className="flex items-center text-orange-900 font-bold mb-2">
                            ⚠️ Be Careful!
                        </h4>
                        <p className="text-orange-800 text-base">
                            Not everything on the internet is true. Always check if the information comes from a trusted source, like government websites or well-known news organizations.
                        </p>
                    </div>
                </article>

                <hr className="border-gray-200 my-12" />

                {/* Footer: Explore More */}
                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Explore More Topics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { icon: "📧", title: "Using Email" },
                            { icon: "📱", title: "Social Media" },
                            { icon: "🔒", title: "Online Safety" },
                            { icon: "💻", title: "Computer Basics" }
                        ].map((topic, i) => (
                            <Link href="#" key={i}>
                                <Card className="hover:border-green-500 hover:shadow-md transition-all cursor-pointer">
                                    <CardContent className="p-4 flex items-center gap-3">
                                        <span className="text-2xl">{topic.icon}</span>
                                        <span className="font-semibold text-gray-700">{topic.title}</span>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
};

export default SingleEducationalResourcePage;