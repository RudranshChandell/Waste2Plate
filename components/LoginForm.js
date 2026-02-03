"use client";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useState } from "react";
import { auth, db } from "../firebase/config";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Briefcase, Heart } from "lucide-react";

export default function LoginForm() {
	const [isSignup, setIsSignup] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("giver");
	const router = useRouter();

	const handleSubmit = async () => {
		if (!email || !password) {
			toast.error("Please fill in all fields");
			return;
		}

		try {
			let userCredential;
			if (isSignup) {
				userCredential = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);

				// store role in Firestore
				await setDoc(doc(db, "users", userCredential.user.uid), {
					email,
					role,
				});
			} else {
				userCredential = await signInWithEmailAndPassword(
					auth,
					email,
					password
				);
			}

			// Fetch role to redirect
			const userRef = doc(db, "users", userCredential.user.uid);
			const userSnap = await getDoc(userRef);
			const userData = userSnap.data();

			// Redirect based on role
			if (userData?.role === "giver") {
				router.push("/dashboard");
			} else {
				router.push("/user-page");
			}
		} catch (err) {
			console.error(err);
			const errorMessage = err.message.replace("Firebase: ", "").replace("auth/", "");
			toast.error(errorMessage);
		}
	};

	return (
		<div className="glass-card w-full max-w-md p-8 relative overflow-hidden">
			{/* Decorative background element */}
			<div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -z-10"></div>

			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold font-handwriting bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
					{isSignup ? "Join the Movement" : "Welcome Back"}
				</h2>
				<p className="text-gray-400 text-sm mt-2">
					{isSignup ? "Start saving food today" : "Login to continue your journey"}
				</p>
			</div>

			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick={true}
				rtl={false}
				theme="dark"
				transition={Slide}
			/>

			<div className="space-y-5">
				<div className="relative group">
					<Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
					<input
						type="email"
						placeholder="Email Address"
						className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all duration-300"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="relative group">
					<Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
					<input
						type="password"
						placeholder="Password"
						className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all duration-300"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				{isSignup && (
					<div className="p-1 bg-white/5 rounded-xl flex gap-1 animate-in fade-in slide-in-from-top-4 duration-300">
						<button
							className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${role === "giver"
									? "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border border-orange-500/20"
									: "text-gray-400 hover:text-white hover:bg-white/5"
								}`}
							onClick={() => setRole("giver")}
						>
							<Briefcase size={16} /> Giver
						</button>
						<button
							className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${role === "receiver"
									? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/20"
									: "text-gray-400 hover:text-white hover:bg-white/5"
								}`}
							onClick={() => setRole("receiver")}
						>
							<Heart size={16} /> Receiver
						</button>
					</div>
				)}

				<button
					className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
					onClick={handleSubmit}>
					{isSignup ? "Create Account" : "Login"}
				</button>

				<p className="text-center text-gray-400 text-sm mt-6">
					{isSignup ? "Already have an account?" : "New here?"}{" "}
					<button
						className="text-orange-400 hover:text-orange-300 font-semibold transition-colors hover:underline"
						onClick={() => setIsSignup(!isSignup)}>
						{isSignup ? "Login" : "Create Account"}
					</button>
				</p>
			</div>
		</div>
	);
}
