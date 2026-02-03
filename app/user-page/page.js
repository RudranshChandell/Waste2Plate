"use client";
import FoodAlertCard from "@/components/FoodAlertCard";
import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDistance } from "geolib";
import { MapPin, SearchX, Loader2 } from "lucide-react";

const Page = () => {
	const [alerts, setAlerts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const [userLocation, setUserLocation] = useState(null);

	// Auth listener
	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			console.log(currentUser);
		});
		return () => unsubscribe();
	}, []);

	// Update user location in Firestore
	const updateUserLocation = (latitude, longitude) => {
		if (!user?.uid) return;

		const userDocRef = doc(db, "users", user.uid);
		updateDoc(userDocRef, {
			location: { latitude, longitude },
		})
			.then(() => console.log("User location updated"))
			.catch((error) => console.error("Error updating location:", error));
	};

	// Get user's current location
	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setUserLocation({ latitude, longitude });
					updateUserLocation(latitude, longitude);
				},
				(error) => console.error("Error getting location:", error),
				{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
			);
		}
	}, []);

	// Fetch food alerts and calculate distances
	useEffect(() => {
		if (!userLocation) {
			setLoading(true);
			return; // Wait for location before querying/filtering
		}

		console.log("Listening for alerts...");
		const unsubscribe = onSnapshot(
			collection(db, "food_alerts"),
			(snapshot) => {
				const fetchedAlerts = snapshot.docs
					.map((doc) => {
						const data = doc.data();
						let distance = null;

						if (userLocation && data.location) {
							try {
								const distInMeters = getDistance(userLocation, {
									latitude: data.location.latitude,
									longitude: data.location.longitude,
								});
								distance = distInMeters / 1000; // km
							} catch (err) {
								console.error("Distance calc error:", err);
							}
						}

						return {
							id: doc.id,
							...data,
							distance,
						};
					})
					.filter((alert) => {
						// Filter for alerts within 5km and available
						// If you want to show ALL alerts for testing, comment out the distance check
						return (
							alert.distance !== null &&
							// alert.distance <= 20 && // Increase range for demo purposes if needed
							alert.status === "available"
						);
					})
					.sort((a, b) => (a.distance || 0) - (b.distance || 0)); // Sort by distance

				setAlerts(fetchedAlerts);
				setLoading(false);
			},
			(error) => {
				console.error("Error fetching food alerts:", error);
				setLoading(false);
			}
		);
		return () => unsubscribe();
	}, [userLocation]);

	return (
		<div className="min-h-screen bg-background relative selection:bg-orange-500/30">
			{/* Bg Glow */}
			<div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
				<div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] animate-pulse"></div>
				<div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-red-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
			</div>

			<div className="container mx-auto px-4 pt-32 pb-12">
				{/* Header */}
				<div className="mb-12">
					<h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 mb-4">
						Available Food Nearby
					</h1>
					<div className="flex items-center gap-3 text-gray-400">
						<MapPin className="text-orange-500" size={20} />
						{userLocation ? (
							<p>Locating active food sources near you...</p>
						) : (
							<p className="flex items-center gap-2">
								<Loader2 className="animate-spin" size={16} />
								Detecting your location...
							</p>
						)}
					</div>
				</div>

				{/* Content */}
				{loading ? (
					<div className="flex flex-col items-center justify-center py-20">
						<Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
						<p className="text-gray-400 animate-pulse">Scanning your area...</p>
					</div>
				) : alerts.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-20 text-center glass-card max-w-2xl mx-auto rounded-3xl p-10 border-dashed border-2 border-white/10">
						<div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
							<SearchX className="w-10 h-10 text-gray-500" />
						</div>
						<h3 className="text-2xl font-bold text-white mb-2">No Food Alerts Found</h3>
						<p className="text-gray-400 max-w-md">
							We couldn't find any available food within your range right now.
							Please check back later or try expanding your search area.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{alerts.map((alert) => (
							<div key={alert.id} className="transform transition-all duration-300 hover:-translate-y-1">
								<FoodAlertCard
									alert={alert}
									userLocation={userLocation}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Page;
