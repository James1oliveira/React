import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';     // Function to create Redux store
import { Provider } from 'react-redux';  // Connects Redux store to React app
import cartReducer from './reducer';     // Import root reducer
import App from './App';                  // Main App component
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS

// --------------------------------------------------------
// Create root for React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

// --------------------------------------------------------
// Create Redux store using the cartReducer
// The store holds the app state and allows dispatching actions
const store = createStore(cartReducer);

// --------------------------------------------------------
// Render the app
// - Wrap App in <Provider> to give access to Redux store
// - All child components can now access state and dispatch actions
// --------------------------------------------------------
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
