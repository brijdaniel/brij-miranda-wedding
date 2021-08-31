import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBfsrg8h4ySA0m7OA5dNyexzyGHpTzQZU8",
    authDomain: "brij-miranda-wedding.firebaseapp.com",
    projectId: "brij-miranda-wedding",
    storageBucket: "brij-miranda-wedding.appspot.com",
    messagingSenderId: "680052154962",
    appId: "1:680052154962:web:0c6fca9a2cf7431375358b"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const DB = firebase.firestore(); 