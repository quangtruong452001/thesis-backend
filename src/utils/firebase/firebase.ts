// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBjnfnny9XfjqrvTkAJPpmj4mfF8-Fkt9U',
  authDomain: 'e-commerce-365bb.firebaseapp.com',
  projectId: 'e-commerce-365bb',
  storageBucket: 'e-commerce-365bb.appspot.com',
  messagingSenderId: '245676140638',
  appId: '1:245676140638:web:0804cd81c27999ea5baccf',
  measurementId: 'G-C1P1BZSBTR',
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
