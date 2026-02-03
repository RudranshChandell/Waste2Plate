import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<footer className="bg-[#0a0a0a] border-t border-white/10 text-gray-400 py-8 w-full z-50">
			<div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
				<div className="flex justify-center items-center">
					<h2 className="text-xl font-bold font-handwriting text-white">
						Waste2Plate
					</h2>
				</div>
				<div>
					<ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
						<li className="text-gray-500">
							<span>
								&copy; {new Date().getFullYear()} Waste2Plate.
							</span>
						</li>
						<li>
							<Link href="https://github.com" className="hover:text-amber-500 transition-colors">Github</Link>
						</li>
						<li>
							<Link href="https://linkedin.com" className="hover:text-amber-500 transition-colors">LinkedIn</Link>
						</li>
						<li>
							<Link href="https://instagram.com" className="hover:text-amber-500 transition-colors">Instagram</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
