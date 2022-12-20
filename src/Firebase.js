// import firebase from 'firebase'
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';


// const firebaseConfig = {
//     apiKey: "AIzaSyCXURckqMxsJjQFpG90i-LdopzMYdIYp34",
//     authDomain: "clone-d88b0.firebaseapp.com",
//     projectId: "clone-d88b0",
//     storageBucket: "clone-d88b0.appspot.com",
//     messagingSenderId: "223345481657",
//     appId: "1:223345481657:web:8aa998a317ce2c77a80868",
//     measurementId: "G-9CQ005L0HR"
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
// const auth = firebaseApp.auth();
// export default auth;


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCXURckqMxsJjQFpG90i-LdopzMYdIYp34",
    authDomain: "clone-d88b0.firebaseapp.com",
    projectId: "clone-d88b0",
    storageBucket: "clone-d88b0.appspot.com",
    messagingSenderId: "223345481657",
    appId: "1:223345481657:web:8aa998a317ce2c77a80868",
    measurementId: "G-9CQ005L0HR"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };


