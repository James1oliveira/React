// Import core React library and Component class
import React, { Component } from 'react';

// Import components for listing users and the user form
import User from './User';
import UserForm from './UserForm';

// Import routing utilities from react-router-dom
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import Bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      // BrowserRouter enables routing across the app
      <BrowserRouter>
        <div className="container mt-4">
          {/* Define application routes */}
          <Routes>
            {/* Home route – displays the User component */}
            <Route path="/" element={<User />} />

            {/* Route for adding a new user – uses UserForm */}
            <Route path="/add" element={<UserForm />} />

            {/* Route for editing a specific user by ID */}
            <Route path="/edit/:id" element={<UserForm />} />

            {/* Wildcard route – handles any unknown paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

// Component displayed when no matching route is found
class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>404 - Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
      </div>
    );
  }
}

export default App;
