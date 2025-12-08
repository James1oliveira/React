import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Firebase v9 compatibility imports (using compat version for older syntax)
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// Import Bootstrap global styles
import 'bootstrap/dist/css/bootstrap.min.css';

// --------------------------------------------------------
// Firebase configuration object
// NOTE: Replace this with your own valid Firebase credentials.
// --------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyBTgQ6GJqXCTSWsUBS4S4WER58WMqAp8Qo",
  authDomain: "reactcrud-5d30d.firebaseapp.com",
  projectId: "reactcrud-5d30d",
  storageBucket: "reactcrud-5d30d.firebasestorage.app",
  messagingSenderId: "692757016478",
  appId: "1:692757016478:web:ead0cc5d003d6a2b73708f",
  measurementId: "G-JPW5LAGSEQ3"
};

// Initialize Firebase app instance
firebase.initializeApp(firebaseConfig);

// --------------------------------------------------------
// React 18 root rendering
// React.StrictMode helps highlight potential problems in code.
// --------------------------------------------------------
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Main application component */}
    <App />
  </React.StrictMode>
);
