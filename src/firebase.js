// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  getDocs,
  query,
  where,
  setDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"
import 'firebase/compat/database';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9B3kDNiJxx6wzc5e-ER3lgtnNeh5CFFA",
  authDomain: "react-1e72b.firebaseapp.com",
  databaseURL: "https://react-1e72b-default-rtdb.firebaseio.com",
  projectId: "react-1e72b",
  storageBucket: "react-1e72b.appspot.com",
  messagingSenderId: "456629548504",
  appId: "1:456629548504:web:d4028b066370c4922c2ead"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db=firebase.database();
export {
  collection,
  addDoc,
  getDoc,
  doc,
  getDocs,
  query,
  where,
  setDoc,
  deleteDoc
}

// const app = initializeApp(firebaseConfig);