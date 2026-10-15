import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyRppVnTVmBx5l82N3wjuU4U4ySw01M74",
  authDomain: "react-carritocompra.firebaseapp.com",
  projectId: "react-carritocompra",
  storageBucket: "react-carritocompra.firebasestorage.app",
  messagingSenderId: "661993171713",
  appId: "1:661993171713:web:a3309cba8329ab19fb8900",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
