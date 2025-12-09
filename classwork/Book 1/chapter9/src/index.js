import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCOxp3etKT0NXT6TECx79EXQ6BorcBxXOM",
  authDomain: "reactcrud-b819e.firebaseapp.com",
  databaseURL: "https://reactcrud-b819e.firebaseio.com",
  projectId: "reactcrud-b819e",
  storageBucket: "reactcrud-b819e.appspot.com",
  messagingSenderId: "61064054237",
  appId: "1:61064054237:web:bd3bb5dd8cbf7599d1a234"
};

// Initialize Firebase only if it hasn't been initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);