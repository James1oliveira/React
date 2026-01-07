// Import core React library
import React from 'react';

// Import the new React 18 createRoot API
import { createRoot } from 'react-dom/client';

// Import global CSS styles
import './index.css';

// Import the main App component
import App from './App';

// Import Firebase core and the Realtime Database service
import firebase from 'firebase/app';
import 'firebase/database';

// Firebase project configuration (public client-side config — safe to expose)
const firebaseConfig = {
  apiKey: "AIzaSyCOxp3etKT0NXT6TECx79EXQ6BorcBxXOM",
  authDomain: "reactcrud-b819e.firebaseapp.com",
  databaseURL: "https://reactcrud-b819e.firebaseio.com",
  projectId: "reactcrud-b819e",
  storageBucket: "reactcrud-b819e.appspot.com",
  messagingSenderId: "61064054237",
  appId: "1:61064054237:web:bd3bb5dd8cbf7599d1a234"
};

// Initialize Firebase only once — prevents errors during re-renders or HMR
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Create a root for rendering the React application
const root = createRoot(document.getElementById('root'));

// Render the App inside React.StrictMode for highlighting potential issues
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
