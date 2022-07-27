import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBhA2VFNEvQyDvUSB9BpqemLBvF25yh-yE",
  authDomain: "loop-chat-darshankamble.firebaseapp.com",
  projectId: "loop-chat-darshankamble",
  storageBucket: "loop-chat-darshankamble.appspot.com",
  messagingSenderId: "604284297524",
  appId: "1:604284297524:web:82e31db23ffe38a18f4561",
  measurementId: "G-BJTXM7TC6W"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
export default db; 


