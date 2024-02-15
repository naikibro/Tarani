// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/auth';

// please replace the firebaseConfig with yours
const firebaseConfig = {
  apiKey: "AIzaSyDLRZqd1bSuz9e6h1hH-P7InNTWYXuVdns",
  authDomain: "tarani-114ee.firebaseapp.com",
  projectId: "tarani-114ee",
  storageBucket: "tarani-114ee.appspot.com",
  messagingSenderId: "764578502110",
  appId: "1:764578502110:web:f23b08fadeb0e7124b794f",
  measurementId: "G-8Q8CPHRW1W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export  {app, db, auth};