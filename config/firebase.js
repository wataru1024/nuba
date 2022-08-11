// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKbRag4sYDpOgo0l0BfKJOp6bWVvyEMqk",
  authDomain: "nubago-next-firebase.firebaseapp.com",
  projectId: "nubago-next-firebase",
  storageBucket: "nubago-next-firebase.appspot.com",
  messagingSenderId: "475868063323",
  appId: "1:475868063323:web:4aea05ed964675192d817e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db