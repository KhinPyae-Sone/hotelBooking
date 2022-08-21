// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc4pxBY3qnQqGrx2S-j-84qh64L6wTXXc",
  authDomain: "fir-auth-486ae.firebaseapp.com",
  projectId: "fir-auth-486ae",
  storageBucket: "fir-auth-486ae.appspot.com",
  messagingSenderId: "1055421352800",
  appId: "1:1055421352800:web:90960b1d69bff86c356c05"
};

// Initialize Firebase
let app;
if (firebase.apps.length ===0){
    app=firebase.initializeApp(firebaseConfig)
}else{
    app=firebase.app()
}
const auth=firebase.auth()
export {auth}
