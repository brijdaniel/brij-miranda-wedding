const firebaseConfig = {
    apiKey: "AIzaSyBfsrg8h4ySA0m7OA5dNyexzyGHpTzQZU8",
    authDomain: "brij-miranda-wedding.firebaseapp.com",
    projectId: "brij-miranda-wedding",
    storageBucket: "brij-miranda-wedding.appspot.com",
    messagingSenderId: "680052154962",
    appId: "1:680052154962:web:0c6fca9a2cf7431375358b"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const DB = app.firestore();