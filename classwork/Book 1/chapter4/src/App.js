// Import the React library (required for using JSX)
import React from 'react';
// Import the Products component so it can be displayed inside App
import Products from './Products';

// Functional component version of App
function App() {

    return (
        // Main wrapper element for the application
        <div className="App">
            {/* Render the Products component */}
            <Products />
        </div>
    );
}

// Export the App component so it can be used in index.js
export default App;
