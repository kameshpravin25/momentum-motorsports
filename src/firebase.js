import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCY03K6fqoA4INEzlA_1cuRDb28vstvPX4",
  authDomain: "momentum-motorsports.firebaseapp.com",
  projectId: "momentum-motorsports",
  storageBucket: "momentum-motorsports.firebasestorage.app",
  messagingSenderId: "83734604403",
  appId: "1:83734604403:web:4a5b4c3ee4923befe25806",
  measurementId: "G-CJZ2JT7VH7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
