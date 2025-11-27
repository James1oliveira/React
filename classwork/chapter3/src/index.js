// Importing the core React library
import React from 'react';

// Importing ReactDOM for rendering React components to the DOM
import ReactDOM from 'react-dom/client';

// Importing global CSS styles
import './index.css';

// Importing the main App component
import App from './App';

// Importing the web vitals report function to measure app performance
import reportWebVitals from './reportWebVitals';

// Creating a root DOM node for the React app
// This is the modern way of creating a root in React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the React app inside the root DOM node
root.render(
  // React.StrictMode helps identify potential problems in the app during development
  <React.StrictMode>
    <App /> {/* Rendering the main App component */}
  </React.StrictMode>
);

// reportWebVitals can be used to measure performance of your app
// You can pass a function to log results, or send to an analytics endpoint
// Example: reportWebVitals(console.log)
// More info: https://bit.ly/CRA-vitals
reportWebVitals();
