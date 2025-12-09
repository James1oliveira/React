// Import React and the Component class to create a class-based component
import React, { Component } from 'react';
// Import the Products component so it can be rendered inside App
import Products from './Products';

class App extends Component {
  // The render method defines what UI this component displays
  render() {        
    return (
      // The root container for the App component
      <div>
        {/* Page title */}
        <h1>My First React App</h1>

        {/* Render the Products component */}
        <Products />
      </div>
    );
  }
}

// Export the App component to be used in other files
export default App;
