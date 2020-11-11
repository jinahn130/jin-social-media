import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBx18-qkH67OZQrY0EgAdu7h09gpHN9QJo",
    authDomain: "jin-social.firebaseapp.com",
    databaseURL: "https://jin-social.firebaseio.com",
    projectId: "jin-social",
    storageBucket: "jin-social.appspot.com",
    messagingSenderId: "1011868092910",
    appId: "1:1011868092910:web:18ba019d6c6b6e6aede6ff",
    measurementId: "G-5PPV73VGPL"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
