import React, { Component } from 'react'; 
import GitHub from './GitHub'; // Import the GitHub component

// Main App component
class App extends Component {
  render() {
    return (
      <div>
        {/* 
          Render the GitHub component.
          All logic related to fetching or displaying GitHub data
          will be handled inside the GitHub component itself.
        */}
        <GitHub />
      </div>
    );
  }
}

export default App; // Export App so it can be used by index.js or other components
