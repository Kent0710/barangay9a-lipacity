import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-green-900 text-green-50 py-12 px-4 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand / About */}
                <div className="flex flex-col space-y-4">
                    <h3 className="text-2xl font-bold text-white">Barangay 9A</h3>
                    <p className="text-green-200 text-sm leading-relaxed max-w-sm">
                        Building a connected, informed, and resilient community in Lipa City, Batangas. We are dedicated to providing excellent public service and fostering a safe environment for all residents.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col space-y-4">
                    <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        </li>
                        <li>
                            <Link href="/#announcements" className="hover:text-white transition-colors">Announcements</Link>
                        </li>
                        <li>
                            <Link href="/educational-resources" className="hover:text-white transition-colors">Educational Resources</Link>
                        </li>
                        <li>
                            <Link href="/login" className="hover:text-white transition-colors">Admin Login</Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col space-y-4">
                    <h4 className="text-lg font-semibold text-white">Contact Us</h4>
                    <ul className="space-y-3 text-sm text-green-200">
                        <li className="flex items-start space-x-3">
                            <MapPin className="w-5 h-5 shrink-0 text-green-400" />
                            <span>Barangay Hall, Brgy 9A, Lipa City, Batangas, Philippines</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 shrink-0 text-green-400" />
                            <span>(123) 456-7890</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 shrink-0 text-green-400" />
                            <span>contact@barangay9a.gov.ph</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-green-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-green-300">
                    &copy; {new Date().getFullYear()} Barangay 9A, Lipa City. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
