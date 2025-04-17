// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCI_zcqmopGiL5QUhqBU5jM1JiSXdDnpSY",
	authDomain: "waste2plate-d48ef.firebaseapp.com",
	projectId: "waste2plate-d48ef",
	storageBucket: "waste2plate-d48ef.firebasestorage.app",
	messagingSenderId: "1058481796438",
	appId: "1:1058481796438:web:feb6a0aac76c7056bcd2f7",
	measurementId: "G-6GSN8WG7LV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);