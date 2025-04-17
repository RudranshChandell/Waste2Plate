"use client";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../firebase/config";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function LoginPage() {
	const [isSignup, setIsSignup] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("giver");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent form submission
		try {
			setLoading(true);
			console.log("Attempting to", isSignup ? "sign up" : "log in", "with email:", email);

			if (!email || !password) {
				toast("Please enter both email and password");
				return;
			}

			let userCredential;

			if (isSignup) {
				// Signup flow
				console.log("Creating new user...");
				userCredential = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
				console.log("User created successfully:", userCredential.user.uid);
				
				console.log("Setting user role in Firestore...");
				await setDoc(doc(db, "users", userCredential.user.uid), {
					email,
					role,
				});
				console.log("User role set successfully");
			} else {
				// Login flow
				console.log("Attempting to sign in...");
				userCredential = await signInWithEmailAndPassword(
					auth,
					email,
					password
				);
				console.log("User signed in successfully:", userCredential.user.uid);
			}

			// Get user role from Firestore
			console.log("Fetching user data from Firestore...");
			const userRef = doc(db, "users", userCredential.user.uid);
			const userSnap = await getDoc(userRef);
			const userData = userSnap.data();
			console.log("User data:", userData);

			if (!userData) {
				throw new Error("User data not found in Firestore");
			}

			// Redirect based on role
			if (userData?.role === "giver") {
				console.log("Redirecting to dashboard...");
				router.push("/dashboard");
			} else {
				console.log("Redirecting to user page...");
				router.push("/user-page");
			}
		} catch (err) {
			console.error("Error during authentication:", err);
			toast(err.message);
		} finally {
			setLoading(false);
		}
	};

	const toggleSignup = (e) => {
		e.preventDefault();
		setIsSignup(!isSignup);
		setEmail("");
		setPassword("");
		setRole("giver");
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick={false}
				rtl={false}
				theme="dark"
				transition={Slide}
			/>
			<div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
				<h1 className="text-2xl font-bold text-center">
					{isSignup ? "Sign Up" : "Login"}
				</h1>

				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="email"
						placeholder="Email"
						className="border p-2 w-full rounded"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={loading}
						required
					/>
					<input
						type="password"
						placeholder="Password"
						className="border p-2 w-full rounded"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						disabled={loading}
						required
					/>

					{isSignup && (
						<div className="space-y-2">
							<label className="block text-sm font-medium">
								Select Role:
							</label>
							<label className="flex items-center gap-2">
								<input
									type="radio"
									name="role"
									value="giver"
									checked={role === "giver"}
									onChange={() => setRole("giver")}
									disabled={loading}
								/>
								Giver (Restaurant, Store)
							</label>
							<label className="flex items-center gap-2">
								<input
									type="radio"
									name="role"
									value="receiver"
									checked={role === "receiver"}
									onChange={() => setRole("receiver")}
									disabled={loading}
								/>
								Receiver (Needy Individual)
							</label>
						</div>
					)}

					<button
						type="submit"
						disabled={loading}
						className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-300">
						{loading ? "Loading..." : (isSignup ? "Sign Up" : "Login")}
					</button>
				</form>

				<p className="text-center text-sm">
					{isSignup ? "Already have an account?" : "New here?"}{" "}
					<button
						className="text-blue-600 underline"
						onClick={toggleSignup}
						disabled={loading}>
						{isSignup ? "Login" : "Sign Up"}
					</button>
				</p>
			</div>
		</div>
	);
}
