"use client";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const foodAlertSchema = z.object({
	giveawayName: z.string().min(1, "Required"),
	orgName: z.string().min(1, "Required"),
	city: z.string().min(1, "Required"),
	address: z.string().min(1, "Required"),
	description: z.string().min(1, "Required"),
	foodType: z.enum(["veg", "nonVeg"]),
	startTime: z.string().min(1, "Required"),
	endTime: z.string().min(1, "Required"),
	slots: z.coerce.number().min(1, "Must be at least 1"),
});

const INDIAN_CITIES = [
	"Ahmedabad",
	"Ayodhya",
	"Bangalore",
	"Chennai",
	"Delhi",
	"Gorakhpur",
	"Hyderabad",
	"Kolkata",
	"Lucknow",
	"Mumbai",
	"Patna",
	"Pune",
	"Surat",
	"Jaipur",
	"Indore",
	"Nagpur",
	"Kanpur",
];

export default function FoodAlertForm() {
	const [query, setQuery] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [filteredCities, setFilteredCities] = useState([]);
	const [location, setLocation] = useState(null);
	const inputRef = useRef(null);

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(foodAlertSchema),
	});

	// Get user location on component mount
	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
				},
				(error) => {
					console.error("Error getting location:", error.message);
					//alert("Please allow location access for accurate results.");
					toast("Please allow location access for accurate results.");
				},
				{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
			);
		} else {
			console.error("Geolocation is not supported by this browser.");
			//alert("Geolocation is not supported by your browser.");
			toast("Geolocation is not supported by your browser.");
		}
	}, []);

	// Filter city suggestions
	useEffect(() => {
		setFilteredCities(
			INDIAN_CITIES.filter((city) =>
				city.toLowerCase().startsWith(query.toLowerCase())
			).sort()
		);
	}, [query]);

	const handleCitySelect = (cityName) => {
		setQuery(cityName);
		setValue("city", cityName);
		setShowSuggestions(false);
	};

	const handleClickOutside = (e) => {
		if (inputRef.current && !inputRef.current.contains(e.target)) {
			setShowSuggestions(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	const onSubmit = async (data) => {
		try {
			await addDoc(collection(db, "food_alerts"), {
				...data,
				location, // Add location data
				createdAt: serverTimestamp(),
				status: "available",
			});
			//alert("Giveaway submitted successfully!");
			toast("Giveaway submitted successfully!");
			reset();
			setQuery("");
			setFilteredCities([]);
		} catch (error) {
			console.error("Error adding document: ", error);
			//alert("Error submitting the giveaway.");
			toast("Error submitting the giveaway.");
		}
	};

	return (
		<div className="glass-card text-white p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto border border-white/10 relative overflow-hidden">
			{/* Bg Glow */}
			<div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick={false}
				rtl={false}
				theme="dark"
				transition={Slide}
			/>
			<h2 className="text-center text-3xl mb-8 font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
				Details
			</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<Label className="text-gray-300">Giveaway Name</Label>
						<Input
							className="bg-white/5 border-white/10 text-white focus:border-orange-500/50 focus:ring-orange-500/20 placeholder:text-gray-600"
							placeholder="e.g. Fresh Bread Surplus"
							{...register("giveawayName")}
						/>
						<p className="text-red-400 text-xs">
							{errors.giveawayName?.message}
						</p>
					</div>
					<div className="space-y-2">
						<Label className="text-gray-300">Organizer Name</Label>
						<Input
							className="bg-white/5 border-white/10 text-white focus:border-orange-500/50 focus:ring-orange-500/20"
							placeholder="e.g. Joe's Bakery"
							{...register("orgName")}
						/>
						<p className="text-red-400 text-xs">
							{errors.orgName?.message}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="relative space-y-2" ref={inputRef}>
						<Label className="text-gray-300">City</Label>
						<Input
							type="text"
							value={query}
							placeholder="Search city..."
							onFocus={() => setShowSuggestions(true)}
							onChange={(e) => {
								setQuery(e.target.value);
								setShowSuggestions(true);
							}}
							className="bg-white/5 border-white/10 text-white focus:border-orange-500/50 focus:ring-orange-500/20"
						/>
						{showSuggestions && filteredCities.length > 0 && (
							<ul className="absolute bg-[#1a1a1a] border border-white/10 w-full z-20 rounded-lg shadow-xl max-h-40 overflow-y-auto mt-1">
								{filteredCities.map((city) => (
									<li
										key={city}
										className="px-4 py-2 hover:bg-white/10 cursor-pointer text-gray-300 transition-colors"
										onClick={() => handleCitySelect(city)}>
										{city}
									</li>
								))}
							</ul>
						)}
						<p className="text-red-400 text-xs">
							{errors.city?.message}
						</p>
						<input type="hidden" {...register("city")} />
					</div>
					<div className="space-y-2">
						<Label className="text-gray-300">Address</Label>
						<Input
							className="bg-white/5 border-white/10 text-white focus:border-orange-500/50 focus:ring-orange-500/20"
							placeholder="Full street address"
							{...register("address")}
						/>
						<p className="text-red-400 text-xs">
							{errors.address?.message}
						</p>
					</div>
				</div>

				<div className="space-y-2">
					<Label className="text-gray-300">Description</Label>
					<Textarea
						className="bg-white/5 border-white/10 text-white focus:border-orange-500/50 focus:ring-orange-500/20 min-h-[100px]"
						placeholder="Describe the food items..."
						{...register("description")}
					/>
				</div>

				<div className="space-y-3">
					<Label className="text-gray-300">Food Type</Label>
					<RadioGroup
						className="flex space-x-6"
						onValueChange={(val) => setValue("foodType", val)}>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="veg" id="veg" className="border-white text-orange-500" />
							<Label htmlFor="veg" className="text-gray-300 cursor-pointer hover:text-white">Veg</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="nonVeg" id="nonVeg" className="border-white text-orange-500" />
							<Label htmlFor="nonVeg" className="text-gray-300 cursor-pointer hover:text-white">Non-Veg</Label>
						</div>
					</RadioGroup>
					<p className="text-red-400 text-xs">
						{errors.foodType?.message}
					</p>
				</div>

				<div className="grid grid-cols-2 gap-6">
					<div className="space-y-2">
						<Label className="text-gray-300">Start Time</Label>
						<Input
							type="time"
							className="bg-white/5 border-white/10 text-white focus:border-orange-500/50 focus:ring-orange-500/20 [color-scheme:dark]"
							{...register("startTime")}
						/>
					</div>
					<div className="space-y-2">
						<Label className="text-gray-300">End Time</Label>
						<Input
							type="time"
							className="bg-white/5 border-white/10 text-white focus:border-orange-500/50 focus:ring-orange-500/20 [color-scheme:dark]"
							{...register("endTime")}
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label className="text-gray-300">No. of Slots Available</Label>
					<Input
						type="number"
						className="bg-white/5 border-white/10 text-white focus:border-orange-500/50 focus:ring-orange-500/20"
						{...register("slots")}
						min={1}
					/>
				</div>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-lg">
					{!isSubmitting ? "Broadcast Alert" : "Publishing..."}
				</Button>
			</form>
		</div>
	);
}
