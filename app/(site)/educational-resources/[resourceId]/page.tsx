/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";
import { getEducationalResourceBySlug } from "@/actions/educational-resource/get-resource-by-id";

export default async function SingleEducationalResourcePage(props: { params: Promise<{ resourceId: string }> }) {
    const params = await props.params;
    const { data: resource, error } = await getEducationalResourceBySlug(params.resourceId);

    if (error || !resource) {
        notFound();
    }

    const MarkdownComponents: any = {
        h1: ({ ...props }: any) => <h1 className="text-3xl font-bold text-green-900 mt-8 mb-4 tracking-tight" {...props} />,
        h2: ({ ...props }: any) => <h2 className="text-[26px] font-bold text-green-900 mt-14 mb-6 pb-3 border-b border-green-700/20 tracking-tight" {...props} />,
        h3: ({ ...props }: any) => <h3 className="text-xl font-bold text-green-800 mt-8 mb-4 tracking-tight" {...props} />,
        p: ({ ...props }: any) => <p className="text-gray-600 leading-relaxed mb-6 text-[16px]" {...props} />,
        strong: ({ ...props }: any) => <strong className="font-bold text-green-900" {...props} />,
        
        ol: ({ ...props }: any) => (
            <ol 
                className="list-none p-0 mx-0 my-8 space-y-4 [counter-reset:step-counter]
                           [&>li]:relative [&>li]:bg-white [&>li]:p-6 [&>li]:pl-[5rem] [&>li]:rounded-2xl [&>li]:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] [&>li]:border [&>li]:border-gray-50 text-gray-600 text-[15px]
                           [&>li]:[counter-increment:step-counter]
                           [&>li::before]:content-[counter(step-counter)] [&>li::before]:absolute [&>li::before]:left-6 [&>li::before]:top-6 [&>li::before]:w-10 [&>li::before]:h-10 [&>li::before]:bg-[#429955] [&>li::before]:text-white [&>li::before]:rounded-full [&>li::before]:flex [&>li::before]:items-center [&>li::before]:justify-center [&>li::before]:font-bold [&>li::before]:text-lg
                           [&>li_strong]:block [&>li_strong]:text-green-900 [&>li_strong]:text-[17px] [&>li_strong]:mb-2
                           [&>li>p]:m-0"
                {...props} 
            />
        ),
        
        ul: ({ ...props }: any) => (
            <ul 
                className="list-none p-0 mx-0 my-8 space-y-3
                           [&>li]:relative [&>li]:pl-8 text-gray-600 font-medium text-[15px]
                           [&>li::before]:content-['✓'] [&>li::before]:absolute [&>li::before]:left-0 [&>li::before]:top-0 [&>li::before]:text-[#429955] [&>li::before]:font-bold"
                {...props} 
            />
        ),

        blockquote: ({ children, ...props }: any) => {
            let textContent = '';
            
            const extractText = (child: any): string => {
                if (typeof child === 'string') return child;
                if (child?.props?.children) {
                    if (Array.isArray(child.props.children)) {
                       return child.props.children.map(extractText).join('');
                    }
                    return extractText(child.props.children);
                }
                return '';
            };

            React.Children.forEach(children, (child) => {
                textContent += extractText(child);
            });

            const isWarning = textContent.includes('⚠️');

            return (
                <div 
                    className={`my-8 p-6 rounded-xl border-l-[6px] shadow-sm ${
                        isWarning 
                            ? 'bg-[#fff8f1] border-[#fbbf24]' 
                            : 'bg-[#f4f9f1] border-[#4aa047]'
                    }`}
                >
                    <div 
                        className={`font-medium ${
                            isWarning ? '[&>p]:text-[#c2410c] [&_strong]:text-[#c2410c]' : '[&>p]:text-[#166534] [&_strong]:text-[#166534]'
                        } [&>p]:mb-0 [&>p]:leading-relaxed`} 
                        {...props}
                    >
                        {children}
                    </div>
                </div>
            );
        },
    };

    return (
        <div className="min-h-screen bg-[#f4f9f1] flex flex-col">
            
            {/* Header / Hero Section (Green Block) */}
            <div className="bg-[#4aa047] w-full py-16 px-4 shrink-0">
                <div className="max-w-4xl mx-auto relative">
                    <Link href="/home" className="absolute -top-10 left-0 text-sm font-semibold text-green-100 hover:text-white flex items-center transition-colors">
                        &larr; Back to Home
                    </Link>
                    
                    <div className="text-center space-y-4 pt-4">
                        <div className="inline-flex items-center justify-center text-[4rem] text-white drop-shadow-md mb-2">
                            {resource.icon || "📚"}
                        </div>
                        <h1 className="text-4xl md:text-[44px] font-extrabold tracking-tight text-white drop-shadow-sm">
                            {resource.title}
                        </h1>
                        <p className="text-lg md:text-[20px] text-green-50 font-medium">
                            {resource.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Rendered via Custom Markdown Components */}
            <div className="w-full flex-1 px-4 py-12 md:py-16">
                <div className="max-w-4xl mx-auto">
                    <article className="max-w-none">
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={MarkdownComponents}
                        >
                            {resource.content}
                        </ReactMarkdown>
                    </article>
                </div>
            </div>

        </div>
    );
}
