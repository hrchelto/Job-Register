import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCtEj5fZq1R7mw_zPeDE8m-NdJTfrxIDAg",
  authDomain: "job-register-d8dc7.firebaseapp.com",
  projectId: "job-register-d8dc7",
  storageBucket: "job-register-d8dc7.firebasestorage.app",
  messagingSenderId: "405987552890",
  appId: "1:405987552890:web:85ceab65ea5b3ae82295c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);