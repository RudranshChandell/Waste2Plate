"use client";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaBell } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    const navigateHome = () => {
        router.push("/");
    };

    return (
		<nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[#0a0a0a]/50">
			<div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo Section */}
                <div onClick={navigateHome} className="cursor-pointer flex items-center gap-2">
                    {/* Placeholder for Logo if image fails or just use Text */}
                     <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                        Waste2Plate
                    </h1>
                </div>

                {/* Navigation Menu */}
                <div className="hidden md:flex items-center space-x-8">
                     <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hover:scale-105 transform">
                        Home
                     </Link>
                     <Link href="https://chat.whatsapp.com/HnCutFbUzJ4LUlkbRiF1Qz" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hover:scale-105 transform">
                        Join Us
                     </Link>
                     <a href="/faq.pdf" download className="text-sm font-medium text-gray-300 hover:text-white transition-colors hover:scale-105 transform">
                        FAQs
                     </a>
                     <Link href="/t&c" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hover:scale-105 transform">
                        Terms
                     </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <FaBell size={20} />
                    </button>
                    <Link href="/login">
                        <button className="bg-white/10 hover:bg-white/20 text-white border border-white/10 px-6 py-2 rounded-full font-medium transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
		</nav>
	);
};

export default Navbar;
