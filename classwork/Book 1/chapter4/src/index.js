// Import the React library (needed for JSX)
import React from 'react';
// Import the ReactDOM client library for rendering the React app
import ReactDOM from 'react-dom/client';
// Import global stylesheet
import './index.css';
// Import the main App component
import App from './App';
// Import tool for measuring app performance
import reportWebVitals from './reportWebVitals';

// Create a root node where the React app will be mounted.
// This targets the <div id="root"> in public/index.html.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside React.StrictMode.
// StrictMode helps highlight potential problems during development.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional performance measurement.
// You can pass a function such as console.log to track results
// or send the data to an analytics endpoint.
reportWebVitals();
