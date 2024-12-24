// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCk0FADIRPQBhhAly0wMwhi2kil2gOL0S0",
  authDomain: "dream-planner-d6ea3.firebaseapp.com",
  projectId: "dream-planner-d6ea3",
  storageBucket: "dream-planner-d6ea3.firebasestorage.app",
  messagingSenderId: "289915384483",
  appId: "1:289915384483:web:48f2e11b8f5c92e1f18516",
  measurementId: "G-W8L2GFQ3HE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Firebase persistence set to local');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

const analytics = getAnalytics(app);

export { auth, analytics };
export default app;