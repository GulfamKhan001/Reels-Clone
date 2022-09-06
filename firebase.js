// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXC6JHfKMVFpwEjUoVo_Z4jc77UgijiCg",
  authDomain: "insto-55e79.firebaseapp.com",
  projectId: "insto-55e79",
  storageBucket: "insto-55e79.appspot.com",
  messagingSenderId: "834451104654",
  appId: "1:834451104654:web:6d31f2d25a1dd0d8fa7adf",
  measurementId: "G-TM80RNNYQ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const storage = getStorage(app); 
const db = getFirestore(app);
export { auth, storage, db }; 