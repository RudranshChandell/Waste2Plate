"use client";
import React from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const teamMembers = [
    {
        name: 'Vedant Jaiswal',
        role: 'Co-Creator',
        image: '/team/vedant.jpg',
        colorKey: 'pink',
        gradient: 'from-pink-500 to-rose-500',
        borderColor: 'border-pink-500/50',
        shadowColor: 'shadow-pink-500/20'
    },
    {
        name: 'Rudransh Chandel',
        role: 'Co-Creator',
        image: '/team/rudransh.png',
        colorKey: 'black',
        gradient: 'from-gray-700 to-black', // "Black" might be too dark, using gray-700
        borderColor: 'border-gray-500/50',
        shadowColor: 'shadow-gray-500/20'
    },
    {
        name: 'Abhinav Singh',
        role: 'Co-Creator',
        image: '/team/abhinav.png',
        colorKey: 'white',
        gradient: 'from-gray-100 to-gray-300',
        borderColor: 'border-white/50',
        shadowColor: 'shadow-white/20'
    },
    {
        name: 'Shivam',
        role: 'Co-Creator',
        image: '/team/shivam.png',
        colorKey: 'blue',
        gradient: 'from-blue-500 to-cyan-500',
        borderColor: 'border-blue-500/50',
        shadowColor: 'shadow-blue-500/20'
    }
];

const galleryImages = [
    { src: '/team/hacknovate-group.jpg', alt: 'Team at Hacknovate 6.0 Venue' },
    { src: '/team/hackathon-work-2.jpg', alt: 'Team coding intently' },
    { src: '/team/hackathon-work-1.png', alt: 'Development in progress' },
    { src: '/team/hacknovate-poster.jpg', alt: 'Hacknovate 6.0 Poster' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-orange-500/30 overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6">
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto text-center max-w-4xl relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-100 to-orange-200">
                        About Us
                    </h1>
                    <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                        We are a team of passionate developers committed to solving the food waste crisis.
                        Waste2Plate was born out of a desire to bridge the gap between surplus food and those in need.
                    </p>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-6 relative">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                            The Creators
                        </span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className={`group relative glass-card p-4 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-500 border-t ${member.borderColor}`}
                            >
                                {/* Glow Effect */}
                                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b ${member.gradient} blur-2xl -z-10`} />

                                <div className={`relative w-48 h-48 mb-6 rounded-full overflow-hidden border-4 ${member.borderColor} ${member.shadowColor} shadow-lg group-hover:scale-105 transition-transform duration-500`}>
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-orange-200 transition-colors">
                                    {member.name}
                                </h3>
                                <p className={`text-sm font-medium opacity-80 bg-clip-text text-transparent bg-gradient-to-r ${member.gradient}`}>
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hackathon Origins Section */}
            <section className="py-20 px-6 bg-white/5 backdrop-blur-sm relative">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />

                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Born at <span className="text-yellow-400">Hacknovate 6.0</span>
                            </h2>
                            <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                                <p>
                                    Waste2Plate wasn't just built in a day—it was forged in the fires of competition.
                                    Our journey began at the prestigious <strong className="text-white">Hacknovate 6.0</strong> hackathon.
                                </p>
                                <p>
                                    Hosted at <strong className="text-white">ABESIT College of Engineering, Ghaziabad</strong>,
                                    this event brought together the brightest minds to solve real-world problems.
                                </p>
                                <p>
                                    Over 24+ hours of coding, brainstorming, and coffee, we turned an idea into a working reality,
                                    driven by the mission to make food donation accessible, fast, and efficient.
                                </p>
                            </div>
                        </div>

                        {/* Featured Group Image */}
                        <div className="md:w-1/2 relative">
                            <div className="glass-card p-2 rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="relative aspect-video rounded-xl overflow-hidden">
                                    <Image
                                        src="/team/hacknovate-group.jpg"
                                        alt="Team at Hacknovate 6.0"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <h3 className="text-2xl font-semibold mb-8 text-center text-gray-400">Memories from the Event</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {galleryImages.slice(1).map((img, idx) => ( // Skip the first one as it's used in the main feature above
                            <div key={idx} className="glass-card p-2 overflow-hidden group">
                                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-white text-sm font-medium px-3 py-1 bg-black/50 rounded-full backdrop-blur-md">
                                            {img.alt}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
