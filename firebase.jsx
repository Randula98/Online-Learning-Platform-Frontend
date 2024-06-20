// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBU1rin0Xe7HL4npTsSItKUjIFKupXVY8s",
    authDomain: "courseworkelearn.firebaseapp.com",
    projectId: "courseworkelearn",
    storageBucket: "courseworkelearn.appspot.com",
    messagingSenderId: "565858621977",
    appId: "1:565858621977:web:0bae1bf9c1a2a4268e2888",
    measurementId: "G-SE9HNGPZL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);