import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnU_6tt34tS_B-a4yVJQ324NJpTn_d_0c",
  authDomain: "projeteval-b0a02.firebaseapp.com",
  projectId: "projeteval-b0a02",
  storageBucket: "projeteval-b0a02.appspot.com",
  messagingSenderId: "",
  appId: "1:592376941012:android:4e462ce0d4e6a552bfee41",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // établi la connexion avec la base de données
export default db;
