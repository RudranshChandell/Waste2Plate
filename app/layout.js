import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import "./globals.css";

export const metadata = {
	title: "Waste2Plate",
	description: "Get food",
};

export default function RootLayout({ children }) {
	// The RootLayout component is the main layout for the application. It wraps all pages and includes the Navbar and Footer components.
	return (
		<html lang="en">
			<body>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
