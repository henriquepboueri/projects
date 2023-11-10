// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAl7fT0wFSH4EDTIoQsSF-tioPK3atRokw',
  authDomain: 'workout-control.firebaseapp.com',
  projectId: 'workout-control',
  storageBucket: 'workout-control.appspot.com',
  messagingSenderId: '344106009194',
  appId: '1:344106009194:web:c468eb84fd852c16d9c013',
  measurementId: 'G-3KXGZJFKFJ'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
