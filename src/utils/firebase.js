// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2rhlISTBfvMGRbp9ZGXpytslguNg7ra0",
  authDomain: "netflixgpt-751c6.firebaseapp.com",
  projectId: "netflixgpt-751c6",
  storageBucket: "netflixgpt-751c6.firebasestorage.app",
  messagingSenderId: "54821831501",
  appId: "1:54821831501:web:586e8256b487915e612d04",
  measurementId: "G-1T5HMMHSC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (typeof window !== "undefined") {
  getAnalytics(app);
}

export const auth = getAuth();