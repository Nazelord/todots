// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbGNv1IpowFU0FbYcDIU8ot2N5xQoP6mQ",
  authDomain: "todots-d7222.firebaseapp.com",
  projectId: "todots-d7222",
  storageBucket: "todots-d7222.appspot.com",
  messagingSenderId: "341601680205",
  appId: "1:341601680205:web:0dcbaa1e2f57a1fd821504",
  measurementId: "G-RYMWFD8YK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = firebase.firestore();

export { db };
