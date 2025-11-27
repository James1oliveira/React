// Import React and the Component class to create a class-based component
import React, { Component } from 'react';
// Import the Products component so it can be displayed inside App
import Products from './Products';

class App extends Component {
  // The render method defines the UI output of this component
  render() {        
    return (
      // Parent container for the App component
      <div>
        {/* Main heading of the app */}
        <h1>My First React App</h1>

        {/* Render the Products component */}
        <Products />
      </div>
    );
  }
}

// Export the App component so it can be imported and used in index.js
export default App;
