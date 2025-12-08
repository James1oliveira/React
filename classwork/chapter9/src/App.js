import React, { Component } from 'react';
import User from './User';
import UserForm from './UserForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        {/* React Router wrapper for enabling routing */}
        <BrowserRouter>
          <div>

            {/* 
              Routes component holds all route definitions.
              Each Route maps a URL path to a component.
            */}
            <Routes>

              {/* Edit user form — uses URL parameter (:id) */}
              <Route path="/edit/:id" element={<UserForm />} />

              {/* Add new user form */}
              <Route path="/add" element={<UserForm />} />

              {/* Home page — list of users */}
              <Route path="/" element={<User />} />

              {/* Fallback page for any unknown route */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

class NotFound extends Component {
  render() {
    return (
      <div className="container mt-4">
        {/* Simple 404 message when no route matches */}
        Not Found
      </div>
    );
  }
}
