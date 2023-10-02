// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-estate-50323.firebaseapp.com',
  projectId: 'mern-estate-50323',
  storageBucket: 'mern-estate-50323.appspot.com',
  messagingSenderId: '1028551265048',
  appId: '1:1028551265048:web:ade231c688a58d526f6c6d',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
