import firebase from 'firebase/app';
import "firebase/database";
import "firebase/auth"


let firebaseConfig = {
  apiKey: "AIzaSyD6sFyzhW5YexyGaXKgib_plaXvDNXQuno",
  authDomain: "kitab-audiobooks.firebaseapp.com",
  databaseURL: "https://kitab-audiobooks.firebaseio.com",
  projectId: "kitab-audiobooks",
  storageBucket: "kitab-audiobooks.appspot.com",
  messagingSenderId: "855572886534",
  appId: "1:855572886534:web:ef0191a31f146e48eabf87",
  measurementId: "G-MJ0GNBNB1Q"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

// Conexão Firebase Principal*** 