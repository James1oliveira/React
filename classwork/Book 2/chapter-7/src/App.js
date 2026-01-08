// Import React library to create React components
import React from 'react';

// Import Bootstrap CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the GitHub component from the local file
import GitHub from './GitHub';

// Main App component
function App() {
  return (
    // Bootstrap container with top margin
    <div className="container mt-5">
      {/* Render the GitHub component */}
      <GitHub />
    </div>
  );
}

// Export App component so it can be used in other files
export default App;
