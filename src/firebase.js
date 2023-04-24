// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAebqGxjbCW46VJOqFxBTi-ksHFwqhwQWY",
  authDomain: "notificaciones-e06b7.firebaseapp.com",
  projectId: "notificaciones-e06b7",
  storageBucket: "notificaciones-e06b7.appspot.com",
  messagingSenderId: "897744081306",
  appId: "1:897744081306:web:67308843f1ab2b10d32a23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const messaging = getMessaging(app);