"use client";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("giver");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            let userCredential;

            if (isSignup) {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    email,
                    role,
                    createdAt: new Date().toISOString(),
                });
                toast.success("Account created successfully!");
            } else {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            }

            // Fetch role and redirect
            const userRef = doc(db, "users", userCredential.user.uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();

            if (!userData) throw new Error("Account data not found. Please contact support.");

            if (userData.role === "giver") {
                router.push("/dashboard");
            } else {
                router.push("/user-page");
            }
        } catch (err) {
            console.error(err);
            const friendlyError = err.message.includes("auth/user-not-found")
                ? "No account found with this email."
                : err.message;
            toast.error(friendlyError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-75"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000"></div>
            </div>

            <ToastContainer theme="colored" transition={Slide} />

            <div className="w-full max-w-md glass-card rounded-2xl shadow-2xl p-8 border border-white/10 backdrop-blur-xl relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                        Waste2Plate
                    </h1>
                    <p className="text-gray-400 mt-2">
                        {isSignup ? "Create your account" : "Welcome back"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Input */}
                    <div>
                        <label className="text-sm font-medium text-gray-300 block mb-1.5">Email Address</label>
                        <input
                            type="email"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="text-sm font-medium text-gray-300 block mb-1.5">Password</label>
                        <input
                            type="password"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Role Selection (Only for Signup) */}
                    {isSignup && (
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-300 block">I want to...</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setRole("giver")}
                                    className={`p-3 rounded-xl border text-sm transition ${role === "giver"
                                            ? "bg-orange-500/20 border-orange-500 text-orange-400"
                                            : "bg-white/5 border-white/10 text-gray-400"
                                        }`}
                                >
                                    Give Food
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole("receiver")}
                                    className={`p-3 rounded-xl border text-sm transition ${role === "receiver"
                                            ? "bg-orange-500/20 border-orange-500 text-orange-400"
                                            : "bg-white/5 border-white/10 text-gray-400"
                                        }`}
                                >
                                    Receive Food
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        {loading ? "Processing..." : (isSignup ? "Create Account" : "Sign In")}
                    </button>
                </form>

                {/* Footer Link */}
                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button
                            onClick={() => setIsSignup(!isSignup)}
                            className="text-orange-400 font-semibold hover:underline transition"
                        >
                            {isSignup ? "Log in" : "Sign up free"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}