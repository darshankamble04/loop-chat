import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBvB3XcR0ezZ4DsakovxcvREemKMqh6k3k",
  authDomain: "chat-loop04.firebaseapp.com",
  projectId: "chat-loop04",
  storageBucket: "chat-loop04.appspot.com",
  messagingSenderId: "706059685722",
  appId: "1:706059685722:web:f06493c19e76a76c09ed63",
  measurementId: "G-8SLHMTMQ62"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
export default db; 


