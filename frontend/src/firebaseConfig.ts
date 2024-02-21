import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_WiwBHAX61AqMf-KUzL8aPpZm1uTS37Y",
  authDomain: "e-commerce-1c157.firebaseapp.com",
  projectId: "e-commerce-1c157",
  storageBucket: "e-commerce-1c157.appspot.com",
  messagingSenderId: "393118331104",
  appId: "1:393118331104:web:669ce49476729564572085",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
