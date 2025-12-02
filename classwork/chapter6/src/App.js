import React, { Component } from 'react';
import UserForm from './UserForm'; // Import the UserForm component

class App extends Component {
  render() {
    return (
      <div>
        {/* 
          Render the UserForm component.
          Any logic, inputs, or state handling for the form will be handled
          inside the UserForm component itself.
        */}
        <UserForm />
      </div>
    );
  }
}

export default App; // Export the App component so it can be used elsewhere
