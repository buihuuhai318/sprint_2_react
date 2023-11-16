// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDILmXaayN76Hr3mdhbazEryzt_B01Oc6U",
    authDomain: "thehome-13844.firebaseapp.com",
    projectId: "thehome-13844",
    storageBucket: "thehome-13844.appspot.com",
    messagingSenderId: "690818040697",
    appId: "1:690818040697:web:f1b22ce71584520d29e5a8",
    measurementId: "G-08DR2WQ36G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);