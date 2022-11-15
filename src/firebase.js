import { initializeApp } from "firebase/app";
import {getAuth} from  "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDY7CjRICEnuaya8njj2fwR4cnG0rg5CJo",
  authDomain: "ecommerce-database-444a2.firebaseapp.com",
  projectId: "ecommerce-database-444a2",
  storageBucket: "ecommerce-database-444a2.appspot.com",
  messagingSenderId: "497710153323",
  appId: "1:497710153323:web:779739ee17ea48c4e7bb2e",
  measurementId: "G-84C1GPK3X6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app)

export {app,auth,db};