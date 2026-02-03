import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Utensils } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";

const FoodAlertCard = ({ alert, userLocation }) => {
	const [claimed, setClaimed] = useState(false);
	const [distanceKm, setDistanceKm] = useState(null);

	// Fetch road distance from your API
	const getRoadDistance = async () => {
		if (!userLocation || !alert.location) return;

		const origin = `${userLocation.latitude},${userLocation.longitude}`;
		const destination = `${alert.location.latitude},${alert.location.longitude}`;

		try {
			const res = await fetch("/api/distance", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ origin, destination }),
			});

			const data = await res.json();

			if (res.ok && data.distance) {
				setDistanceKm(data.distance); // "4.6 km"
			} else {
				console.error("API error:", data);
			}
		} catch (error) {
			console.error("Error fetching road distance:", error);
		}
	};

	useEffect(() => {
		getRoadDistance();
	}, [userLocation, alert.location]);

	const handleClaim = async () => {
		if (claimed) {
			setClaimed(false);
			try {
				const alertRef = doc(db, "food_alerts", alert.id);
				await updateDoc(alertRef, {
					slots: alert.slots + 1,
				});
				toast("Your slot has been cancelled!");
			} catch (error) {
				console.error("Error cancelling:", error);
				toast("Failed to cancel.");
			}
		} else if (alert.slots <= 0) {
			toast("No slots left!");
			return;
		} else {
			try {
				const alertRef = doc(db, "food_alerts", alert.id);
				await updateDoc(alertRef, {
					slots: alert.slots - 1,
				});
				setClaimed(true);
				toast("You have claimed this giveaway!");
			} catch (error) {
				console.error("Error claiming alert:", error);
				toast("Failed to claim giveaway.");
			}
		}
	};

	if (!alert) return null;

	return (
		<Card className="w-full max-w-md shadow-lg rounded-2xl border-white/10 bg-card/40 backdrop-blur-sm hover:border-orange-500/50 transition-colors duration-300">
			<ToastContainer
				position="top-right"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick={false}
				rtl={false}
				theme="dark"
				transition={Slide}
			/>

			<CardHeader>
				<CardTitle className="text-xl font-semibold text-white">
					{alert.orgName || "Unknown"}
				</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="flex items-center gap-3 text-gray-300">
					<div className="p-2 rounded-full bg-orange-500/20 text-orange-400">
						<Utensils className="w-4 h-4" />
					</div>
					<span className="text-lg font-medium">
						{alert.foodType}
					</span>
				</div>

				<div className="flex items-center gap-3 text-gray-300">
					<div className="p-2 rounded-full bg-red-500/20 text-red-400">
						<MapPin className="w-4 h-4" />
					</div>
					<span>{alert.city || "N/A"}</span>
				</div>

				<div className="flex items-center justify-between pt-2">
					<p className="text-gray-400 text-sm">Quantity: <span className="text-white font-bold">{alert.slots}</span></p>

					{distanceKm && (
						<p className="text-gray-400 text-sm">
							<span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
							{distanceKm} away
						</p>
					)}
				</div>

				<div className="pt-4">
					<Button
						onClick={handleClaim}
						className={`w-full font-bold transition-all duration-300 ${claimed
								? "bg-gray-600 hover:bg-gray-700 text-white"
								: "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-orange-500/20"
							}`}>
						{claimed ? "Cancel Reservation" : "Claim Now"}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default FoodAlertCard;
