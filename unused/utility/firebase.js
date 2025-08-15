import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJhQjRJndb80dMdxnr-uEEOIzpgWZ2-dU",
  authDomain: "swiggyauth-c540a.firebaseapp.com",
  projectId: "swiggyauth-c540a",
  storageBucket: "swiggyauth-c540a.firebasestorage.app",
  messagingSenderId: "577648220197",
  appId: "1:577648220197:web:149c79df81fbe1fce4c7cc",
  measurementId: "G-CNEL9THQFM"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
