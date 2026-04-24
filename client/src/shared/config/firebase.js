// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAc2TICB48LxkKD4JJQM1trIAhVLUGC9aQ",
    authDomain: "bookio-35994.firebaseapp.com",
    projectId: "bookio-35994",
    storageBucket: "bookio-35994.firebasestorage.app",
    messagingSenderId: "484395694484",
    appId: "1:484395694484:web:8b0cac696c4b60a92f7781"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);