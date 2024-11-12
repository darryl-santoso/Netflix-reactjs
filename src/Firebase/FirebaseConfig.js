import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPU9XiZSDAzX5SPIpODSQwlodfvgijGC4",
  authDomain: "netflix-reactjs-e3714.firebaseapp.com",
  projectId: "netflix-reactjs-e3714",
  storageBucket: "netflix-reactjs-e3714.firebasestorage.app",
  messagingSenderId: "631770680240",
  appId: "1:631770680240:web:0a292aba3e19ff7c9ee475",
  measurementId: "G-VEVQ7VN6NH"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(FirebaseApp);
const analytics = getAnalytics(FirebaseApp);
