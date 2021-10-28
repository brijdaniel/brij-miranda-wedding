import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, setDoc, addDoc, deleteDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBfsrg8h4ySA0m7OA5dNyexzyGHpTzQZU8",
    authDomain: "brij-miranda-wedding.firebaseapp.com",
    projectId: "brij-miranda-wedding",
    storageBucket: "brij-miranda-wedding.appspot.com",
    messagingSenderId: "680052154962",
    appId: "1:680052154962:web:0c6fca9a2cf7431375358b"
};
if (!getApps().length) {
    initializeApp(firebaseConfig);
}

const DB = getFirestore();

/** Helper Auth Functions */

export async function GetLoggedInUser(): Promise<User> {
    return new Promise((res, rej) => {
        const unsubscribe = getAuth().onAuthStateChanged((u) => {
            res(u);
            unsubscribe();
        }, err => {
            rej(err);
            unsubscribe();
        })
    })
}
export const logout = () => getAuth().signOut();
export const loginWithEmailPass = (email: string, pass: string) => signInWithEmailAndPassword(getAuth(), email, pass);

/** Helper Document Functions */

export const getCollection = (...segments: string[]) => getDocs(collection(DB, segments.join('/')));
export const getDocument = (...segments: string[]) => getDoc(doc(DB, segments.join('/')));
export const setDocument = (segments: string[], data: any) => setDoc(doc(DB, segments.join('/')), data, { merge: true });
export const addDocument = (segments: string[], data: any) => addDoc(collection(DB, segments.join('/')), data);
export const removeDocument = (...segments: string[]) => deleteDoc(doc(DB, segments.join('/')));
