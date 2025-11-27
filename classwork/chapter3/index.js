// Import the core React library
import React from 'react';
// Import ReactDOM to render React components into the browser DOM
import ReactDOM from 'react-dom';
// Import global stylesheet
import './index.css';
// Import the root App component
import App from './App';
// Import service worker registration for offline support and caching
import registerServiceWorker from './registerServiceWorker';

// Render the App component into the <div id="root"> element in index.html
ReactDOM.render(<App />, document.getElementById('root'));

// Register the service worker to enable offline capabilities (optional)
registerServiceWorker();
