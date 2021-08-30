import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBqHSAzwGM0SRnB4ulpGWXzIn77A5so9Fo",
    authDomain: "fireblog-aae55.firebaseapp.com",
    projectId: "fireblog-aae55",
    storageBucket: "fireblog-aae55.appspot.com",
    messagingSenderId: "532695158284",
    appId: "1:532695158284:web:ca2480ce5f923dfff7a829"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {timestamp};
export default firebaseApp.firestore();