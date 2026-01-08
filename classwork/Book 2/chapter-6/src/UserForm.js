// Import React and the useState hook
import React, { useState } from 'react';

// Import Bootstrap components
import { Form, Button, Alert } from 'react-bootstrap';

function UserForm() {

  // State to store email input value
  const [email, setEmail] = useState("");

  // State to store password input value
  const [password, setPassword] = useState("");

  // State to store email validation error message
  const [emailError, setEmailError] = useState("");

  // State to store password validation error message
  const [passwordError, setPasswordError] = useState("");

  // Function called when the form is submitted
  const handleSubmit = event => {
    // Prevent page reload
    event.preventDefault();

    // Email validation flag
    let emailValid = false;

    // Email validation checks
    if (email.length === 0) {
      setEmailError("Email is required");
    } else if (email.length < 6) {
      setEmailError("Email should be minimum 6 characters");
    } else if (email.indexOf(' ') >= 0) {
      setEmailError("Email cannot contain spaces");
    } else {
      setEmailError("");
      emailValid = true;
    }

    // Password validation flag
    let passwordValid = false;

    // Password validation checks
    if (password.length === 0) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password should be minimum 6 characters");
    } else if (password.indexOf(' ') >= 0) {
      setPasswordError("Password cannot contain spaces");
    } else {
      setPasswordError("");
      passwordValid = true;
    }

    // If both email and password are valid
    if (emailValid && passwordValid) {
      // Show entered values in alert box
      alert('Email: ' + email + '\nPassword: ' + password);

      // Clear input fields after successful submission
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div>
      {/* Form component */}
      <Form onSubmit={handleSubmit}>

        {/* Email input field */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={event => setEmail(event.target.value)}
            value={email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        {/* Display email error if exists */}
        {emailError.length > 0 &&
          <Alert variant="danger">{emailError}</Alert>
        }

        {/* Password input field */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={event => setPassword(event.target.value)}
            value={password}
          />
        </Form.Group>

        {/* Display password error if exists */}
        {passwordError.length > 0 &&
          <Alert variant="danger">{passwordError}</Alert>
        }

        {/* Submit button */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {/* Display live entered values */}
      Email entered: {email}
      <br />
      Password entered: {password}
    </div>
  );
}

// Export UserForm component
export default UserForm;
