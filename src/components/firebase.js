import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB-O5HMmCnF5oCQ22aFaJ-SkW4ku03ql2E",
  authDomain: "devconnect-114ec.firebaseapp.com",
  projectId: "devconnect-114ec",
  storageBucket: "devconnect-114ec.appspot.com",
  messagingSenderId: "844101075380",
  appId: "1:844101075380:web:02983dbe035cfd5f7eb2e1",
  measurementId: "G-DFP82TLLL0",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fire;
