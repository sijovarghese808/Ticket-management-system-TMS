import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig: object = {
  apiKey: "AIzaSyCw9NDJEQvAO3mv5GDmnglQqL7RBPN0Qzo",
  authDomain: "ticket-managenent-system.firebaseapp.com",
  projectId: "ticket-managenent-system",
  storageBucket: "ticket-managenent-system.firebasestorage.app",
  messagingSenderId: "899067380733",
  appId: "1:899067380733:web:0a0954481c925b48244f94",
  measurementId: "G-M11BRDKS9E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
