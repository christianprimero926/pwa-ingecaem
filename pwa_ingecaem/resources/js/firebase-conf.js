// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
importScripts('js/firebase/firebase-param.js');

import { getAnalytics } from "firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = JSON.parse(process.env.PWA_APP_FIREBASE_CONFIG);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(firebaseConfig);
const db = getFirestore(firebaseConfig);

const analytics = getAnalytics(app);

// Detect auto state
onAuthStateChanged(auth, user => {
    if (user !== null) {
        console.log('logged in!');
    } else {
        console.log('No user');
    }
});
