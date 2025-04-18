// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYOXMHiAydwzPW0_WFU839zlpuziDoO-M",
  authDomain: "smartshoppingcart-82cbb.firebaseapp.com",
  databaseURL: "https://smartshoppingcart-82cbb-default-rtdb.firebaseio.com",
  projectId: "smartshoppingcart-82cbb",
  storageBucket: "smartshoppingcart-82cbb.firebasestorage.app",
  messagingSenderId: "537876881734",
  appId: "1:537876881734:web:071599c562254b062ec547",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app); 

// Initialize Firebase Realtime Database
const database = getDatabase(app); 

export default app;

//Export authentication
export { auth };

// Export database
export { database };

