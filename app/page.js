"use client";
import React from "react";
import Link from "next/link";
import Extension from "@/components/extension";
import { ArrowRight, Utensils, HeartHandshake } from "lucide-react";

const page = () => {
	return (
		<div className="min-h-screen bg-background text-foreground relative overflow-hidden selection:bg-orange-500/30">

			{/* Ambient Background Glows */}
			<div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
				<div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-75"></div>
				<div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000"></div>
				<div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
			</div>

			<main className="container mx-auto px-4 pt-32 pb-12 relative z-10">

				{/* Hero Section */}
				<section className="text-center mb-24 max-w-4xl mx-auto">
					<div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
						<span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">
							Revolutionizing Food Redistribution
						</span>
					</div>

					<h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
						Turn Waste Into <br />
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 animate-gradient-x">
							Opportunity.
						</span>
					</h2>

					<p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
						Join the movement to bridge the gap between abundance and need.
						Connect real-time food surplus with communities that need it most.
					</p>

					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Link href="/login">
							<button className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
								Get Started Now <ArrowRight size={20} />
							</button>
						</Link>
						<Link href="#how-it-works">
							<button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
								See How It Works
							</button>
						</Link>
					</div>
				</section>

				{/* Cards Section */}
				<div className="relative max-w-5xl mx-auto mb-32">
					<div className="grid md:grid-cols-2 gap-8">

						{/* Consumer Card */}
						<div className="glass-card group p-8 relative overflow-hidden hover:border-orange-500/30">
							<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
								<Utensils size={120} />
							</div>
							<div className="relative z-10">
								<div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-6 text-orange-400 group-hover:scale-110 transition-transform duration-300">
									<Utensils size={28} />
								</div>
								<h3 className="text-3xl font-bold text-white mb-4">
									For Consumers
								</h3>
								<p className="text-gray-400 mb-8 min-h-[80px]">
									Find fresh, surplus food nearby. Save money, enjoy great meals,
									and help the planet by rescuing food before it goes to waste.
								</p>
								<Link href="/login">
									<button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-orange-500 hover:border-orange-500 text-white font-semibold transition-all duration-300">
										Find Food
									</button>
								</Link>
							</div>
						</div>

						{/* Provider Card */}
						<div className="glass-card group p-8 relative overflow-hidden hover:border-green-500/30">
							<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
								<HeartHandshake size={120} />
							</div>
							<div className="relative z-10">
								<div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform duration-300">
									<HeartHandshake size={28} />
								</div>
								<h3 className="text-3xl font-bold text-white mb-4">
									For Providers
								</h3>
								<p className="text-gray-400 mb-8 min-h-[80px]">
									Don't let good food go to waste. Share your surplus instanly
									with verified local communities. Deduct taxes, not trash.
								</p>
								<Link href="/login">
									<button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-green-600 hover:border-green-600 text-white font-semibold transition-all duration-300">
										Share Food
									</button>
								</Link>
							</div>
						</div>

					</div>
				</div>

				{/* Extension Section */}
				<div id="how-it-works">
					<Extension />
				</div>

			</main>
		</div>
	);
};

export default page;
