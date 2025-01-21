// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "mta-payroll.firebaseapp.com",
  projectId: "mta-payroll",
  storageBucket: "mta-payroll.firebasestorage.app",
  messagingSenderId: "452804389219",
  appId: "1:452804389219:web:988998f61522020652cb56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);