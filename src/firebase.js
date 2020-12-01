import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";

const config = {
    apiKey: "AIzaSyDP25oDFSsZ_PFGa1l79fdefNAfoO7NoRw",
    authDomain: "vue-practice-4.firebaseapp.com",
    databaseURL: "https://vue-practice-4.firebaseio.com",
    projectId: "vue-practice-4",
    storageBucket: "vue-practice-4.appspot.com",
    messagingSenderId: "966662047373",
    appId: "1:966662047373:web:29e7384ef2b25d4ea0c4c4"
  };
export default {
  init() {
      firebase.initializeApp(config);
  }
}