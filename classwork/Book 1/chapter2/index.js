// Import the core React library
import React from 'react';
// Import ReactDOM for rendering React components into the DOM
import ReactDOM from 'react-dom';
// Import global CSS styles for the app
import './index.css';
// Import the main App component
import App from './App';
// Import the service worker registration function (used for offline support and caching)
import registerServiceWorker from './registerServiceWorker';

// Render the App component inside the DOM element with id="root"
ReactDOM.render(<App />, document.getElementById('root'));

// Register the service worker to enable offline capabilities and faster loading
registerServiceWorker();
