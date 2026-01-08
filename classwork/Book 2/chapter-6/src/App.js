// Import React library
import React from 'react';

// Import Bootstrap CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the UserForm component
import UserForm from './UserForm';

// Main App component
function App() {
  return (
    // Bootstrap container with top margin
    <div className="container mt-5">
      {/* Render the UserForm component */}
      <UserForm />
    </div>
  );
}

// Export App component so it can be used in index.js
export default App;
