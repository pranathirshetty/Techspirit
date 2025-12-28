// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCcm83QM-LvPEw1m1NcVl4hfP8Rux8tCA",
  authDomain: "techspirit-9d57d.firebaseapp.com",
  projectId: "techspirit-9d57d",
  storageBucket: "techspirit-9d57d.firebasestorage.app",
  messagingSenderId: "206236648446",
  appId: "1:206236648446:web:ded699b9dc79037c66f6af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);